<script setup lang="ts">
  import projectsData from '~/data/projects.json'
  import Button from '~/components/Button.vue'
  
  const data = projectsData
  const featuredProjects = computed(() => data.projects.filter(project => project.is_featured === true))
  const projectsWrapperRef = ref<HTMLElement | null>(null)
  const projectsContainerRef = ref<HTMLElement | null>(null)
  const sectionRef = ref<HTMLElement | null>(null)
  const scrollSpacerRef = ref<HTMLElement | null>(null)
  
  const isMarqueePaused = ref(false)
  
  let rafId: number | null = null
  let initialSectionTop = 0
  let hasInitialized = false
  
  const updateScroll = () => {
    if (!projectsContainerRef.value || !projectsWrapperRef.value || !sectionRef.value) return
    
    const containerWidth = projectsContainerRef.value.scrollWidth
    const wrapperWidth = projectsWrapperRef.value.clientWidth
    const scrollDistance = Math.max(0, containerWidth - wrapperWidth)
    
    if (scrollDistance <= 0) {
      projectsContainerRef.value.style.transform = 'translateX(0px)'
      if (scrollSpacerRef.value) scrollSpacerRef.value.style.height = '0px'
      return
    }
    
    const currentScrollY = window.scrollY
    const sectionRect = sectionRef.value.getBoundingClientRect()
    const stickyTop = 100
    
    const sectionTop = initialSectionTop
    
    const baseScrollStartY = sectionTop - stickyTop
    let scrollStartY = baseScrollStartY
    
    const briefAboutSection = document.querySelector('.brief-about-section')
    if (briefAboutSection) {
      const briefAboutRect = briefAboutSection.getBoundingClientRect()
      
      const briefAboutEndScroll = currentScrollY + briefAboutRect.bottom
      
      if (briefAboutEndScroll > baseScrollStartY) {
        scrollStartY = briefAboutEndScroll
      }
    }
    
    const scrollDuration = window.innerHeight * 1.5
    
    const scrollProgress = currentScrollY - scrollStartY
    const progress = Math.max(0, Math.min(1, scrollProgress / scrollDuration))
    
    const translateX = progress * scrollDistance
    projectsContainerRef.value.style.transform = `translateX(-${translateX}px)`
    
    if (scrollSpacerRef.value) {
      scrollSpacerRef.value.style.height = `${scrollDuration}px`
    }
  }
  
  const handleScroll = () => {
    if (rafId) cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(updateScroll)
  }
  
  const handleResize = () => {
    hasInitialized = false
    initialSectionTop = 0
    if (rafId) cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(updateScroll)
  }
  
  onMounted(() => {
    nextTick(() => {
      if (sectionRef.value) {
        const sectionRect = sectionRef.value.getBoundingClientRect()
        initialSectionTop = window.scrollY + sectionRect.top
        hasInitialized = true
      }
      updateScroll()
      window.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', handleResize, { passive: true })
    })
  })
  
  onUnmounted(() => {
    if (rafId) cancelAnimationFrame(rafId)
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)
  })
</script>

<template>
  <div class="projects-section-wrapper">
    <section ref="sectionRef" class="projects-section bg-white">
      <div class="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div class="space-y-4">
          <h2 class="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 text-center">
            {{ data.sectionTitle }}
          </h2>

          <div class="projects-wrapper" ref="projectsWrapperRef">
            <div class="projects-container" ref="projectsContainerRef">
              <div
                v-for="project in featuredProjects"
                :key="project.id"
                class="project-item"
              >
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 items-center">
                <div class="project-image-wrapper">
                  <div class="relative group">
                    <div class="relative project-image-container overflow-hidden rounded-lg lg:rounded-xl">
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

                      <a
                        :href="project.githubUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="github-button-overlay absolute top-3 right-3 lg:hidden inline-flex cursor-pointer px-4 py-2 rounded-lg font-medium transition-all duration-300 text-neutral-900 bg-white hover:bg-neutral-100 active:scale-95 z-10 shadow-lg"
                      >
                        <Icon name="devicon:github" class="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div class="project-content space-y-6">
                  <h3
                    class="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900"
                  >
                    {{ project.title }}
                  </h3>

                  <p
                    class="text-base sm:text-lg text-neutral-700 leading-relaxed"
                  >
                    {{ project.description }}
                  </p>

                  <div class="hidden lg:flex flex-wrap gap-3">
                    <div
                      v-for="tech in project.technologies"
                      :key="tech.name"
                      class="tech-badge flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-neutral-200 transition-all duration-300"
                    >
                      <Icon
                        :name="tech.icon"
                        class="w-5 h-5 text-primary-600 tech-badge-icon"
                      />
                      <span
                        class="text-sm font-medium text-neutral-700"
                      >
                        {{ tech.name }}
                      </span>
                    </div>
                  </div>
                  
                  <div 
                    class="tech-badges-marquee lg:hidden"
                    @mouseenter="isMarqueePaused = true"
                    @mouseleave="isMarqueePaused = false"
                    @touchstart="isMarqueePaused = true"
                    @touchend="isMarqueePaused = false"
                  >
                    <div 
                      class="tech-badges-track"
                      :class="{ 'marquee-paused': isMarqueePaused }"
                    >
                      <div
                        v-for="tech in project.technologies"
                        :key="`first-${tech.name}`"
                        class="tech-badge flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-neutral-200 shrink-0"
                      >
                        <Icon
                          :name="tech.icon"
                          class="w-5 h-5 text-primary-600"
                        />
                        <span
                          class="text-sm font-medium text-neutral-700"
                        >
                          {{ tech.name }}
                        </span>
                      </div>
                      <div
                        v-for="tech in project.technologies"
                        :key="`second-${tech.name}`"
                        class="tech-badge flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-neutral-200 shrink-0"
                      >
                        <Icon
                          :name="tech.icon"
                          class="w-5 h-5 text-primary-600"
                        />
                        <span
                          class="text-sm font-medium text-neutral-700"
                        >
                          {{ tech.name }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="hidden lg:flex flex-wrap gap-4 pt-2">
                    <a
                      :href="project.githubUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="github-button inline-flex cursor-pointer px-6 py-3 rounded-lg font-medium transition-all duration-300 text-primary-600 hover:text-primary-700 active:scale-95 secondary-button-enhanced relative"
                    >
                      <span class="button-content flex items-center gap-2">
                        <Icon name="devicon:github" class="w-5 h-5" />
                        <span>GitHub</span>
                      </span>
                    </a>
                  </div>
                </div>
                </div>
              </div>
              
              <div class="project-item view-more-item">
                <div class="flex flex-col justify-center h-full min-h-[400px] space-y-6 text-left">
                  <h3 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900">
                    Interested?
                  </h3>
                  <p class="text-base sm:text-lg text-neutral-700 max-w-2xl leading-relaxed">
                    Want to see more of my work? Check out my complete portfolio and explore additional projects I've built.
                  </p>
                  <div class="w-full mt-6 flex justify-center overflow-visible">
                    <NuxtImg
                      src="/images/mockup-systems.svg"
                      alt="Project systems mockup"
                      class="mockup-image w-full h-auto"
                      loading="lazy"
                    />
                  </div>
                  <div class="flex justify-center">
                    <Button variant="primary" @click="navigateTo('/portfolio')">
                      View More Projects
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div ref="scrollSpacerRef" class="scroll-spacer"></div>
  </div>
</template>

<style scoped>
.projects-section-wrapper {
  position: relative;
}

.projects-section {
  scroll-margin-top: 80px;
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2rem 0;
  overflow: visible;
  background-color: rgb(255 255 255) !important;
}

.section-title {
  padding-bottom: 2rem;
  margin-bottom: 1rem;
}

.tech-badge {
  background-color: rgb(255 255 255) !important;
}

.github-button i {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
}

.projects-wrapper {
  position: sticky;
  top: 220px;
  overflow-x: hidden;
  overflow-y: visible;
  width: 100%;
  display: flex;
  align-items: center;
  min-height: calc(100vh - 220px);
}

.projects-container {
  display: flex;
  flex-direction: row;
  gap: 3rem;
  width: max-content;
  padding: 1rem 0;
  will-change: transform;
}

.project-item {
  flex-shrink: 0;
  width: 100vw;
  max-width: 1200px;
  padding: 0 2rem;
  box-sizing: border-box;
  opacity: 1;
}

.view-more-item {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: visible;
}

.view-more-item > div {
  overflow: visible;
}

.scroll-spacer {
  width: 100%;
  height: 0;

}

.project-image-wrapper {
  position: relative;
}

.project-image-container {
  background: linear-gradient(135deg, rgba(7, 0, 77, 0.1), rgba(45, 130, 183, 0.1));
  border: 1px solid rgba(7, 0, 77, 0.1);
}

.tech-badge {
  transition: all 0.3s ease;
  cursor: default;
}

.tech-badge:hover {
  background: rgba(7, 0, 77, 0.05);
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

@media (max-width: 1023px) {
  .projects-section {
    padding: 1.5rem 0 3rem 0;
  }

  .section-title {
    padding-bottom: 1rem;
    margin-bottom: 0.5rem;
  }

  .projects-wrapper {
    top: 180px;
    min-height: calc(100vh - 180px);
    max-height: none;
    padding: 0 0 4rem 0;
    overflow-y: visible;
    overflow-x: hidden;
  }

  .projects-container {
    gap: 2rem;
    padding: 1rem 0 2rem 0;
  }

  .project-item {
    width: 90vw;
    padding: 0 1rem;
    margin: 0;
    box-sizing: border-box;
  }

  .project-image-wrapper {
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .project-image-wrapper .relative.group {
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 100%;
  }

  .project-image-container {
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    overflow: hidden;
    border-radius: 0.75rem;
    box-sizing: border-box;
    position: relative;
    aspect-ratio: 16 / 10;
  }

  .project-image-container img,
  .project-image-container :deep(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    border-radius: 0.75rem;
  }
  
  .project-image-container picture,
  .project-image-container :deep(picture) {
    width: 100%;
    max-width: 100%;
    display: block;
  }
  
  .project-image-container :deep(source) {
    width: 100%;
  }

  .project-content {
    margin-top: 0.5rem;
  }

  .project-content > * + * {
    margin-top: 1rem !important;
  }

  .project-content > h3 + p {
    margin-top: 0.75rem !important;
  }

  .tech-badges-marquee {
    overflow: hidden !important;
    width: 100% !important;
    max-width: 100% !important;
    position: relative;
    padding: 0.5rem 0;
    -webkit-overflow-scrolling: touch;
    display: block !important;
    box-sizing: border-box;
  }

  .tech-badges-track {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    gap: 0.75rem;
    width: max-content !important;
    min-width: 200% !important;
    height: auto;
    will-change: transform;
    animation: marquee 30s linear infinite;
    -webkit-animation: marquee 30s linear infinite;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .tech-badges-track .tech-badge {
    flex-shrink: 0 !important;
    flex-grow: 0 !important;
    width: auto !important;
    min-width: fit-content;
    display: inline-flex !important;
    white-space: nowrap;
  }

  .tech-badges-track .tech-badge span {
    white-space: nowrap;
  }

  .tech-badges-track.marquee-paused {
    animation-play-state: paused;
    -webkit-animation-play-state: paused;
  }

  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  @-webkit-keyframes marquee {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    100% {
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
    }
  }

  .tech-badges-marquee {
    min-height: 2.5rem;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .project-item {
    width: 95vw;
  }

  .project-image-container {
    aspect-ratio: 16 / 9;
  }

  .project-image-container img,
  .project-image-container :deep(img) {
    height: 100%;
  }

  .tech-badges-marquee {
    overflow: hidden !important;
    width: 100% !important;
    max-width: 100% !important;
    position: relative;
    padding: 0.5rem 0;
    -webkit-overflow-scrolling: touch;
    display: block !important;
    box-sizing: border-box;
  }

  .tech-badges-track {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    gap: 0.75rem;
    width: max-content !important;
    min-width: 200% !important;
    height: auto;
    will-change: transform;
    animation: marquee 30s linear infinite;
    -webkit-animation: marquee 30s linear infinite;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .tech-badges-track .tech-badge {
    flex-shrink: 0 !important;
    flex-grow: 0 !important;
    width: auto !important;
    min-width: fit-content;
    display: inline-flex !important;
    white-space: nowrap;
  }

  .tech-badges-track .tech-badge span {
    white-space: nowrap;
  }

  .tech-badges-track.marquee-paused {
    animation-play-state: paused;
    -webkit-animation-play-state: paused;
  }

  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  @-webkit-keyframes marquee {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    100% {
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
    }
  }

  .project-content > .flex.flex-wrap.gap-4 {
    margin-top: 0.75rem !important;
    padding-top: 0.25rem;
  }

  .tech-badges-marquee {
    min-height: 2.5rem;
  }
}

@media (min-width: 1024px) {
  .project-item {
    width: calc(100vw - 4rem);
  }

  .project-image-container {
    aspect-ratio: 4 / 3;
  }

  .project-image-container img,
  .project-image-container :deep(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  .project-image-container picture,
  .project-image-container :deep(picture) {
    width: 100%;
    height: 100%;
    display: block;
  }

  .mockup-image {
    width: 100%;
  }
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
</style>
