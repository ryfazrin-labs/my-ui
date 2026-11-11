import { createCodeCollapse } from '../components/code-collapse'

export function renderSwitchExamples(container: HTMLElement) {
  const section = document.createElement('div')
  section.innerHTML = `
    <section class="section">
      <h2>Switches</h2>
      <div class="switch-container">
        <!-- Default Switch -->
        <label class="switch">
          <input type="checkbox" class="switch__input">
          <span class="switch__track">
            <span class="switch__thumb"></span>
          </span>
          <span class="switch__label">Default Switch</span>
        </label>

        <!-- Checked Switch -->
        <label class="switch">
          <input type="checkbox" class="switch__input" checked>
          <span class="switch__track">
            <span class="switch__thumb"></span>
          </span>
          <span class="switch__label">Checked Switch</span>
        </label>

        <!-- Disabled Switch -->
        <label class="switch">
          <input type="checkbox" class="switch__input" disabled>
          <span class="switch__track">
            <span class="switch__thumb"></span>
          </span>
          <span class="switch__label">Disabled Switch</span>
        </label>

        <!-- Disabled Checked Switch -->
        <label class="switch">
          <input type="checkbox" class="switch__input" disabled checked>
          <span class="switch__track">
            <span class="switch__thumb"></span>
          </span>
          <span class="switch__label">Disabled Checked Switch</span>
        </label>

        <!-- Switch with Description -->
        <label class="switch">
          <input type="checkbox" class="switch__input">
          <span class="switch__track">
            <span class="switch__thumb"></span>
          </span>
          <div>
            <span class="switch__label">Switch with Description</span>
            <div class="switch__description">Additional information about this switch option</div>
          </div>
        </label>
      </div>
    </section>
  `

  // Add code collapse
  const mainSection = section.querySelector('.section')
  if (mainSection) {
    const codeExample = `<label class="switch">
  <input type="checkbox" class="switch__input" checked>
  <span class="switch__track">
    <span class="switch__thumb"></span>
  </span>
  <span class="switch__label">Checked Switch</span>
</label>`
    mainSection.appendChild(createCodeCollapse('View Code', codeExample))
  }

  container.appendChild(section)
}
