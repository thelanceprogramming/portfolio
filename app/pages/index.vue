<script setup lang="ts">
useHead({
  title: 'Web Developer Cebu Philippines | Lance Javate',
  meta: [
    {
      name: 'description',
      content: 'I\'m a web developer in Cebu, Philippines. I create beautiful and functional web experiences that bring ideas to life using modern technologies and AI tools.'
    }
  ]
})

const displayedText = ref('H')
const isTyping = ref(false)

const displayedRole = ref('')
const isRoleTyping = ref(false)
const roles = [
  'Web Developer',
  'AI Enthusiast',
  'Graphic Design',
  'UI/UX Design',
  'Tech VA'
]
let currentRoleIndex = 0
let roleTypingTimeout: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  typeWriter()
})

onUnmounted(() => {
  if (roleTypingTimeout) {
    clearTimeout(roleTypingTimeout)
    roleTypingTimeout = null
  }
})

const typeWriter = () => {
  isTyping.value = true
  let charIndex = 1
  const plainText = "Hi, I'm Lance Javate"
  
  const type = () => {
    if (charIndex < plainText.length) {

      const plainPortion = plainText.substring(0, charIndex + 1)

      const nameStart = "Hi, I'm ".length
      
      if (charIndex >= nameStart) {

        const beforeName = "Hi, I'm "
        const namePortion = plainText.substring(nameStart, charIndex + 1)
        displayedText.value = beforeName + `<span class="text-primary-600">${namePortion}</span>`
      } else {
        displayedText.value = plainPortion
      }
      
      charIndex++
      setTimeout(type, 100) 
    } else {
      isTyping.value = false
      setTimeout(() => {
        startRoleTyping()
      }, 500)
    }
  }
  
  type()
}

const startRoleTyping = () => {
  if (roles.length === 0) return
  
  const typeRole = (roleIndex: number, isDeleting = false) => {
    const currentRole = roles[roleIndex]
    
    if (!isDeleting) {
      if (displayedRole.value.length < currentRole.length) {
        displayedRole.value = currentRole.substring(0, displayedRole.value.length + 1)
        isRoleTyping.value = true
        roleTypingTimeout = setTimeout(() => typeRole(roleIndex, false), 100)
      } else {
        isRoleTyping.value = false
        roleTypingTimeout = setTimeout(() => typeRole(roleIndex, true), 2000)
      }
    } else {
      if (displayedRole.value.length > 0) {
        displayedRole.value = displayedRole.value.substring(0, displayedRole.value.length - 1)
        isRoleTyping.value = true
        roleTypingTimeout = setTimeout(() => typeRole(roleIndex, true), 50)
      } else {
        currentRoleIndex = (currentRoleIndex + 1) % roles.length
        isRoleTyping.value = false
        roleTypingTimeout = setTimeout(() => typeRole(currentRoleIndex, false), 500)
      }
    }
  }
  
  currentRoleIndex = 0
  typeRole(currentRoleIndex, false)
}
</script>

<template>
  <section class="hero-section min-h-[calc(100vh-200px)] flex items-center bg-white">
    <div class="max-w-7xl mx-auto w-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div class="text-center lg:text-left hero-text-container">
          <div class="hero-image-mobile flex justify-center mx-auto order-1 lg:hidden">
            <div class="relative w-full max-w-xs sm:max-w-sm">
              <div class="absolute inset-0 rounded-lg transform rotate-6 blur-xl"></div>
              <div class="relative hero-image-wrapper-outer">
                <div class="corner-frame corner-top-left"></div>
                <div class="corner-frame corner-bottom-right"></div>
                <div class="bg-linear-to-b from-neutral-50 to-primary-600 rounded-xl pt-4 scale-90 shadow-lg">
                  <ClientOnly>
                    <NuxtImg
                      src="/images/lance-javate-main-profile.jpg"
                      alt="Lance Javate"
                      class="w-full h-auto drop-shadow-2xl hero-image relative z-10"
                      loading="eager"
                      width="600"
                      height="600"
                    />
                    <template #fallback>
                      <img
                        src="/images/lance-javate-main-profile.jpg"
                        alt="Lance Javate"
                        class="w-full h-auto drop-shadow-2xl hero-image relative z-10"
                        loading="eager"
                        width="600"
                        height="600"
                      />
                    </template>
                  </ClientOnly>
                </div>
              </div>
            </div>
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight order-2 lg:order-1">
            <span v-html="displayedText"></span>
          </h1>

          <div class="flex items-center justify-center order-3 lg:order-2 lg:justify-start">
            <p class="text-xl sm:text-2xl text-secondary-600 font-medium">
              <span v-html="displayedRole"></span><span class="typewriter-cursor">|</span>
            </p>
          </div>

          <p class="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-2xl mx-auto lg:mx-0 order-4 lg:order-3">
            I am from Cebu, Philippines and I create beautiful and functional web solutions that spark curiosity and leave a lasting impression.
          </p>

          <div class="flex flex-col min-[401px]:flex-row gap-4 justify-center lg:justify-start pt-2 order-5 lg:order-4">
            <Button variant="primary" @click="navigateTo('/portfolio')">
              View Portfolio
            </Button>
            <Button variant="secondary" @click="navigateTo('/contact')">
              Contact Me
            </Button>
          </div>
        </div>

        <div class="hidden lg:flex lg:justify-end">
          <div class="relative w-full max-w-md lg:max-w-lg">
            <div class="absolute inset-0 rounded-lg transform rotate-6 blur-xl"></div>
            <div class="relative hero-image-wrapper-outer">
              <div class="corner-frame corner-top-left"></div>
              <div class="corner-frame corner-bottom-right"></div>
              <div class="bg-linear-to-b from-neutral-50 to-primary-600 rounded-xl pt-4 scale-90 shadow-lg">
                <ClientOnly>
                  <NuxtImg
                    src="/images/lance-javate-main-profile.jpg"
                    alt="Lance Javate"
                    class="w-full h-auto drop-shadow-2xl hero-image relative z-10"
                    loading="eager"
                    width="600"
                    height="600"
                  />
                  <template #fallback>
                    <img
                      src="/images/lance-javate-main-profile.jpg"
                      alt="Lance Javate"
                      class="w-full h-auto drop-shadow-2xl hero-image relative z-10"
                      loading="eager"
                      width="600"
                      height="600"
                    />
                  </template>
                </ClientOnly>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <BriefAbout />
  <Projects />
  <Contact />
</template>

<style scoped>
.hero-text-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero-image-mobile {
  display: flex;
}

@media (min-width: 1024px) {
  .hero-image-mobile {
    display: none !important;
  }
}

@media (min-width: 1024px) {
  .hero-text-container {
    display: block;
    gap: 0;
  }
  
  .hero-text-container > * {
    margin-bottom: 1.5rem;
  }
  
  .hero-text-container > *:last-child {
    margin-bottom: 0;
  }
}

.typewriter-cursor {
  animation: blink 1s infinite;
  margin-left: 4px;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

.hero-image-wrapper-outer {
  position: relative;
}

.corner-frame {
  position: absolute;
  z-index: 20;
  pointer-events: none;
  opacity: 1;
}

.corner-top-left {
  top: 0;
  left: 0;
  width: 50px;
  height: 80px;
}

.corner-top-left::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 8px;
  height: 140px;
  background: linear-gradient(to bottom, rgb(7 0 77), rgb(45 130 183));
  background-size: 100% 200%;
  border-top-left-radius: 1rem;
  transform: scaleY(1);
  animation: gradientMoveVertical 3s ease-in-out infinite;
}

.corner-top-left::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 8px;
  background: linear-gradient(to right, rgb(7 0 77), rgb(45 130 183));
  background-size: 200% 100%;
  border-top-left-radius: 1.5rem;
  transform: scaleX(1);
  animation: gradientMoveHorizontal 3s ease-in-out infinite;
}

.corner-bottom-right {
  bottom: 0;
  right: 0;
  width: 50px;
  height: 80px;
}

.corner-bottom-right::before {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 8px;
  height: 140px;
  background: linear-gradient(to top, rgb(7 0 77), rgb(45 130 183));
  background-size: 100% 200%;
  border-bottom-right-radius: 1.5rem;
  transform: scaleY(1);
  animation: gradientMoveVertical 3s ease-in-out infinite;
}

.corner-bottom-right::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 80px;
  height: 8px;
  background: linear-gradient(to left, rgb(7 0 77), rgb(45 130 183));
  background-size: 200% 100%;
  border-bottom-right-radius: 1.5rem;
  transform: scaleX(1);
  animation: gradientMoveHorizontal 3s ease-in-out infinite;
}

@keyframes gradientMoveVertical {
  0%, 100% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 0% 100%;
  }
}

@keyframes gradientMoveHorizontal {
  0%, 100% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 0%;
  }
}

.hero-section {
  background-color: rgb(255 255 255) !important;
}

.hero-section p {
  color: rgb(55 65 81);
}
</style>
