<template>
    <div>
        <table>
            <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Kelas</th>
                <th>Jenis</th>
                <th>Deskripsi</th>
            </tr>
            <tr v-for="(i, no) in pengaduanData" :key="no">
                <td>{{ no+1 }}</td>
                <td>{{ i.nama }}</td>
                <td>{{ i.kelas }}</td>
                <td>{{ i.jenis }}</td>
                <td>{{ i.deskripsi }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import {db} from '../firebase.js'
import {getDocs, collection,} from 'firebase/firestore'

export default {
 data(){
    return{
        pengaduanData: []
    }
 },
    mounted() {
        this.getData()
        console.log(this.pengaduanData)
    },
    methods: {
       async getData(){
        try {
            const data = await getDocs(collection(db, 'pengaduan'))
            data.forEach((pData) => {
                const result = pData.data()
                this.pengaduanData.push({...result, id: pData.id})
            })
        } catch (error) {
            console.log(error)
        }
        }
    }
}
</script>