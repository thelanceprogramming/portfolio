<script setup lang="ts">
import briefAboutData from '~/data/briefAbout.json'

const educationData = briefAboutData.education
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary-600 text-white">
        <Icon :name="educationData.icon" class="w-6 h-6" />
      </div>
      <div class="flex-1">
        <h3 class="text-2xl font-semibold text-neutral-900">
          {{ educationData.title }}
        </h3>
        <p class="text-sm text-neutral-600 mt-1">
          My academic background
        </p>
      </div>
    </div>

    <div class="flex items-start gap-6 ml-6">
      <div class="flex flex-col items-center">
          <div class="w-0.5 bg-primary-200" style="height: 12px;"></div>
        <template v-for="(school, index) in educationData.schools" :key="school.name">
            <div class="w-2 h-2 rounded-full bg-primary-400 -mt-0.5"></div>
          <div v-if="index < educationData.schools.length - 1" class="w-0.5 bg-primary-200 flex-1 min-h-[130px]"></div>
        </template>
      </div>
      
      <div class="flex-1 space-y-20">
        <div v-for="school in educationData.schools" :key="school.name">
          <h4 class="text-lg font-semibold text-neutral-900 mb-1">
            {{ school.name }}
          </h4>
          <div class="text-sm text-neutral-600">
            <p class="mb-1">
              <template v-if="school.degree">{{ school.degree }} • </template>{{ school.type }} • {{ school.period }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
