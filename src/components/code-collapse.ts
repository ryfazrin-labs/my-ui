/**
 * code-collapse.ts
 * 
 * VS Code-style collapsible code view with built-in zero-dependency
 * syntax highlighting, line numbers, macOS window control dots, and copy action.
 */

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * Tokenizes and syntax-highlights HTML, TypeScript/JavaScript, and Shell snippets
 * in the iconic VS Code Dark+ color theme.
 */
function highlightCode(code: string): string {
  const tokenRegex = new RegExp(
    [
      '(<!--[\\s\\S]*?-->)',                                                           // 1. html comment
      '(\\/\\/[^\\r\\n]*)',                                                           // 2. js comment
      '(`(?:[^`\\\\]|\\\\.)*`|"(?:[^"\\\\]|\\\\.)*"|\'(?:[^\'\\\\]|\\\\.)*\')',           // 3. strings
      '(<\\/?[a-zA-Z0-9_-]+|\\/?>)',                                                  // 4. html tag
      '([a-zA-Z0-9_-]+)(?==)',                                                        // 5. html attribute
      '\\b(import|export|from|as|default|const|let|var|function|return|async|await|if|else|for|while|switch|case|break|type|interface|new|class|extends)\\b', // 6. keyword
      '\\b(HTMLElement|HTMLButtonElement|HTMLInputElement|ToastOptions|ToastAction|SidebarItem|SidebarCategory|SpinnerOptions|string|number|boolean|any|void|console|document|window)\\b', // 7. type/builtin
      '\\b(true|false|null|undefined)\\b',                                            // 8. boolean
      '\\b(\\d+(?:\\.\\d+)?(?:px|%|ms|s)?)\\b',                                       // 9. number/unit
      '\\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\\s*\\()',                                     // 10. function call
      '\\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\\s*:)'                                       // 11. object property key
    ].join('|'),
    'g'
  )

  const highlightedRaw = code.replace(
    tokenRegex,
    (_match, g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11) => {
      const esc = escapeHtml(_match)
      if (g1 || g2) return `<span class="token-comment">${esc}</span>`
      if (g3) return `<span class="token-string">${esc}</span>`
      if (g4) return `<span class="token-tag">${esc}</span>`
      if (g5) return `<span class="token-attr">${esc}</span>`
      if (g6) return `<span class="token-keyword">${esc}</span>`
      if (g7) return `<span class="token-type">${esc}</span>`
      if (g8) return `<span class="token-boolean">${esc}</span>`
      if (g9) return `<span class="token-number">${esc}</span>`
      if (g10) return `<span class="token-function">${esc}</span>`
      if (g11) return `<span class="token-property">${esc}</span>`
      return esc
    }
  )

  const lines = highlightedRaw.trim().split('\n')
  return lines
    .map(
      (line, i) =>
        `<div class="code-line"><span class="code-line__num">${i + 1}</span><span class="code-line__code">${line || ' '}</span></div>`
    )
    .join('\n')
}

function detectLanguage(code: string, explicitLang?: string): string {
  if (explicitLang) return explicitLang.toUpperCase()
  const trimmed = code.trim()
  if (trimmed.startsWith('<') || trimmed.includes('</') || trimmed.includes('<div') || trimmed.includes('<button')) {
    return 'HTML'
  }
  if (trimmed.startsWith('npm ') || trimmed.startsWith('git ') || trimmed.startsWith('pnpm ') || trimmed.startsWith('yarn ')) {
    return 'BASH'
  }
  return 'TS'
}

export function createCodeCollapse(title: string, code: string, lang?: string): HTMLElement {
  const collapse = document.createElement('div')
  collapse.className = 'code-collapse'

  const resolvedLang = detectLanguage(code, lang)
  const highlightedHtml = highlightCode(code)

  collapse.innerHTML = `
    <div class="code-collapse__header" role="button" tabindex="0" aria-expanded="false">
      <div class="code-collapse__left">
        <div class="code-collapse__dots" aria-hidden="true">
          <span class="code-collapse__dot code-collapse__dot--red"></span>
          <span class="code-collapse__dot code-collapse__dot--yellow"></span>
          <span class="code-collapse__dot code-collapse__dot--green"></span>
        </div>
        <h4 class="code-collapse__title">
          <i class="ph-bold ph-caret-right"></i>
          <span>${title}</span>
        </h4>
        <span class="code-collapse__lang">${resolvedLang}</span>
      </div>
      <div class="code-collapse__actions">
        <button type="button" class="code-collapse__button code-collapse__copy" aria-label="Copy code to clipboard">
          <i class="ph-bold ph-copy"></i>
          <span>Copy</span>
        </button>
      </div>
    </div>
    <div class="code-collapse__content">
      <div class="code-collapse__editor">
        ${highlightedHtml}
      </div>
    </div>
  `

  // Toggle collapse
  const header = collapse.querySelector<HTMLElement>('.code-collapse__header')
  const toggleCollapse = () => {
    const isExpanded = collapse.classList.toggle('code-collapse--expanded')
    header?.setAttribute('aria-expanded', isExpanded ? 'true' : 'false')
  }

  header?.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('.code-collapse__copy')) return
    toggleCollapse()
  })

  header?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if ((e.target as HTMLElement).closest('.code-collapse__copy')) return
      e.preventDefault()
      toggleCollapse()
    }
  })

  // Copy to clipboard
  const copyButton = collapse.querySelector<HTMLButtonElement>('.code-collapse__copy')
  copyButton?.addEventListener('click', async (e) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(code)
      const originalHTML = copyButton.innerHTML
      copyButton.innerHTML = '<i class="ph-bold ph-check" style="color: #4EC9B0;"></i><span>Copied!</span>'
      setTimeout(() => {
        copyButton.innerHTML = originalHTML
      }, 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  })

  return collapse
}
