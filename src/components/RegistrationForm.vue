<script setup>
import { ref, computed } from 'vue'
import { PhArrowRight, PhArrowLeft, PhCheckCircle, PhWarningCircle, PhCircleNotch, PhCheck } from '@phosphor-icons/vue'

const currentStep = ref(1)
const totalSteps = 5
const isSubmitted = ref(false)
const isSubmitting = ref(false)

// Step 1: Kategori
const kategoriLomba = ref('')
const tipePeserta = ref('')

// Step 2: Data Diri
const namaLengkap = ref('')
const nomorWA = ref('')
const email = ref('')
const noKTP = ref('')
const jenisKelamin = ref('')
const tempatLahir = ref('')
const tanggalLahir = ref('')
const namaInstansi = ref('')
const kewarganegaraan = ref('WNI')
const provinsi = ref('')
const kota = ref('')
const kecamatan = ref('')
const desa = ref('')
const alamatLengkap = ref('')

// Step 3: Ukuran Kaos
const ukuranKaos = ref('')

// Step 4: Info Tambahan
const golonganDarah = ref('')
const riwayatPenyakit = ref('')
const namaKontakDarurat = ref('')
const relasiKontakDarurat = ref('')

// Step 5: Persetujuan
const dataBenar = ref(false)
const sehatJasmani = ref(false)
const tundukPeraturan = ref(false)

const errors = ref({})

const steps = [
  { number: 1, label: 'Kategori' },
  { number: 2, label: 'Data Diri' },
  { number: 3, label: 'Ukuran Kaos' },
  { number: 4, label: 'Darurat' },
  { number: 5, label: 'Setuju' },
]

const harga = computed(() => {
  if (!kategoriLomba.value || !tipePeserta.value) return null
  const prices = {
    'early-bird': { member: 'Rp 125.000', nonmember: 'Rp 150.000' },
  }
  return tipePeserta.value === 'member' ? prices['early-bird'].member : prices['early-bird'].nonmember
})

function validateStep(step) {
  errors.value = {}
  let valid = true

  if (step === 1) {
    if (!kategoriLomba.value) { errors.value.kategoriLomba = 'Pilih kategori'; valid = false }
    if (!tipePeserta.value) { errors.value.tipePeserta = 'Pilih tipe'; valid = false }
  }
  if (step === 2) {
    if (!namaLengkap.value.trim()) { errors.value.namaLengkap = 'Wajib diisi'; valid = false }
    if (!nomorWA.value.trim()) { errors.value.nomorWA = 'Wajib diisi'; valid = false }
    if (!email.value.trim()) { errors.value.email = 'Wajib diisi'; valid = false }
    if (!noKTP.value.trim() || noKTP.value.length !== 16) { errors.value.noKTP = '16 digit NIK'; valid = false }
    if (!jenisKelamin.value) { errors.value.jenisKelamin = 'Pilih gender'; valid = false }
    if (!tempatLahir.value.trim()) { errors.value.tempatLahir = 'Wajib diisi'; valid = false }
    if (!tanggalLahir.value) { errors.value.tanggalLahir = 'Wajib diisi'; valid = false }
  }
  if (step === 3) {
    if (!ukuranKaos.value) { errors.value.ukuranKaos = 'Pilih ukuran'; valid = false }
  }
  if (step === 4) {
    if (!golonganDarah.value) { errors.value.golonganDarah = 'Wajib diisi'; valid = false }
    if (!namaKontakDarurat.value.trim()) { errors.value.namaKontakDarurat = 'Wajib diisi'; valid = false }
    if (!relasiKontakDarurat.value.trim()) { errors.value.relasiKontakDarurat = 'Wajib diisi'; valid = false }
  }
  if (step === 5) {
    if (!dataBenar.value || !sehatJasmani.value || !tundukPeraturan.value) {
      errors.value.persetujuan = 'Harap centang semua persetujuan'; valid = false
    }
  }
  return valid
}

function nextStep() {
  if (validateStep(currentStep.value)) {
    if (currentStep.value < totalSteps) {
      currentStep.value++
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
    errors.value = {}
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function submitForm() {
  if (validateStep(5)) {
    isSubmitting.value = true
    setTimeout(() => {
      isSubmitting.value = false
      isSubmitted.value = true
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 1500)
  }
}
</script>

<template>
  <div class="w-full max-w-4xl mx-auto">
    
    <!-- Success State -->
    <Transition name="fade" mode="out-in">
      <div v-if="isSubmitted" class="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
        <div class="w-32 h-32 bg-accent rounded-none flex items-center justify-center text-brand mb-10 shadow-[10px_10px_0_0_#1c4f24] border-4 border-brand animate-[pulse_2s_infinite]">
          <PhCheckCircle :size="72" weight="bold" />
        </div>
        <h2 class="text-6xl md:text-8xl font-display uppercase tracking-widest text-brand mb-6 -skew-x-6">Registrasi<br>Berhasil!</h2>
        <p class="text-xl text-brand/70 font-medium mb-12 max-w-xl">
          Terima kasih telah mendaftar. Detail pembayaran dan konfirmasi akan segera dikirim ke email Anda.
        </p>
        <router-link to="/" class="px-10 py-5 bg-brand text-accent text-2xl font-display uppercase tracking-wider rounded-none hover:bg-brand-light hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#dcf259] transition-all -skew-x-6">
          <div class="skew-x-6">Kembali ke Beranda</div>
        </router-link>
      </div>

      <!-- Form Container -->
      <div v-else class="bg-white p-8 md:p-16 rounded-none shadow-[20px_20px_0_0_rgba(28,79,36,0.1)] border-4 border-brand relative overflow-hidden">
        
        <!-- Step Indicator -->
        <div class="flex items-center justify-between mb-16 relative z-10 px-0 md:px-4">
          <div class="absolute top-1/2 left-4 right-4 h-2 bg-brand/10 -translate-y-1/2 z-0"></div>
          <div 
            class="absolute top-1/2 left-4 h-2 bg-brand -translate-y-1/2 z-0 transition-all duration-700 ease-in-out"
            :style="`width: calc(${((currentStep - 1) / (totalSteps - 1)) * 100}% - 2rem)`"
          ></div>

          <div 
            v-for="step in steps" 
            :key="step.number"
            class="relative z-10 flex flex-col items-center gap-4"
          >
            <div 
              class="w-14 h-14 rounded-none flex items-center justify-center font-display text-3xl transition-all duration-500 shadow-sm border-2 -skew-x-6"
              :class="[
                step.number === currentStep ? 'bg-accent text-brand border-brand scale-110 shadow-[5px_5px_0_0_#1c4f24]' :
                step.number < currentStep ? 'bg-brand text-accent border-brand' : 'bg-white text-brand/30 border-brand/20'
              ]"
            >
              <div class="skew-x-6 flex items-center justify-center">
                <PhCheck v-if="step.number < currentStep" weight="bold" :size="24" />
                <span v-else>{{ step.number }}</span>
              </div>
            </div>
            <span 
              class="hidden md:block text-base font-display uppercase tracking-widest transition-colors duration-300"
              :class="step.number <= currentStep ? 'text-brand' : 'text-brand/40'"
            >
              {{ step.label }}
            </span>
          </div>
        </div>

        <Transition name="slide" mode="out-in">
          
          <!-- STEP 1 -->
          <div v-if="currentStep === 1" :key="1" class="px-2 md:px-4">
            <h3 class="text-5xl md:text-6xl font-display uppercase tracking-widest text-brand mb-12 -skew-x-6">Pilih Kategori</h3>
            
            <div class="space-y-12">
              <div class="space-y-6">
                <label class="block text-lg font-black text-brand uppercase tracking-widest">Jarak Tempuh</label>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <label class="relative flex flex-col p-6 sm:p-8 rounded-none cursor-pointer border-4 transition-all duration-300 -skew-x-3"
                    :class="kategoriLomba === '5K' ? 'bg-brand text-accent border-brand shadow-[8px_8px_0_0_#dcf259] -translate-y-1' : 'bg-white border-brand/20 text-brand/50 hover:border-brand hover:bg-brand/5'">
                    <input type="radio" v-model="kategoriLomba" value="5K" class="sr-only" />
                    <div class="skew-x-3 flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-4 sm:gap-0">
                      <span class="block text-5xl sm:text-6xl font-display sm:mb-2 tracking-widest" :class="kategoriLomba === '5K' ? 'text-accent' : 'text-brand'">5K</span>
                      <span class="block text-base sm:text-lg font-bold uppercase tracking-wider text-right sm:text-left">Jarak 5 kilometer</span>
                    </div>
                  </label>
                  <label class="relative flex flex-col p-6 sm:p-8 rounded-none cursor-pointer border-4 transition-all duration-300 -skew-x-3"
                    :class="kategoriLomba === '10K' ? 'bg-brand text-accent border-brand shadow-[8px_8px_0_0_#dcf259] -translate-y-1' : 'bg-white border-brand/20 text-brand/50 hover:border-brand hover:bg-brand/5'">
                    <input type="radio" v-model="kategoriLomba" value="10K" class="sr-only" />
                    <div class="skew-x-3 flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-4 sm:gap-0">
                      <span class="block text-5xl sm:text-6xl font-display sm:mb-2 tracking-widest" :class="kategoriLomba === '10K' ? 'text-accent' : 'text-brand'">10K</span>
                      <span class="block text-base sm:text-lg font-bold uppercase tracking-wider text-right sm:text-left">Jarak 10 kilometer</span>
                    </div>
                  </label>
                </div>
                <p v-if="errors.kategoriLomba" class="text-red-500 font-bold flex items-center gap-2"><PhWarningCircle /> {{ errors.kategoriLomba }}</p>
              </div>

              <div class="space-y-6">
                <label class="block text-lg font-black text-brand uppercase tracking-widest">Tipe Peserta</label>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <label class="relative flex flex-col p-6 sm:p-8 rounded-none cursor-pointer border-4 transition-all duration-300 -skew-x-3"
                    :class="tipePeserta === 'member' ? 'bg-brand text-accent border-brand shadow-[8px_8px_0_0_#dcf259] -translate-y-1' : 'bg-white border-brand/20 text-brand/50 hover:border-brand hover:bg-brand/5'">
                    <input type="radio" v-model="tipePeserta" value="member" class="sr-only" />
                    <div class="skew-x-3 flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-4 sm:gap-0">
                      <span class="block text-3xl sm:text-4xl font-display sm:mb-2 tracking-widest" :class="tipePeserta === 'member' ? 'text-accent' : 'text-brand'">Member</span>
                      <span class="block text-sm sm:text-base font-bold uppercase tracking-wider text-right sm:text-left">Anggota aktif</span>
                    </div>
                  </label>
                  <label class="relative flex flex-col p-6 sm:p-8 rounded-none cursor-pointer border-4 transition-all duration-300 -skew-x-3"
                    :class="tipePeserta === 'non-member' ? 'bg-brand text-accent border-brand shadow-[8px_8px_0_0_#dcf259] -translate-y-1' : 'bg-white border-brand/20 text-brand/50 hover:border-brand hover:bg-brand/5'">
                    <input type="radio" v-model="tipePeserta" value="non-member" class="sr-only" />
                    <div class="skew-x-3 flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-4 sm:gap-0">
                      <span class="block text-3xl sm:text-4xl font-display sm:mb-2 tracking-widest" :class="tipePeserta === 'non-member' ? 'text-accent' : 'text-brand'">Non-Member</span>
                      <span class="block text-sm sm:text-base font-bold uppercase tracking-wider text-right sm:text-left">Peserta umum</span>
                    </div>
                  </label>
                </div>
                <p v-if="errors.tipePeserta" class="text-red-500 font-bold flex items-center gap-2"><PhWarningCircle /> {{ errors.tipePeserta }}</p>
              </div>

              <div v-if="harga" class="p-6 sm:p-8 bg-accent rounded-none border-4 border-brand flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in -skew-x-3 shadow-[8px_8px_0_0_#1c4f24]">
                <div class="skew-x-3">
                  <span class="block text-brand font-black text-sm sm:text-lg uppercase tracking-widest mb-1">Estimasi Biaya (Early Bird)</span>
                  <span class="block text-4xl sm:text-5xl md:text-6xl font-display text-brand tracking-widest">{{ harga }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- STEP 2 -->
          <div v-else-if="currentStep === 2" :key="2" class="px-2 md:px-4">
            <h3 class="text-5xl md:text-6xl font-display uppercase tracking-widest text-brand mb-12 -skew-x-6">Data Diri</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="md:col-span-2 space-y-3">
                <label class="text-base font-black text-brand uppercase tracking-widest">Nama Lengkap (Sesuai KTP)</label>
                <input type="text" v-model="namaLengkap" class="w-full bg-white border-2 border-brand/20 rounded-none px-6 py-5 text-brand font-bold text-lg focus:outline-none focus:border-brand focus:ring-4 focus:ring-accent/50 transition-colors" placeholder="Masukkan nama" />
                <p v-if="errors.namaLengkap" class="text-red-500 font-bold text-sm">{{ errors.namaLengkap }}</p>
              </div>

              <div class="space-y-3">
                <label class="text-base font-black text-brand uppercase tracking-widest">Nomor WhatsApp</label>
                <input type="tel" v-model="nomorWA" class="w-full bg-white border-2 border-brand/20 rounded-none px-6 py-5 text-brand font-bold text-lg focus:outline-none focus:border-brand focus:ring-4 focus:ring-accent/50 transition-colors" placeholder="08..." />
                <p v-if="errors.nomorWA" class="text-red-500 font-bold text-sm">{{ errors.nomorWA }}</p>
              </div>

              <div class="space-y-3">
                <label class="text-base font-black text-brand uppercase tracking-widest">Email</label>
                <input type="email" v-model="email" class="w-full bg-white border-2 border-brand/20 rounded-none px-6 py-5 text-brand font-bold text-lg focus:outline-none focus:border-brand focus:ring-4 focus:ring-accent/50 transition-colors" placeholder="email@contoh.com" />
                <p v-if="errors.email" class="text-red-500 font-bold text-sm">{{ errors.email }}</p>
              </div>

              <div class="md:col-span-2 space-y-3">
                <label class="text-base font-black text-brand uppercase tracking-widest">No. KTP (NIK)</label>
                <input type="text" v-model="noKTP" maxlength="16" class="w-full bg-white border-2 border-brand/20 rounded-none px-6 py-5 text-brand font-bold text-lg focus:outline-none focus:border-brand focus:ring-4 focus:ring-accent/50 transition-colors" placeholder="16 Digit Angka" />
                <p v-if="errors.noKTP" class="text-red-500 font-bold text-sm">{{ errors.noKTP }}</p>
              </div>

              <div class="space-y-3">
                <label class="text-base font-black text-brand uppercase tracking-widest">Jenis Kelamin</label>
                <select v-model="jenisKelamin" class="w-full bg-white border-2 border-brand/20 rounded-none px-6 py-5 text-brand font-bold text-lg focus:outline-none focus:border-brand focus:ring-4 focus:ring-accent/50 transition-colors appearance-none">
                  <option value="" disabled>Pilih...</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
                <p v-if="errors.jenisKelamin" class="text-red-500 font-bold text-sm">{{ errors.jenisKelamin }}</p>
              </div>

              <div class="space-y-3">
                <label class="text-base font-black text-brand uppercase tracking-widest">Tanggal Lahir</label>
                <input type="date" v-model="tanggalLahir" class="w-full bg-white border-2 border-brand/20 rounded-none px-6 py-5 text-brand font-bold text-lg focus:outline-none focus:border-brand focus:ring-4 focus:ring-accent/50 transition-colors [color-scheme:light]" />
                <p v-if="errors.tanggalLahir" class="text-red-500 font-bold text-sm">{{ errors.tanggalLahir }}</p>
              </div>

              <div class="space-y-3">
                <label class="text-base font-black text-brand uppercase tracking-widest">Tempat Lahir</label>
                <input type="text" v-model="tempatLahir" class="w-full bg-white border-2 border-brand/20 rounded-none px-6 py-5 text-brand font-bold text-lg focus:outline-none focus:border-brand focus:ring-4 focus:ring-accent/50 transition-colors" placeholder="Kota" />
                <p v-if="errors.tempatLahir" class="text-red-500 font-bold text-sm">{{ errors.tempatLahir }}</p>
              </div>
            </div>
          </div>

          <!-- STEP 3 -->
          <div v-else-if="currentStep === 3" :key="3" class="px-2 md:px-4">
            <h3 class="text-5xl md:text-6xl font-display uppercase tracking-widest text-brand mb-4 -skew-x-6">Ukuran Jersey</h3>
            <p class="text-xl text-brand/70 font-medium mb-12 border-l-4 border-accent pl-4">Pilih ukuran kaos eksklusif finisher Anda.</p>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <label v-for="size in ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']" :key="size"
                class="relative flex items-center justify-center py-8 rounded-none cursor-pointer border-4 transition-all duration-300 -skew-x-3"
                :class="ukuranKaos === size ? 'bg-brand border-brand text-accent shadow-[8px_8px_0_0_#dcf259] -translate-y-1' : 'bg-white border-brand/20 text-brand/50 hover:border-brand hover:bg-brand/5'">
                <input type="radio" v-model="ukuranKaos" :value="size" class="sr-only" />
                <span class="text-5xl font-display skew-x-3 tracking-widest" :class="ukuranKaos === size ? 'text-accent' : 'text-brand'">{{ size }}</span>
              </label>
            </div>
            <p v-if="errors.ukuranKaos" class="text-red-500 font-bold mt-6 flex items-center gap-2"><PhWarningCircle /> {{ errors.ukuranKaos }}</p>
          </div>

          <!-- STEP 4 -->
          <div v-else-if="currentStep === 4" :key="4" class="px-2 md:px-4">
            <h3 class="text-5xl md:text-6xl font-display uppercase tracking-widest text-brand mb-12 -skew-x-6">Kontak Darurat</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-3">
                <label class="text-base font-black text-brand uppercase tracking-widest">Golongan Darah</label>
                <select v-model="golonganDarah" class="w-full bg-white border-2 border-brand/20 rounded-none px-6 py-5 text-brand font-bold text-lg focus:outline-none focus:border-brand focus:ring-4 focus:ring-accent/50 transition-colors appearance-none">
                  <option value="" disabled>Pilih...</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
                </select>
                <p v-if="errors.golonganDarah" class="text-red-500 font-bold text-sm">{{ errors.golonganDarah }}</p>
              </div>

              <div class="space-y-3">
                <label class="text-base font-black text-brand uppercase tracking-widest">Riwayat Penyakit (Opsional)</label>
                <input type="text" v-model="riwayatPenyakit" class="w-full bg-white border-2 border-brand/20 rounded-none px-6 py-5 text-brand font-bold text-lg focus:outline-none focus:border-brand focus:ring-4 focus:ring-accent/50 transition-colors" placeholder="Cth: Asma" />
              </div>

              <div class="md:col-span-2 space-y-3 mt-4">
                <label class="text-base font-black text-brand uppercase tracking-widest">Nama Kontak Darurat</label>
                <input type="text" v-model="namaKontakDarurat" class="w-full bg-white border-2 border-brand/20 rounded-none px-6 py-5 text-brand font-bold text-lg focus:outline-none focus:border-brand focus:ring-4 focus:ring-accent/50 transition-colors" placeholder="Nama lengkap" />
                <p v-if="errors.namaKontakDarurat" class="text-red-500 font-bold text-sm">{{ errors.namaKontakDarurat }}</p>
              </div>

              <div class="md:col-span-2 space-y-3">
                <label class="text-base font-black text-brand uppercase tracking-widest">Relasi (Cth: Ayah/Ibu/Pasangan)</label>
                <input type="text" v-model="relasiKontakDarurat" class="w-full bg-white border-2 border-brand/20 rounded-none px-6 py-5 text-brand font-bold text-lg focus:outline-none focus:border-brand focus:ring-4 focus:ring-accent/50 transition-colors" placeholder="Relasi" />
                <p v-if="errors.relasiKontakDarurat" class="text-red-500 font-bold text-sm">{{ errors.relasiKontakDarurat }}</p>
              </div>
            </div>
          </div>

          <!-- STEP 5 -->
          <div v-else-if="currentStep === 5" :key="5" class="px-2 md:px-4">
            <h3 class="text-5xl md:text-6xl font-display uppercase tracking-widest text-brand mb-4 -skew-x-6">Persetujuan</h3>
            <p class="text-xl text-brand/70 font-medium mb-10 border-l-4 border-accent pl-4">Harap baca dan konfirmasi persetujuan di bawah ini.</p>
            
            <div class="space-y-4 sm:space-y-6">
              <label class="flex items-start gap-4 sm:gap-6 p-4 sm:p-8 rounded-none border-4 transition-all duration-300 cursor-pointer -skew-x-2"
                :class="dataBenar ? 'bg-brand text-white border-brand shadow-[4px_4px_0_0_#dcf259] sm:shadow-[8px_8px_0_0_#dcf259]' : 'bg-white border-brand/20 hover:border-brand'">
                <div class="relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-none bg-white border-2 border-brand mt-0.5 sm:mt-1 shrink-0 transition-colors skew-x-2"
                  :class="dataBenar ? 'bg-accent border-accent' : ''">
                  <input type="checkbox" v-model="dataBenar" class="sr-only" />
                  <PhCheck v-if="dataBenar" class="text-brand w-4 h-4 sm:w-5 sm:h-5" weight="bold" />
                </div>
                <span class="font-bold text-sm sm:text-lg skew-x-2" :class="dataBenar ? 'text-white' : 'text-brand'">Saya menyatakan bahwa seluruh data yang saya isi adalah benar dan dapat dipertanggungjawabkan.</span>
              </label>

              <label class="flex items-start gap-4 sm:gap-6 p-4 sm:p-8 rounded-none border-4 transition-all duration-300 cursor-pointer -skew-x-2"
                :class="sehatJasmani ? 'bg-brand text-white border-brand shadow-[4px_4px_0_0_#dcf259] sm:shadow-[8px_8px_0_0_#dcf259]' : 'bg-white border-brand/20 hover:border-brand'">
                <div class="relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-none bg-white border-2 border-brand mt-0.5 sm:mt-1 shrink-0 transition-colors skew-x-2"
                  :class="sehatJasmani ? 'bg-accent border-accent' : ''">
                  <input type="checkbox" v-model="sehatJasmani" class="sr-only" />
                  <PhCheck v-if="sehatJasmani" class="text-brand w-4 h-4 sm:w-5 sm:h-5" weight="bold" />
                </div>
                <span class="font-bold text-sm sm:text-lg skew-x-2" :class="sehatJasmani ? 'text-white' : 'text-brand'">Saya menyatakan dalam kondisi sehat jasmani dan rohani untuk mengikuti event fun run ini.</span>
              </label>

              <label class="flex items-start gap-4 sm:gap-6 p-4 sm:p-8 rounded-none border-4 transition-all duration-300 cursor-pointer -skew-x-2"
                :class="tundukPeraturan ? 'bg-brand text-white border-brand shadow-[4px_4px_0_0_#dcf259] sm:shadow-[8px_8px_0_0_#dcf259]' : 'bg-white border-brand/20 hover:border-brand'">
                <div class="relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-none bg-white border-2 border-brand mt-0.5 sm:mt-1 shrink-0 transition-colors skew-x-2"
                  :class="tundukPeraturan ? 'bg-accent border-accent' : ''">
                  <input type="checkbox" v-model="tundukPeraturan" class="sr-only" />
                  <PhCheck v-if="tundukPeraturan" class="text-brand w-4 h-4 sm:w-5 sm:h-5" weight="bold" />
                </div>
                <span class="font-bold text-sm sm:text-lg skew-x-2" :class="tundukPeraturan ? 'text-white' : 'text-brand'">Saya bersedia tunduk pada seluruh peraturan dan ketentuan yang berlaku dalam event Reed Code Fun Run 2026.</span>
              </label>
            </div>
            
            <p v-if="errors.persetujuan" class="text-red-500 font-bold mt-8 flex items-center gap-2"><PhWarningCircle /> {{ errors.persetujuan }}</p>
          </div>

        </Transition>

        <!-- Navigation Buttons -->
        <div class="mt-16 pt-10 border-t-4 border-brand/10 flex flex-col-reverse md:flex-row items-stretch md:items-center justify-between px-2 md:px-4 gap-4">
          <button 
            @click="prevStep" 
            class="flex items-center justify-center gap-3 px-6 md:px-8 py-4 md:py-4 text-brand/50 font-display text-xl md:text-2xl uppercase tracking-widest hover:text-brand transition-colors disabled:opacity-0 -skew-x-6 w-full md:w-auto"
            :disabled="currentStep === 1"
          >
            <div class="skew-x-6 flex items-center gap-3"><PhArrowLeft weight="bold" /> KEMBALI</div>
          </button>

          <button 
            v-if="currentStep < totalSteps"
            @click="nextStep"
            class="flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-accent text-brand font-display uppercase tracking-widest text-xl md:text-2xl rounded-none hover:bg-brand hover:text-accent transition-all duration-300 border-2 border-transparent hover:border-accent -skew-x-6 w-full md:w-auto"
          >
            <div class="skew-x-6 flex items-center gap-3">LANJUT <PhArrowRight weight="bold" /></div>
          </button>
          
          <button 
            v-else
            @click="submitForm"
            :disabled="isSubmitting"
            class="flex items-center justify-center gap-4 px-8 md:px-12 py-4 md:py-5 bg-brand text-accent font-display uppercase tracking-widest text-xl md:text-2xl rounded-none hover:bg-brand-light transition-all duration-300 disabled:opacity-70 disabled:hover:bg-brand border-2 border-transparent hover:border-accent -skew-x-6 shadow-[5px_5px_0_0_#dcf259] w-full md:w-auto"
          >
            <div class="skew-x-6 flex items-center justify-center gap-4">
              <PhCircleNotch v-if="isSubmitting" class="animate-spin" weight="bold" />
              {{ isSubmitting ? 'MEMPROSES...' : 'KIRIM PENDAFTARAN' }}
            </div>
          </button>
        </div>

      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Cinematic slide transitions for step changes */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(40px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
