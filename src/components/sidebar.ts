import { createThemeToggle } from './theme'

export interface SidebarItem {
  id: string
  label: string
  icon: string
  badge?: string
}

export interface SidebarCategory {
  title?: string
  items: SidebarItem[]
}

export function createSidebar(categories: SidebarCategory[]): {
  sidebar: HTMLElement
  backdrop: HTMLElement
  backToTop: HTMLElement
} {
  const sidebar = document.createElement('aside')
  sidebar.className = 'sidebar'
  sidebar.id = 'sidebar'

  // Backdrop for mobile navigation
  const backdrop = document.createElement('div')
  backdrop.className = 'sidebar-backdrop'
  backdrop.id = 'sidebar-backdrop'

  sidebar.innerHTML = `
    <div class="sidebar__header">
      <div class="sidebar__brand">
        <h1 class="sidebar__title">my-oneui</h1>
        <span class="badge badge--success" style="font-size: 10px; padding: 2px 6px;">v0.1.0</span>
      </div>
      <p class="sidebar__subtitle">Samsung One UI 7 Design System</p>
      
      <!-- Real-time Component Search -->
      <div class="sidebar__search">
        <i class="ph-bold ph-magnifying-glass sidebar__search-icon"></i>
        <input 
          type="text" 
          class="sidebar__search-input" 
          placeholder="Search components..." 
          aria-label="Search components"
          id="sidebar-search-input"
        />
        <kbd class="sidebar__search-kbd" title="Press / to search">/</kbd>
      </div>
    </div>

    <nav class="sidebar__nav-wrapper">
      <div class="sidebar__categories" id="sidebar-categories">
        ${categories.map(category => `
          <div class="sidebar__category">
            ${category.title ? `<div class="sidebar__category-title">${category.title}</div>` : ''}
            <ul class="sidebar__nav">
              ${category.items.map(item => `
                <li class="sidebar__item" data-id="${item.id}" data-label="${item.label.toLowerCase()}">
                  <a href="#${item.id}" class="sidebar__link" data-section="${item.id}">
                    <i class="ph-bold ${item.icon}"></i>
                    <span class="sidebar__link-text">${item.label}</span>
                    ${item.badge ? `<span class="badge badge--primary sidebar__link-badge">${item.badge}</span>` : ''}
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
      <div class="sidebar__empty" id="sidebar-empty" style="display: none;">
        <i class="ph-bold ph-magnifying-glass"></i>
        <span>No matching components</span>
      </div>
    </nav>
  `

  // Attach theme toggle to sidebar header
  const header = sidebar.querySelector('.sidebar__header')
  if (header) {
    header.appendChild(createThemeToggle({ showLabel: true }))
  }

  // Smooth scrolling & mobile auto-close on navigation
  const links = sidebar.querySelectorAll<HTMLAnchorElement>('.sidebar__link')
  const allItems = categories.flatMap(c => c.items)

  const closeSidebar = () => {
    sidebar.classList.remove('sidebar--open')
    backdrop.classList.remove('sidebar-backdrop--visible')
  }

  backdrop.addEventListener('click', closeSidebar)

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const targetId = link.getAttribute('href')?.substring(1)
      if (targetId) {
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
          updateActiveLink(targetId)
          if (window.innerWidth <= 768) {
            closeSidebar()
          }
        }
      }
    })
  })

  // Update active link on scroll
  window.addEventListener('scroll', () => {
    const sections = allItems.map(item => document.getElementById(item.id)).filter(Boolean)
    const scrollPosition = window.scrollY + 120

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

  // Real-time Search Handler
  const searchInput = sidebar.querySelector<HTMLInputElement>('#sidebar-search-input')
  const emptyState = sidebar.querySelector<HTMLElement>('#sidebar-empty')
  const categoryEls = sidebar.querySelectorAll<HTMLElement>('.sidebar__category')

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim()
      let totalVisible = 0

      categoryEls.forEach(categoryEl => {
        let categoryVisible = 0
        const items = categoryEl.querySelectorAll<HTMLElement>('.sidebar__item')

        items.forEach(item => {
          const label = item.getAttribute('data-label') || ''
          const id = item.getAttribute('data-id') || ''
          const matches = label.includes(query) || id.includes(query)

          if (matches) {
            item.style.display = ''
            categoryVisible++
            totalVisible++
          } else {
            item.style.display = 'none'
          }
        })

        // Hide category header if all items in category are hidden
        categoryEl.style.display = categoryVisible > 0 ? '' : 'none'
      })

      if (emptyState) {
        emptyState.style.display = totalVisible === 0 ? 'flex' : 'none'
      }
    })

    // Escape clears search
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchInput.value = ''
        searchInput.dispatchEvent(new Event('input'))
        searchInput.blur()
      }
    })

    // Global '/' keydown shortcut to focus search
    window.addEventListener('keydown', (e) => {
      const target = e.target as HTMLElement
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable
      if (e.key === '/' && !isInput) {
        e.preventDefault()
        if (window.innerWidth <= 768) {
          sidebar.classList.add('sidebar--open')
          backdrop.classList.add('sidebar-backdrop--visible')
        }
        searchInput.focus()
      }
    })
  }

  // Floating Back to Top Button
  const backToTop = document.createElement('button')
  backToTop.type = 'button'
  backToTop.className = 'back-to-top'
  backToTop.setAttribute('aria-label', 'Back to top')
  backToTop.innerHTML = '<i class="ph-bold ph-arrow-up"></i>'

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTop.classList.add('back-to-top--visible')
    } else {
      backToTop.classList.remove('back-to-top--visible')
    }
  })

  return { sidebar, backdrop, backToTop }
}

// Mobile toggle button
export function createSidebarToggle(): HTMLElement {
  const toggle = document.createElement('button')
  toggle.type = 'button'
  toggle.className = 'sidebar-toggle'
  toggle.setAttribute('aria-label', 'Toggle sidebar navigation')
  toggle.innerHTML = '<i class="ph-bold ph-list"></i>'

  toggle.addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar')
    const backdrop = document.getElementById('sidebar-backdrop')
    if (sidebar && backdrop) {
      const isOpen = sidebar.classList.toggle('sidebar--open')
      backdrop.classList.toggle('sidebar-backdrop--visible', isOpen)
    }
  })

  return toggle
}
