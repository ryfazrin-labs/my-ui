export interface ToastAction {
  label: string;
  onClick: (toastEl: HTMLElement) => void;
}

export interface ToastOptions {
  message: string;
  duration?: number;
  icon?: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
  action?: ToastAction;
}

let toastContainer: HTMLElement | null = null;

function getOrCreateToastContainer(): HTMLElement {
  if (!toastContainer || !document.body.contains(toastContainer)) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.setAttribute('aria-live', 'polite');
    toastContainer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

/**
 * Displays a Samsung One UI floating pill toast notification.
 */
export function showToast(options: ToastOptions | string): HTMLElement {
  const opts: ToastOptions = typeof options === 'string' ? { message: options } : options;
  const { message, duration = 3000, icon, variant = 'default', action } = opts;

  const container = getOrCreateToastContainer();

  const toast = document.createElement('div');
  toast.className = variant && variant !== 'default' ? `toast toast--${variant}` : 'toast';
  toast.setAttribute('role', variant === 'error' ? 'alert' : 'status');

  // Determine icon (use provided or sensible default for status variants)
  let resolvedIcon = icon;
  if (!resolvedIcon && variant !== 'default') {
    if (variant === 'success') resolvedIcon = 'ph-check-circle';
    else if (variant === 'warning') resolvedIcon = 'ph-warning-circle';
    else if (variant === 'error') resolvedIcon = 'ph-x-circle';
  }

  // Icon
  if (resolvedIcon) {
    const iconSpan = document.createElement('span');
    iconSpan.className = `toast__icon toast__icon--${variant}`;
    
    // Check if user passed full class e.g. "ph ph-check-circle" or just "ph-check-circle"
    const iconClass = resolvedIcon.startsWith('ph ') ? resolvedIcon : (resolvedIcon.startsWith('ph-') ? `ph ${resolvedIcon}` : resolvedIcon);
    iconSpan.innerHTML = `<i class="${iconClass}"></i>`;
    toast.appendChild(iconSpan);
  }

  // Message
  const messageSpan = document.createElement('span');
  messageSpan.className = 'toast__message';
  messageSpan.textContent = message;
  toast.appendChild(messageSpan);

  // Close helper
  let isClosing = false;
  const dismiss = () => {
    if (isClosing) return;
    isClosing = true;
    toast.classList.add('toast--closing');
    toast.addEventListener(
      'animationend',
      () => {
        if (toast.parentElement) {
          toast.remove();
        }
      },
      { once: true }
    );
  };

  // Action Button
  if (action) {
    const actionBtn = document.createElement('button');
    actionBtn.type = 'button';
    actionBtn.className = 'toast__action';
    actionBtn.textContent = action.label;
    actionBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      action.onClick(toast);
      dismiss();
    });
    toast.appendChild(actionBtn);
  }

  container.appendChild(toast);

  if (duration > 0) {
    window.setTimeout(() => {
      dismiss();
    }, duration);
  }

  return toast;
}
