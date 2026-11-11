# my-ui — Samsung One UI 7 Web Component Library & Design System

A modern, responsive, and lightweight web UI component library inspired by **Samsung One UI (One UI 6 / 7)** design aesthetics, built with **Vite, TypeScript, and SCSS**.

---

## ✨ Features

- 📱 **One UI Ergonomics**: Designed around Samsung's signature split-screen usability (Viewing Area top, Interaction Area bottom).
- 🎨 **Authentic One UI Aesthetics**:
  - Smooth organic squircle corners ($24\text{px}-28\text{px}$ containers, $28\text{px}$ pill controls).
  - Frosted glass translucent materials with `backdrop-filter: blur(...)`.
  - Native One UI typography scale with custom SEC font.
  - Full Dark Mode support for all components.
- ♿ **Accessible**: WCAG 2.1 AA compliant keyboard navigation (`Tab`, `Space`, `Enter`, Arrow keys) and ARIA attributes.
- ⚡ **Lightweight & Fast**: Zero heavy framework runtime dependencies; powered by modular SCSS and vanilla TypeScript.
- 🤖 **AI SDLC Integrated**: Complete with agent rules (`AGENTS.md`) and component scaffolding automation.

---

## 🧩 Components Overview

| Category | Components Included |
| :--- | :--- |
| **Buttons & Controls** | Light, Dark, Primary, and Gradient Buttons; One UI Switches; Checkboxes & Radios |
| **Inputs & Forms** | Rounded Text Inputs, Input Labels with validation states, Search bar |
| **Containers & Surfaces**| Squircle Cards, Elevated Dialogs, Mobile Modal Bottom Sheets with drag handle |
| **Lists & Navigation** | Grouped Settings Lists with icons, Collapsible Headers, Bottom Nav Bar, Sidebar |
| **Sliders & Range** | One UI Thick Pill Sliders with dynamic audio/brightness indicators |
| **Menus & Panels** | Quick Panel Action Grids, Horizontal Scroll Row, Pop-out action pills |
| **Showcase & Docs** | Expandable Code Collapse (`createCodeCollapse`) with One-Click Copy |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/ryfazrin/my-ui.git
cd my-ui

# Install dependencies
npm install
```

### Development & Build Scripts

```bash
# Start local Vite development server
npm run dev

# Run TypeScript strict typecheck
npm run typecheck

# Build npm library distribution (dist/my-ui.js, dist/my-ui.css, dist/index.d.ts)
npm run build:lib

# Build showcase & documentation website (dist-docs/)
npm run build:docs

# Full build (typecheck + build:lib + build:docs)
npm run build

# Preview production showcase locally
npm run preview
```

---

## 📦 Using as an npm Package

Once published or linked locally:

```bash
npm install my-ui
```

### 1. Import Compiled Stylesheet and Helpers
```ts
// In your application entry point (e.g. main.ts)
import 'my-ui/style.css'
import { createCodeCollapse, createSidebar } from 'my-ui'
```

### 2. Or Import Raw SCSS Design Tokens
```scss
// In your Sass stylesheet
@import 'my-ui/scss/_design-tokens.scss';
@import 'my-ui/scss/main.scss';
```

---

## 🤖 AI SDLC & Contributing Guidelines

This project uses an **AI-Augmented Software Development Life Cycle (AI SDLC)** framework to ensure consistent design language, strict type safety, and zero regression.

### 1. Read Agent Rules
Before making changes, review [**`AGENTS.md`**](./AGENTS.md) for detailed guidelines on:
- One UI 7 design tokens and measurements.
- SCSS BEM naming conventions.
- Strict TypeScript rules (zero unused variables, explicit typing).
- Accessibility checklist.

### 2. Scaffold a New Component
Use the built-in scaffolding tool to generate a new component following the 5-step lifecycle:

```bash
node scripts/scaffold-component.mjs <component-name>
```

Example:
```bash
node scripts/scaffold-component.mjs segmented-control
```

This will automatically create:
1. `src/styles/components/_<name>.scss` (SCSS with One UI tokens and dark mode).
2. `src/examples/<name>.ts` (Interactive demo and code preview).
3. Terminal instructions for wiring it into `src/main.scss`, `src/examples/components.ts`, and `sidebar.ts`.

### 3. Verification Gate
Always ensure all checks pass before committing:
```bash
npm run typecheck && npm run build
```

---

## 📄 License & Credits

- Icons powered by [Phosphor Icons](https://phosphoricons.com/).
- Design language inspired by Samsung One UI (Samsung Electronics).
- Licensed under the [MIT License](LICENSE).
