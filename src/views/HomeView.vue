<template>
  <div>
    <header class="navbar" style="background-color: #007bff;">
      <h1 class="navbar-title" style="color: white;">Pengaduan Siswa SMP Lab UM Malang</h1>
    </header>

    <div class="form-container">
      <h2>FORM PENGADUAN</h2>
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

        <div style="display: flex; justify-content: space-between;">
          <button :disabled="isSending" type="submit" :style="submitButtonStyle">{{ submitButtonText }}</button>
          <button type="button" @click="resetForm" style="background-color: #dc3545; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-family: 'Nunito', sans-serif; font-size: 16px;">Hapus Form</button>
        </div>
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
  margin: 0;
}

.navbar-title {
  margin: 0;
}

.form-container {
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 40px;
  background-color: #ffffff;
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
      formData: {
        date: this.getCurrentDateTime() // Set tanggal dengan waktu saat ini
      },
      isSending: false // State untuk menunjukkan apakah data sedang dikirim atau tidak
    }
  },
  computed: {
    submitButtonText() {
      return this.isSending ? 'Proses...' : 'Kirim';
    },
    submitButtonStyle() {
      return {
        backgroundColor: this.isSending ? '#6c757d' : '#007bff',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontFamily: 'Nunito, sans-serif',
        fontSize: '16px'
      };
    }
  },
  methods: {
    async send() {
      if (this.$refs.form.checkValidity()) {
        try {
          this.isSending = true; // Set isSending menjadi true sebelum mengirim data

          await addDoc(collection(db, 'pengaduan'), this.formData);
          this.formData = { date: this.getCurrentDateTime() }; // Mengosongkan formData setelah berhasil mengirim dan mengatur ulang tanggal
        } catch (error) {
          console.log(error);
        } finally {
          this.isSending = false; // Set isSending menjadi false setelah selesai mengirim data
        }
      } else {
        alert('Silakan lengkapi semua field sebelum mengirim.');
      }
    },
    resetForm() {
      this.formData = { date: this.getCurrentDateTime() }; // Mengosongkan formData saat tombol "Hapus Form" diklik dan mengatur ulang tanggal
    },
    getCurrentDateTime() {
      const now = new Date();
      const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
      const time = `${this.padZero(now.getHours())}:${this.padZero(now.getMinutes())}:${this.padZero(now.getSeconds())}`;
      return `${date} ${time}`; // Mengembalikan tanggal dan waktu dalam format yang diinginkan
    },
    padZero(value) {
      return value < 10 ? `0${value}` : value; // Menambahkan angka 0 di depan jika nilai kurang dari 10
    }
  }
}

// Include Nunito font link
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);
</script>