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
    public: {
      emailjs: {
        serviceId: 'service_h3ydxc9',
        templateId: 'template_792dty6',
        publicKey: 't0RJLM_Cy2pPzNpb0'
      },
      recaptcha: {
        siteKey: '' // Add your reCAPTCHA Site Key here
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