<script setup lang="ts">
</script>

<template>
  <div class="logo-container effect-shine group flex items-center justify-center transition-all duration-300 ease-in-out">
    <ClientOnly>
      <NuxtImg
        src="/logo.svg"
        alt="Portfolio Logo"
        class="h-16 w-16 relative z-10"
        loading="eager"
      />
      <template #fallback>
        <img
          src="/logo.svg"
          alt="Portfolio Logo"
          class="h-16 w-16 relative z-10"
          loading="eager"
        />
      </template>
    </ClientOnly>
  </div>
</template>

<style scoped>
.logo-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
</style>
