import { createCodeCollapse } from '../components/code-collapse'

export function renderSelectionControlExamples(container: HTMLElement) {
  const section = document.createElement('div')
  section.innerHTML = `
    <section class="section">
      <h2>Selection Controls</h2>
      
      <div class="card" style="padding: 24px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 32px;">
          
          <!-- Checkboxes Column -->
          <div>
            <h4 style="margin-bottom: 16px; font-size: 14px; font-weight: 600; color: var(--oui-color-secondary, #999);">Checkboxes</h4>
            <div style="display: flex; flex-direction: column; gap: 14px;">
              <label class="control-label">
                <span class="checkbox">
                  <input type="checkbox" class="checkbox__input" checked>
                  <span class="checkbox__indicator"></span>
                </span>
                <span>Selected Option</span>
              </label>
              
              <label class="control-label">
                <span class="checkbox">
                  <input type="checkbox" class="checkbox__input">
                  <span class="checkbox__indicator"></span>
                </span>
                <span>Unselected Option</span>
              </label>

              <label class="control-label control-label--disabled">
                <span class="checkbox">
                  <input type="checkbox" class="checkbox__input" checked disabled>
                  <span class="checkbox__indicator"></span>
                </span>
                <span>Disabled Selected</span>
              </label>

              <label class="control-label control-label--disabled">
                <span class="checkbox">
                  <input type="checkbox" class="checkbox__input" disabled>
                  <span class="checkbox__indicator"></span>
                </span>
                <span>Disabled Unselected</span>
              </label>
            </div>
          </div>

          <!-- Radio Buttons Column -->
          <div>
            <h4 style="margin-bottom: 16px; font-size: 14px; font-weight: 600; color: var(--oui-color-secondary, #999);">Radio Buttons</h4>
            <div style="display: flex; flex-direction: column; gap: 14px;">
              <label class="control-label">
                <span class="radio">
                  <input type="radio" name="radio-demo" class="radio__input" checked>
                  <span class="radio__indicator"></span>
                </span>
                <span>Option 1</span>
              </label>
              
              <label class="control-label">
                <span class="radio">
                  <input type="radio" name="radio-demo" class="radio__input">
                  <span class="radio__indicator"></span>
                </span>
                <span>Option 2</span>
              </label>

              <label class="control-label">
                <span class="radio">
                  <input type="radio" name="radio-demo" class="radio__input">
                  <span class="radio__indicator"></span>
                </span>
                <span>Option 3</span>
              </label>

              <label class="control-label control-label--disabled">
                <span class="radio">
                  <input type="radio" name="radio-demo-disabled" class="radio__input" disabled>
                  <span class="radio__indicator"></span>
                </span>
                <span>Disabled Option</span>
              </label>
            </div>
          </div>

        </div>
      </div>
    </section>
  `

  // Add code collapse
  const mainSection = section.querySelector('.section')
  if (mainSection) {
    const codeExample = `<!-- Checkbox -->
<label class="control-label">
  <span class="checkbox">
    <input type="checkbox" class="checkbox__input" checked>
    <span class="checkbox__indicator"></span>
  </span>
  <span>Selected Option</span>
</label>

<!-- Radio Button -->
<label class="control-label">
  <span class="radio">
    <input type="radio" name="example-group" class="radio__input" checked>
    <span class="radio__indicator"></span>
  </span>
  <span>Option 1</span>
</label>`
    mainSection.appendChild(createCodeCollapse('View Code', codeExample))
  }

  container.appendChild(section)
}
