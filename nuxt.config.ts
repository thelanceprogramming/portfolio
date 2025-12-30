// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui'
  ],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    // Private keys (server-side only)
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
          src: 'https://www.google.com/recaptcha/api.js',
          async: true,
          defer: true
        }
      ]
    }
  }
})