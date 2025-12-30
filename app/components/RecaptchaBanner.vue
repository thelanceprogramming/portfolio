<script setup lang="ts">
const isVisible = ref(false)

onMounted(() => {
  if (typeof window !== 'undefined') {
    const dismissed = localStorage.getItem('recaptcha-banner-dismissed')
    if (!dismissed) {
      isVisible.value = true
    }
  }
})

const dismissBanner = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('recaptcha-banner-dismissed', 'true')
    isVisible.value = false
  }
}
</script>

<template>
  <div
    v-if="isVisible"
    class="recaptcha-banner fixed bottom-0 left-0 right-0 bg-neutral-900 text-white z-50"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div class="flex items-center justify-between gap-4">
        <p class="text-sm sm:text-base flex-1 text-center md:text-left">
          This site uses Google reCAPTCHA to protect forms and prevent spam.
          <NuxtLink
            to="/privacy"
            class="underline hover:no-underline font-medium"
          >
            Learn more in the Privacy Policy
          </NuxtLink>
        </p>
        <button
          @click="dismissBanner"
          class="flex-shrink-0 p-1 hover:bg-gray-800 rounded transition-colors duration-200"
          aria-label="Close banner"
        >
          <Icon name="heroicons:x-mark" class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recaptcha-banner {
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}
</style>

