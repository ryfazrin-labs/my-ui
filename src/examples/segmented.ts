import { createCodeCollapse } from '../components/code-collapse'
import { initSegmentedControls } from '../components/segmented'

export function renderSegmentedExamples(container: HTMLElement) {
  const section = document.createElement('div')
  section.innerHTML = `
    <section class="section">
      <h2>Segmented Control (Pill Tabs)</h2>
      
      <div class="card" style="padding: 24px;">
        <div style="display: flex; flex-direction: column; gap: 32px;">
          
          <!-- Standard Time Filter -->
          <div>
            <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: var(--oui-color-secondary, #999);">Standard Pill Tabs</h4>
            <div class="segmented-control" id="time-segmented">
              <button type="button" class="segmented-control__item segmented-control__item--active" data-value="day">Day</button>
              <button type="button" class="segmented-control__item" data-value="week">Week</button>
              <button type="button" class="segmented-control__item" data-value="month">Month</button>
              <button type="button" class="segmented-control__item" data-value="year">Year</button>
            </div>
          </div>

          <!-- Camera Modes with Icons -->
          <div>
            <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: var(--oui-color-secondary, #999);">Tabs with Icons (Camera Modes)</h4>
            <div class="segmented-control">
              <button type="button" class="segmented-control__item segmented-control__item--active">
                <i class="ph-bold ph-camera"></i>
                <span>Photo</span>
              </button>
              <button type="button" class="segmented-control__item">
                <i class="ph-bold ph-video-camera"></i>
                <span>Video</span>
              </button>
              <button type="button" class="segmented-control__item">
                <i class="ph-bold ph-user-focus"></i>
                <span>Portrait</span>
              </button>
              <button type="button" class="segmented-control__item">
                <i class="ph-bold ph-moon"></i>
                <span>Night</span>
              </button>
            </div>
          </div>

          <!-- Full Width Segmented Control with Live Feedback -->
          <div>
            <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: var(--oui-color-secondary, #999);">Full Width Segmented Bar</h4>
            <div class="segmented-control segmented-control--full-width" id="display-segmented">
              <button type="button" class="segmented-control__item segmented-control__item--active" data-value="Grid View">
                <i class="ph-bold ph-squares-four"></i>
                <span>Grid</span>
              </button>
              <button type="button" class="segmented-control__item" data-value="List View">
                <i class="ph-bold ph-list"></i>
                <span>List</span>
              </button>
              <button type="button" class="segmented-control__item" data-value="Details View">
                <i class="ph-bold ph-table"></i>
                <span>Details</span>
              </button>
            </div>
            <div id="segmented-feedback" style="margin-top: 14px; font-size: 13px; color: var(--oui-color-secondary, #999);">
              Active: <strong style="color: var(--oui-color-accent, #387AFF);">Grid View</strong>
            </div>
          </div>

        </div>
      </div>
    </section>
  `

  // Add code collapse
  const mainSection = section.querySelector('.section')
  if (mainSection) {
    const codeExample = `<!-- HTML Markup -->
<div class="segmented-control">
  <button type="button" class="segmented-control__item segmented-control__item--active">Day</button>
  <button type="button" class="segmented-control__item">Week</button>
  <button type="button" class="segmented-control__item">Month</button>
</div>

<!-- JavaScript Initialization -->
<script type="module">
  import { initSegmentedControls } from 'my-ui';
  initSegmentedControls();

  // Listen to selection changes
  document.querySelector('.segmented-control').addEventListener('oneui-segmented-change', (e) => {
    console.log('Selected:', e.detail.value);
  });
</script>`
    mainSection.appendChild(createCodeCollapse('View Code', codeExample))
  }

  // Initialize interactive behavior
  initSegmentedControls(section)

  // Feedback hook for full width demo
  const displaySegmented = section.querySelector('#display-segmented')
  const feedback = section.querySelector('#segmented-feedback')
  displaySegmented?.addEventListener('oneui-segmented-change', ((e: CustomEvent<{ value: string }>) => {
    if (feedback) {
      feedback.innerHTML = `Active: <strong style="color: var(--oui-color-accent, #387AFF);">${e.detail.value}</strong>`
    }
  }) as EventListener)

  container.appendChild(section)
}
