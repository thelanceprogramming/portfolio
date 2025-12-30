<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen flex flex-col bg-neutral-50">
    <Header />
    <main class="flex-1 bg-neutral-50">
      <slot />
    </main>
    <Footer />
  </div>
</template>
