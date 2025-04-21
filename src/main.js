// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importe o seu arquivo de rotas

const app = createApp(App);

app.use(router); // Use o plugin do Vue Router

app.mount('#app');