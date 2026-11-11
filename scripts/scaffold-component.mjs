#!/usr/bin/env node

/**
 * scaffold-component.mjs
 * 
 * Automation tool for the AI SDLC pipeline in my-ui.
 * Quickly creates standard SCSS styles, TypeScript logic/example,
 * and outputs the integration lines for main.scss, components.ts, and sidebar.
 * 
 * Usage:
 *   node scripts/scaffold-component.mjs <component-name>
 * 
 * Example:
 *   node scripts/scaffold-component.mjs segmented-control
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const args = process.argv.slice(2)
const componentArg = args[0]

if (!componentArg || componentArg === '--help' || componentArg === '-h') {
  console.log(`
\x1b[36m========================================================\x1b[0m
\x1b[1m  my-ui (One UI 7) — Component Scaffolding Tool\x1b[0m
\x1b[36m========================================================\x1b[0m

\x1b[33mUsage:\x1b[0m
  node scripts/scaffold-component.mjs <component-name>

\x1b[33mExample:\x1b[0m
  node scripts/scaffold-component.mjs toast
  node scripts/scaffold-component.mjs segmented-control
  node scripts/scaffold-component.mjs progress-bar

\x1b[32mWhat it generates:\x1b[0m
  1. src/styles/components/_<name>.scss
  2. src/examples/<name>.ts
  3. Integration code snippets for main.scss, components.ts, and main.ts
`)
  process.exit(0)
}

// Format naming utilities
const kebabName = componentArg
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')

const pascalName = kebabName
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join('')

const titleName = kebabName
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ')

const scssPath = path.join(rootDir, 'src', 'styles', 'components', `_${kebabName}.scss`)
const examplePath = path.join(rootDir, 'src', 'examples', `${kebabName}.ts`)

// 1. SCSS Template
const scssTemplate = `@import "../_design-tokens.scss";

// ${titleName} Tokens
$${kebabName}-radius: $border-radius-lg;
$${kebabName}-bg-light: $container-background-light;
$${kebabName}-bg-dark: $container-background-dark;

.${kebabName} {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: $${kebabName}-bg-light;
  border-radius: $${kebabName}-radius;
  padding: 12px 20px;
  box-shadow: $elevation-1;
  transition: all 0.2s ease-in-out;
  color: $primary-light;

  &__content {
    font-size: $body-font-size;
    font-weight: 500;
  }

  &__icon {
    font-size: 20px;
    color: $accent-light;
  }

  &:hover {
    box-shadow: $elevation-2;
  }
}

// Dark Mode
[data-theme="dark"],
.dark-mode {
  .${kebabName} {
    background-color: $${kebabName}-bg-dark;
    color: $primary-dark;

    &__icon {
      color: $accent-dark;
    }
  }
}
`

// 2. Example Template
const exampleTemplate = `import { createCodeCollapse } from '../components/code-collapse'

export function render${pascalName}Examples(container: HTMLElement) {
  const section = document.createElement('div')
  section.innerHTML = \`
    <section class="section">
      <h2>${titleName}</h2>
      <div class="card" style="padding: 24px;">
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <div class="${kebabName}">
            <i class="ph-bold ph-sparkle ${kebabName}__icon"></i>
            <span class="${kebabName}__content">Sample ${titleName}</span>
          </div>
        </div>
      </div>
    </section>
  \`

  // Add code collapse
  const mainSection = section.querySelector('.section')
  if (mainSection) {
    const codeExample = \`<div class="${kebabName}">
  <i class="ph-bold ph-sparkle ${kebabName}__icon"></i>
  <span class="${kebabName}__content">Sample ${titleName}</span>
</div>\`
    mainSection.appendChild(createCodeCollapse('View Code', codeExample))
  }

  container.appendChild(section)
}
`

// Write files if not existing
if (fs.existsSync(scssPath)) {
  console.log(`\x1b[33m[SKIP]\x1b[0m SCSS file already exists: ${scssPath}`)
} else {
  fs.writeFileSync(scssPath, scssTemplate, 'utf-8')
  console.log(`\x1b[32m[CREATED]\x1b[0m ${scssPath}`)
}

if (fs.existsSync(examplePath)) {
  console.log(`\x1b[33m[SKIP]\x1b[0m Example file already exists: ${examplePath}`)
} else {
  fs.writeFileSync(examplePath, exampleTemplate, 'utf-8')
  console.log(`\x1b[32m[CREATED]\x1b[0m ${examplePath}`)
}

console.log(`
\x1b[32m✓ Component '${kebabName}' successfully scaffolded!\x1b[0m

\x1b[36mNext steps to complete the 5-step lifecycle:\x1b[0m

\x1b[1m1. Register SCSS in src/main.scss:\x1b[0m
   @import "./styles/components/_${kebabName}.scss";

\x1b[1m2. Register Example in src/examples/components.ts:\x1b[0m
   import { render${pascalName}Examples } from './${kebabName}'
   // Add to sections array:
   { id: '${kebabName}', render: render${pascalName}Examples },

\x1b[1m3. Add to Navigation in src/main.ts (sidebarItems):\x1b[0m
   { id: '${kebabName}', label: '${titleName}', icon: 'ph-cube' },

\x1b[1m4. Run verification gates:\x1b[0m
   npm run typecheck && npm run build
`)
