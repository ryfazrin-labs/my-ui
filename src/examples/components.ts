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

export function renderComponentExamples(container: HTMLElement) {
  // Create main container
  const mainContainer = document.createElement('div')
  mainContainer.className = 'container'
  mainContainer.innerHTML = '<h1>OneUI 7 Components</h1>'

  // Create sections with IDs for sidebar navigation
  const sections = [
    { id: 'switches', render: renderSwitchExamples },
    { id: 'inputs', render: renderInputExamples },
    { id: 'buttons', render: renderButtonExamples },
    { id: 'cards', render: renderCardExamples },
    { id: 'lists', render: renderListExamples },
    { id: 'navigation', render: renderNavigationExamples },
    { id: 'sliders', render: renderSliderExamples },
    { id: 'selection', render: renderSelectionControlExamples },
    { id: 'segmented', render: renderSegmentedExamples },
    { id: 'toasts', render: renderToastExamples },
    { id: 'progress', render: renderProgressExamples },
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

  // Add to main container
  container.appendChild(mainContainer)
}
