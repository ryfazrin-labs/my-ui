import { createCodeCollapse } from '../components/code-collapse'

export function renderButtonExamples(container: HTMLElement) {
  const buttonSection = document.createElement('div')
  buttonSection.innerHTML = `
    <section class="section">
      <h2>Buttons</h2>
      <div class="button-container">
        <button type="button" class="button button--primary">
          <span class="button-icon"><i class="ph-bold ph-star"></i></span>
          Primary Button
        </button>

        <button type="button" class="button button--light">
          <span class="button-icon"><i class="ph-bold ph-star"></i></span>
          Light Button
        </button>

        <button type="button" class="button button--dark">
          <span class="button-icon"><i class="ph-bold ph-star"></i></span>
          Dark Button
        </button>

        <button type="button" class="button button--gradient">
          <span class="button-icon"><i class="ph-bold ph-star"></i></span>
          Gradient Button
        </button>
      </div>
    </section>
  `

  // Add code collapse for buttons
  const section = buttonSection.querySelector('.section')
  if (section) {
    const codeExample = `<button type="button" class="button button--primary">
  <span class="button-icon"><i class="ph-bold ph-star"></i></span>
  Primary Button
</button>

<button type="button" class="button button--light">
  <span class="button-icon"><i class="ph-bold ph-star"></i></span>
  Light Button
</button>

<button type="button" class="button button--gradient">
  <span class="button-icon"><i class="ph-bold ph-star"></i></span>
  Gradient Button
</button>`

    const codeBlock = createCodeCollapse('View Code', codeExample)
    section.appendChild(codeBlock)
  }

  container.appendChild(buttonSection)
}
