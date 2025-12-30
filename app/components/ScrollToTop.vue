<script setup lang="ts">
const isVisible = ref(false)

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const handleScroll = () => {
  if (typeof window !== 'undefined') {
    isVisible.value = window.scrollY > 300
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial scroll position
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <Transition name="fade">
    <button
      v-if="isVisible"
      @click="scrollToTop"
      class="scroll-to-top-button fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center"
      aria-label="Scroll to top"
    >
      <Icon name="heroicons:arrow-up" class="w-6 h-6 text-white" />
    </button>
  </Transition>
</template>

<style scoped>
.scroll-to-top-button {
  background: linear-gradient(135deg, rgb(7 0 77), rgb(45 130 183));
  box-shadow: 0 4px 12px rgba(7, 0, 77, 0.3);
}

.scroll-to-top-button:hover {
  box-shadow: 0 6px 16px rgba(7, 0, 77, 0.4);
  transform: translateY(-2px) scale(1.1);
}

.scroll-to-top-button:active {
  transform: translateY(0) scale(1.05);
}

.scroll-to-top-button:focus {
  ring-color: rgb(7 0 77);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.9);
}
</style>

