<script setup lang="ts">
import navigationData from '~/data/navigation.json'

interface NavigationItem {
  label: string
  to: string
}

const navigationItems = navigationData as NavigationItem[]

const currentYear = useState('footer-year', () => new Date().getFullYear())

const socialLinks = [
  {
    name: 'GitHub',
    icon: 'devicon:github',
    url: 'https://github.com/thelanceprogramming'
  },
  {
    name: 'LinkedIn',
    icon: 'simple-icons:linkedin',
    url: 'https://www.linkedin.com/in/thelanceprogramming'
  },
  {
    name: 'Facebook',
    icon: 'simple-icons:facebook',
    url: 'https://www.facebook.com/thelanceprogramming'
  }
]
</script>

<template>
  <footer class="footer-container border-t border-gray-300 mt-auto bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="py-12 lg:py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          <div class="footer-column">
            <div class="flex items-center gap-3 mb-4">
              <ClientOnly>
                <NuxtImg
                  src="/logo.svg"
                  alt="Portfolio Logo"
                  class="h-12 w-12"
                  loading="lazy"
                />
                <template #fallback>
                  <img
                    src="/logo.svg"
                    alt="Portfolio Logo"
                    class="h-12 w-12"
                    loading="lazy"
                  />
                </template>
              </ClientOnly>
              <h3 class="footer-brand-name text-2xl font-bold font-heading">
                thelanceprogramming
              </h3>
            </div>
            <p class="footer-tagline text-sm sm:text-base leading-relaxed mb-6 max-w-sm">
              I am from Cebu, Philippines and I create beautiful and functional web solutions that spark curiosity and leave a lasting impression.
            </p>
            <div class="flex items-center gap-4">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link group"
                :aria-label="social.name"
              >
                <Icon
                  :name="social.icon"
                  class="w-6 h-6 transition-all duration-300"
                />
              </a>
            </div>
          </div>

          <div class="footer-column">
            <h4 class="footer-heading mb-4">Quick Links</h4>
            <ul class="space-y-3">
              <li v-for="item in navigationItems" :key="item.to">
                <NuxtLink
                  :to="item.to"
                  class="footer-link group"
                >
                  <span>{{ item.label }}</span>
                  <Icon
                    name="heroicons:arrow-right"
                    class="footer-link-icon"
                  />
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div class="footer-column">
            <h4 class="footer-heading mb-4">Let's Work Together</h4>
            <p class="footer-cta-text text-sm sm:text-base leading-relaxed mb-6">
              Have a project in mind? Let's create something that leaves an impression.
            </p>
            <NuxtLink
              to="/contact"
              class="cta-button group inline-flex items-center gap-2"
            >
              <span>Get In Touch</span>
              <Icon
                name="heroicons:arrow-right"
                class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              />
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-300 py-6">
        <div class="text-center text-sm text-gray-600">
          <p>&copy; {{ currentYear }} Lance Javate. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-container {
  position: relative;
  background-color: rgb(255 255 255) !important;
}

.footer-column {
  display: flex;
  flex-direction: column;
}

.footer-heading {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(17 24 39);
  font-family: 'Helvetica', system-ui, -apple-system, sans-serif;
}

.footer-tagline {
  color: rgb(55 65 81);
}

.footer-cta-text {
  color: rgb(55 65 81);
}

.footer-brand-name {
  background: linear-gradient(135deg, rgb(7 0 77), rgb(45 130 183));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  color: rgb(55 65 81);
  background: rgba(7, 0, 77, 0.05);
  border: 1px solid rgba(7, 0, 77, 0.1);
  transition: all 0.3s ease;
}

.social-link:hover {
  background: rgba(7, 0, 77, 0.1);
  border-color: rgba(7, 0, 77, 0.2);
  color: rgb(7 0 77);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(7, 0, 77, 0.15);
}

.social-link .icon {
  transition: transform 0.3s ease;
}

.social-link:hover .icon {
  transform: scale(1.1);
}

.footer-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgb(107 114 128);
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.5rem 0;
}

.footer-link:hover {
  color: rgb(7 0 77);
  transform: translateX(4px);
}

.footer-link-icon {
  width: 1rem;
  height: 1rem;
  opacity: 0;
  transform: translateX(-4px);
  transition: all 0.3s ease;
}

.footer-link:hover .footer-link-icon {
  opacity: 1;
  transform: translateX(0);
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  text-decoration: none;
  background: linear-gradient(135deg, rgba(7, 0, 77, 0.1), rgba(45, 130, 183, 0.1));
  color: rgb(7 0 77);
  border: 2px solid rgba(7, 0, 77, 0.2);
  transition: all 0.3s ease;
}

.cta-button:hover {
  background: linear-gradient(135deg, rgba(7, 0, 77, 0.15), rgba(45, 130, 183, 0.15));
  border-color: rgba(7, 0, 77, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(7, 0, 77, 0.2);
}

@media (max-width: 767px) {
  .footer-column {
    margin-bottom: 2rem;
  }

  .footer-column:last-child {
    margin-bottom: 0;
  }
}
</style>
