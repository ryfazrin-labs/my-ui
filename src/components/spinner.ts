/**
 * spinner.ts
 * 
 * Samsung Galaxy 4-Dot Orbital Loading Spinner Controller & Helper.
 * Manages creation of the 4-dot orbital structure and accessible attributes.
 */

export interface SpinnerOptions {
  size?: 'sm' | 'md' | 'lg';
  monochrome?: boolean;
  className?: string;
  ariaLabel?: string;
}

/**
 * Creates a Samsung 4-dot orbital loading spinner element.
 */
export function createSpinner(options: SpinnerOptions = {}): HTMLElement {
  const { size = 'md', monochrome = false, className, ariaLabel = 'Loading...' } = options;

  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  spinner.setAttribute('role', 'status');
  spinner.setAttribute('aria-label', ariaLabel);

  if (size === 'sm') {
    spinner.classList.add('spinner--sm');
  } else if (size === 'lg') {
    spinner.classList.add('spinner--lg');
  }

  if (monochrome) {
    spinner.classList.add('spinner--monochrome');
  }

  if (className) {
    spinner.classList.add(...className.split(' ').filter(Boolean));
  }

  // Inject 4 dots
  for (let i = 0; i < 4; i++) {
    const dot = document.createElement('span');
    dot.className = 'spinner__dot';
    spinner.appendChild(dot);
  }

  return spinner;
}

/**
 * Automatically initializes existing .spinner elements in the DOM.
 * If a .spinner element doesn't have 4 child dots, it injects them.
 */
export function initSpinners(container: HTMLElement | Document = document): void {
  const spinners = container.querySelectorAll<HTMLElement>('.spinner');
  spinners.forEach((spinner) => {
    if (!spinner.getAttribute('role')) {
      spinner.setAttribute('role', 'status');
    }
    if (!spinner.getAttribute('aria-label')) {
      spinner.setAttribute('aria-label', 'Loading');
    }

    const dots = spinner.querySelectorAll('.spinner__dot');
    if (dots.length === 0) {
      for (let i = 0; i < 4; i++) {
        const dot = document.createElement('span');
        dot.className = 'spinner__dot';
        spinner.appendChild(dot);
      }
    }
  });
}
