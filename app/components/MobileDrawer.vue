<script setup lang="ts">
interface NavigationItem {
  label: string
  to: string
}

interface Props {
  modelValue: boolean
  navigationItems: NavigationItem[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const handleLinkClick = () => {
  emit('update:modelValue', false)
}

const route = useRoute()
watch(() => route.path, () => {
  emit('update:modelValue', false)
})

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

const getIconForRoute = (route: string) => {
  const iconMap: Record<string, string> = {
    '/': 'heroicons:home',
    '/about': 'heroicons:user',
    '/portfolio': 'heroicons:briefcase',
    '/contact': 'heroicons:envelope'
  }
  return iconMap[route] || 'heroicons:link'
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 bg-black/50 z-[90] md:hidden backdrop-blur-sm"
        @click="$emit('update:modelValue', false)"
      />
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <aside
        v-if="modelValue"
        class="drawer-container fixed top-0 left-0 h-full z-[100] md:hidden overflow-y-auto"
      >
        <div class="gradient-accent-top"></div>

        <div class="drawer-header">
          <div class="flex items-center justify-between p-4 gap-3">
            <NuxtLink
              to="/"
              @click="handleLinkClick"
              class="logo-link flex items-center gap-3 group flex-1 min-w-0"
            >
              <NuxtImg
                src="/logo.svg"
                alt="Portfolio Logo"
                class="h-10 w-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                loading="eager"
              />
              <span class="header-brand-name text-base font-bold font-heading">
                thelanceprogramming
              </span>
            </NuxtLink>
            <button
              @click="$emit('update:modelValue', false)"
              class="close-button flex items-center justify-center rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 flex-shrink-0"
              aria-label="Close menu"
            >
              <Icon name="heroicons:x-mark" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav class="p-4 pt-6">
          <ul class="flex flex-col gap-2">
            <li
              v-for="(item, index) in navigationItems"
              :key="item.to"
              class="nav-item-wrapper"
              :style="{ animationDelay: `${index * 60}ms` }"
            >
              <NuxtLink
                :to="item.to"
                @click="handleLinkClick"
                class="nav-link group relative flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300"
                active-class="nav-link-active"
              >
                <Icon
                  :name="getIconForRoute(item.to)"
                  class="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                />
                <span class="nav-link-text">{{ item.label }}</span>
                <div class="nav-link-indicator"></div>
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drawer-container {
  background: #fafafa;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 20rem;
  z-index: 100;
}

.gradient-accent-top {
  height: 4px;
  background: linear-gradient(to right, rgb(7 0 77), rgb(45 130 183));
  background-size: 200% 100%;
  animation: gradientMove 3s ease-in-out infinite;
}

@keyframes gradientMove {
  0%, 100% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 0%;
  }
}

.drawer-header {
  border-bottom: 1px solid rgba(7, 0, 77, 0.1);
}

.logo-link {
  text-decoration: none;
  color: inherit;
}

.close-button {
  color: rgb(55 65 81);
  background: rgba(7, 0, 77, 0.05);
  border: 1px solid rgba(7, 0, 77, 0.1);
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  background: rgba(7, 0, 77, 0.1);
  border-color: rgba(7, 0, 77, 0.2);
  box-shadow: 0 2px 8px rgba(7, 0, 77, 0.15);
}

.nav-item-wrapper {
  opacity: 0;
  transform: translateX(-16px);
  animation: slideIn 0.4s ease-out forwards;
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.nav-link {
  color: rgb(55 65 81);
  background: transparent;
  position: relative;
}

.nav-link:hover {
  background: rgba(7, 0, 77, 0.08);
  transform: translateX(4px);
  color: rgb(7 0 77);
}

.nav-link-active {
  background: linear-gradient(135deg, rgba(7, 0, 77, 0.15), rgba(45, 130, 183, 0.15));
  color: rgb(7 0 77);
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(7, 0, 77, 0.1);
  border: 1px solid rgba(7, 0, 77, 0.2);
}

.nav-link-indicator {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%) scaleY(0);
  width: 3px;
  height: 50%;
  background: linear-gradient(to bottom, rgb(7 0 77), rgb(45 130 183));
  border-radius: 0 2px 2px 0;
  transition: transform 0.3s ease;
}

.nav-link-active .nav-link-indicator {
  transform: translateY(-50%) scaleY(1);
}

.nav-link-text {
  transition: transform 0.2s ease;
}

.nav-link:hover .nav-link-text {
  transform: translateX(2px);
}

.header-brand-name {
  background: linear-gradient(135deg, rgb(7 0 77), rgb(45 130 183));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

</style>
