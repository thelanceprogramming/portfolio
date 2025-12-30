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
      script: [
        {
          src: 'https://www.google.com/recaptcha/api.js?render=6LfkEzssAAAAAMVUa5mxLk-ECbvysMDAhWvBk4NT',
          async: true,
          defer: true
        }
      ]
    }
  },
  image: {
    // Ensure images are rendered during SSR
    provider: 'ipx',
    quality: 80,
    format: ['webp', 'jpg'],
    // Enable SSR rendering
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
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
          "'nonce-{{nonce}}'",
          "'unsafe-inline'"
        ],
        'connect-src': [
          "'self'",
          'https://www.google.com',
          'https://api.emailjs.com'
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