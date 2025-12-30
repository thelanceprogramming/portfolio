<script setup lang="ts">
import briefAboutData from '~/data/briefAbout.json'

const skillsData = briefAboutData.skills

const previewCategories = computed(() => {
  return skillsData.categories.map(category => {
    const topSkills = [...category.items]
      .sort((a, b) => b.level - a.level)
      .slice(0, 3)
    
    return {
      name: category.name,
      items: topSkills
    }
  })
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary-600 text-white">
        <Icon :name="skillsData.icon" class="w-6 h-6" />
      </div>
      <div class="flex-1">
        <h3 class="text-2xl font-semibold text-neutral-900">
          {{ skillsData.title }}
        </h3>
        <p class="text-sm text-neutral-600 mt-1">
          Technologies I excel in
        </p>
      </div>
    </div>

    <div class="space-y-6">
      <div
        v-for="category in previewCategories"
        :key="category.name"
        class="skill-category"
      >
        <h4 class="text-sm font-semibold text-neutral-600 mb-3 uppercase tracking-wide">
          {{ category.name }}
        </h4>
        <div class="flex flex-wrap gap-3">
          <div
            v-for="skill in category.items"
            :key="skill.name"
            class="skill-badge group"
          >
            <Icon
              :name="skill.icon"
              class="w-5 h-5 text-primary-600"
            />
            <span class="text-sm font-medium text-neutral-700">
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skill-category {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(7, 0, 77, 0.15);
}

.skill-category:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.skill-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background: rgb(255 255 255) !important;
  border: 1px solid rgb(229 231 235);
  transition: all 0.3s ease;
  cursor: default;
}

.skill-badge:hover {
  background: rgba(7, 0, 77, 0.05);
  border-color: rgba(7, 0, 77, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(7, 0, 77, 0.1);
}

.skill-badge .icon {
  transition: transform 0.3s ease;
}

.skill-badge:hover .icon {
  transform: scale(1.1);
}

</style>
