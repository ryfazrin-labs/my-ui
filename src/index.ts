// Styles
import './main.scss'

// Component helpers & types
export { createCodeCollapse } from './components/code-collapse'
export { createSidebar, createSidebarToggle } from './components/sidebar'
export type { SidebarItem } from './components/sidebar'

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
