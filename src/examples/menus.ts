import { createCodeCollapse } from '../components/code-collapse'

export function renderMenuExamples(container: HTMLElement) {
const section = document.createElement('div')
section.innerHTML = `
<section class="section">
  <h2>Menus</h2>

  <div
    style="display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-start; justify-content: center; background: linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%); padding: 40px; border-radius: 24px;">

    <!-- Internet Quick Panel Menu -->
    <div style="width: 100%; max-width: 360px; background: none;">
      <div class="menu-panel">
        <!-- Header -->
        <div class="menu-panel__header">
          <div class="menu-panel__header-icon">
            <i class="ph-bold ph-app-window" style="font-size: 24px;"></i>
          </div>
          <div class="menu-panel__header-content">
            <div class="menu-panel__header-title">One UI Design Kit</div>
            <div class="menu-panel__header-url">https://www.figma.com/community/file/14560...</div>
          </div>
          <div class="menu-panel__header-action">
            <i class="ph-bold ph-share-network" style="font-size: 20px;"></i>
          </div>
        </div>

        <!-- Horizontal Scroll -->
        <div class="menu-panel__scroll-row">
          <div class="menu-panel__action-circle">
            <div class="menu-panel__action-circle-icon">
              <i class="ph-bold ph-clock-counter-clockwise"></i>
            </div>
            <span class="menu-panel__action-circle-label">History</span>
          </div>
          <div class="menu-panel__action-circle">
            <div class="menu-panel__action-circle-icon">
              <i class="ph-bold ph-download-simple"></i>
            </div>
            <span class="menu-panel__action-circle-label">Downloads</span>
          </div>
          <div class="menu-panel__action-circle">
            <div class="menu-panel__action-circle-icon">
              <i class="ph-bold ph-sparkle"></i>
            </div>
            <span class="menu-panel__action-circle-label">Galaxy AI</span>
          </div>
          <div class="menu-panel__action-circle">
            <div class="menu-panel__action-circle-icon">
              <i class="ph-bold ph-plus-circle"></i>
            </div>
            <span class="menu-panel__action-circle-label">Add page to</span>
          </div>
          <div class="menu-panel__action-circle">
            <div class="menu-panel__action-circle-icon">
              <i class="ph-bold ph-gear"></i>
            </div>
            <span class="menu-panel__action-circle-label">Settings</span>
          </div>
        </div>

        <!-- Grid Actions -->
        <div class="menu-panel__grid">
          <div class="menu-panel__action-circle">
            <div class="menu-panel__action-circle-icon" style="background: transparent;">
              <i class="ph-bold ph-desktop"></i>
            </div>
            <span class="menu-panel__action-circle-label">Desktop site</span>
          </div>
          <div class="menu-panel__action-circle">
            <div class="menu-panel__action-circle-icon" style="background: transparent;">
              <i class="ph-bold ph-puzzle-piece"></i>
            </div>
            <span class="menu-panel__action-circle-label">Add-ons</span>
          </div>
          <div class="menu-panel__action-circle">
            <div class="menu-panel__action-circle-icon" style="background: transparent;">
              <i class="ph-bold ph-prohibit"></i>
            </div>
            <span class="menu-panel__action-circle-label">Ad blockers</span>
          </div>
          <div class="menu-panel__action-circle">
            <div class="menu-panel__action-circle-icon" style="background: transparent;">
              <i class="ph-bold ph-shield-check"></i>
            </div>
            <span class="menu-panel__action-circle-label">Privacy</span>
          </div>

          <div class="menu-panel__action-circle">
            <div class="menu-panel__action-circle-icon" style="background: transparent;">
              <i class="ph-bold ph-sun"></i>
            </div>
            <span class="menu-panel__action-circle-label">Light theme</span>
          </div>
          <div class="menu-panel__action-circle">
            <div class="menu-panel__action-circle-icon" style="background: transparent;">
              <i class="ph-bold ph-magnifying-glass"></i>
            </div>
            <span class="menu-panel__action-circle-label">Find on page</span>
          </div>
          <div class="menu-panel__action-circle">
            <div class="menu-panel__action-circle-icon" style="background: transparent;">
              <i class="ph-bold ph-text-t"></i>
            </div>
            <span class="menu-panel__action-circle-label">Text size</span>
          </div>
          <div class="menu-panel__action-circle">
            <div class="menu-panel__action-circle-icon" style="background: transparent;">
              <i class="ph-bold ph-printer"></i>
            </div>
            <span class="menu-panel__action-circle-label">Print to PDF</span>
          </div>
        </div>

        <!-- Pagination -->
        <div class="menu-panel__pagination">
          <div class="menu-panel__pagination-dot menu-panel__pagination-dot--active"></div>
          <div class="menu-panel__pagination-dot"></div>
        </div>
      </div>
    </div>

    <!-- Pop-out Action Menu -->
    <div style="width: 100%; max-width: 360px;">
      <div class="menu-panel">
        <!-- Grid Actions -->
        <div class="menu-panel__grid">
          <div class="menu-panel__action-circle">
            <div class="menu-panel__action-circle-icon">
              <i class="ph-bold ph-film-strip"></i>
            </div>
            <span class="menu-panel__action-circle-label">Videos</span>
          </div>
          <div class="menu-panel__action-circle">
            <div class="menu-panel__action-circle-icon">
              <i class="ph-bold ph-heart"></i>
            </div>
            <span class="menu-panel__action-circle-label">Favorites</span>
          </div>
          <div class="menu-panel__action-circle">
            <div class="menu-panel__action-circle-icon">
              <i class="ph-bold ph-clock"></i>
            </div>
            <span class="menu-panel__action-circle-label">Recent</span>
          </div>
          <div class="menu-panel__action-circle">
            <div class="menu-panel__action-circle-icon">
              <i class="ph-bold ph-map-pin"></i>
            </div>
            <span class="menu-panel__action-circle-label">Locations</span>
          </div>
        </div>

        <!-- Pill Actions -->
        <div class="menu-panel__grid menu-panel__grid--2-col">
          <div class="menu-panel__action-pill">
            <i class="ph-bold ph-users" style="font-size: 18px;"></i>
            Shared albums
          </div>
          <div class="menu-panel__action-pill">
            <i class="ph-bold ph-broom" style="font-size: 18px;"></i>
            Clean out
          </div>
          <div class="menu-panel__action-pill">
            <i class="ph-bold ph-trash" style="font-size: 18px;"></i>
            Trash
          </div>
          <div class="menu-panel__action-pill">
            <i class="ph-bold ph-gear" style="font-size: 18px;"></i>
            Settings
          </div>
        </div>

        <!-- Large Pill Action -->
        <div class="menu-panel__action-pill menu-panel__action-pill--large">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div
              style="width: 24px; height: 24px; background: #999; border-radius: 6px; display: flex; align-items: center; justify-content: center;">
              <i class="ph-bold ph-image" style="color: white; font-size: 16px;"></i>
            </div>
            Go to Studio
          </div>
          <i class="ph-bold ph-caret-right" style="font-size: 20px;"></i>
        </div>
      </div>
    </div>

  </div>
</section>
`

// Add code collapse
const mainSection = section.querySelector('.section')
if (mainSection) {
const codeExample = `<div class="menu-panel">
  <div class="menu-panel__header">
    <h3>Internet</h3>
  </div>
  <div class="menu-panel__actions-grid">
    <button class="menu-panel__action-circle">
      <div class="menu-panel__action-circle-icon">
        <i class="ph-bold ph-wifi"></i>
      </div>
      <span class="menu-panel__action-label">Wi-Fi</span>
    </button>
  </div>
</div>`
mainSection.appendChild(createCodeCollapse('View Code', codeExample))
}

container.appendChild(section)
}