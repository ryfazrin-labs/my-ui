import { createCodeCollapse } from '../components/code-collapse';
import { showToast } from '../components/toast';

export function renderToastExamples(container: HTMLElement) {
  const toastSection = document.createElement('div');
  toastSection.innerHTML = `
    <section class="section">
      <h2>Toasts & Snackbars</h2>
      <p style="margin-bottom: 24px; color: var(--oui-color-text-secondary); font-size: 14px;">
        Floating pill toasts inspired by Samsung One UI 7. Ergonomically placed at the bottom within thumb reach with frosted blur glass effect and distinct status colors.
      </p>

      <div class="button-container" style="display: flex; flex-wrap: wrap; gap: 12px;">
        <button type="button" class="button button--light" id="btn-toast-default">
          <span class="button-icon"><i class="ph-bold ph-bell"></i></span>
          Simple Toast
        </button>

        <button type="button" class="button button--light" id="btn-toast-success" style="border-color: rgba(34, 201, 166, 0.4);">
          <span class="button-icon" style="color: #22C9A6;"><i class="ph-bold ph-check-circle"></i></span>
          Success Toast
        </button>

        <button type="button" class="button button--light" id="btn-toast-warning" style="border-color: rgba(255, 159, 10, 0.4);">
          <span class="button-icon" style="color: #FF9F0A;"><i class="ph-bold ph-warning-circle"></i></span>
          Warning Toast
        </button>

        <button type="button" class="button button--light" id="btn-toast-error" style="border-color: rgba(255, 59, 48, 0.4);">
          <span class="button-icon" style="color: #FF3B30;"><i class="ph-bold ph-x-circle"></i></span>
          Error Toast
        </button>

        <button type="button" class="button button--primary" id="btn-toast-action">
          <span class="button-icon"><i class="ph-bold ph-arrow-counter-clockwise"></i></span>
          Toast with Action
        </button>
      </div>
    </section>
  `;

  // Attach event handlers
  const btnDefault = toastSection.querySelector<HTMLButtonElement>('#btn-toast-default');
  btnDefault?.addEventListener('click', () => {
    showToast('Settings saved automatically');
  });

  const btnSuccess = toastSection.querySelector<HTMLButtonElement>('#btn-toast-success');
  btnSuccess?.addEventListener('click', () => {
    showToast({
      message: 'Photo backed up to Samsung Cloud',
      variant: 'success',
      duration: 3500,
    });
  });

  const btnWarning = toastSection.querySelector<HTMLButtonElement>('#btn-toast-warning');
  btnWarning?.addEventListener('click', () => {
    showToast({
      message: 'Low battery — connect charger',
      variant: 'warning',
      duration: 4000,
    });
  });

  const btnError = toastSection.querySelector<HTMLButtonElement>('#btn-toast-error');
  btnError?.addEventListener('click', () => {
    showToast({
      message: 'Unable to connect to server',
      variant: 'error',
      duration: 4000,
    });
  });

  const btnAction = toastSection.querySelector<HTMLButtonElement>('#btn-toast-action');
  btnAction?.addEventListener('click', () => {
    showToast({
      message: '1 conversation moved to Trash',
      icon: 'ph-trash',
      duration: 5000,
      action: {
        label: 'Undo',
        onClick: () => {
          showToast({
            message: 'Conversation restored',
            variant: 'success',
          });
        },
      },
    });
  });

  // Code snippet documentation
  const section = toastSection.querySelector('.section');
  if (section) {
    const codeExample = `import { showToast } from 'my-ui';

// 1. Simple toast
showToast('Settings saved automatically');

// 2. Success toast (with emerald frosted glass & glow)
showToast({
  message: 'Photo backed up to Samsung Cloud',
  variant: 'success',
  duration: 3500,
});

// 3. Warning toast (with amber frosted glass & glow)
showToast({
  message: 'Low battery — connect charger',
  variant: 'warning',
  duration: 4000,
});

// 4. Toast with interactive action
showToast({
  message: '1 conversation moved to Trash',
  icon: 'ph-trash',
  action: {
    label: 'Undo',
    onClick: () => {
      console.log('Restored conversation');
    },
  },
});`;

    const codeBlock = createCodeCollapse('View Code', codeExample);
    section.appendChild(codeBlock);
  }

  container.appendChild(toastSection);
}
