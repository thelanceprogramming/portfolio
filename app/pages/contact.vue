<script setup lang="ts">
import emailjs from '@emailjs/browser'

useHead({
  title: 'Contact | Lance Javate',
  meta: [
    {
      name: 'description',
      content: 'Get in touch with Lance Javate. Have a project in mind? Let\'s create something that leaves an impression.'
    }
  ],
  script: [
    {
      src: 'https://www.google.com/recaptcha/api.js?render=6LfkEzssAAAAAMVUa5mxLk-ECbvysMDAhWvBk4NT',
      async: true,
      defer: true
    }
  ]
})

const config = useRuntimeConfig()
const emailjsConfig = config.public.emailjs
const recaptchaSiteKey = computed(() => config.public.recaptcha.siteKey || '')

const socialLinks = [
  {
    name: 'GitHub',
    icon: 'devicon:github',
    url: 'https://github.com/thelanceprogramming'
  },
  {
    name: 'LinkedIn',
    icon: 'simple-icons:linkedin',
    url: 'https://www.linkedin.com/in/thelanceprogramming'
  },
  {
    name: 'Facebook',
    icon: 'simple-icons:facebook',
    url: 'https://www.facebook.com/thelanceprogramming'
  }
]

const formData = reactive({
  name: '',
  email: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  message: '',
  recaptcha: ''
})

const submitStatus = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const isSubmitting = computed(() => submitStatus.value === 'loading')
const errorMessage = ref('')

// Initialize reCAPTCHA v3
const initRecaptcha = () => {
  if (typeof window === 'undefined' || !recaptchaSiteKey.value) return
  
  if ((window as any).grecaptcha) {
    try {
      (window as any).grecaptcha.ready(() => {
        // reCAPTCHA v3 is ready
      })
    } catch (error) {
      console.error('reCAPTCHA initialization error:', error)
    }
  } else {
    setTimeout(initRecaptcha, 100)
  }
}

onMounted(() => {
  if (recaptchaSiteKey.value) {
    initRecaptcha()
  }
})

// Execute reCAPTCHA v3 and get token
const executeRecaptcha = async (): Promise<string | null> => {
  if (!recaptchaSiteKey.value || typeof window === 'undefined') {
    return null
  }

  return new Promise((resolve) => {
    if ((window as any).grecaptcha) {
      try {
        (window as any).grecaptcha.ready(() => {
          (window as any).grecaptcha
            .execute(recaptchaSiteKey.value, { action: 'submit' })
            .then((token: string) => {
              resolve(token)
            })
            .catch(() => {
              errors.recaptcha = 'reCAPTCHA verification failed. Please try again.'
              resolve(null)
            })
        })
      } catch (error) {
        errors.recaptcha = 'reCAPTCHA verification failed. Please try again.'
        resolve(null)
      }
    } else {
      errors.recaptcha = 'reCAPTCHA is not loaded. Please refresh the page.'
      resolve(null)
    }
  })
}

const validateField = (fieldName: keyof typeof formData) => {
  const field = formData[fieldName]
  
  switch (fieldName) {
    case 'name':
      if (!field || field.trim().length === 0) {
        errors.name = 'Name is required'
      } else if (field.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters'
      } else {
        errors.name = ''
      }
      break
    case 'email':
      if (!field || field.trim().length === 0) {
        errors.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field)) {
        errors.email = 'Please enter a valid email address'
      } else {
        errors.email = ''
      }
      break
    case 'message':
      if (!field || field.trim().length === 0) {
        errors.message = 'Message is required'
      } else if (field.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters'
      } else {
        errors.message = ''
      }
      break
  }
}

const validateForm = (): boolean => {
  validateField('name')
  validateField('email')
  validateField('message')
  
  return !errors.name && !errors.email && !errors.message
}

const handleSubmit = async () => {
  errorMessage.value = ''
  errors.recaptcha = ''
  
  if (!validateForm()) {
    return
  }
  
  submitStatus.value = 'loading'
  
  try {
    // Execute reCAPTCHA v3
    let recaptchaToken = ''
    if (recaptchaSiteKey.value) {
      recaptchaToken = await executeRecaptcha()
      if (!recaptchaToken) {
        submitStatus.value = 'idle'
        return
      }
    }
    
    const now = new Date()
    const formattedTime = now.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
    
    const templateParams = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
      time: formattedTime,
      ...(recaptchaToken && { 'g-recaptcha-response': recaptchaToken })
    }
    
    await emailjs.send(
      emailjsConfig.serviceId,
      emailjsConfig.templateId,
      templateParams,
      emailjsConfig.publicKey
    )
    
    submitStatus.value = 'success'
    
    formData.name = ''
    formData.email = ''
    formData.message = ''
    
    setTimeout(() => {
      submitStatus.value = 'idle'
    }, 5000)
    
  } catch (error: any) {
    submitStatus.value = 'error'
    errorMessage.value = error.text || 'Failed to send message. Please try again.'
  }
}
</script>

<template>
  <section class="contact-page bg-white py-12 sm:py-16 lg:py-20">
    <div class="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div class="flex flex-col">
          <div class="mb-8">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-4">
              Get In Touch
            </h1>
            <p class="text-lg sm:text-xl text-neutral-700 leading-relaxed">
              Have a project in mind? Let's create something that leaves an impression.
            </p>
          </div>

          <div class="mb-8">
            <h2 class="text-xl sm:text-2xl font-bold text-neutral-900 mb-4">Follow Me</h2>
            <div class="flex items-center gap-4">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link group"
                :aria-label="social.name"
              >
                <Icon
                  :name="social.icon"
                  class="w-6 h-6 transition-all duration-300"
                />
              </a>
            </div>
          </div>

          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary-600 shrink-0">
                <Icon name="heroicons:envelope" class="w-5 h-5 text-white" />
              </div>
              <div>
                <a
                  href="mailto:lancejavate2002@gmail.com"
                  class="text-base sm:text-lg text-neutral-900 hover:text-primary-600 transition-colors duration-200"
                >
                  lancejavate2002@gmail.com
                </a>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary-600 shrink-0">
                <Icon name="heroicons:phone" class="w-5 h-5 text-white" />
              </div>
              <div>
                <a
                  href="tel:+639608997507"
                  class="text-base sm:text-lg text-neutral-900 hover:text-primary-600 transition-colors duration-200"
                >
                  +639608997507
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="contact-form-card bg-white rounded-xl border border-neutral-200 shadow-md p-8 lg:p-12">
          <div
            v-if="submitStatus === 'success'"
            class="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-800"
          >
            <div class="flex items-center gap-3">
              <Icon name="heroicons:check-circle" class="w-6 h-6 text-green-600 shrink-0" />
              <div>
                <p class="font-semibold">Message sent successfully!</p>
                <p class="text-sm mt-1">I'll get back to you as soon as possible.</p>
              </div>
            </div>
          </div>

          <div
            v-if="submitStatus === 'error'"
            class="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800"
          >
            <div class="flex items-center gap-3">
              <Icon name="heroicons:exclamation-circle" class="w-6 h-6 text-red-600 shrink-0" />
              <div>
                <p class="font-semibold">Something went wrong</p>
                <p class="text-sm mt-1">{{ errorMessage || 'Please try again later or contact me directly.' }}</p>
              </div>
            </div>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-neutral-900 mb-2">
                Name <span class="text-red-500">*</span>
              </label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                :class="[
                  'w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent',
                  errors.name ? 'border-red-500 bg-red-50' : 'border-neutral-300 bg-white focus:bg-white'
                ]"
                placeholder="Your name"
                @blur="validateField('name')"
              />
              <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-neutral-900 mb-2">
                Email <span class="text-red-500">*</span>
              </label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                required
                :class="[
                  'w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent',
                  errors.email ? 'border-red-500 bg-red-50' : 'border-neutral-300 bg-white focus:bg-white'
                ]"
                placeholder="your.email@example.com"
                @blur="validateField('email')"
              />
              <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-neutral-900 mb-2">
                Message <span class="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                v-model="formData.message"
                required
                rows="6"
                :class="[
                  'w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent resize-y',
                  errors.message ? 'border-red-500 bg-red-50' : 'border-neutral-300 bg-white focus:bg-white'
                ]"
                placeholder="Tell me about your project..."
                @blur="validateField('message')"
              />
              <p v-if="errors.message" class="mt-1 text-sm text-red-600">{{ errors.message }}</p>
            </div>

            <p v-if="errors.recaptcha" class="text-sm text-red-600">{{ errors.recaptcha }}</p>

            <div class="pt-2">
              <button
                type="submit"
                :disabled="isSubmitting || submitStatus === 'success'"
                class="w-full sm:w-auto px-8 py-3 rounded-lg font-medium transition-all duration-300 bg-primary-600 text-white hover:bg-primary-700 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none effect-shine relative overflow-hidden"
              >
                <span class="button-content flex items-center justify-center gap-2">
                  <Icon
                    v-if="isSubmitting"
                    name="heroicons:arrow-path"
                    class="w-5 h-5 animate-spin"
                  />
                  <Icon
                    v-else-if="submitStatus === 'success'"
                    name="heroicons:check"
                    class="w-5 h-5"
                  />
                  <span>{{ isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Sent!' : 'Send Message' }}</span>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-page {
  min-height: calc(100vh - 200px);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  color: rgb(55 65 81);
  background: rgba(7, 0, 77, 0.05);
  border: 1px solid rgba(7, 0, 77, 0.1);
  transition: all 0.3s ease;
}

.social-link:hover {
  background: rgba(7, 0, 77, 0.1);
  border-color: rgba(7, 0, 77, 0.2);
  color: rgb(7 0 77);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(7, 0, 77, 0.15);
}

input:focus,
textarea:focus {
  box-shadow: 0 0 0 3px rgba(7, 0, 77, 0.1);
}

.effect-shine::before {
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  content: "";
  display: block;
  height: 100%;
  left: -75%;
  position: absolute;
  top: 0;
  transform: skewX(-25deg);
  width: 50%;
  z-index: 10;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.effect-shine:hover::before,
.effect-shine:focus::before {
  opacity: 1;
  animation: shine 0.85s;
}

@keyframes shine {
  0% {
    left: -75%;
  }
  100% {
    left: 125%;
  }
}

.button-content {
  position: relative;
  z-index: 1;
}

@media (max-width: 1023px) {
  .contact-page {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}

@media (max-width: 767px) {
  .contact-form-card {
    padding: 2rem 1.5rem;
  }
}
</style>
