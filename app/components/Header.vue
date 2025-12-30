<script setup lang="ts">
import navigationData from '~/data/navigation.json'

interface NavigationItem {
  label: string
  to: string
}

const navigationItems = navigationData as NavigationItem[]
const isDrawerOpen = ref(false)
</script>

<template>
  <header class="header-component border-b border-gray-300 sticky top-0 z-50 bg-neutral-50 backdrop-blur-sm">
    <nav class="relative flex items-center justify-between py-4">
      <div class="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">
        <NuxtLink
          to="/"
          class="brand-container effect-shine group flex items-center gap-3"
        >
          <Logo />
          <span class="header-brand-name text-lg font-bold font-heading hidden lg:block relative z-10">
            thelanceprogramming
          </span>
        </NuxtLink>

        <ul class="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-8">
          <li v-for="item in navigationItems" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="nav-link relative text-gray-700 font-medium transition-all duration-300 hover:text-primary-600"
              active-class="nav-link-active"
            >
              <span class="relative z-10">{{ item.label }}</span>
              <span class="nav-link-indicator"></span>
            </NuxtLink>
          </li>
        </ul>

        <button
          @click="isDrawerOpen = true"
          class="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
          aria-label="Open menu"
        >
          <Icon name="heroicons:bars-3" class="w-6 h-6" />
        </button>
      </div>
    </nav>

    <MobileDrawer v-model="isDrawerOpen" :navigation-items="navigationItems" />
  </header>
</template>

<style scoped>
header {
  background-color: rgb(250 250 250) !important;
}

.nav-link {
  position: relative;
  padding: 0.5rem 0;
  color: rgb(55 65 81);
}

.nav-link-active {
  color: rgb(7 0 77);
  font-weight: 600;
}

.nav-link-indicator {
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(to right, rgb(7 0 77), rgb(45 130 183));
  border-radius: 2px;
  transition: width 0.3s ease;
}

.nav-link-active .nav-link-indicator {
  width: 100%;
}

.nav-link:not(.nav-link-active):hover .nav-link-indicator {
  width: 100%;
  opacity: 0.5;
}

.brand-container {
  position: relative;
  overflow: visible;
}

.brand-container.effect-shine::before {
  background: linear-gradient(
    to right,
    rgba(47, 47, 47, 0) 0%,
    rgba(250, 250, 250, 0.7) 100%
  );
  content: "";
  display: block;
  height: 100%;
  left: -75%;
  position: absolute;
  top: 0;
  transform: skewX(-25deg);
  width: 50%;
  z-index: 30;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.brand-container.effect-shine:hover::before,
.brand-container.effect-shine:focus::before {
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

.header-brand-name {
  background: linear-gradient(135deg, rgb(7 0 77), rgb(45 130 183));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  text-decoration: none;
}

</style>
