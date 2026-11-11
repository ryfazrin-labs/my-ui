import { createCodeCollapse } from '../components/code-collapse'

export function renderCardExamples(container: HTMLElement) {
  const section = document.createElement('div')
  section.innerHTML = `
    <section class="section">
      <h2>Cards</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
        
        <!-- Basic Card -->
        <div class="card">
          <div class="card__header">
            <h3 class="card__title">Basic Card</h3>
            <span style="color: var(--oui-color-secondary, #999);">More</span>
          </div>
          <div class="card__body">
            <p>This is a standard card container with elevation. It uses the default rounded corners and padding defined in the design system.</p>
          </div>
          <div class="card__footer">
            <button class="button button--light" style="height: 40px; padding: 0 16px; font-size: 14px;">Cancel</button>
            <button class="button button--primary" style="height: 40px; padding: 0 16px; font-size: 14px;">Action</button>
          </div>
        </div>

        <!-- Flat Card -->
        <div class="card card--flat">
          <div class="card__header">
            <h3 class="card__title">Flat Card</h3>
          </div>
          <div class="card__body">
            <p>A flat card variant with a subtle border instead of a shadow. Useful for secondary content or grouped items.</p>
          </div>
        </div>

        <!-- Glass Card (needs background to see effect) -->
        <div style="background: linear-gradient(135deg, #66A1F3 0%, #22C9A6 100%); padding: 40px; border-radius: 24px;">
          <div class="card card--glass">
            <div class="card__header">
              <h3 class="card__title">Glassmorphism</h3>
            </div>
            <div class="card__body">
              <p>This card uses backdrop-filter to create a frosted glass effect. Perfect for overlays or premium content areas.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  `

  // Add code collapse
  const mainSection = section.querySelector('.section')
  if (mainSection) {
    const codeExample = `<div class="card">
  <div class="card__header">
    <h3 class="card__title">Basic Card</h3>
  </div>
  <div class="card__body">
    <p>Card content goes here.</p>
  </div>
  <div class="card__footer">
    <button class="button button--primary">Action</button>
  </div>
</div>`
    mainSection.appendChild(createCodeCollapse('View Code', codeExample))
  }

  container.appendChild(section)
}
