/**
 * theme.ts
 * 
 * Samsung One UI 7 Dynamic Theme Controller
 * Supports localStorage persistence, OS preference detection (prefers-color-scheme),
 * and dynamic toggling between Light and Dark mode.
 */

export type Theme = 'light' | 'dark' | 'auto'

const STORAGE_KEY = 'oneui-theme'

/**
 * Returns the preferred theme based on localStorage or system preferences.
 */
export function getPreferredTheme(): 'light' | 'dark' {
  const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
  if (saved === 'light' || saved === 'dark') {
    return saved
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Returns the current active theme on the document root.
 */
export function getCurrentTheme(): 'light' | 'dark' {
  const current = document.documentElement.getAttribute('data-theme')
  if (current === 'dark') return 'dark'
  return 'light'
}

/**
 * Applies the given theme to document.documentElement and updates localStorage.
 */
export function applyTheme(theme: Theme): void {
  const effectiveTheme: 'light' | 'dark' = theme === 'auto'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme

  document.documentElement.setAttribute('data-theme', effectiveTheme)

  if (theme === 'auto') {
    localStorage.removeItem(STORAGE_KEY)
  } else {
    localStorage.setItem(STORAGE_KEY, theme)
  }

  // Dispatch custom event for reactive UI updates
  window.dispatchEvent(new CustomEvent('oneui-theme-changed', { detail: { theme: effectiveTheme } }))
}

/**
 * Toggles between light and dark themes.
 */
export function toggleTheme(): 'light' | 'dark' {
  const next = getCurrentTheme() === 'dark' ? 'light' : 'dark'
  applyTheme(next)
  return next
}

/**
 * Initializes the theme controller on page load.
 * Listens for system color-scheme changes if no explicit user preference is stored.
 */
export function initTheme(): void {
  const initial = getPreferredTheme()
  applyTheme(initial)

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light')
    }
  })
}

/**
 * Creates an interactive One UI theme toggle widget.
 */
export function createThemeToggle(options: { showLabel?: boolean } = {}): HTMLElement {
  const container = document.createElement('div')
  container.className = 'theme-toggle'

  const current = getCurrentTheme()
  const isDark = current === 'dark'

  container.innerHTML = `
    <button type="button" class="theme-toggle__btn" aria-label="Toggle dark mode" title="Toggle dark mode">
      <div class="theme-toggle__icon-wrap">
        <i class="ph-bold ${isDark ? 'ph-moon' : 'ph-sun'}"></i>
      </div>
      ${options.showLabel !== false ? `<span class="theme-toggle__label">${isDark ? 'Dark Mode' : 'Light Mode'}</span>` : ''}
    </button>
  `

  const btn = container.querySelector<HTMLButtonElement>('.theme-toggle__btn')
  const iconWrap = container.querySelector<HTMLElement>('.theme-toggle__icon-wrap')
  const label = container.querySelector<HTMLElement>('.theme-toggle__label')

  btn?.addEventListener('click', () => {
    const nextTheme = toggleTheme()
    const isNowDark = nextTheme === 'dark'

    if (iconWrap) {
      iconWrap.innerHTML = `<i class="ph-bold ${isNowDark ? 'ph-moon' : 'ph-sun'}"></i>`
    }
    if (label && options.showLabel !== false) {
      label.textContent = isNowDark ? 'Dark Mode' : 'Light Mode'
    }
  })

  // Synchronize on external theme changes
  window.addEventListener('oneui-theme-changed', ((e: CustomEvent<{ theme: 'light' | 'dark' }>) => {
    const isNowDark = e.detail.theme === 'dark'
    if (iconWrap) {
      iconWrap.innerHTML = `<i class="ph-bold ${isNowDark ? 'ph-moon' : 'ph-sun'}"></i>`
    }
    if (label && options.showLabel !== false) {
      label.textContent = isNowDark ? 'Dark Mode' : 'Light Mode'
    }
  }) as EventListener)

  return container
}
