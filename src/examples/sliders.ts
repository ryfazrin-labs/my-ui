import { createCodeCollapse } from '../components/code-collapse'

export function renderSliderExamples(container: HTMLElement) {
  const section = document.createElement('div')
  section.innerHTML = `
    <section class="section">
      <h2>Sliders</h2>
      <div class="card" style="padding: 24px;">
        <div style="display: flex; flex-direction: column; gap: 32px;">
          
          <!-- Sliders Row -->
          <div style="display: flex; flex-direction: column; gap: 24px;">
            
            <!-- Slider 1 -->
            <div class="slider-container">
              <div class="slider-icon slider-icon--active">
                <i class="ph-bold ph-speaker-high"></i>
              </div>
              <input type="range" class="slider slider--thick" min="0" max="100" value="100" 
                style="background: linear-gradient(to right, var(--oui-color-accent, #387AFF) 0%, var(--oui-color-accent, #387AFF) 100%, rgba(153, 153, 157, 0.25) 100%, rgba(153, 153, 157, 0.25) 100%);">
            </div>

            <!-- Slider 2 -->
            <div class="slider-container">
              <div class="slider-icon slider-icon--active">
                <i class="ph-bold ph-speaker-high"></i>
              </div>
              <input type="range" class="slider slider--thick" min="0" max="100" value="75" 
                style="background: linear-gradient(to right, var(--oui-color-accent, #387AFF) 0%, var(--oui-color-accent, #387AFF) 75%, rgba(153, 153, 157, 0.25) 75%, rgba(153, 153, 157, 0.25) 100%);">
            </div>

            <!-- Slider 3 -->
            <div class="slider-container">
              <div class="slider-icon slider-icon--active">
                <i class="ph-bold ph-speaker-low"></i>
              </div>
              <input type="range" class="slider slider--thick" min="0" max="100" value="50" 
                style="background: linear-gradient(to right, var(--oui-color-accent, #387AFF) 0%, var(--oui-color-accent, #387AFF) 50%, rgba(153, 153, 157, 0.25) 50%, rgba(153, 153, 157, 0.25) 100%);">
            </div>

            <!-- Slider 4 -->
            <div class="slider-container">
              <div class="slider-icon">
                <i class="ph-bold ph-speaker-low"></i>
              </div>
              <input type="range" class="slider slider--thick" min="0" max="100" value="25" 
                style="background: linear-gradient(to right, var(--oui-color-accent, #387AFF) 0%, var(--oui-color-accent, #387AFF) 25%, rgba(153, 153, 157, 0.25) 25%, rgba(153, 153, 157, 0.25) 100%);">
            </div>

             <!-- Slider 5 -->
            <div class="slider-container">
              <div class="slider-icon">
                <i class="ph-bold ph-speaker-none"></i>
              </div>
              <input type="range" class="slider slider--thick" min="0" max="100" value="0" 
                style="background: linear-gradient(to right, var(--oui-color-accent, #387AFF) 0%, var(--oui-color-accent, #387AFF) 0%, rgba(153, 153, 157, 0.25) 0%, rgba(153, 153, 157, 0.25) 100%);">
            </div>

          </div>

        </div>
      </div>
    </section>
  `

  // Add code collapse
  const mainSection = section.querySelector('.section')
  if (mainSection) {
    const codeExample = `<div class="slider-container">
  <div class="slider-icon slider-icon--active">
    <i class="ph-bold ph-speaker-high"></i>
  </div>
  <input type="range" class="slider slider--thick" min="0" max="100" value="75">
</div>`
    mainSection.appendChild(createCodeCollapse('View Code', codeExample))
  }

  container.appendChild(section)
}
