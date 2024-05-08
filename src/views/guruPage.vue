<template>
    <header class="navbar">
      <h1 class="navbar-title">Pengaduan Siswa SMPN21 Malang</h1>
    </header>

    <div class="table-container" style="margin-top: 10px;">
      <table class="custom-table">
        <thead>
          <tr>
            <th style="width: 15px; text-align: center;">No</th>
            <th style="width: 300px; text-align: center;">Nama</th>
            <th style="width: 75px; text-align: center;">Kelas</th>
            <th style="width: 75px; text-align: center;">Jenis</th>
            <th>Deskripsi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i, index) in pengaduanData" :key="index">
            <td style="text-align: center;">{{ index + 1 }}</td>
            <td>{{ i.nama }}</td>
            <td style="text-align: center;">{{ i.kelas }}</td>
            <td style="text-align: center;">{{ i.jenis }}</td>
            <td>{{ i.deskripsi }}</td>
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
    width: 90%;
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
  import { getDocs, collection } from 'firebase/firestore'
  
  export default {
    data() {
      return {
        pengaduanData: []
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      async getData() {
        try {
          const data = await getDocs(collection(db, 'pengaduan'))
          data.forEach((pData) => {
            const result = pData.data()
            this.pengaduanData.push({ ...result, id: pData.id })
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
  </script>
  