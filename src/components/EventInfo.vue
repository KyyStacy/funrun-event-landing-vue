<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { PhCalendarBlank, PhMapPin, PhTimer, PhUsers } from '@phosphor-icons/vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
let ctx

const details = [
  {
    icon: PhCalendarBlank,
    label: 'Tanggal',
    value: '15 Nov 2026',
    desc: 'Flag off pukul 05:30 WIB',
    colSpan: 'md:col-span-2 lg:col-span-3'
  },
  {
    icon: PhMapPin,
    label: 'Lokasi',
    value: 'Alun-Alun Pusat',
    desc: 'Area start/finish utama',
    colSpan: 'md:col-span-2 lg:col-span-2'
  },
  {
    icon: PhTimer,
    label: 'Kategori',
    value: '5K & 10K',
    desc: 'Jalur steril 100%',
    colSpan: 'md:col-span-2 lg:col-span-2'
  },
  {
    icon: PhUsers,
    label: 'Peserta',
    value: 'Semua Kalangan',
    desc: 'Terbuka untuk umum',
    colSpan: 'md:col-span-2 lg:col-span-3'
  },
]

onMounted(() => {
  setTimeout(() => {
    ctx = gsap.context(() => {
      gsap.fromTo(
        '.bento-header',
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.05, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.value,
            start: 'top 80%',
          }
        }
      )

      gsap.fromTo(
        '.bento-card',
        { y: 80, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          duration: 0.5, 
          stagger: 0.05, 
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: '.bento-grid',
            start: 'top 85%',
          }
        }
      )
    }, sectionRef.value)
  }, 100)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section id="tentang" class="relative py-32 overflow-hidden z-20" ref="sectionRef">
    
    <!-- Background Decor -->
    <div class="absolute inset-0 pointer-events-none z-0 opacity-[0.03]">
      <div class="absolute inset-0" style="background-image: linear-gradient(to right, #1c4f24 1px, transparent 1px), linear-gradient(to bottom, #1c4f24 1px, transparent 1px); background-size: 2rem 2rem;"></div>
    </div>

    <!-- Section Divider Marquee -->
    <div class="absolute top-0 left-0 w-[200vw] flex overflow-hidden whitespace-nowrap bg-brand py-3 -rotate-1 origin-left z-0 shadow-lg border-y border-brand-light/30">
      <h2 class="animate-[marquee_15s_linear_infinite] text-lg font-bold tracking-[0.2em] text-brand-light uppercase flex items-center gap-4">
        <span>&bull; Siapkan dirimu</span> 
        <span class="text-accent">&bull; Hancurkan batasmu</span>
        <span>&bull; Siapkan dirimu</span> 
        <span class="text-accent">&bull; Hancurkan batasmu</span>
        <span>&bull; Siapkan dirimu</span> 
        <span class="text-accent">&bull; Hancurkan batasmu</span>
        <span>&bull; Siapkan dirimu</span> 
        <span class="text-accent">&bull; Hancurkan batasmu</span>
        <span>&bull; Siapkan dirimu</span> 
        <span class="text-accent">&bull; Hancurkan batasmu</span>
      </h2>
    </div>

    <div class="max-w-[1400px] mx-auto px-6 md:px-12 w-full pt-16 relative z-10">
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-20">
        <h2 class="bento-header lg:col-span-7 text-5xl md:text-7xl font-display uppercase tracking-widest text-brand leading-[1] -skew-x-6">
          <div class="skew-x-6">
            Dirancang untuk<br>
            <span class="text-brand-light">Pengalaman Maksimal.</span>
          </div>
        </h2>
        <p class="bento-header lg:col-span-5 text-xl md:text-2xl text-brand/70 font-medium leading-relaxed border-l-4 border-accent pl-4">
          Lebih dari sekadar lari. Ini adalah perayaan kebugaran yang digarap dengan standar premium untuk kepuasan setiap pelari.
        </p>
      </div>

      <!-- Asymmetric Bento Grid (Brutalist Sports Mode) -->
      <div class="bento-grid grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <div
          v-for="item in details"
          :key="item.label"
          class="bento-card bg-white rounded-none border-4 border-brand p-8 md:p-14 flex flex-col justify-between group transition-all duration-700 shadow-[10px_10px_0_0_rgba(28,79,36,0.1)] hover:shadow-[15px_15px_0_0_#dcf259] hover:-translate-y-2 relative overflow-hidden"
          :class="item.colSpan"
        >
          <!-- Subtle background texture -->
          <div class="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

          <div class="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-16 md:mb-24 relative z-10">
            <div class="w-16 h-16 md:w-20 md:h-20 rounded-none border-2 border-brand bg-white flex items-center justify-center text-brand group-hover:scale-110 group-hover:bg-accent group-hover:border-accent transition-all duration-700 -skew-x-6 shadow-[4px_4px_0_0_#1c4f24]">
              <div class="skew-x-6">
                <component :is="item.icon" :size="32" weight="bold" class="md:w-10 md:h-10" />
              </div>
            </div>
            <span class="text-base font-display text-brand/40 uppercase tracking-widest">{{ item.label }}</span>
          </div>
          
          <div class="relative z-10">
            <h3 class="text-4xl md:text-6xl font-display text-brand mb-4 tracking-widest uppercase -skew-x-6">
              <div class="skew-x-6">{{ item.value }}</div>
            </h3>
            <p class="text-lg md:text-xl text-brand/60 font-medium">{{ item.desc }}</p>
          </div>
        </div>
      </div>
      
    </div>
  </section>
</template>
