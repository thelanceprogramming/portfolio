<script setup lang="ts">
import projectsData from '~/data/projects.json'

const projects = projectsData.projects

const webApps = computed(() => projects.filter(p => p.type === 'web-app'))
const landingPages = computed(() => projects.filter(p => p.type === 'landing-page'))

useHead({
  title: 'Portfolio | Lance Javate',
  meta: [
    {
      name: 'description',
      content: 'Explore my portfolio of web applications and landing pages. See projects built with Vue.js, Nuxt.js, Laravel, Next.js, and more.'
    }
  ]
})
</script>

<template>
  <section class="portfolio-page bg-white py-12 sm:py-16 lg:py-20">
    <div class="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12 sm:mb-16">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-4">
          My Portfolio
        </h1>
        <p class="text-lg sm:text-xl text-neutral-700 max-w-2xl mx-auto">
          A collection of web applications and landing pages I've built
        </p>
      </div>

      <div class="mb-16 sm:mb-20">
        <h2 class="text-3xl sm:text-4xl font-bold text-neutral-900 mb-8 sm:mb-12">
          Web Applications
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div
            v-for="project in webApps"
            :key="project.id"
            class="project-card bg-white rounded-xl overflow-hidden border border-neutral-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div class="project-image-wrapper relative overflow-hidden">
              <div class="relative group">
                <div class="project-image-container aspect-4/3 overflow-hidden bg-linear-to-br from-neutral-50 to-primary-600/10">
                  <NuxtImg
                    :src="project.image"
                    :alt="project.title"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    width="800"
                    height="600"
                  />
                  <div
                    class="absolute inset-0 bg-linear-to-t from-primary-600/90 via-primary-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  ></div>
                </div>
              </div>
            </div>

            <div class="project-content p-6 space-y-4">
              <h3 class="text-xl sm:text-2xl font-bold text-neutral-900">
                {{ project.title }}
              </h3>

              <p class="text-sm sm:text-base text-neutral-700 leading-relaxed">
                {{ project.description }}
              </p>

              <div class="flex flex-wrap gap-2">
                <div
                  v-for="tech in project.technologies"
                  :key="tech.name"
                  class="tech-badge flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-neutral-200 transition-all duration-300"
                >
                  <Icon
                    :name="tech.icon"
                    class="w-4 h-4 text-primary-600 tech-badge-icon"
                  />
                  <span class="text-xs sm:text-sm font-medium text-neutral-700">
                    {{ tech.name }}
                  </span>
                </div>
              </div>

              <div class="flex flex-wrap gap-3 pt-2">
                <a
                  v-if="project.liveUrl && project.liveUrl !== '#'"
                  :href="project.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 text-primary-600 hover:text-primary-700 active:scale-95 secondary-button-enhanced relative text-sm"
                >
                  <Icon name="mdi:open-in-new" class="w-4 h-4" />
                  <span>Live Site</span>
                </a>
                <a
                  v-if="project.githubUrl && project.githubUrl !== '#'"
                  :href="project.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="github-button inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 text-primary-600 hover:text-primary-700 active:scale-95 secondary-button-enhanced relative text-sm"
                >
                  <Icon name="devicon:github" class="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 class="text-3xl sm:text-4xl font-bold text-neutral-900 mb-8 sm:mb-12">
          Landing Pages
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div
            v-for="project in landingPages"
            :key="project.id"
            class="project-card bg-white rounded-xl overflow-hidden border border-neutral-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div class="project-image-wrapper relative overflow-hidden">
              <div class="relative group">
                <div class="project-image-container aspect-16/10 overflow-hidden bg-linear-to-br from-neutral-50 to-primary-600/10">
                  <NuxtImg
                    :src="project.image"
                    :alt="project.title"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    width="1200"
                    height="750"
                  />
                  <div
                    class="absolute inset-0 bg-linear-to-t from-primary-600/90 via-primary-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  ></div>
                </div>
              </div>
            </div>

            <div class="project-content p-6 space-y-4">
              <h3 class="text-xl sm:text-2xl font-bold text-neutral-900">
                {{ project.title }}
              </h3>

              <p class="text-sm sm:text-base text-neutral-700 leading-relaxed">
                {{ project.description }}
              </p>

              <div class="flex flex-wrap gap-2">
                <div
                  v-for="tech in project.technologies"
                  :key="tech.name"
                  class="tech-badge flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-neutral-200 transition-all duration-300"
                >
                  <Icon
                    :name="tech.icon"
                    class="w-4 h-4 text-primary-600 tech-badge-icon"
                  />
                  <span class="text-xs sm:text-sm font-medium text-neutral-700">
                    {{ tech.name }}
                  </span>
                </div>
              </div>

              <div class="flex flex-wrap gap-3 pt-2">
                <a
                  v-if="project.liveUrl && project.liveUrl !== '#'"
                  :href="project.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 text-primary-600 hover:text-primary-700 active:scale-95 secondary-button-enhanced relative text-sm"
                >
                  <Icon name="mdi:open-in-new" class="w-4 h-4" />
                  <span>Live Site</span>
                </a>
                <a
                  v-if="project.githubUrl && project.githubUrl !== '#'"
                  :href="project.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="github-button inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 text-primary-600 hover:text-primary-700 active:scale-95 secondary-button-enhanced relative text-sm"
                >
                  <Icon name="devicon:github" class="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.portfolio-page {
  min-height: calc(100vh - 200px);
}

.project-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.project-image-wrapper {
  position: relative;
  width: 100%;
}

.project-image-container {
  background: linear-gradient(135deg, rgba(7, 0, 77, 0.1), rgba(45, 130, 183, 0.1));
  border-bottom: 1px solid rgba(7, 0, 77, 0.1);
}

.project-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.tech-badge {
  background-color: rgb(255 255 255) !important;
  cursor: default;
}

.tech-badge:hover {
  background: rgba(7, 0, 77, 0.05) !important;
  border-color: rgba(7, 0, 77, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(7, 0, 77, 0.1);
}

.tech-badge-icon {
  transition: transform 0.3s ease;
}

.tech-badge:hover .tech-badge-icon {
  transform: scale(1.1);
}

.github-button.secondary-button-enhanced {
  position: relative;
  background: transparent;
  border: 2px solid rgb(7 0 77);
  transition: all 0.3s ease;
}

.github-button.secondary-button-enhanced::before {
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

.github-button.secondary-button-enhanced:hover::before {
  opacity: 1;
}

.github-button.secondary-button-enhanced::after {
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

.github-button.secondary-button-enhanced:hover {
  border-color: transparent;
}

.github-button.secondary-button-enhanced:hover::after {
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

.github-button.secondary-button-enhanced {
  isolation: isolate;
}

.github-button .button-content {
  position: relative;
  z-index: 1;
}

@media (max-width: 767px) {
  .project-card {
    max-width: 100%;
  }
}
</style>
