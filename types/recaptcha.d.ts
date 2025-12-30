declare global {
  interface ReCaptchaOptions {
    sitekey: string
    callback?: (token: string) => void
    'expired-callback'?: () => void
    'error-callback'?: () => void
  }

  interface ReCaptcha {
    render: (container: string | HTMLElement, options: ReCaptchaOptions) => number
    reset: (widgetId?: number) => void
    getResponse: (widgetId?: number) => string
    execute: (siteKey: string, options: { action: string }) => Promise<string>
  }

  interface Window {
    grecaptcha?: ReCaptcha
  }
}

export {}

