/**
 * slider.ts
 * 
 * Samsung One UI 7 Slider Interactive Controller
 * Dynamically computes slider track fill percentage (--slider-fill)
 * and reacts to value changes (mouse & touch drag, keyboard arrow keys),
 * including updating audio/brightness icon feedback.
 */

/**
 * Sets up dynamic fill and icon responsiveness for a single range slider.
 */
export function setupSlider(slider: HTMLInputElement): void {
  const updateFill = () => {
    const min = parseFloat(slider.min) || 0
    const max = parseFloat(slider.max) || 100
    const val = parseFloat(slider.value) || 0
    const percent = max > min ? Math.max(0, Math.min(100, ((val - min) / (max - min)) * 100)) : 0

    slider.style.setProperty('--slider-fill', `${percent}%`)

    // Update speaker/volume icon if present in parent container
    const container = slider.closest('.slider-container')
    if (container) {
      const iconContainer = container.querySelector<HTMLElement>('.slider-icon')
      const icon = iconContainer?.querySelector<HTMLElement>('i[class*="ph-speaker"]')

      if (iconContainer) {
        if (val > 0) {
          iconContainer.classList.add('slider-icon--active')
        } else {
          iconContainer.classList.remove('slider-icon--active')
        }
      }

      if (icon) {
        // Remove existing speaker icon classes
        icon.classList.remove('ph-speaker-none', 'ph-speaker-low', 'ph-speaker-high')

        if (val === 0) {
          icon.classList.add('ph-speaker-none')
        } else if (val < 50) {
          icon.classList.add('ph-speaker-low')
        } else {
          icon.classList.add('ph-speaker-high')
        }
      }
    }
  }

  // Initial update
  updateFill()

  // Event listeners for dragging, clicks, and keyboard inputs
  slider.addEventListener('input', updateFill)
  slider.addEventListener('change', updateFill)
}

/**
 * Initializes all sliders found within a given container or document.
 */
export function initSliders(container: HTMLElement | Document = document): void {
  const sliders = container.querySelectorAll<HTMLInputElement>('input[type="range"].slider')
  sliders.forEach(setupSlider)
}
