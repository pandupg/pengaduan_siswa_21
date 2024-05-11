<template>
    <header class="navbar" style="background-color: #007bff;">
      <h1 class="navbar-title" style="color: white;">Pengaduan Siswa SMP Lab UM Malang</h1>
    </header>

    <div class="form-container">
        <h2>LOGIN GURU</h2>
        <form action="">
            <label for="email" style="display: block; font-weight: bold;">Email</label>
            <input type="email" v-model="email" class="form-input" required>

            <label for="password" style="display: block; font-weight: bold;">Password</label>
            <input type="password" v-model="password" class="form-input" required>
            <button type="button" @click="login" style="background-color: #007bff; color: white; margin-top: 20px; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-family: 'Nunito', sans-serif; font-size: 16px;">Kirim</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            if (this.email == 'guru@gmail.com' && this.password == '123') {
                this.$router.push('/guru')
                localStorage.setItem('isLoggedIn', true)
            } else {
                alert('Email/password salah')
            }
        }
    }
}
</script>

<style>
.navbar {
  background-color: #007bff;
  padding: 10px 20px;
}
.navbar-title {
  color: white;
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
</style>