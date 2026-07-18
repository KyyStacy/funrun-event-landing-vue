<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroImage from '../assets/images/hero-runners.png'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const textRef = ref(null)
const imageRef = ref(null)
const imageContainerRef = ref(null)
let ctx

onMounted(() => {
  setTimeout(() => {
    ctx = gsap.context(() => {
      // 1. Aggressive Reveal Animation
      const tl = gsap.timeline()
      
      tl.fromTo(
        '.hero-char',
        { y: 150, opacity: 0, rotateZ: 10 },
        { 
          y: 0, 
          opacity: 1, 
          rotateZ: 0,
          duration: 1.2, 
          stagger: 0.05, 
          ease: 'power4.out' 
        }
      )
      .fromTo(
        '.hero-sub',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo(
        imageContainerRef.value,
        { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' }, // Start hidden on right
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1.5, ease: 'power4.inOut' },
        '-=1.2'
      )
      .fromTo(
        imageRef.value,
        { scale: 1.3 },
        { scale: 1, duration: 2, ease: 'power2.out' },
        '-=1.5'
      )

      // 2. Parallax on Scroll
      gsap.to(textRef.value, {
        y: -150,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      
      gsap.to(imageRef.value, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef.value)
  }, 100)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section ref="sectionRef" class="relative min-h-[100dvh] flex items-center bg-[var(--color-base)] overflow-hidden pt-20">
    
    <!-- Background Decor: Grid lines & Noise -->
    <div class="absolute inset-0 pointer-events-none z-0 opacity-10">
      <div class="absolute inset-0" style="background-image: linear-gradient(to right, #1c4f24 1px, transparent 1px), linear-gradient(to bottom, #1c4f24 1px, transparent 1px); background-size: 4rem 4rem;"></div>
    </div>

    <!-- Kinetic Marquee Ticker (Background) -->
    <div class="absolute top-[15%] left-0 w-[200vw] flex overflow-hidden whitespace-nowrap opacity-[0.03] z-0 pointer-events-none select-none">
      <h2 class="animate-[marquee_20s_linear_infinite] text-[15rem] font-black tracking-tighter text-brand uppercase">
        Reed Fitness &bull; Fun Run 2026 &bull; Reed Fitness &bull; Fun Run 2026 &bull; 
      </h2>
    </div>
    
    <div class="max-w-[1600px] mx-auto w-full px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
      
      <!-- Left: Brutalist Typography -->
      <div ref="textRef" class="lg:col-span-7 flex flex-col z-30 pt-10 lg:pt-0 relative">

        <h1 class="text-[5.5rem] sm:text-[8rem] md:text-[11rem] lg:text-[14rem] xl:text-[16rem] font-display text-brand leading-[0.8] uppercase flex flex-col items-start relative -skew-x-6">
          <div class="overflow-visible pb-2 pr-4"><div class="hero-char inline-block">Reed Fitness</div></div>
          <div class="overflow-visible pb-2 pr-8 -mt-2 lg:-mt-8 pl-0 lg:pl-16"><div class="hero-char inline-block text-brand-light">Fitness</div></div>
          <div class="overflow-visible pb-2 pr-4 -mt-2 lg:-mt-8"><div class="hero-char inline-block">Fun Run</div></div>
        </h1>
        
        <div class="hero-sub mt-12 lg:mt-16 flex flex-col items-start lg:pl-24 relative">
          <!-- Side Line -->
          <div class="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-brand to-transparent lg:left-6 hidden sm:block"></div>
          
          <p class="text-xl md:text-3xl text-brand/80 font-medium max-w-xl leading-snug mb-10 pl-2 sm:pl-6 lg:pl-10">
            Menembus batas. Merayakan kebugaran. Bergabunglah bersama ribuan pelari dalam balutan euforia premium 2026.
          </p>
          <div class="pl-2 sm:pl-6 lg:pl-10">
            <router-link to="/daftar" class="group relative inline-flex items-center gap-4 px-10 py-5 bg-brand text-white text-xl font-display tracking-widest uppercase rounded-none overflow-hidden hover:shadow-[8px_8px_0_0_#1c4f24] transition-all duration-300 -skew-x-6 border-2 border-transparent hover:border-brand hover:text-accent hover:bg-white">
              <div class="skew-x-6 relative z-10">DAFTAR SEKARANG</div>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Right: Structured Editorial Image Layout -->
      <div class="lg:col-span-5 relative h-[60vh] lg:h-[85vh] w-full z-20 mt-16 lg:mt-0 flex items-center justify-end lg:pr-6">
        
        <!-- Architectural Offset Background Block -->
        <div class="absolute inset-y-12 right-0 w-[80%] bg-brand/5 rounded-l-[4rem] hidden lg:block border border-brand/10"></div>
        
        <!-- The Framed Image -->
        <div ref="imageContainerRef" class="relative w-full lg:w-[90%] h-full rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-[0_30px_80px_-15px_rgba(28,79,36,0.2)] border-[8px] border-white">
          <img
            ref="imageRef"
            :src="heroImage"
            alt="Pelari fun run Reed Fitness"
            class="w-full h-[120%] object-cover object-center absolute top-[-10%]"
            loading="eager"
          />
        </div>

        <!-- Spinning Badge overlay (Moved to overlap the frame border) -->
        <div class="absolute bottom-16 -left-12 lg:-left-20 w-32 h-32 lg:w-40 lg:h-40 bg-accent rounded-full flex items-center justify-center shadow-2xl hero-sub pointer-events-none z-30 border border-brand/10">
           <svg class="animate-spin-slow w-full h-full text-brand p-2 lg:p-3" viewBox="0 0 100 100">
            <defs>
              <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
            </defs>
            <text font-size="12" font-weight="bold" fill="currentColor" letter-spacing="3">
              <textPath href="#circle">
                • JOIN THE EUPHORIA • PREMIUM EVENT
              </textPath>
            </text>
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-3 h-3 bg-brand rounded-full"></div>
          </div>
        </div>
        
      </div>
      
    </div>
  </section>
</template>

<style scoped>
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}
.animate-spin-slow {
  animation: spin 15s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
