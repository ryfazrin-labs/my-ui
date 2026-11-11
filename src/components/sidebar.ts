import { createThemeToggle } from './theme'

export interface SidebarItem {
  id: string
  label: string
  icon: string
}

export function createSidebar(items: SidebarItem[]): HTMLElement {
  const sidebar = document.createElement('aside')
  sidebar.className = 'sidebar'
  sidebar.id = 'sidebar'

  sidebar.innerHTML = `
    <div class="sidebar__header">
      <h1 class="sidebar__title">One UI 7</h1>
      <p class="sidebar__subtitle">Component Library</p>
    </div>
    <nav>
      <ul class="sidebar__nav">
        ${items.map(item => `
          <li class="sidebar__item">
            <a href="#${item.id}" class="sidebar__link" data-section="${item.id}">
              <i class="ph-bold ${item.icon}"></i>
              <span>${item.label}</span>
            </a>
          </li>
        `).join('')}
      </ul>
    </nav>
  `

  // Attach theme toggle to sidebar header
  const header = sidebar.querySelector('.sidebar__header')
  if (header) {
    header.appendChild(createThemeToggle({ showLabel: true }))
  }

  // Add click handlers for smooth scrolling
  const links = sidebar.querySelectorAll('.sidebar__link')
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const targetId = link.getAttribute('href')?.substring(1)
      if (targetId) {
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
          updateActiveLink(targetId)
        }
      }
    })
  })

  // Update active link on scroll
  window.addEventListener('scroll', () => {
    const sections = items.map(item => document.getElementById(item.id)).filter(Boolean)
    const scrollPosition = window.scrollY + 100

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i]
      if (section && section.offsetTop <= scrollPosition) {
        updateActiveLink(section.id)
        break
      }
    }
  })

  function updateActiveLink(activeId: string) {
    links.forEach(link => {
      const sectionId = link.getAttribute('data-section')
      if (sectionId === activeId) {
        link.classList.add('sidebar__link--active')
      } else {
        link.classList.remove('sidebar__link--active')
      }
    })
  }

  return sidebar
}

// Mobile toggle button
export function createSidebarToggle(): HTMLElement {
  const toggle = document.createElement('button')
  toggle.className = 'sidebar-toggle'
  toggle.innerHTML = '<i class="ph-bold ph-list"></i>'

  toggle.addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar')
    if (sidebar) {
      sidebar.classList.toggle('sidebar--open')
    }
  })

  return toggle
}
