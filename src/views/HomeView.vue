<template>
  <div>
    <header class="navbar">
      <h1 class="navbar-title">Pengaduan Siswa SMPN21 Malang</h1>
    </header>

    <div class="form-container">
      <form @submit.prevent="send">
        <div style="margin-bottom: 15px;">
          <label for="Nama" style="display: block; font-weight: bold;">Nama</label>
          <input type="text" v-model="formData.nama" class="form-input">
        </div>

        <div style="margin-bottom: 15px;">
          <label for="kelas" style="display: block; font-weight: bold;">Kelas</label>
          <input type="text" v-model="formData.kelas" class="form-input">
        </div>

        <div style="margin-bottom: 15px;">
          <label for="pilihan" style="display: block; font-weight: bold;">Jenis Pengaduan</label>
          <select id="" v-model="formData.jenis" class="form-input">
            <option value="sarpra">Sarana/Prasarana</option>
            <option value="guru">Guru</option>
            <option value="siswa">Siswa</option>
          </select>
        </div>

        <div style="margin-bottom: 15px;">
          <label for="deskripsi" style="display: block; font-weight: bold;">Deskripsi Masalah</label>
          <textarea type="text" v-model="formData.deskripsi" class="form-textarea"></textarea>
        </div>

        <button type="submit" style="background-color: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Kirim</button>
      </form>
    </div>
  </div>
</template>

<style>
* {
  font-family: 'Nunito', sans-serif;
}

.navbar {
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
}

.navbar-title {
  margin: 0;
}

.form-container {
  width: 600px;
  margin: 0 auto;
  margin-top: 40px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.form-input,
.form-textarea {
  width: calc(100% - 18px);
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
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
      try {
        await addDoc(collection(db, 'pengaduan'), this.formData);
        alert('Berhasil')
      } catch (error) {
        console.log(error)
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
