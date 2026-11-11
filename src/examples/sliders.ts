import { createCodeCollapse } from '../components/code-collapse'
import { initSliders } from '../components/slider'

export function renderSliderExamples(container: HTMLElement) {
  const section = document.createElement('div')
  section.innerHTML = `
    <section class="section">
      <h2>Sliders</h2>
      <div class="card" style="padding: 24px;">
        <div style="display: flex; flex-direction: column; gap: 32px;">
          
          <!-- Sliders Row -->
          <div style="display: flex; flex-direction: column; gap: 24px;">
            
            <!-- Slider 1: 100% -->
            <div class="slider-container">
              <div class="slider-icon slider-icon--active">
                <i class="ph-bold ph-speaker-high"></i>
              </div>
              <input type="range" class="slider slider--thick" min="0" max="100" value="100">
            </div>

            <!-- Slider 2: 75% -->
            <div class="slider-container">
              <div class="slider-icon slider-icon--active">
                <i class="ph-bold ph-speaker-high"></i>
              </div>
              <input type="range" class="slider slider--thick" min="0" max="100" value="75">
            </div>

            <!-- Slider 3: 50% -->
            <div class="slider-container">
              <div class="slider-icon slider-icon--active">
                <i class="ph-bold ph-speaker-high"></i>
              </div>
              <input type="range" class="slider slider--thick" min="0" max="100" value="50">
            </div>

            <!-- Slider 4: 25% -->
            <div class="slider-container">
              <div class="slider-icon slider-icon--active">
                <i class="ph-bold ph-speaker-low"></i>
              </div>
              <input type="range" class="slider slider--thick" min="0" max="100" value="25">
            </div>

            <!-- Slider 5: 0% (Muted) -->
            <div class="slider-container">
              <div class="slider-icon">
                <i class="ph-bold ph-speaker-none"></i>
              </div>
              <input type="range" class="slider slider--thick" min="0" max="100" value="0">
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
</div>

<!-- JavaScript Integration -->
<script type="module">
  import { initSliders } from 'my-ui';
  initSliders();
</script>`
    mainSection.appendChild(createCodeCollapse('View Code', codeExample))
  }

  // Initialize interactive slider controllers for dynamic fill & responsive icons
  initSliders(section)

  container.appendChild(section)
}
