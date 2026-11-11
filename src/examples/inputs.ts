import { createCodeCollapse } from '../components/code-collapse'

export function renderInputExamples(container: HTMLElement) {
  const inputSection = document.createElement('div')
  inputSection.innerHTML = `
    <section class="section">
      <h2>Inputs</h2>
      <div class="input-container">
        <!-- Default Search Input -->
        <div class="form-group">
          <label class="input-label">Search</label>
          <div class="input-field input-field--light">
            <input type="text" class="input-field__input" placeholder="What are you looking for?">
            <span class="input-field__icon">
              <i class="ph-bold ph-magnifying-glass"></i>
            </span>
          </div>
        </div>

        <!-- Required Input -->
        <div class="form-group">
          <label class="input-label is-required">Search with required</label>
          <div class="input-field input-field--light">
            <input type="text" class="input-field__input" placeholder="What are you looking for?" required>
            <span class="input-field__icon">
              <i class="ph-bold ph-magnifying-glass"></i>
            </span>
          </div>
        </div>

        <!-- Input with Error -->
        <div class="form-group">
          <label class="input-label has-error">Search with error</label>
          <div class="input-field input-field--gradient">
            <input type="text" class="input-field__input" placeholder="What are you looking for?">
            <span class="input-field__icon">
              <i class="ph-bold ph-magnifying-glass"></i>
            </span>
          </div>
        </div>

        <!-- Gradient Accent Input -->
        <div class="form-group">
          <label class="input-label">Search with gradient</label>
          <div class="input-field input-field--gradient-light">
            <input type="text" class="input-field__input" placeholder="What are you looking for?">
            <span class="input-field__icon">
              <i class="ph-bold ph-magnifying-glass"></i>
            </span>
          </div>
        </div>
      </div>
    </section>
  `

  // Add code collapse
  const section = inputSection.querySelector('.section')
  if (section) {
    const codeExample = `<div class="form-group">
  <label class="input-label">Search</label>
  <div class="input-field input-field--light">
    <input type="text" class="input-field__input" placeholder="What are you looking for?">
    <span class="input-field__icon">
      <i class="ph-bold ph-magnifying-glass"></i>
    </span>
  </div>
</div>`
    section.appendChild(createCodeCollapse('View Code', codeExample))
  }

  container.appendChild(inputSection)
}
