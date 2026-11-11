import 'normalize.css'
import './main.scss'
import { initTheme } from './components/theme'
import { renderComponentExamples } from './examples/components'
import { createSidebar, createSidebarToggle } from './components/sidebar'

// Initialize One UI theme (persisted via localStorage or OS preference)
initTheme()

// Import Phosphor Icons from CDN
const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = 'https://unpkg.com/@phosphor-icons/web@2.1.1/src/bold/style.css'
document.head.appendChild(link)

// Define sidebar navigation items
const sidebarItems = [
  { id: 'switches', label: 'Switches', icon: 'ph-toggle-right' },
  { id: 'inputs', label: 'Inputs', icon: 'ph-text-aa' },
  { id: 'buttons', label: 'Buttons', icon: 'ph-cursor-click' },
  { id: 'cards', label: 'Cards', icon: 'ph-cards' },
  { id: 'lists', label: 'Lists', icon: 'ph-list-bullets' },
  { id: 'navigation', label: 'Navigation', icon: 'ph-compass' },
  { id: 'sliders', label: 'Sliders', icon: 'ph-sliders' },
  { id: 'selection', label: 'Selection Controls', icon: 'ph-check-square' },
  { id: 'dialogs', label: 'Dialogs', icon: 'ph-chat-circle' },
  { id: 'menus', label: 'Menus', icon: 'ph-dots-three' },
]

// Render component examples
const app = document.querySelector<HTMLDivElement>('#app')
if (app) {
  // Create sidebar
  const sidebar = createSidebar(sidebarItems)
  document.body.insertBefore(sidebar, app)

  // Create mobile toggle
  const toggle = createSidebarToggle()
  document.body.insertBefore(toggle, app)

  // Wrap app content in main-content
  app.className = 'main-content'

  renderComponentExamples(app)
}
