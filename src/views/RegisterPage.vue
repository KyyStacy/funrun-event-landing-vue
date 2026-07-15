<script setup>
import RegistrationForm from '../components/RegistrationForm.vue'
import FooterSection from '../components/FooterSection.vue'
</script>

<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Sports Grid Background -->
    <div class="absolute inset-0 pointer-events-none z-0 opacity-10">
      <div class="absolute inset-0" style="background-image: linear-gradient(to right, #1c4f24 2px, transparent 2px), linear-gradient(to bottom, #1c4f24 2px, transparent 2px); background-size: 4rem 4rem;"></div>
    </div>
    
    <!-- Huge Typography Background -->
    <div class="absolute top-32 left-0 w-full text-center pointer-events-none opacity-[0.03] z-0">
      <h2 class="text-[25vw] font-display text-brand leading-none uppercase tracking-tighter -skew-x-6">DAFTAR</h2>
    </div>

    <div class="pt-32 pb-24 relative z-10 px-6">
      <div class="max-w-3xl mx-auto text-center mb-16">
        <span class="inline-block px-4 py-2 bg-accent text-brand font-bold uppercase tracking-widest text-sm mb-6 -skew-x-6">Registrasi Resmi</span>
        <h1 class="text-6xl sm:text-7xl md:text-8xl font-display tracking-wider text-brand mb-6 uppercase -skew-x-6 leading-[0.9]">
          Formulir<br><span class="text-brand-light">Pendaftaran</span>
        </h1>
        <p class="text-xl text-brand/70 font-medium max-w-lg mx-auto border-l-4 border-accent pl-4 text-left">
          Lengkapi data diri Anda di bawah ini untuk mengamankan slot eksklusif di Reed Fitness Fun Run 2026.
        </p>
      </div>

      <RegistrationForm />
    </div>

    <FooterSection />
  </div>
</template>
