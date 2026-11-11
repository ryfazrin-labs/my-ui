import 'normalize.css'
import './main.scss'
import { initTheme } from './components/theme'
import { renderComponentExamples } from './examples/components'
import { createSidebar, createSidebarToggle } from './components/sidebar'
import type { SidebarCategory } from './components/sidebar'

// Initialize One UI theme (persisted via localStorage or OS preference)
initTheme()

// Import Phosphor Icons from CDN
const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = 'https://unpkg.com/@phosphor-icons/web@2.1.1/src/bold/style.css'
document.head.appendChild(link)

// Define categorized sidebar navigation items
const sidebarCategories: SidebarCategory[] = [
  {
    items: [
      { id: 'getting-started', label: 'Getting Started', icon: 'ph-rocket-launch' }
    ]
  },
  {
    title: 'Form & Controls',
    items: [
      { id: 'buttons', label: 'Buttons', icon: 'ph-cursor-click' },
      { id: 'inputs', label: 'Inputs', icon: 'ph-text-aa' },
      { id: 'switches', label: 'Switches', icon: 'ph-toggle-right' },
      { id: 'selection', label: 'Selection Controls', icon: 'ph-check-square' },
      { id: 'sliders', label: 'Sliders', icon: 'ph-sliders' },
    ]
  },
  {
    title: 'Navigation & Structure',
    items: [
      { id: 'navigation', label: 'Navigation', icon: 'ph-compass' },
      { id: 'segmented', label: 'Segmented Control', icon: 'ph-tabs' },
      { id: 'cards', label: 'Cards', icon: 'ph-cards' },
      { id: 'lists', label: 'Lists', icon: 'ph-list-bullets' },
    ]
  },
  {
    title: 'Feedback & Status',
    items: [
      { id: 'progress', label: 'Progress Indicators', icon: 'ph-circle-notch' },
      { id: 'toasts', label: 'Toasts', icon: 'ph-bell-ringing' },
      { id: 'chips', label: 'Chips & Badges', icon: 'ph-tag' },
    ]
  },
  {
    title: 'Overlays & Popups',
    items: [
      { id: 'dialogs', label: 'Dialogs', icon: 'ph-chat-circle' },
      { id: 'menus', label: 'Menus', icon: 'ph-dots-three' },
    ]
  }
]

// Render component examples
const app = document.querySelector<HTMLDivElement>('#app')
if (app) {
  // Create sidebar, backdrop, and back-to-top button
  const { sidebar, backdrop, backToTop } = createSidebar(sidebarCategories)
  document.body.insertBefore(sidebar, app)
  document.body.insertBefore(backdrop, app)
  document.body.appendChild(backToTop)

  // Create mobile toggle
  const toggle = createSidebarToggle()
  document.body.insertBefore(toggle, app)

  // Wrap app content in main-content
  app.className = 'main-content'

  renderComponentExamples(app)
}
