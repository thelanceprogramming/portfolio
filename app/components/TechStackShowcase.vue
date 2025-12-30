<script setup lang="ts">
import aboutData from '~/data/about.json'

const data = aboutData.techStack
const categoryRefs = ref<Record<string, HTMLElement | null>>({})
const visibleCategories = ref<Set<string>>(new Set())

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const categoryName = entry.target.getAttribute('data-category')
          if (categoryName) {
            visibleCategories.value.add(categoryName)
          }
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  )

  nextTick(() => {
    Object.keys(categoryRefs.value).forEach((categoryName) => {
      const element = categoryRefs.value[categoryName]
      if (element) {
        element.setAttribute('data-category', categoryName)
        observer.observe(element)
      }
    })
  })
})
</script>

<template>
  <div class="tech-stack-section">
    <div class="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
      <div class="space-y-12">
        <div class="text-center space-y-4">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900">
            {{ data.title }}
          </h2>
          <p class="text-base sm:text-lg text-neutral-700 max-w-2xl mx-auto">
            {{ data.subtitle }}
          </p>
        </div>

        <div class="space-y-16">
          <div
            v-for="category in data.categories"
            :key="category.name"
            :ref="el => { if (el) categoryRefs[category.name] = el }"
            :class="[
              'tech-category',
              { 'category-visible': visibleCategories.has(category.name) }
            ]"
          >
            <div class="category-header">
              <div class="category-icon-wrapper">
                <Icon :name="category.icon" class="w-6 h-6 text-white" />
              </div>
              <h3 class="category-title">{{ category.name }}</h3>
            </div>

            <div class="skills-grid">
              <div
                v-for="skill in category.items"
                :key="skill.name"
                class="skill-card"
              >
                <div class="skill-card-header">
                  <div class="skill-icon-wrapper">
                    <Icon :name="skill.icon" class="w-6 h-6 skill-icon" />
                  </div>
                  <div class="skill-info">
                    <h4 class="skill-name">{{ skill.name }}</h4>
                    <div class="skill-level-bar">
                      <div
                        class="skill-level-fill"
                        :class="{ 'skill-level-animated': visibleCategories.has(category.name) }"
                        :style="visibleCategories.has(category.name) ? { width: `${skill.level}%` } : { width: '0%' }"
                      ></div>
                    </div>
                    <span class="skill-level-text">{{ skill.level }}%</span>
                  </div>
                </div>
                <p class="skill-description">{{ skill.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tech-stack-section {
  scroll-margin-top: 80px;
  padding: 3rem 0;
  background-color: rgb(255 255 255) !important;
}

.tech-category {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease-out;
}

.category-visible {
  opacity: 1;
  transform: translateY(0);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(7, 0, 77, 0.1);
}

.category-icon-wrapper {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, rgb(7 0 77), rgb(45 130 183));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(7, 0, 77, 0.15);
}

.category-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: rgb(31 41 55);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .skills-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (min-width: 1024px) {
  .skills-grid {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
  }
}

.skill-card {
  background: rgb(255 255 255);
  border: 1px solid rgb(229 231 235);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
  cursor: default;
}

.skill-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(7, 0, 77, 0.15);
  border-color: rgba(7, 0, 77, 0.2);
}

.skill-card-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.skill-icon-wrapper {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  background: rgba(7, 0, 77, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.skill-card:hover .skill-icon-wrapper {
  background: linear-gradient(135deg, rgba(7, 0, 77, 0.1), rgba(45, 130, 183, 0.1));
  transform: scale(1.1);
}

.skill-icon {
  color: rgb(7 0 77);
  transition: transform 0.3s ease;
}

.skill-card:hover .skill-icon {
  transform: scale(1.15);
}

.skill-info {
  flex: 1;
  min-width: 0;
}

.skill-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(31 41 55);
  margin-bottom: 0.5rem;
}

.skill-level-bar {
  width: 100%;
  height: 8px;
  background: rgb(229 231 235);
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 0.25rem;
  position: relative;
}

.skill-level-fill {
  height: 100%;
  background: linear-gradient(90deg, rgb(7 0 77), rgb(45 130 183));
  border-radius: 9999px;
  transition: width 1.5s ease-out;
  position: relative;
  width: 0%;
}

.skill-level-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.skill-level-text {
  font-size: 0.75rem;
  font-weight: 600;
  color: rgb(7 0 77);
}

.skill-description {
  font-size: 0.875rem;
  color: rgb(107 114 128);
  line-height: 1.6;
  margin-top: 0.75rem;
}

@media (max-width: 639px) {
  .tech-stack-section {
    padding: 2rem 0;
  }

  .skills-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .skill-card {
    padding: 1.25rem;
  }

  .category-header {
    margin-bottom: 1.5rem;
  }

  .category-title {
    font-size: 1.5rem;
  }
}
</style>
