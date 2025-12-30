<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary'
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  type: 'button'
})

defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-all duration-300'
  
  if (props.variant === 'primary') {
    return `${baseClasses} bg-primary-600 text-white hover:bg-primary-700 transform active:scale-95 effect-shine relative overflow-hidden`
  } else {
    return `${baseClasses} text-primary-600 hover:text-primary-700 active:scale-95 secondary-button-enhanced relative`
  }
})
</script>

<template>
  <button
    :type="type"
    :class="buttonClasses"
    class="cursor-pointer"
    @click="$emit('click', $event)"
  >
    <span class="button-content">
      <slot />
    </span>
  </button>
</template>

<style scoped>
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

.secondary-button-enhanced {
  position: relative;
  background: transparent;
  border: 2px solid rgb(7 0 77);
  transition: all 0.3s ease;
  color: rgb(7 0 77) !important;
}

.secondary-button-enhanced::before {
  content: "";
  position: absolute;
  inset: 2px;
  background: linear-gradient(135deg, rgba(7, 0, 77, 0.08), rgba(45, 130, 183, 0.08));
  border-radius: calc(0.5rem - 2px);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
  pointer-events: none;
}

.secondary-button-enhanced:hover::before {
  opacity: 1;
}

.secondary-button-enhanced::after {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: 0.5rem;
  padding: 2px;
  background: linear-gradient(135deg, rgb(7 0 77), rgb(45 130 183), rgb(7 0 77));
  background-size: 200% 200%;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
  animation: none;
  pointer-events: none;
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
}

.secondary-button-enhanced:hover {
  border-color: transparent;
}

.secondary-button-enhanced:hover::after {
  opacity: 1;
  animation: gradientMove 2s ease-in-out infinite;
}

@keyframes gradientMove {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.secondary-button-enhanced {
  isolation: isolate;
}

.button-content {
  position: relative;
  z-index: 1;
}
</style>
