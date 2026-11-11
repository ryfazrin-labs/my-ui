import { createCodeCollapse } from '../components/code-collapse'

export function renderSelectionControlExamples(container: HTMLElement) {
  const section = document.createElement('div')
  section.innerHTML = `
    <section class="section">
      <h2>Selection Controls</h2>
      
      <div class="card">
        <div class="card__header">
          <h3 class="card__title">Radio & Checkbox</h3>
        </div>
        <div class="card__body">
          
          <div style="display: flex; flex-direction: column; gap: 24px;">
            <!-- Checkboxes -->
            <div>
              <h4 style="margin-bottom: 16px; font-size: 14px; color: #999;">Checkboxes</h4>
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <label class="control-label">
                  <div class="checkbox">
                    <button type="button" class="checkbox__button" role="checkbox" aria-checked="true"></button>
                    <div class="checkbox"></div>
                  </div>
                  Selected Option
                </label>
                
                <label class="control-label">
                  <div class="checkbox">
                    <button type="button" class="checkbox__button" role="checkbox" aria-checked="false"></button>
                    <div class="checkbox"></div>
                  </div>
                  Unselected Option
                </label>

                <label class="control-label control-label--disabled">
                  <div class="checkbox">
                    <button type="button" class="checkbox__button" role="checkbox" aria-checked="true" disabled aria-disabled="true"></button>
                    <div class="checkbox"></div>
                  </div>
                  Disabled Selected
                </label>
              </div>
            </div>

            <!-- Radios -->
            <div>
              <h4 style="margin-bottom: 16px; font-size: 14px; color: #999;">Radio Buttons</h4>
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <label class="control-label">
                  <div class="radio">
                    <button type="button" class="radio__button" role="radio" aria-checked="true" data-group="radio-demo"></button>
                    <div class="radio"></div>
                  </div>
                  Option 1
                </label>
                
                <label class="control-label">
                  <div class="radio">
                    <button type="button" class="radio__button" role="radio" aria-checked="false" data-group="radio-demo"></button>
                    <div class="radio"></div>
                  </div>
                  Option 2
                </label>

                <label class="control-label control-label--disabled">
                  <div class="radio">
                    <button type="button" class="radio__button" role="radio" aria-checked="false" disabled aria-disabled="true" data-group="radio-demo"></button>
                    <div class="radio"></div>
                  </div>
                  Disabled Option
                </label>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  `

  // Add code collapse
  const mainSection = section.querySelector('.section')
  if (mainSection) {
    const codeExample = `<label class="control-label">
  <div class="checkbox">
    <button type="button" class="checkbox__button" role="checkbox" aria-checked="true"></button>
    <div class="checkbox"></div>
  </div>
  Selected Option
</label>

<label class="control-label">
  <div class="radio">
    <button type="button" class="radio__button" role="radio" aria-checked="true"></button>
    <div class="radio"></div>
  </div>
  Selected Option
</label>`
    mainSection.appendChild(createCodeCollapse('View Code', codeExample))
  }

  container.appendChild(section)

  // Initialize interactive behavior for role=checkbox and role=radio buttons
  ;(() => {
    const checkboxes = section.querySelectorAll<HTMLButtonElement>('button[role="checkbox"]')
    checkboxes.forEach(btn => {
      if (!btn.hasAttribute('tabindex')) btn.setAttribute('tabindex', btn.disabled ? '-1' : '0')
      btn.addEventListener('click', () => {
        if (btn.disabled) return
        const checked = btn.getAttribute('aria-checked') === 'true'
        btn.setAttribute('aria-checked', checked ? 'false' : 'true')
        btn.dispatchEvent(new CustomEvent('change', { detail: { checked: !checked } }))
      })
      btn.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          btn.click()
        }
      })
    })

    const radios = section.querySelectorAll<HTMLButtonElement>('button[role="radio"]')
    const groups = new Map<string, HTMLButtonElement[]>()
    radios.forEach(r => {
      const group = r.getAttribute('data-group') || 'default'
      if (!groups.has(group)) groups.set(group, [])
      groups.get(group)!.push(r)
    })

    groups.forEach((buttons) => {
      // ensure tabindex: only the checked radio is tabbable
      let checkedIndex = buttons.findIndex(b => b.getAttribute('aria-checked') === 'true' && !b.disabled)
      if (checkedIndex === -1) checkedIndex = buttons.findIndex(b => !b.disabled)
      buttons.forEach((b, i) => b.setAttribute('tabindex', i === checkedIndex ? '0' : '-1'))

      const focusRadio = (index: number) => {
        const target = buttons[index]
        if (!target || target.disabled) return
        target.focus()
        target.click()
      }

      buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          if (btn.disabled) return
          buttons.forEach(b => b.setAttribute('aria-checked', 'false'))
          btn.setAttribute('aria-checked', 'true')
          buttons.forEach((b) => b.setAttribute('tabindex', b === btn ? '0' : '-1'))
        })

        btn.addEventListener('keydown', (e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault()
            btn.click()
            return
          }
          const enabled = buttons.filter(b => !b.disabled)
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault()
            const cur = enabled.indexOf(btn)
            const next = (cur + 1) % enabled.length
            focusRadio(buttons.indexOf(enabled[next]))
          }
          if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault()
            const cur = enabled.indexOf(btn)
            const prev = (cur - 1 + enabled.length) % enabled.length
            focusRadio(buttons.indexOf(enabled[prev]))
          }
        })
      })
    })
  })()
}
