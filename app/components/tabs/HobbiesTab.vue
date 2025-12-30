<script setup lang="ts">
import briefAboutData from '~/data/briefAbout.json'

const hobbiesData = briefAboutData.hobbies
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary-600 text-white">
        <Icon :name="hobbiesData.icon" class="w-6 h-6" />
      </div>
      <div class="flex-1">
        <h3 class="text-2xl font-semibold text-neutral-900">
          {{ hobbiesData.title }}
        </h3>
        <p class="text-sm text-neutral-600 mt-1">
          Things I enjoy outside work
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
      <div 
        v-for="hobby in hobbiesData.items" 
        :key="hobby.name"
        class="hobby-card relative overflow-hidden rounded-xl bg-white shadow-sm border border-neutral-200"
      >
        <div class="slide slide1 flex justify-center items-center">
          <div class="flex items-center gap-4">
            <div class="flex items-center justify-center w-12 h-12 rounded-full bg-primary-600">
              <Icon :name="hobby.icon" class="w-6 h-6 text-white" />
            </div>
            <h4 class="text-xl font-semibold text-neutral-900">
              {{ hobby.name }}
            </h4>
          </div>
        </div>
        <div class="slide slide2 flex justify-center items-center p-6 box-border">
          <div class="content">
            <h3 class="text-xl font-semibold text-neutral-900 mb-2 text-center">
              {{ hobby.name }}
            </h3>
            <p class="text-sm text-neutral-600 leading-relaxed text-center">
              {{ hobby.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hobby-card {
  height: 200px;
  position: relative;
  background-color: rgb(255 255 255) !important;
}

.hobby-card .slide {
  width: 100%;
  height: 200px;
  position: absolute;
  top: 0;
  left: 0;
  transition: 0.5s;
}

.hobby-card .slide.slide1 {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  transition: 0.7s;
  transform: translateY(0px);
}

.hobby-card:hover .slide.slide1 {
  transform: translateY(200px);
}

.hobby-card .slide.slide2 {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  transition: 0.8s;
  transform: translateY(-200px);
  z-index: 1;
}

.hobby-card:hover .slide.slide2 {
  transform: translateY(0);
}

.hobby-card .slide.slide2::after {
  content: "";
  position: absolute;
  width: 30px;
  height: 4px;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  background: #05003a;
}

</style>
