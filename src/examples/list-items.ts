import { createCodeCollapse } from '../components/code-collapse'

export function renderListExamples(container: HTMLElement) {
  const section = document.createElement('div')
  section.innerHTML = `
    <section class="section">
      <h2>List Items & Settings</h2>
      
      <div class="card" style="padding: 8px;">
        <div class="list-group">
          
          <!-- List Item 1 -->
          <div class="list-item">
            <div class="list-item__leading" style="background-color: rgba(56, 122, 255, 0.1); color: #387AFF;">
              <i class="ph-bold ph-clock"></i>
            </div>
            <div class="list-item__content">
              <div class="list-item__title">Screen Time</div>
              <div class="list-item__subtitle">Daily average: 4h 12m</div>
            </div>
            <div class="list-item__trailing">
              <i class="ph-bold ph-caret-right"></i>
            </div>
          </div>

          <!-- List Item 2 -->
          <div class="list-item">
            <div class="list-item__leading" style="background-color: rgba(34, 201, 166, 0.1); color: #22C9A6;">
              <i class="ph-bold ph-credit-card"></i>
            </div>
            <div class="list-item__content">
              <div class="list-item__title">Samsung Pay</div>
              <div class="list-item__subtitle">Default payment method</div>
            </div>
            <div class="list-item__trailing">
              <span style="font-size: 12px; margin-right: 8px; color: var(--oui-color-secondary, #999);">On</span>
              <i class="ph-bold ph-caret-right"></i>
            </div>
          </div>

          <!-- List Item 3 (Switch) -->
          <div class="list-item">
            <div class="list-item__leading" style="background-color: rgba(255, 59, 48, 0.1); color: #FF3B30;">
              <i class="ph-bold ph-bell"></i>
            </div>
            <div class="list-item__content">
              <div class="list-item__title">Notifications</div>
            </div>
            <div class="list-item__trailing">
              <label class="switch">
                <input type="checkbox" class="switch__input" checked>
                <span class="switch__track">
                  <span class="switch__thumb"></span>
                </span>
              </label>
            </div>
          </div>

          <!-- List Item 4 -->
          <div class="list-item">
            <div class="list-item__leading" style="background-color: rgba(153, 153, 157, 0.15); color: var(--oui-color-primary, #000);">
              <i class="ph-bold ph-user"></i>
            </div>
            <div class="list-item__content">
              <div class="list-item__title">Accounts and backup</div>
              <div class="list-item__subtitle">Manage accounts, Smart Switch</div>
            </div>
            <div class="list-item__trailing">
              <i class="ph-bold ph-caret-right"></i>
            </div>
          </div>

        </div>
      </div>
    </section>
  `

  // Add code collapse
  const mainSection = section.querySelector('.section')
  if (mainSection) {
    const codeExample = `<div class="list-item">
  <div class="list-item__leading">
    <i class="ph-bold ph-clock"></i>
  </div>
  <div class="list-item__content">
    <div class="list-item__title">Screen Time</div>
    <div class="list-item__subtitle">Daily average: 4h 12m</div>
  </div>
  <div class="list-item__trailing">
    <i class="ph-bold ph-caret-right"></i>
  </div>
</div>`
    mainSection.appendChild(createCodeCollapse('View Code', codeExample))
  }

  container.appendChild(section)
}
