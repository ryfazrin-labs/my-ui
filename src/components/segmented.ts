/**
 * segmented.ts
 * 
 * Samsung One UI 7 Segmented Control / Pill Tabs Controller
 * Manages active pill states, keyboard navigation (ArrowLeft/ArrowRight),
 * and ARIA role="tab" accessibility.
 */

export interface SegmentedChangeEvent {
  index: number;
  value: string;
  target: HTMLButtonElement;
}

export interface SegmentedControlOptions {
  onChange?: (event: SegmentedChangeEvent) => void;
}

export function setupSegmentedControl(control: HTMLElement, options?: SegmentedControlOptions): void {
  const items = Array.from(control.querySelectorAll<HTMLButtonElement>('.segmented-control__item'))
  if (items.length === 0) return

  // Set ARIA tablist semantics if not present
  if (!control.getAttribute('role')) control.setAttribute('role', 'tablist')

  const setActive = (target: HTMLButtonElement, shouldFocus = false) => {
    if (target.disabled) return

    const index = items.indexOf(target)
    const value = target.getAttribute('data-value') || target.textContent?.trim() || `${index}`

    items.forEach((item) => {
      const isCurrent = item === target
      item.classList.toggle('segmented-control__item--active', isCurrent)
      item.setAttribute('aria-selected', isCurrent ? 'true' : 'false')
      item.setAttribute('tabindex', isCurrent ? '0' : '-1')
    })

    if (shouldFocus) target.focus()

    const detail: SegmentedChangeEvent = { index, value, target }
    control.dispatchEvent(new CustomEvent('oneui-segmented-change', {
      bubbles: true,
      detail
    }))

    if (options?.onChange) {
      options.onChange(detail)
    }
  }

  // Ensure initial tabindex & aria
  let activeItem = items.find(item => item.classList.contains('segmented-control__item--active'))
  if (!activeItem) {
    activeItem = items[0]
    activeItem.classList.add('segmented-control__item--active')
  }
  items.forEach(item => {
    item.setAttribute('role', 'tab')
    const isActive = item === activeItem
    item.setAttribute('aria-selected', isActive ? 'true' : 'false')
    item.setAttribute('tabindex', isActive ? '0' : '-1')
  })

  // Click & Keydown listeners
  items.forEach(item => {
    item.addEventListener('click', () => setActive(item))

    item.addEventListener('keydown', (e) => {
      const enabledItems = items.filter(i => !i.disabled)
      const currentIndex = enabledItems.indexOf(item)

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        const nextIndex = (currentIndex + 1) % enabledItems.length
        setActive(enabledItems[nextIndex], true)
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        const prevIndex = (currentIndex - 1 + enabledItems.length) % enabledItems.length
        setActive(enabledItems[prevIndex], true)
      } else if (e.key === 'Home') {
        e.preventDefault()
        setActive(enabledItems[0], true)
      } else if (e.key === 'End') {
        e.preventDefault()
        setActive(enabledItems[enabledItems.length - 1], true)
      }
    })
  })
}

export function initSegmentedControls(container: HTMLElement | Document = document): void {
  const controls = container.querySelectorAll<HTMLElement>('.segmented-control')
  controls.forEach((control) => setupSegmentedControl(control))
}
