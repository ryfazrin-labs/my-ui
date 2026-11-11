import { renderButtonExamples } from './buttons'
import { renderInputExamples } from './inputs'
import { renderSwitchExamples } from './switches'
import { renderCardExamples } from './cards'
import { renderListExamples } from './list-items'
import { renderNavigationExamples } from './navigation'
import { renderSliderExamples } from './sliders'
import { renderSelectionControlExamples } from './selection-controls'
import { renderDialogExamples } from './dialogs'
import { renderMenuExamples } from './menus'
import { renderSegmentedExamples } from './segmented'
import { renderToastExamples } from './toasts'
import { renderProgressExamples } from './progress'
import { renderChipsExamples } from './chips'
import { showToast } from '../components/toast'
import { createCodeCollapse } from '../components/code-collapse'

export function renderComponentExamples(container: HTMLElement) {
  const mainContainer = document.createElement('div')
  mainContainer.className = 'container'

  // ===========================================================================
  // 1. Hero Section (One UI 7 Viewing Area)
  // ===========================================================================
  const heroSection = document.createElement('header')
  heroSection.className = 'docs-hero'
  heroSection.innerHTML = `
    <div class="docs-hero__badges">
      <span class="badge badge--success">Samsung One UI 7</span>
      <span class="badge badge--neutral">v0.1.0</span>
      <span class="badge">TypeScript Ready</span>
    </div>
    <h1 class="docs-hero__title">
      <span class="docs-hero__title-gradient">my-oneui</span>
    </h1>
    <p class="docs-hero__subtitle">
      Modern Web UI Component Library & Design System inspired by Samsung One UI 7.
      Crafted for natural ergonomics, fluid motion, frosted glass materials, and accessible web experiences.
    </p>

    <div class="docs-hero__actions">
      <!-- 1-Click Copy Install Pill -->
      <div class="install-pill" id="hero-install-pill" role="button" tabindex="0" title="Click to copy install command">
        <span class="install-pill__prompt">$</span>
        <span class="install-pill__cmd">npm i my-oneui</span>
        <button type="button" class="install-pill__btn" aria-label="Copy command">
          <i class="ph-bold ph-copy" id="hero-copy-icon"></i>
        </button>
      </div>

      <a href="https://github.com/ryfazrin/my-ui" target="_blank" rel="noopener noreferrer" class="button button--light">
        <span class="button-icon"><i class="ph-bold ph-github-logo"></i></span>
        GitHub
      </a>

      <a href="#buttons" class="button button--primary">
        <span class="button-icon"><i class="ph-bold ph-squares-four"></i></span>
        Explore Components
      </a>
    </div>
  `

  // Copy Install Command Event Listener
  const installPill = heroSection.querySelector<HTMLElement>('#hero-install-pill')
  const copyIcon = heroSection.querySelector<HTMLElement>('#hero-copy-icon')

  if (installPill) {
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText('npm i my-oneui')
        if (copyIcon) {
          copyIcon.className = 'ph-bold ph-check'
          setTimeout(() => {
            copyIcon.className = 'ph-bold ph-copy'
          }, 2000)
        }
        showToast({
          message: 'Copied "npm i my-oneui" to clipboard!',
          variant: 'success',
          duration: 2500,
        })
      } catch {
        showToast('npm i my-oneui')
      }
    }

    installPill.addEventListener('click', handleCopy)
    installPill.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleCopy()
      }
    })
  }

  mainContainer.appendChild(heroSection)

  // ===========================================================================
  // 2. Getting Started Section
  // ===========================================================================
  const gettingStartedWrapper = document.createElement('div')
  gettingStartedWrapper.id = 'getting-started'
  gettingStartedWrapper.innerHTML = `
    <div class="docs-getting-started">
      <div class="docs-getting-started__header">
        <i class="ph-bold ph-rocket-launch"></i>
        <h2>Quick Start & Installation</h2>
      </div>

      <div class="docs-getting-started__steps">
        <!-- Step 1 -->
        <div class="docs-getting-started__step">
          <div class="docs-getting-started__step-title">
            <span class="docs-getting-started__step-num">1</span>
            <span>Install the package</span>
          </div>
          <div class="docs-getting-started__code-snippet">npm install my-oneui</div>
        </div>

        <!-- Step 2 -->
        <div class="docs-getting-started__step">
          <div class="docs-getting-started__step-title">
            <span class="docs-getting-started__step-num">2</span>
            <span>Import stylesheet & initialize theme</span>
          </div>
          <div class="docs-getting-started__code-snippet">import 'my-oneui/style.css'
import { initTheme } from 'my-oneui'

// Detects OS preference or saved theme and applies CSS variables
initTheme()</div>
        </div>

        <!-- Step 3 -->
        <div class="docs-getting-started__step">
          <div class="docs-getting-started__step-title">
            <span class="docs-getting-started__step-num">3</span>
            <span>Use components & helpers</span>
          </div>
          <div class="docs-getting-started__code-snippet">import { showToast, setupSlider, createSpinner } from 'my-oneui'

// Show an accessible One UI floating toast
showToast({
  message: 'Photo saved to Samsung Cloud',
  variant: 'success'
})

// Create a dynamic Samsung 4-dot orbital loading spinner
const spinner = createSpinner({ size: 'md' })
document.body.appendChild(spinner)</div>
        </div>
      </div>
    </div>
  `

  const quickStartSnippet = `// 1. Install
npm install my-oneui

// 2. Main Entry (main.ts / app.ts)
import 'my-oneui/style.css'
import { initTheme, showToast, setupSlider } from 'my-oneui'

// Initialize One UI 7 theme engine
initTheme()

// Trigger floating pill toast
showToast({
  message: 'Settings updated',
  variant: 'success'
})`

  const codeBlock = createCodeCollapse('View Full Setup Code', quickStartSnippet)
  gettingStartedWrapper.querySelector('.docs-getting-started')?.appendChild(codeBlock)

  mainContainer.appendChild(gettingStartedWrapper)

  // ===========================================================================
  // 3. Component Showcase Sections
  // ===========================================================================
  const sections = [
    { id: 'buttons', render: renderButtonExamples },
    { id: 'inputs', render: renderInputExamples },
    { id: 'switches', render: renderSwitchExamples },
    { id: 'selection', render: renderSelectionControlExamples },
    { id: 'sliders', render: renderSliderExamples },
    { id: 'navigation', render: renderNavigationExamples },
    { id: 'segmented', render: renderSegmentedExamples },
    { id: 'cards', render: renderCardExamples },
    { id: 'lists', render: renderListExamples },
    { id: 'progress', render: renderProgressExamples },
    { id: 'toasts', render: renderToastExamples },
    { id: 'chips', render: renderChipsExamples },
    { id: 'dialogs', render: renderDialogExamples },
    { id: 'menus', render: renderMenuExamples },
  ]

  sections.forEach(({ id, render }) => {
    const sectionWrapper = document.createElement('div')
    sectionWrapper.id = id
    render(sectionWrapper)
    mainContainer.appendChild(sectionWrapper)
  })

  // Append to app container
  container.appendChild(mainContainer)
}
