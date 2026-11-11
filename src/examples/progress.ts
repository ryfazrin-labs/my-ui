import { createCodeCollapse } from '../components/code-collapse';
import { initSpinners } from '../components/spinner';

export function renderProgressExamples(container: HTMLElement) {
  const progressSection = document.createElement('div');
  progressSection.innerHTML = `
    <section class="section">
      <h2>Progress Indicators</h2>
      <p style="margin-bottom: 24px; color: var(--oui-color-text-secondary); font-size: 14px;">
        Linear progress indicators and the signature Samsung Galaxy 4-dot orbital loading animation.
      </p>

      <div style="display: flex; flex-direction: column; gap: 32px; max-width: 560px;">
        <!-- Determinate Progress Bars -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <h3 style="font-size: 16px; margin: 0; font-weight: 600;">Determinate Linear Bars</h3>
          
          <div class="progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar__header">
              <span class="progress-bar__label">Downloading update</span>
              <span class="progress-bar__value">25%</span>
            </div>
            <div class="progress-bar__track">
              <div class="progress-bar__fill" style="width: 25%;"></div>
            </div>
          </div>

          <div class="progress-bar" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar__header">
              <span class="progress-bar__label">Device storage used</span>
              <span class="progress-bar__value">65%</span>
            </div>
            <div class="progress-bar__track">
              <div class="progress-bar__fill" style="width: 65%;"></div>
            </div>
          </div>

          <div class="progress-bar progress-bar--lg" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar__header">
              <span class="progress-bar__label">Backup complete</span>
              <span class="progress-bar__value">100%</span>
            </div>
            <div class="progress-bar__track">
              <div class="progress-bar__fill" style="width: 100%;"></div>
            </div>
          </div>
        </div>

        <!-- Indeterminate Linear Bar -->
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <h3 style="font-size: 16px; margin: 0; font-weight: 600;">Indeterminate (Loading)</h3>
          <div class="progress-bar progress-bar--indeterminate" role="progressbar" aria-label="Loading content">
            <div class="progress-bar__track">
              <div class="progress-bar__fill"></div>
            </div>
          </div>
        </div>

        <!-- Samsung 4-Dot Orbital Loading Spinners -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <h3 style="font-size: 16px; margin: 0; font-weight: 600;">Samsung Galaxy 4-Dot Loading Spinners</h3>
          <p style="margin: 0; color: var(--oui-color-text-secondary); font-size: 13px;">
            Dynamic orbital dots blooming outward and contracting together into the center.
          </p>

          <div style="display: flex; align-items: center; gap: 36px; padding: 20px 0;">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
              <div class="spinner spinner--sm">
                <span class="spinner__dot"></span>
                <span class="spinner__dot"></span>
                <span class="spinner__dot"></span>
                <span class="spinner__dot"></span>
              </div>
              <span style="font-size: 12px; color: var(--oui-color-text-secondary);">Small (24px)</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
              <div class="spinner">
                <span class="spinner__dot"></span>
                <span class="spinner__dot"></span>
                <span class="spinner__dot"></span>
                <span class="spinner__dot"></span>
              </div>
              <span style="font-size: 12px; color: var(--oui-color-text-secondary);">Medium (40px)</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
              <div class="spinner spinner--lg">
                <span class="spinner__dot"></span>
                <span class="spinner__dot"></span>
                <span class="spinner__dot"></span>
                <span class="spinner__dot"></span>
              </div>
              <span style="font-size: 12px; color: var(--oui-color-text-secondary);">Large (56px)</span>
            </div>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
              <div class="spinner spinner--monochrome">
                <span class="spinner__dot"></span>
                <span class="spinner__dot"></span>
                <span class="spinner__dot"></span>
                <span class="spinner__dot"></span>
              </div>
              <span style="font-size: 12px; color: var(--oui-color-text-secondary);">Monochrome</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // Initialize any spinners in section
  initSpinners(progressSection);

  const section = progressSection.querySelector('.section');
  if (section) {
    const codeExample = `<!-- 1. Samsung Galaxy 4-Dot Orbital Spinner (HTML) -->
<div class="spinner" role="status" aria-label="Loading">
  <span class="spinner__dot"></span>
  <span class="spinner__dot"></span>
  <span class="spinner__dot"></span>
  <span class="spinner__dot"></span>
</div>

<!-- 2. Sizes & Monochrome Variant -->
<div class="spinner spinner--sm">...</div>
<div class="spinner spinner--lg">...</div>
<div class="spinner spinner--monochrome">...</div>

<!-- 3. Programmatic Usage (TypeScript / JavaScript) -->
import { createSpinner } from 'my-ui';

const spinner = createSpinner({ size: 'md', monochrome: false });
document.body.appendChild(spinner);`;

    const codeBlock = createCodeCollapse('View Code', codeExample);
    section.appendChild(codeBlock);
  }

  container.appendChild(progressSection);
}
