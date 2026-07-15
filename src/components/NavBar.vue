<script setup>
import { ref, onMounted } from 'vue'
import { PhList, PhX } from '@phosphor-icons/vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const sentinel = ref(null)

const navLinks = [
  { label: 'Tentang', href: '/#tentang' },
  { label: 'Harga', href: '/#harga' },
  { label: 'Peraturan', href: '/#peraturan' },
]

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  if (sentinel.value) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isScrolled.value = !entry.isIntersecting
      },
      { threshold: 1.0 }
    )
    observer.observe(sentinel.value)
  }
})
</script>

<template>
  <div ref="sentinel" class="absolute top-0 left-0 w-px h-5 pointer-events-none" aria-hidden="true"></div>
  
  <header 
    class="fixed top-0 left-0 right-0 z-50 h-[90px] flex items-center transition-all duration-300"
    :class="[
      isScrolled 
        ? 'bg-brand/95 backdrop-blur-md shadow-2xl shadow-black/20 border-b-[3px] border-accent' 
        : 'bg-transparent'
    ]"
  >
    <div class="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex items-center justify-between">
      
      <!-- Brand -->
      <router-link to="/" class="flex items-center gap-4 relative z-50 group" @click="closeMobileMenu">
        <div class="w-14 h-14 rounded-full overflow-hidden border-2 border-accent transition-transform duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(220,242,89,0.3)] bg-white">
          <img src="/logo.png" alt="Reed Fitness Logo" class="w-full h-full object-cover" />
        </div>
        <span class="text-3xl font-display tracking-wide uppercase transition-colors" :class="isScrolled ? 'text-white' : 'text-brand'">Reed Fitness</span>
      </router-link>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-10">
        <router-link
          v-for="link in navLinks"
          :key="link.label"
          :to="link.href"
          class="text-2xl font-display tracking-widest uppercase transition-colors relative group"
          :class="isScrolled ? 'text-white/80 hover:text-accent' : 'text-brand/80 hover:text-brand'"
        >
          {{ link.label }}
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full rounded-full" :class="isScrolled ? 'bg-accent' : 'bg-brand'"></span>
        </router-link>
        <router-link
          to="/daftar"
          class="ml-4 px-8 py-3 text-lg font-display tracking-wider uppercase bg-accent text-brand rounded-none border-2 border-accent hover:bg-transparent hover:text-accent active:scale-95 transition-all duration-300 -skew-x-6"
        >
          <div class="skew-x-6">Daftar Sekarang</div>
        </router-link>
      </nav>

      <!-- Mobile Toggle -->
      <button
        class="md:hidden relative z-50 p-2 transition-colors"
        :class="[
          isMobileMenuOpen ? 'text-brand' : (isScrolled ? 'text-white' : 'text-brand')
        ]"
        @click="toggleMobileMenu"
        :aria-label="isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'"
      >
        <PhX v-if="isMobileMenuOpen" :size="28" weight="bold" />
        <PhList v-else :size="28" weight="bold" />
      </button>

    </div>
  </header>

  <!-- Mobile Nav Overlay (Moved outside header to prevent backdrop-filter containing block bug) -->
  <nav 
    class="fixed inset-0 bg-[var(--color-base)]/95 backdrop-blur-2xl z-40 flex flex-col items-center justify-center gap-8 transition-opacity duration-300 md:hidden"
    :class="isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
  >
    <router-link
      v-for="link in navLinks"
      :key="link.label"
      :to="link.href"
      class="text-4xl font-display text-brand/70 hover:text-brand transition-colors uppercase tracking-widest"
      @click="closeMobileMenu"
    >
      {{ link.label }}
    </router-link>
    <router-link
      to="/daftar"
      class="mt-6 px-10 py-4 text-xl font-display tracking-widest uppercase bg-accent text-brand rounded-none border-2 border-accent active:scale-95 transition-all -skew-x-6"
      @click="closeMobileMenu"
    >
      <div class="skew-x-6">DAFTAR SEKARANG</div>
    </router-link>
  </nav>
</template>
