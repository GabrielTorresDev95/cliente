<template>
  <div>
    <nav>
      <router-link to="/"></router-link>
      <router-link to="/LoginUser"></router-link>
      <router-link to="/AdminDashboard"></router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import teste from './components/teste.vue';
import LoginUser from './components/LoginUser.vue';
import AdminDashboard from './components/AdminDashboard.vue';

export default {
  name: 'App',
  components: {
    teste,
    LoginUser,
    AdminDashboard
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: black;
}
</style>