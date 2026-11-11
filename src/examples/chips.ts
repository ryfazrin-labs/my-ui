import { createCodeCollapse } from '../components/code-collapse';

export function renderChipsExamples(container: HTMLElement) {
  const chipsSection = document.createElement('div');
  chipsSection.innerHTML = `
    <section class="section">
      <h2>Chips & Badges</h2>
      <p style="margin-bottom: 24px; color: var(--oui-color-text-secondary); font-size: 14px;">
        Pill-shaped chips for filtering, categorizing, and selecting, paired with compact status badges inspired by Samsung One UI 7.
      </p>

      <div style="display: flex; flex-direction: column; gap: 32px; max-width: 600px;">
        <!-- Interactive Filter Chips -->
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <h3 style="font-size: 16px; margin: 0; font-weight: 600;">Interactive Filter Chips</h3>
          <div class="chip-group" id="filter-chip-group">
            <button type="button" class="chip chip--selected" aria-pressed="true">
              <span class="chip__icon"><i class="ph-bold ph-check"></i></span>
              All Photos
            </button>
            <button type="button" class="chip" aria-pressed="false">
              Favorites
            </button>
            <button type="button" class="chip" aria-pressed="false">
              Videos
            </button>
            <button type="button" class="chip" aria-pressed="false">
              Screenshots
            </button>
            <button type="button" class="chip" aria-pressed="false">
              Locations
            </button>
          </div>
        </div>

        <!-- Action & Input Chips with Icons -->
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <h3 style="font-size: 16px; margin: 0; font-weight: 600;">Action & Deletable Chips</h3>
          <div class="chip-group">
            <div class="chip">
              <span class="chip__icon"><i class="ph-bold ph-map-pin"></i></span>
              Seoul, South Korea
              <button type="button" class="chip__close" aria-label="Remove Seoul">
                <i class="ph-bold ph-x"></i>
              </button>
            </div>

            <div class="chip">
              <span class="chip__icon"><i class="ph-bold ph-user"></i></span>
              Galaxy AI
              <button type="button" class="chip__close" aria-label="Remove Galaxy AI">
                <i class="ph-bold ph-x"></i>
              </button>
            </div>

            <div class="chip chip--outlined">
              <span class="chip__icon"><i class="ph-bold ph-plus"></i></span>
              Add Category
            </div>
          </div>
        </div>

        <!-- Badges -->
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <h3 style="font-size: 16px; margin: 0; font-weight: 600;">Status & Counter Badges</h3>
          <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
            <span class="badge">99+</span>
            <span class="badge badge--success">New</span>
            <span class="badge badge--danger">Update</span>
            <span class="badge badge--warning">Beta</span>
            <span class="badge badge--neutral">Archived</span>
            <span class="badge badge--dot" title="Active status dot"></span>
          </div>

          <!-- Embedded Badge Example -->
          <div style="display: flex; align-items: center; gap: 16px; margin-top: 8px;">
            <button type="button" class="button button--light" style="position: relative;">
              <span class="button-icon"><i class="ph-bold ph-bell"></i></span>
              Notifications
              <span class="badge badge--danger" style="margin-left: 6px;">3</span>
            </button>

            <button type="button" class="button button--light" style="position: relative;">
              <span class="button-icon"><i class="ph-bold ph-chat-teardrop"></i></span>
              Messages
              <span class="badge badge--dot" style="margin-left: 6px;"></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  `;

  // Attach interactive toggle logic for filter chips
  const filterChips = chipsSection.querySelectorAll<HTMLButtonElement>('#filter-chip-group .chip');
  filterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const isSelected = chip.classList.contains('chip--selected');
      if (isSelected) {
        chip.classList.remove('chip--selected');
        chip.setAttribute('aria-pressed', 'false');
        // remove check icon if present
        const checkIcon = chip.querySelector('.chip__icon');
        if (checkIcon) checkIcon.remove();
      } else {
        chip.classList.add('chip--selected');
        chip.setAttribute('aria-pressed', 'true');
        // prepend check icon if not present
        if (!chip.querySelector('.chip__icon')) {
          const checkSpan = document.createElement('span');
          checkSpan.className = 'chip__icon';
          checkSpan.innerHTML = '<i class="ph-bold ph-check"></i>';
          chip.insertBefore(checkSpan, chip.firstChild);
        }
      }
    });
  });

  // Attach remove handler for deletable chips
  const closeButtons = chipsSection.querySelectorAll<HTMLButtonElement>('.chip__close');
  closeButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parentChip = btn.closest('.chip');
      parentChip?.remove();
    });
  });

  // Code snippet documentation
  const section = chipsSection.querySelector('.section');
  if (section) {
    const codeExample = `<!-- 1. Interactive Filter Chips -->
<div class="chip-group">
  <button type="button" class="chip chip--selected" aria-pressed="true">
    <span class="chip__icon"><i class="ph-bold ph-check"></i></span>
    All Photos
  </button>
  <button type="button" class="chip" aria-pressed="false">Favorites</button>
</div>

<!-- 2. Deletable Input Chip -->
<div class="chip">
  <span class="chip__icon"><i class="ph-bold ph-map-pin"></i></span>
  Seoul, South Korea
  <button type="button" class="chip__close" aria-label="Remove">
    <i class="ph-bold ph-x"></i>
  </button>
</div>

<!-- 3. Status Badges -->
<span class="badge">99+</span>
<span class="badge badge--success">New</span>
<span class="badge badge--danger">3</span>
<span class="badge badge--dot"></span>`;

    const codeBlock = createCodeCollapse('View Code', codeExample);
    section.appendChild(codeBlock);
  }

  container.appendChild(chipsSection);
}
