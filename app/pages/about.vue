<script setup lang="ts">
import aboutData from '~/data/about.json'
import TechStackShowcase from '~/components/TechStackShowcase.vue'

useHead({
  title: 'About Me | Lance Javate - Web Developer',
  meta: [
    {
      name: 'description',
      content: 'Learn about Lance Javate, a web developer from Cebu, Philippines. Discover my journey, skills, and what drives me as a developer.'
    }
  ]
})

const data = aboutData

const hobbiesData = data.lifeOutsideWork.sections.find(section => section.name === 'Hobbies & Interests')?.items || []

const socialLinks = [
  {
    name: 'Facebook',
    icon: 'simple-icons:facebook',
    url: 'https://www.facebook.com/thelanceprogramming'
  },
  {
    name: 'X',
    icon: 'simple-icons:x',
    url: 'https://x.com/thelanceprogram'
  },
  {
    name: 'LinkedIn',
    icon: 'simple-icons:linkedin',
    url: 'https://www.linkedin.com/in/thelanceprogramming'
  },
  {
    name: 'GitHub',
    icon: 'simple-icons:github',
    url: 'https://github.com/thelanceprogramming'
  },
  {
    name: 'Dribbble',
    icon: 'simple-icons:dribbble',
    url: 'https://dribbble.com/thelanceprogramming'
  },
  {
    name: 'Pinterest',
    icon: 'simple-icons:pinterest',
    url: 'https://pinterest.com/thelanceprogramming/'
  }
]

const certificates = [
  {
    name: 'Responsive Web Design',
    issuer: 'FreeCodeCamp',
    icon: 'simple-icons:freecodecamp',
    url: 'https://www.freecodecamp.org/certification/thelanceprogramming/responsive-web-design'
  },
  {
    name: 'SEO',
    issuer: 'HubSpot',
    icon: 'simple-icons:hubspot',
    url: 'https://app-na2.hubspot.com/academy/achievements/cfqh10xl/en/1/lance-javate/seo'
  }
]

const briefTimeline = [
  { id: 1, date: '2021', text: 'Hello World! 👋 Wrote my first code' },
  { id: 2, date: '2022', text: 'Built my first web project' },
  { id: 3, date: '2024', text: 'Mastered Laravel & Vue.js' },
  { id: 4, date: 'Jan 2025', text: 'Started as Web Dev Intern at Kapwa Marketing' },
  { id: 5, date: 'Apr 2025', text: 'Created my first website from the company\'s client' },
  { id: 6, date: 'May 2025', text: 'Graduated from College' },
  { id: 7, date: 'Jun 2025', text: 'Promoted to Junior Developer at Kapwa Marketing' }
]
</script>

<template>
  <div class="about-page">
    <section class="biography-section bg-neutral-50 py-12 lg:py-16">
      <div class="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div class="biography-container">
          <div class="biography-content-column">
            <div class="social-links-section">
              <div class="flex items-center gap-4 flex-wrap">
                <a
                  v-for="social in socialLinks"
                  :key="social.name"
                  :href="social.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="social-link-item"
                  :aria-label="social.name"
                >
                  <Icon
                    :name="social.icon"
                    class="w-5 h-5"
                  />
                  <span class="social-link-name">{{ social.name }}</span>
                </a>
              </div>
            </div>
            
            <div class="biography-text-content">
              <h2 class="biography-section-title">{{ data.biography.title }}</h2>
              <div class="biography-inline-image">
                <NuxtImg
                  src="/images/lance-javate-on-boat.jpg"
                  alt="Lance Javate on a boat"
                  class="inline-image"
                  loading="lazy"
                  width="300"
                  height="400"
                />
              </div>
              <p
                v-for="(paragraph, index) in data.biography.content"
                :key="index"
                class="biography-paragraph"
              >
                {{ paragraph }}
              </p>
              <div class="biography-motto">
                <p class="motto-text">"{{ data.biography.motto }}"</p>
              </div>
            </div>
            
            <div class="download-cv-mobile lg:hidden">
              <div class="download-cv-box">
                <a
                  href="/documents/Lance Javate - CV.pdf"
                  download="Lance Javate - CV.pdf"
                  class="download-cv-button w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 bg-primary-600 text-white hover:bg-primary-700 transform active:scale-95 effect-shine relative overflow-hidden"
                >
                  <Icon name="heroicons:arrow-down-tray" class="w-5 h-5" />
                  <span>Download CV</span>
                </a>
              </div>
            </div>
            
            <div class="hobbies-box">
              <h3 class="hobbies-title">Hobbies & Interests</h3>
              <div class="hobbies-content">
                <div
                  v-for="hobby in hobbiesData"
                  :key="hobby.name"
                  class="hobby-item"
                >
                  <div class="hobby-header">
                    <div class="hobby-icon-wrapper">
                      <Icon :name="hobby.icon" class="w-5 h-5 text-white" />
                    </div>
                    <h4 class="hobby-name">{{ hobby.name }}</h4>
                  </div>
                  <p class="hobby-description">{{ hobby.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="biography-image-column">
            <div class="biography-image-wrapper">
              <NuxtImg
                src="/images/lance-javate-on-boat.jpg"
                alt="Lance Javate on a boat"
                class="biography-image"
                loading="lazy"
                width="600"
                height="800"
              />
              
              <div class="download-cv-box hidden lg:block">
                <a
                  href="/documents/Lance Javate - CV.pdf"
                  download="Lance Javate - CV.pdf"
                  class="download-cv-button w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 bg-primary-600 text-white hover:bg-primary-700 transform active:scale-95 effect-shine relative overflow-hidden"
                >
                  <Icon name="heroicons:arrow-down-tray" class="w-5 h-5" />
                  <span>Download CV</span>
                </a>
              </div>
              
              <div class="brief-timeline">
                <h3 class="timeline-title">Timeline</h3>
                <div class="timeline-items">
                  <div
                    v-for="event in briefTimeline"
                    :key="event.id"
                    class="timeline-item"
                  >
                    <span class="timeline-date">{{ event.date }}</span>
                    <span class="timeline-text">{{ event.text }}</span>
                  </div>
                </div>
              </div>
              
              <div class="certificates-box">
                <h3 class="certificates-title">Certificates</h3>
                <div class="certificates-list">
                  <a
                    v-for="certificate in certificates"
                    :key="certificate.name"
                    :href="certificate.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="certificate-item"
                  >
                    <div class="certificate-icon-wrapper">
                      <Icon :name="certificate.icon" class="w-5 h-5 text-white" />
                    </div>
                    <div class="certificate-info">
                      <span class="certificate-name">{{ certificate.name }}</span>
                      <span class="certificate-issuer">{{ certificate.issuer }}</span>
                    </div>
                    <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4 certificate-link-icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <TechStackShowcase />

    <CTA 
      headline="Let's Work Together"
      tagline="Have a project in mind? Let's create something that leaves an impression."
    />
  </div>
</template>

<style scoped>
.about-page {
  min-height: 100vh;
}

.biography-section {
  scroll-margin-top: 80px;
  padding-top: 3rem;
  background-color: rgb(250 250 250) !important;
}

.biography-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: start;
}

@media (max-width: 1024px) {
  .biography-container {
    gap: 1rem;
  }
}

@media (min-width: 1024px) {
  .biography-container {
    grid-template-columns: 3fr 1fr;
    gap: 2rem;
  }
}

.biography-content-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.social-links-section {
  background: linear-gradient(135deg, rgba(7, 0, 77, 0.08), rgba(45, 130, 183, 0.08));
  padding: 1.5rem 2rem;
  border-radius: 0.25rem;
  border-left: 4px solid rgb(7 0 77);
}

.social-link-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  color: rgb(55 65 81);
  background: rgb(255 255 255);
  border: 1px solid rgba(7, 0, 77, 0.1);
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  font-weight: 500;
}

.social-link-item:hover {
  background: rgba(7, 0, 77, 0.05);
  border-color: rgba(7, 0, 77, 0.2);
  color: rgb(7 0 77);
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(7, 0, 77, 0.1);
}

.social-link-name {
  white-space: nowrap;
}

.biography-text-content {
  background: rgb(255 255 255);
  border: 1px solid rgb(229 231 235);
  border-radius: 0.25rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(7, 0, 77, 0.04);
  overflow: hidden;
}

.biography-text-content::after {
  content: '';
  display: table;
  clear: both;
}

.biography-section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(31 41 55);
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

@media (min-width: 768px) {
  .biography-section-title {
    font-size: 1.75rem;
  }
}

.biography-paragraph {
  font-size: 1rem;
  color: rgb(55 65 81);
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.biography-paragraph:last-child {
  margin-bottom: 0;
}

@media (max-width: 1024px) {
  .biography-paragraph {
    text-align: justify;
  }
}

.biography-motto {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgb(229 231 235);
}

.motto-text {
  font-size: 1.125rem;
  font-style: italic;
  color: rgb(7 0 77);
  line-height: 1.8;
  text-align: center;
  font-weight: 500;
}

@media (min-width: 768px) {
  .motto-text {
    font-size: 1.25rem;
  }
}

.hobbies-box {
  background: rgb(255 255 255);
  border: 1px solid rgb(229 231 235);
  border-radius: 0.25rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(7, 0, 77, 0.04);
}

.hobbies-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(31 41 55);
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hobbies-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hobby-item {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgb(229 231 235);
}

.hobby-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.hobby-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.hobby-icon-wrapper {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgb(7 0 77), rgb(45 130 183));
  flex-shrink: 0;
}

.hobby-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(31 41 55);
  margin: 0;
}

.hobby-description {
  font-size: 0.9375rem;
  color: rgb(107 114 128);
  line-height: 1.7;
  margin: 0;
  padding-left: 3.5rem;
}

@media (max-width: 767px) {
  .hobbies-box {
    padding: 1.5rem;
  }

  .hobby-description {
    padding-left: 0;
    margin-top: 0.5rem;
  }
}

@media (min-width: 768px) {
  .biography-paragraph {
    font-size: 1.0625rem;
  }
}

.biography-image-column {
  position: relative;
}

.biography-image-wrapper {
  position: sticky;
  top: 120px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.biography-image {
  width: 100%;
  height: auto;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(7, 0, 77, 0.08);
  object-fit: cover;
  aspect-ratio: 3 / 4;
}

@media (max-width: 1024px) {
  .biography-image {
    display: none;
  }
  
  .biography-image-wrapper {
    position: relative;
    top: 0;
    margin-top: 0;
    gap: 1rem;
  }
  
  .brief-timeline {
    margin-top: 0;
  }
}

.biography-inline-image {
  display: none;
  float: right;
  margin: 0 0 1rem 1.5rem;
  width: 200px;
  max-width: 40%;
}

@media (max-width: 1024px) {
  .biography-inline-image {
    display: block;
  }
}

.inline-image {
  width: 100%;
  height: auto;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(7, 0, 77, 0.08);
  object-fit: cover;
  aspect-ratio: 3 / 4;
}

@media (max-width: 640px) {
  .biography-inline-image {
    min-width: 150px;
    max-width: 50%;
    margin: 0 0 1rem 1rem;
  }
}

@media (min-width: 641px) and (max-width: 1023px) {
  .biography-inline-image {
    min-width: 200px;
  }
}

.download-cv-box {
  background: rgb(255 255 255);
  border: 1px solid rgb(229 231 235);
  border-radius: 0.25rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(7, 0, 77, 0.04);
  margin-top: 1rem;
}

@media (max-width: 1023px) {
  .download-cv-mobile .download-cv-box {
    margin-top: 0;
  }
}

.brief-timeline {
  background: rgb(255 255 255);
  border: 1px solid rgb(229 231 235);
  border-radius: 0.25rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(7, 0, 77, 0.04);
  margin-top: 1rem;
}

.timeline-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: rgb(31 41 55);
  margin-bottom: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.timeline-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgb(229 231 235);
}

.timeline-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.timeline-date {
  font-size: 0.875rem;
  font-weight: 700;
  color: rgb(7 0 77);
  min-width: 4.5rem;
  flex-shrink: 0;
}

.timeline-text {
  font-size: 0.875rem;
  color: rgb(107 114 128);
  line-height: 1.5;
  flex: 1;
}

.certificates-box {
  background: rgb(255 255 255);
  border: 1px solid rgb(229 231 235);
  border-radius: 0.25rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(7, 0, 77, 0.04);
  margin-top: 1rem;
}

.certificates-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: rgb(31 41 55);
  margin-bottom: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.certificates-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.certificate-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.25rem;
  border: 1px solid rgb(229 231 235);
  background: rgb(255 255 255);
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.certificate-item:hover {
  background: rgba(7, 0, 77, 0.02);
  border-color: rgba(7, 0, 77, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(7, 0, 77, 0.1);
}

.certificate-icon-wrapper {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgb(7 0 77), rgb(45 130 183));
  flex-shrink: 0;
}

.certificate-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  min-width: 0;
}

.certificate-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgb(31 41 55);
  line-height: 1.4;
}

.certificate-issuer {
  font-size: 0.75rem;
  color: rgb(107 114 128);
}

.certificate-link-icon {
  color: rgb(107 114 128);
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.certificate-item:hover .certificate-link-icon {
  color: rgb(7 0 77);
  transform: translate(2px, -2px);
}

@media (max-width: 1023px) {
  .biography-text-content {
    padding: 1.5rem;
  }

  .biography-paragraph {
    font-size: 0.9375rem;
    margin-bottom: 1.25rem;
  }
}

.download-cv-button {
  position: relative;
}

.download-cv-button.effect-shine::before {
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.4) 50%,
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

.download-cv-button.effect-shine:hover::before,
.download-cv-button.effect-shine:focus::before {
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

.download-cv-button span,
.download-cv-button .icon {
  position: relative;
  z-index: 1;
}

</style>
