<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { PhCheck, PhStar } from '@phosphor-icons/vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
let ctx

const tiers = [
  {
    name: 'Early Bird',
    badge: 'Rekomendasi',
    highlighted: true,
    prices: [
      { type: 'Member', amount: 'Rp 125.000' },
      { type: 'Non-Member', amount: 'Rp 150.000' },
    ],
    features: [
      'Kaos finisher eksklusif',
      'Medali finisher',
      'Goodie bag premium',
      'Hydration station VIP',
      'Sertifikat elektronik',
    ],
  },
  {
    name: 'Normal',
    badge: null,
    highlighted: false,
    prices: [
      { type: 'Member', amount: 'Rp 150.000' },
      { type: 'Non-Member', amount: 'Rp 175.000' },
    ],
    features: [
      'Kaos finisher standar',
      'Medali finisher',
      'Goodie bag',
      'Hydration station',
      'Sertifikat elektronik',
    ],
  },
]

onMounted(() => {
  setTimeout(() => {
    ctx = gsap.context(() => {
      // Simple, robust entrance animation only. No pinning. No sticky stack.
      gsap.fromTo(
        '.pricing-header',
        { y: 50, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.value, start: 'top 75%' }
        }
      )
      
      gsap.fromTo(
        '.pricing-card',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.value, start: 'top 60%' }
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
  <section id="harga" class="relative py-32 z-30 bg-brand text-white overflow-hidden" ref="sectionRef">
    <!-- Sports Background Angle -->
    <div class="absolute inset-0 bg-brand-dark -skew-y-3 origin-top-left z-0 scale-110"></div>
    <div class="absolute inset-0 opacity-10" style="background-image: linear-gradient(to right, #dcf259 1px, transparent 1px), linear-gradient(to bottom, #dcf259 1px, transparent 1px); background-size: 3rem 3rem;"></div>
    
    <div class="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex flex-col lg:flex-row gap-16 lg:gap-12 relative z-10">
      
      <!-- Static Header -->
      <div class="lg:w-5/12 pricing-header flex flex-col justify-center">
        <h2 class="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display text-accent mb-6 leading-[0.85] uppercase -skew-x-6">
          Investasi<br>Kesehatan.
        </h2>
        <p class="text-lg sm:text-xl text-white/80 font-medium mb-12 leading-relaxed max-w-md border-l-4 border-accent pl-4">
          Amankan slot Anda sekarang. Harga khusus tersedia untuk member aktif Reed Fitness.
        </p>
      </div>

      <!-- Static Grid Layout (Bug-Free) -->
      <div class="lg:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="tier in tiers"
          :key="tier.name"
          class="pricing-card w-full rounded-none p-6 sm:p-8 md:p-10 transition-all duration-300 flex flex-col border-4 relative overflow-hidden group -skew-x-2"
          :class="[
            tier.highlighted ? 'bg-white text-brand border-accent shadow-[15px_15px_0_0_#dcf259] -translate-y-2 hover:-translate-y-4 hover:shadow-[20px_20px_0_0_#dcf259]' : 'bg-brand-dark/50 text-white border-white/20 hover:border-white/50 backdrop-blur-md'
          ]"
        >
          <div class="flex items-start justify-between gap-4 mb-10 skew-x-2">
            <h3 class="text-4xl sm:text-5xl font-display uppercase tracking-wider" :class="tier.highlighted ? 'text-brand' : 'text-white'">{{ tier.name }}</h3>
            <span v-if="tier.badge" class="px-3 sm:px-4 py-1 sm:py-1.5 bg-accent text-brand text-[10px] sm:text-xs font-bold uppercase tracking-widest border border-brand/20 flex items-center gap-2 shadow-[2px_2px_0_0_#1c4f24] rounded-none">
              <PhStar weight="fill" />
              {{ tier.badge }}
            </span>
          </div>
          
          <div class="space-y-6 mb-12 flex-1 skew-x-2">
            <div v-for="price in tier.prices" :key="price.type" class="flex flex-col gap-1">
              <span class="text-xs sm:text-sm font-black uppercase tracking-widest" :class="tier.highlighted ? 'text-brand/40' : 'text-white/40'">{{ price.type }}</span>
              <span class="text-4xl sm:text-5xl lg:text-6xl font-display tracking-wider" :class="tier.highlighted ? 'text-brand' : 'text-accent'">{{ price.amount }}</span>
            </div>
          </div>

          <div class="h-px w-full mb-8 skew-x-2" :class="tier.highlighted ? 'bg-brand/10' : 'bg-white/10'"></div>

          <ul class="space-y-4 mb-10 skew-x-2">
            <li v-for="feature in tier.features" :key="feature" class="flex items-center gap-3 sm:gap-4 font-medium text-sm sm:text-base">
              <div class="w-5 h-5 sm:w-6 sm:h-6 rounded-none flex items-center justify-center shrink-0" :class="tier.highlighted ? 'bg-brand/10 text-brand' : 'bg-white/10 text-white'">
                <PhCheck :size="12" weight="bold" />
              </div>
              <span :class="tier.highlighted ? 'text-brand/80' : 'text-white/80'">{{ feature }}</span>
            </li>
          </ul>

          <router-link to="/daftar" class="mt-auto w-full text-center px-8 py-5 font-display transition-all text-xl uppercase tracking-wider rounded-none -skew-x-6 border-2 border-transparent skew-x-2"
            :class="tier.highlighted ? 'bg-brand text-accent hover:bg-brand-light hover:text-white' : 'bg-white/10 text-white hover:bg-white hover:text-brand hover:border-brand'">
            <div class="skew-x-6">DAFTAR SEKARANG</div>
          </router-link>
        </div>
      </div>
      
    </div>
  </section>
</template>
