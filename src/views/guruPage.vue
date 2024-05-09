<template>
  <header class="navbar">
    <h1 class="navbar-title">Pengaduan Siswa SMP Lab UM Malang</h1>
  </header>

  <div class="table-container" style="margin-top: 20px;">
    <table class="custom-table">
      <thead>
        <tr>
          <th style="width: 15px; text-align: center;">No</th>
          <th style="width: 300px; text-align: center;">Nama</th>
          <th style="width: 75px; text-align: center;">Kelas</th>
          <th style="width: 75px; text-align: center;">Jenis</th>
          <th style="text-align: center;">Deskripsi</th>
          <th style="width: 150px; text-align: center;">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, index) in pengaduanData" :key="index">
          <td style="text-align: center;">{{ index + 1 }}</td>
          <td>{{ i.nama }}</td>
          <td style="text-align: center;">{{ i.kelas }}</td>
          <td style="text-align: center;">{{ i.jenis }}</td>
          <td>{{ i.deskripsi }}</td>
          <td style="text-align: center;">
            <button v-if="!i.status" @click="toggleStatus(i)" style="background-color: red; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-family: 'Nunito', sans-serif;">Selesai</button>
            <span v-else>Selesai</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
  .navbar {
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
}

.navbar-title {
  margin: 0;
}

  .table-container {
    width: 1500px;
    margin: 0 auto; /* Untuk membuatnya menjadi di tengah layar */
    overflow-x: auto; /* Mengizinkan scroll horizontal jika konten melebihi lebar tabel */
  }
  
  .custom-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .custom-table th,
  .custom-table td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  
  .custom-table th {
    background-color: #f2f2f2;
  }
  </style>

<script>
import { db } from '../firebase.js'
import { getDocs, collection, doc, updateDoc } from 'firebase/firestore'

export default {
  data() {
    return {
      pengaduanData: []
    }
  },
  mounted() {
    this.getData(); // Panggil getData saat komponen dimount
    this.refreshData(); // Panggil refreshData untuk memperbarui data setiap 30 detik
  },
  methods: {
    async getData() {
      try {
        const data = await getDocs(collection(db, 'pengaduan'))
        this.pengaduanData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      } catch (error) {
        console.log(error)
      }
    },
    async toggleStatus(pengaduan) {
      try {
        const pengaduanRef = doc(db, 'pengaduan', pengaduan.id)
        await updateDoc(pengaduanRef, {
          status: true
        })
        this.getData(); // Refresh data after updating status
      } catch (error) {
        console.log(error)
      }
    },
    refreshData() {
      setInterval(async () => {
        await this.getData(); // Panggil getData setiap 30 detik
      }, 30000); // Refresh setiap 30 detik (30 detik * 1000 milidetik)
    }
  }
}
</script>
