// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon', '@nuxt/image', '@nuxt/ui', 'nuxt-security'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    // Private keys (server-side only)
    // @ts-ignore - process.env is available at build time
    recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY || '',
    public: {
      emailjs: {
        serviceId: 'service_h3ydxc9',
        templateId: 'template_792dty6',
        publicKey: 't0RJLM_Cy2pPzNpb0'
      },
      recaptcha: {
        siteKey: '6LfkEzssAAAAAMVUa5mxLk-ECbvysMDAhWvBk4NT'
      }
    }
  },
  app: {
    head: {
    }
  },
  security: {
    // Enable nonce support for strict CSP (works in SSR mode)
    // Note: Nonces don't work in SSG mode - use hashes instead if using static generation
    nonce: true,
    headers: {
      contentSecurityPolicy: {
        'base-uri': ["'self'"],
        'font-src': ["'self'", 'https:', 'data:'],
        'form-action': ["'self'"],
        'frame-ancestors': ["'self'"],
        'img-src': ["'self'", 'data:', 'https:'],
        'object-src': ["'none'"],
        'script-src': [
          "'self'",
          "'strict-dynamic'",
          "'nonce-{{nonce}}'",
          'https://www.google.com',
          'https://www.gstatic.com'
        ],
        'script-src-attr': ["'unsafe-hashes'"],
        'style-src': [
          "'self'",
          "'unsafe-inline'"
        ],
        'connect-src': [
          "'self'",
          'https://www.google.com',
          'https://api.emailjs.com',
          'https://api.iconify.design'
        ],
        'frame-src': ['https://www.google.com']
      },
      xFrameOptions: 'SAMEORIGIN',
      xContentTypeOptions: 'nosniff',
      referrerPolicy: 'strict-origin-when-cross-origin',
      permissionsPolicy: {
        'camera': ['()'],
        'microphone': ['()'],
        'geolocation': ['()']
      },
      strictTransportSecurity: {
        maxAge: 31536000,
        includeSubdomains: true,
        preload: true
      }
    }
  }
})