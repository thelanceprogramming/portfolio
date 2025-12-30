<script setup lang="ts">
interface Props {
  headline: string
  tagline: string
}

defineProps<Props>()
</script>

<template>
  <section class="cta-section">
    <div class="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="cta-content">
        <h2 class="cta-headline">{{ headline }}</h2>
        <p class="cta-tagline">{{ tagline }}</p>
        <div class="cta-buttons">
          <NuxtLink
            to="/contact"
            class="cta-primary-button inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 bg-white text-primary-600 hover:bg-neutral-50 transform active:scale-95 effect-shine relative overflow-hidden"
          >
            <span>Contact Me</span>
          </NuxtLink>
          <a
            href="https://github.com/thelanceprogramming"
            target="_blank"
            rel="noopener noreferrer"
            class="cta-secondary-button inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 text-white border-2 border-white hover:border-transparent secondary-button-outline relative"
          >
            <Icon name="simple-icons:github" class="w-5 h-5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  background: linear-gradient(to bottom, rgb(45 130 183), rgb(7 0 77));
}

.cta-content {
  text-align: center;
  color: white;
}

.cta-headline {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
}

.cta-tagline {
  font-size: 1.125rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 2xl;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.cta-primary-button {
  position: relative;
}

.cta-primary-button.effect-shine::before {
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(192, 192, 192, 0.6) 50%,
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

.cta-primary-button.effect-shine:hover::before,
.cta-primary-button.effect-shine:focus::before {
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

.cta-primary-button span,
.cta-primary-button .icon {
  position: relative;
  z-index: 1;
}

.cta-secondary-button {
  position: relative;
  isolation: isolate;
}

.cta-secondary-button::before {
  content: "";
  position: absolute;
  inset: 2px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border-radius: calc(0.5rem - 2px);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
  pointer-events: none;
}

.cta-secondary-button:hover::before {
  opacity: 1;
}

.cta-secondary-button::after {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: 0.5rem;
  padding: 2px;
  background: linear-gradient(135deg, rgba(192, 192, 192, 0.9), rgba(255, 255, 255, 0.9), rgba(192, 192, 192, 0.9));
  background-size: 200% 200%;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
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

.cta-secondary-button:hover {
  border-color: transparent;
}

.cta-secondary-button:hover::after {
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

.cta-secondary-button span,
.cta-secondary-button .icon {
  position: relative;
  z-index: 1;
}

@media (min-width: 640px) {
  .cta-headline {
    font-size: 2.5rem;
  }
  
  .cta-tagline {
    font-size: 1.25rem;
  }
}

@media (min-width: 1024px) {
  .cta-headline {
    font-size: 3rem;
  }
  
  .cta-tagline {
    font-size: 1.5rem;
  }
}
</style>

