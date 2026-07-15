<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
let ctx

const rules = [
  {
    title: 'Kondisi Fisik',
    desc: 'Peserta wajib memastikan diri dalam kondisi sehat jasmani dan rohani sebelum mengikuti acara. Penyelenggara tidak bertanggung jawab atas cedera atau kondisi medis akibat kelalaian peserta.'
  },
  {
    title: 'Pengambilan Race Pack',
    desc: 'Pengambilan Race Pack wajib dilakukan sesuai jadwal yang telah ditentukan. Peserta wajib membawa identitas asli dan bukti konfirmasi pendaftaran. Tidak melayani pengambilan di hari H.'
  },
  {
    title: 'Ketentuan Pembatalan',
    desc: 'Biaya pendaftaran yang telah dibayarkan tidak dapat dikembalikan (non-refundable) dan slot lari tidak dapat dialihkan ke pihak lain (non-transferable) dengan alasan apa pun.'
  },
  {
    title: 'Disiplin Rute',
    desc: 'Peserta dilarang memotong rute lari, menggunakan kendaraan bermotor, atau melakukan kecurangan lainnya. Pelanggaran akan berakibat diskualifikasi secara sepihak oleh panitia.'
  },
  {
    title: 'Waktu Cut-Off (COT)',
    desc: 'Batas waktu tempuh untuk 5K adalah 1.5 jam dan 10K adalah 2.5 jam. Peserta yang tidak mencapai garis finis dalam waktu tersebut tidak akan mendapatkan medali finisher.'
  },
  {
    title: 'Hak Dokumentasi',
    desc: 'Penyelenggara berhak menggunakan foto dan video peserta selama acara untuk keperluan promosi komersial tanpa kewajiban memberikan kompensasi kepada peserta.'
  }
]

onMounted(() => {
  setTimeout(() => {
    ctx = gsap.context(() => {
      gsap.fromTo(
        '.rule-item',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.rules-grid',
            start: 'top 75%',
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
  <section id="peraturan" class="relative py-32 bg-white overflow-hidden" ref="sectionRef">
    
    <!-- Background Decor -->
    <div class="absolute inset-0 pointer-events-none z-0 opacity-[0.03]">
      <div class="absolute inset-0" style="background-image: linear-gradient(to right, #1c4f24 2px, transparent 2px), linear-gradient(to bottom, #1c4f24 2px, transparent 2px); background-size: 6rem 6rem;"></div>
    </div>

    <!-- Huge Typography Background -->
    <div class="absolute top-1/2 left-0 -translate-y-1/2 w-full text-center pointer-events-none opacity-5 z-0">
      <h2 class="text-[20vw] font-display text-brand leading-none uppercase tracking-tighter -skew-x-6">RULES</h2>
    </div>

    <div class="max-w-[1200px] mx-auto px-6 md:px-12 w-full relative z-10">
      
      <div class="mb-20 text-center">
        <span class="inline-block px-4 py-2 bg-accent text-brand font-bold uppercase tracking-widest text-sm mb-6 rounded-full">Penting</span>
        <h2 class="text-6xl md:text-8xl font-display text-brand uppercase tracking-wider mb-6 -skew-x-6">
          Peraturan & <span class="text-brand-light">Ketentuan</span>
        </h2>
        <p class="text-xl text-brand/70 font-medium max-w-2xl mx-auto">
          Harap baca dan pahami seluruh peraturan acara demi kenyamanan, keselamatan, dan kelancaran bersama.
        </p>
      </div>

      <div class="rules-grid grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
        <div 
          v-for="(rule, index) in rules" 
          :key="rule.title"
          class="rule-item flex gap-6"
        >
          <div class="text-6xl font-display text-brand/20 leading-none">
            0{{ index + 1 }}
          </div>
          <div>
            <h3 class="text-2xl font-bold text-brand uppercase tracking-wide mb-3">{{ rule.title }}</h3>
            <p class="text-brand/70 leading-relaxed">{{ rule.desc }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
