<script setup lang="ts">
import contactData from '~/data/contact.json'

const data = contactData
</script>

<template>
  <section class="contact-section bg-neutral-50 py-12 lg:py-16">
    <div class="max-w-7xl mx-auto w-full">
      <div class="space-y-8">
        <div class="text-left space-y-4">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900">
            {{ data.heading }}
          </h2>
          
          <p class="text-base sm:text-lg text-neutral-700 max-w-2xl">
            {{ data.subtitle }}
          </p>
        </div>

        <div class="contact-card bg-white rounded-2xl border border-neutral-200 shadow-md p-8 lg:p-12">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div
              v-for="method in data.contactMethods"
              :key="method.id"
              class="contact-method flex flex-col items-start text-left space-y-4"
            >
              <div 
                v-if="method.id === 1 || method.id === 2"
                class="flex items-center justify-center w-12 h-12 rounded-full bg-primary-600 p-3"
              >
                <NuxtImg
                  v-if="method.id === 1"
                  src="/videos/email-animated-icon.gif"
                  alt="Email icon"
                  class="w-8 h-8 object-contain"
                />
                <NuxtImg
                  v-else-if="method.id === 2"
                  src="/videos/phone-animated-icon.gif"
                  alt="Phone icon"
                  class="w-8 h-8 object-contain"
                />
              </div>
              <div 
                v-else
                class="flex items-center justify-center w-12 h-12 rounded-full bg-primary-600 text-white"
              >
                <Icon :name="method.icon" class="w-6 h-6" />
              </div>
              <h3 class="text-xl sm:text-2xl font-bold text-neutral-900">
                {{ method.title }}
              </h3>
              <p class="text-sm sm:text-base text-neutral-700 leading-relaxed">
                {{ method.description }}
              </p>
              <a
                :href="method.link"
                :target="method.linkType === 'external' ? '_blank' : undefined"
                :rel="method.linkType === 'external' ? 'noopener noreferrer' : undefined"
                class="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-300"
              >
                {{ method.contactInfo }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  scroll-margin-top: 80px;
  background-color: rgb(250 250 250) !important;
}

.contact-card {
  background-color: rgb(255 255 255);
}

.contact-card {
  transition: box-shadow 0.3s ease;
}

.contact-card:hover {
  box-shadow: 0 10px 25px rgba(7, 0, 77, 0.1);
}

.contact-method {
  transition: transform 0.3s ease;
}

.contact-method:hover {
  transform: translateY(-4px);
}

@media (max-width: 767px) {
  .contact-card {
    padding: 2rem 1.5rem;
  }
  
  .contact-method {
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(7, 0, 77, 0.15);
  }
  
  .contact-method:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
}
</style>
