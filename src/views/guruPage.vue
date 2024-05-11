<template>
  <div>
    <header class="navbar" style="background-color: #007bff;">
      <h1 class="navbar-title" style="color: white;">Pengaduan Siswa SMP Lab UM Malang</h1>
    </header>

    <!-- Sort Filter by Type -->
    <div class="sort-filter">
      <label for="sortFilter" class="sort-label">Urutkan berdasarkan:</label>
      <select v-model="sortOption" id="sortFilter" class="sort-select">
        <option value="terbaru">Terbaru</option>
        <option value="terlama">Terlama</option>
        <option value="jenis">Jenis</option>
      </select>
    </div>

    <!-- Table -->
    <div class="table-container" style="margin-top: 20px;">
      <table class="custom-table">
        <thead>
          <tr>
            <th style="width: 15px; text-align: center;">No</th>
            <th style="width: 150px; text-align: center;">Nama</th>
            <th style="width: 75px; text-align: center;">Kelas</th>
            <th style="width: 75px; text-align: center;">Jenis</th>
            <th style="text-align: center;">Deskripsi</th>
            <th style="width: 75px; text-align: center;">Tanggal</th>
            <th style="width: 250px; text-align: center;">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i, index) in sortedPengaduanData" :key="index" :style="{ backgroundColor: i.status ? '#28a745' : '#6c757d' }">
            <td style="text-align: center;">{{ index + 1 }}</td>
            <td>{{ i.nama }}</td>
            <td style="text-align: center;">{{ i.kelas }}</td>
            <td style="text-align: center;">{{ i.jenis }}</td>
            <td>{{ i.deskripsi }}</td>
            <td>{{ i.date }}</td>
            <td style="text-align: center;">
              <button v-if="!i.status && !i.inProcess" @click="toggleStatus(i)" class="btn-selesai">Selesai</button>
              <span v-else-if="i.inProcess" class="proses-text">Proses...</span>
              <button v-if="i.status && !i.inProcess" @click="deleteData(i)" class="btn-hapus">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty Data Message -->
    <div style="margin-top: 20px; padding: 10px; text-align: center;">
      <p v-if="pengaduanData.length === 0" class="empty-message">Belum ada pengaduan yang tersedia.</p>
      <div v-else class="note-container">
        <p>*Catatan: </p>
        <p v-if="pengaduanData.some(item => !item.status)" class="gray-note">Warna abu-abu menunjukkan pengaduan yang belum selesai.</p>
        <p v-if="pengaduanData.some(item => item.status)" class="green-note">Warna hijau menunjukkan pengaduan yang sudah selesai.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase.js'
import { getDocs, collection, doc, updateDoc, deleteDoc } from 'firebase/firestore'

export default {
  data() {
    return {
      pengaduanData: [],
      sortOption: 'terbaru' // Default filter: terbaru
    }
  },
  computed: {
    sortedPengaduanData() {
      return this.sortData();
    }
  },
  mounted() {
    this.check();
    this.getData(); // Panggil getData saat komponen dimount
    this.refreshData(); // Panggil refreshData untuk memperbarui data setiap 30 detik
  },
  methods: {
    async getData() {
      try {
        const data = await getDocs(collection(db, 'pengaduan'))
        this.pengaduanData = data.docs.map(doc => ({ id: doc.id, ...doc.data(), inProcess: false }))
      } catch (error) {
        console.log(error)
      }
    },
    async toggleStatus(pengaduan) {
      try {
        pengaduan.inProcess = true; // Set inProcess menjadi true sebelum memproses perubahan status
        const pengaduanRef = doc(db, 'pengaduan', pengaduan.id)
        await updateDoc(pengaduanRef, {
          status: true
        })
        this.getData(); // Refresh data after updating status
      } catch (error) {
        console.log(error)
      } finally {
        pengaduan.inProcess = false; // Set inProcess menjadi false setelah selesai memproses perubahan status
      }
    },
    async deleteData(pengaduan) {
      try {
        pengaduan.inProcess = true; // Set inProcess menjadi true sebelum memproses penghapusan
        const pengaduanRef = doc(db, 'pengaduan', pengaduan.id)
        await deleteDoc(pengaduanRef)
        this.getData(); // Refresh data after deleting
      } catch (error) {
        console.log(error)
      } finally {
        pengaduan.inProcess = false; // Set inProcess menjadi false setelah selesai memproses penghapusan
      }
    },
    refreshData() {
      setInterval(async () => {
        await this.getData(); // Panggil getData setiap 30 detik
      }, 15000); // Refresh setiap 30 detik (30 detik * 1000 milidetik)
    },
    check(){
      if(!localStorage.getItem('isLoggedIn')){
          this.$router.push('/login')
      } else {
          console.log('selamat datang')
      }
    },
    sortData() {
      if (this.sortOption === 'terbaru') {
        return this.pengaduanData.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (this.sortOption === 'terlama') {
        return this.pengaduanData.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
      } else if (this.sortOption === 'jenis') {
        return this.pengaduanData.slice().sort((a, b) => a.jenis.localeCompare(b.jenis));
      }
    }
  }
}
</script>

<style>
/* Navbar Style */
.navbar {
  background-color: #007bff;
  padding: 10px 20px;
}
.navbar-title {
  color: white;
  margin: 0;
}

/* Sort Filter Style */
.sort-filter {
  margin-top: 20px;
  padding: 10px;
  text-align: center;
}
.sort-label {
  color: #007bff;
  font-weight: bold;
  margin-right: 10px;
}
.sort-select {
  padding: 5px;
  border-radius: 5px;
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
}

/* Table Style */
.custom-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}
th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
th {
  background-color: #f2f2f2;
}

td {
  color: white;
}

@media screen and (max-width: 600px) {
  table {
      overflow-x: auto;
      display: block;
  }
  th, td {
      white-space: nowrap;
      min-width: 15px;
  }
}

/* Button Style */
.btn-selesai {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
}
.proses-text {
  color: white;
  padding: 10px 15px;
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
}
.btn-hapus {
  background-color: #dc3545;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
  margin-left: 5px;
  font-size: 16px;
}

/* Empty Data Message Style */
.empty-message {
  color: #6c757d;
  font-family: 'Nunito', sans-serif;
}
.note-container {
  font-family: 'Nunito', sans-serif;
}
.gray-note {
  color: #6c757d;
}
.green-note {
  color: #28a745;
}
</style>
