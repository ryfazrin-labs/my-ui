// Styles
import './main.scss'

// Component helpers & types
export { createCodeCollapse } from './components/code-collapse'
export { createSidebar, createSidebarToggle } from './components/sidebar'
export type { SidebarItem } from './components/sidebar'
export { setupSlider, initSliders } from './components/slider'
export { setupSegmentedControl, initSegmentedControls } from './components/segmented'
export type { SegmentedControlOptions, SegmentedChangeEvent } from './components/segmented'
export { showToast } from './components/toast'
export type { ToastOptions, ToastAction } from './components/toast'
export { createSpinner, initSpinners } from './components/spinner'
export type { SpinnerOptions } from './components/spinner'

// Theme utilities & types
export {
  initTheme,
  applyTheme,
  toggleTheme,
  getPreferredTheme,
  getCurrentTheme,
  createThemeToggle
} from './components/theme'
export type { Theme } from './components/theme'
