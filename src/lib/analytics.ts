declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void
  }
}

export function initAnalytics() {
  const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined
  if (!import.meta.env.PROD || !domain) return

  if (document.querySelector('script[data-plausible]')) return

  const script = document.createElement('script')
  script.defer = true
  script.dataset.domain = domain
  script.dataset.plausible = 'true'
  script.src = 'https://plausible.io/js/script.js'
  document.head.appendChild(script)
}

export function trackEvent(name: string, props?: Record<string, string>) {
  if (typeof window === 'undefined' || !window.plausible) return
  window.plausible(name, props ? { props } : undefined)
}

export function trackPageView() {
  trackEvent('pageview')
}
