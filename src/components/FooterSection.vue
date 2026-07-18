<script setup>
import { PhInstagramLogo, PhEnvelope, PhWhatsappLogo, PhTiktokLogo } from '@phosphor-icons/vue'
</script>

<template>
  <footer class="bg-brand text-white pt-32 pb-12 relative z-10 overflow-hidden border-t-8 border-accent">
    
    <!-- Huge Typography Background -->
    <div class="absolute top-1/2 left-0 -translate-y-1/2 w-full text-center pointer-events-none opacity-5 z-0">
      <h2 class="text-[15vw] font-display text-white leading-none uppercase tracking-tighter -skew-x-6">REED FITNESS</h2>
    </div>

    <div class="max-w-[1400px] mx-auto px-6 md:px-12 w-full relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
        
        <!-- Brand -->
        <div class="col-span-1 lg:col-span-4 flex flex-col gap-6">
          <router-link to="/" class="flex items-center gap-4 group">

            <span class="text-5xl font-display tracking-wide uppercase text-white group-hover:text-accent transition-colors duration-500">Reed Fitness</span>
          </router-link>
          <p class="text-white/70 font-medium max-w-sm leading-relaxed text-lg mt-4">
            Komunitas kebugaran premium yang mengutamakan pencapaian, kebersamaan, dan gaya hidup aktif tingkat tinggi.
          </p>
        </div>

        <!-- Links -->
        <div class="md:col-span-3 flex flex-col gap-8">
          <h4 class="text-sm font-black text-accent uppercase tracking-widest">Navigasi</h4>
          <nav class="flex flex-col gap-5">
            <a href="/#tentang" class="text-white/70 hover:text-accent transition-colors w-fit font-bold text-lg uppercase tracking-wider">Tentang Event</a>
            <a href="/#harga" class="text-white/70 hover:text-accent transition-colors w-fit font-bold text-lg uppercase tracking-wider">Investasi</a>
            <a href="/#peraturan" class="text-white/70 hover:text-accent transition-colors w-fit font-bold text-lg uppercase tracking-wider">Peraturan</a>
            <router-link to="/daftar" class="text-accent hover:text-white transition-colors w-fit font-black text-lg uppercase tracking-wider">Daftar Sekarang</router-link>
          </nav>
        </div>

        <!-- Contact -->
        <div class="md:col-span-4 lg:col-span-3 flex flex-col gap-8">
          <h4 class="text-sm font-black text-accent uppercase tracking-widest">Hubungi Kami</h4>
          <div class="flex flex-col gap-5">
            <a href="mailto:info@reedfitness.id" class="flex items-center gap-4 text-white/70 hover:text-accent transition-colors w-fit font-bold text-lg group">
              <div class="p-3 rounded-xl bg-white/5 group-hover:bg-accent group-hover:text-brand transition-colors duration-300">
                <PhEnvelope :size="20" weight="bold" />
              </div>
              info@reedfitness.id
            </a>
            <a href="https://wa.me/6285171713355" target="_blank" rel="noopener" class="flex items-center gap-4 text-white/70 hover:text-accent transition-colors w-fit font-bold text-lg group">
              <div class="p-3 rounded-xl bg-white/5 group-hover:bg-accent group-hover:text-brand transition-colors duration-300">
                <PhWhatsappLogo :size="20" weight="bold" />
              </div>
              +62 851-7171-3355
            </a>
            <a href="https://instagram.com/reedcode.id" target="_blank" rel="noopener" class="flex items-center gap-4 text-white/70 hover:text-accent transition-colors w-fit font-bold text-lg group">
              <div class="p-3 rounded-xl bg-white/5 group-hover:bg-accent group-hover:text-brand transition-colors duration-300">
                <PhInstagramLogo :size="20" weight="bold" />
              </div>
              @reedcode.id
            </a>
            <a href="https://tiktok.com/@reedcode.id" target="_blank" rel="noopener" class="flex items-center gap-4 text-white/70 hover:text-accent transition-colors w-fit font-bold text-lg group">
              <div class="p-3 rounded-xl bg-white/5 group-hover:bg-accent group-hover:text-brand transition-colors duration-300">
                <PhTiktokLogo :size="20" weight="bold" />
              </div>
              @reedcode.id
            </a>
          </div>
        </div>

      </div>

      <div class="pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-sm font-bold text-white/40">
          &copy; 2026 Reed Fitness. Hak Cipta Dilindungi.
        </p>
      </div>
    </div>
  </footer>
</template>
