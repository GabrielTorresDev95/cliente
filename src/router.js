import { createRouter, createWebHistory } from 'vue-router';
import teste from './components/teste.vue';
import LoginUser from './components/LoginUser.vue'; // Ajuste o caminho para o seu componente de login
import AdminDashboard from './components/AdminDashboard.vue'; // Ajuste o caminho para o seu componente do dashboard
import axios from 'axios';
import GerenciamentoCards from './components/GerenciamentoCards.vue';
import CadastrarUsuario from './components/CadastrarUsuario.vue';

const routes = [
  { path: '/', name: 'Home', component: teste },
  {
    path: '/admin/login',
    name: 'loginUser',
    component: LoginUser,
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true } // Protege a rota
  },
   {
    path: '/admin/cards',
    name: 'GerenciamentoCards',
    component: GerenciamentoCards
  },
  {
    path: '/admin/cadastro',
    name: 'CadastrarUsuario',
    component: CadastrarUsuario
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('adminToken');

  if (to.meta.requiresAuth && !token) {
    next({ path: '/login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
