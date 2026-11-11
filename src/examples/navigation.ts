import { createCodeCollapse } from '../components/code-collapse'

export function renderNavigationExamples(container: HTMLElement) {
  const section = document.createElement('div')
  section.innerHTML = `
<section class="section">
  <h2>Navigation & Headers</h2>

  <!-- Expanded Header Demo -->
  <div class="card" style="padding: 0; overflow: hidden; height: 300px; position: relative; background-color: var(--oui-color-background, #F1F1F3);">
    <div class="header header--expanded">
      <div class="header__top-bar">
        <div class="header__action">
          <i class="ph-bold ph-caret-left" style="font-size: 24px;"></i>
        </div>
        <div class="header__action">
          <i class="ph-bold ph-dots-three-vertical" style="font-size: 24px;"></i>
        </div>
      </div>
      <h1 class="header__title">Settings</h1>
      <div class="header__subtitle">Manage your device options</div>
    </div>

    <div style="padding: 16px;">
      <p style="color: var(--oui-color-secondary, #999);">Scroll content goes here...</p>
    </div>

    <!-- Bottom Nav Demo -->
    <div class="bottom-nav" style="position: absolute; bottom: 0;">
      <div class="bottom-nav__item bottom-nav__item--active">
        <div class="bottom-nav__icon">
          <i class="ph-bold ph-house"></i>
        </div>
        <span class="bottom-nav__label">Home</span>
      </div>
      <div class="bottom-nav__item">
        <div class="bottom-nav__icon">
          <i class="ph-bold ph-magnifying-glass"></i>
        </div>
        <span class="bottom-nav__label">Search</span>
      </div>
      <div class="bottom-nav__item">
        <div class="bottom-nav__icon">
          <i class="ph-bold ph-user"></i>
        </div>
        <span class="bottom-nav__label">Profile</span>
      </div>
    </div>
  </div>

  <div style="margin-top: 24px;"></div>

  <!-- Collapsed Header Demo -->
  <div class="card" style="padding: 0; overflow: hidden; position: relative; background-color: var(--oui-color-background, #F1F1F3);">
    <div class="header header--collapsed">
      <div class="header__action">
        <i class="ph-bold ph-list" style="font-size: 24px;"></i>
      </div>

      <div class="header__content-wrapper">
        <h1 class="header__title">Title</h1>
        <div class="header__subtitle">Subtitle</div>
      </div>

      <div style="display: flex; gap: 8px;">
        <div class="header__action">
          <i class="ph-bold ph-magnifying-glass" style="font-size: 24px;"></i>
        </div>
        <div class="header__action">
          <i class="ph-bold ph-dots-three-vertical" style="font-size: 24px;"></i>
        </div>
      </div>
    </div>
    <div style="padding: 16px;">
      <p style="color: var(--oui-color-secondary, #666);">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni officia tempore quasi corrupti? Quam saepe enim ut debitis quo.</p>
    </div>
  </div>

</section>
`

  // Add code collapse
  const mainSection = section.querySelector('.section')
  if (mainSection) {
    const codeExample = `<div class="bottom-nav">
  <div class="bottom-nav__item bottom-nav__item--active">
    <div class="bottom-nav__icon">
      <i class="ph-bold ph-house"></i>
    </div>
    <span class="bottom-nav__label">Home</span>
  </div>
  <div class="bottom-nav__item">
    <div class="bottom-nav__icon">
      <i class="ph-bold ph-magnifying-glass"></i>
    </div>
    <span class="bottom-nav__label">Search</span>
  </div>
</div>`
    mainSection.appendChild(createCodeCollapse('View Code', codeExample))
  }

  container.appendChild(section)
}
