<script setup lang="ts">
import briefAboutData from '~/data/briefAbout.json'
import WorkTab from '~/components/tabs/WorkTab.vue'
import EducationTab from '~/components/tabs/EducationTab.vue'
import HobbiesTab from '~/components/tabs/HobbiesTab.vue'
import SkillsTab from '~/components/tabs/SkillsTab.vue'

const validTabs = ['work', 'education', 'skills', 'hobbies'] as const
type TabId = typeof validTabs[number]

const activeTab = ref<TabId>('skills')
const data = briefAboutData

const tabComponents = {
  work: WorkTab,
  education: EducationTab,
  skills: SkillsTab,
  hobbies: HobbiesTab
}

const currentTabComponent = computed(() => {
  return tabComponents[activeTab.value]
})

const setActiveTab = (tabId: TabId) => {
  activeTab.value = tabId
}

const scrollToAbout = () => {
  const aboutSection = document.querySelector('.brief-about-section')
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <section class="brief-about-section bg-neutral-50 py-12 lg:py-16">
    <div class="max-w-7xl mx-auto w-full">
      <div class="space-y-8">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 text-center">
          {{ data.sectionTitle }}
        </h2>

          <div class="space-y-8">
            <div class="flex flex-wrap justify-center gap-4 border-b border-neutral-300 pb-4">
              <button
              v-for="tab in data.tabs"
              :key="tab.id"
              @click="setActiveTab(tab.id as 'work' | 'education' | 'skills' | 'hobbies')"
                :class="[
                  'tab-button flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all duration-300 relative',
                activeTab === tab.id
                    ? 'tab-button-active'
                    : 'tab-button-inactive'
                ]"
              >
                <div :class="[
                  'flex items-center justify-center w-8 h-8 rounded-full',
                activeTab === tab.id ? 'bg-primary-600/20' : 'bg-primary-600'
                ]">
                <Icon :name="tab.icon" :class="[
                    'w-5 h-5',
                  activeTab === tab.id ? 'text-primary-600' : 'text-white'
                  ]" />
                </div>
              <span>{{ tab.label }}</span>
              <span class="tab-button-indicator"></span>
              </button>
            </div>

          <div class="min-h-[400px]">
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 translate-y-4"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-300 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-4"
              mode="out-in"
            >
              <component :is="currentTabComponent" :key="activeTab" />
            </Transition>
          </div>

          <div class="flex justify-center pt-8">
            <Button variant="primary" @click="scrollToAbout">
              Read more about me
            </Button>
            </div>
          </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.brief-about-section {
  background-color: rgb(250 250 250) !important;
}

.tab-button {
  position: relative;
}

.tab-button-inactive {
  background: transparent;
  color: rgb(55 65 81);
}

.tab-button-inactive:hover {
  background: transparent;
}

.tab-button-active {
  background: linear-gradient(135deg, rgba(7, 0, 77, 0.15), rgba(45, 130, 183, 0.15));
  color: rgb(7 0 77);
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(7, 0, 77, 0.1);
  border: 1px solid rgba(7, 0, 77, 0.2);
}

.tab-button-indicator {
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

.tab-button-active .tab-button-indicator {
  transform: translateY(-50%) scaleY(1);
}

.tab-button-inactive:hover .tab-button-indicator {
  transform: translateY(-50%) scaleY(1);
  opacity: 0.5;
}
</style>
