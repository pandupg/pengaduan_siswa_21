<template>
  <div>
    <header class="navbar" style="background-color: #FFFFFF;">
      <h1 class="navbar-title">Pengaduan Siswa SMP Lab UM Malang</h1>
    </header>

    <div class="form-container">
      <form @submit.prevent="send" ref="form">
        <div style="margin-bottom: 15px;">
          <label for="Nama" style="display: block; font-weight: bold;">Nama</label>
          <input type="text" v-model="formData.nama" class="form-input" required>
        </div>

        <div style="margin-bottom: 15px;">
          <label for="kelas" style="display: block; font-weight: bold;">Kelas</label>
          <input type="text" v-model="formData.kelas" class="form-input" required>
        </div>

        <div style="margin-bottom: 15px;">
          <label for="pilihan" style="display: block; font-weight: bold;">Jenis Pengaduan</label>
          <select id="" v-model="formData.jenis" class="form-select" style="font-family: 'Nunito', sans-serif" required>
            <option value="" disabled selected>Pilih Jenis Pengaduan</option>
            <option value="sarpra">Sarana/Prasarana</option>
            <option value="guru">Guru</option>
            <option value="siswa">Siswa</option>
          </select>
        </div>

        <div style="margin-bottom: 15px;">
          <label for="deskripsi" style="display: block; font-weight: bold;">Deskripsi Masalah</label>
          <textarea type="text" v-model="formData.deskripsi" class="form-textarea" required></textarea>
        </div>

        <button type="submit" style="background-color: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-family: 'Nunito', sans-serif;">Kirim</button>
      </form>
    </div>
  </div>
</template>

<style>
body {
  font-family: 'Nunito', sans-serif;
  color: #000000;
  background-color: #FFFFFF;
  margin: 0; /* Remove default margin */
}

.navbar {
  margin-left: 0; /* Remove left margin */
  margin-right: 0; /* Remove right margin */
}

.navbar-title {
  margin: 0;
}

.form-container {
  width: 100vw; /* Full viewport width */
  max-width: 600px;
  margin-left: auto; /* Align to the right */
  margin-right: auto; /* Align to the left */
  margin-top: 40px;
  background-color: #FFFFFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.form-select {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.form-input,
.form-textarea,
select.form-input {
  width: calc(100% - 18px);
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-family: 'Nunito', sans-serif;
}

.form-textarea {
  resize: vertical; /* Allow vertical resizing */
}
</style>

<script>
import { db } from '../firebase.js'
import { addDoc, collection } from 'firebase/firestore'

export default {
  name: 'HomeView',
  data() {
    return {
      formData: {}
    }
  },
  methods: {
  async send() {
    if (this.$refs.form.checkValidity()) {
      try {
        this.formData.status = false;

        await addDoc(collection(db, 'pengaduan'), this.formData);
        alert('Pengaduan berhasil');
        this.formData = {}; // Mengosongkan formData setelah berhasil mengirim
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Silakan lengkapi semua field sebelum mengirim.');
    }
  }
},
}

// Include Nunito font link
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);
</script>
