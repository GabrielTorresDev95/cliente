<template>
  <div class="user-dashboard-container">
    <header class="user-dashboard-header">
      <h1>Olá, {{ userData ? userData.name : 'Usuário' }}!</h1>
      <p>Bem-vindo ao seu painel.</p>
    </header>

    <main class="user-dashboard-content">
      <div class="user-dashboard-grid">
        <section class="card card-profile">
          <div class="card-header">
            <h2>👤 Seu Perfil</h2>
          </div>
          <div class="card-body">
            <div v-if="userData">
              <p><strong>Nome:</strong> {{ userData.name }}</p>
              <p><strong>Email:</strong> {{ userData.email }}</p>
              <p><strong>Membro desde:</strong> {{ formatDate(userData.createdAt) }}</p>
              <button @click="editProfile">✏️ Editar Perfil</button>
            </div>
            <div v-else>
              <p>Carregando informações do perfil...</p>
            </div>
          </div>
        </section>

        <section class="card card-notifications">
          <div class="card-header">
            <h2>🔔 Notificações</h2>
          </div>
          <div class="card-body">
            <ul v-if="notifications && notifications.length > 0">
              <li v-for="notification in notifications" :key="notification.id">
                {{ notification.message }}
                <small>{{ formatDate(notification.createdAt) }}</small>
              </li>
            </ul>
            <p v-else>Nenhuma notificação recente.</p>
          </div>
        </section>

        <section class="card card-orders">
          <div class="card-header">
            <h2>🛒 Seus Pedidos</h2>
          </div>
          <div class="card-body">
            <ul v-if="orders && orders.length > 0">
              <li v-for="order in orders" :key="order.id">
                Pedido #{{ order.orderId }} - {{ formatDate(order.orderDate) }} - Status: {{ order.status }}
                <button @click="viewOrderDetails(order.id)">Detalhes</button>
              </li>
            </ul>
            <p v-else>Você ainda não fez nenhum pedido.</p>
          </div>
        </section>

        <section class="card card-favorites">
          <div class="card-header">
            <h2>❤️ Favoritos</h2>
          </div>
          <div class="card-body">
            <ul v-if="favorites && favorites.length > 0">
              <li v-for="item in favorites" :key="item.id">
                {{ item.name }}
                <button @click="removeFromFavorites(item.id)">Remover</button>
              </li>
            </ul>
            <p v-else>Sua lista de favoritos está vazia.</p>
          </div>
        </section>

        </div>
    </main>

    <button @click="logout" class="logout-button">🚪 Sair</button>

    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default {
  data() {
    return {
      userData: null,
      notifications: [],
      orders: [],
      favorites: [],
      error: null,
    };
  },
  mounted() {
    this.fetchUserData();
    this.fetchNotifications();
    this.fetchOrders();
    this.fetchFavorites();
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return format(date, 'dd \'de\' MMMM \'de\' yyyy', { locale: ptBR });
    },
    async fetchUserData() {
      const token = localStorage.getItem('userToken');
      const baseUrl = 'http://localhost:3000'; // Ajuste conforme sua API

      if (!token) {
        this.$router.push('/login');
        return;
      }

      try {
        let apiUrl = process.env.VUE_APP_API_URL;
        if (baseUrl) {
          apiUrl = `${baseUrl}/api/user/profile`;
        } else if (process.env.VUE_APP_API_URL) {
          apiUrl = `${process.env.VUE_APP_API_URL}/api/user/profile`;
        } else {
          console.error("Erro: VUE_APP_API_URL ou baseUrl não estão definidos.");
          this.error = 'Erro de configuração da API.';
          return;
        }

        const response = await axios.get(apiUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        this.userData = response.data;
        this.error = null;
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        this.error = 'Erro ao carregar os dados do perfil. Por favor, faça login novamente.';
        localStorage.removeItem('userToken');
        this.$router.push('/login');
      }
    },
    async fetchNotifications() {
      const token = localStorage.getItem('userToken');
      const baseUrl = 'http://localhost:3000'; // Ajuste conforme sua API

      if (!token) return;

      try {
        let apiUrl = process.env.VUE_APP_API_URL;
        if (baseUrl) {
          apiUrl = `${baseUrl}/api/user/notifications`;
        } else if (process.env.VUE_APP_API_URL) {
          apiUrl = `${process.env.VUE_APP_API_URL}/api/user/notifications`;
        } else {
          console.error("Erro: VUE_APP_API_URL ou baseUrl não estão definidos.");
          return;
        }

        const response = await axios.get(apiUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        this.notifications = response.data;
      } catch (error) {
        console.error('Erro ao buscar notificações:', error);
        // Lógica para lidar com erros de busca de notificações
      }
    },
    async fetchOrders() {
      const token = localStorage.getItem('userToken');
      const baseUrl = 'http://localhost:3000'; // Ajuste conforme sua API

      if (!token) return;

      try {
        let apiUrl = process.env.VUE_APP_API_URL;
        if (baseUrl) {
          apiUrl = `${baseUrl}/api/user/orders`;
        } else if (process.env.VUE_APP_API_URL) {
          apiUrl = `${process.env.VUE_APP_API_URL}/api/user/orders`;
        } else {
          console.error("Erro: VUE_APP_API_URL ou baseUrl não estão definidos.");
          return;
        }

        const response = await axios.get(apiUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        this.orders = response.data;
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        // Lógica para lidar com erros de busca de pedidos
      }
    },
    async fetchFavorites() {
      const token = localStorage.getItem('userToken');
      const baseUrl = 'http://localhost:3000'; // Ajuste conforme sua API

      if (!token) return;

      try {
        let apiUrl = process.env.VUE_APP_API_URL;
        if (baseUrl) {
          apiUrl = `${baseUrl}/api/user/favorites`;
        } else if (process.env.VUE_APP_API_URL) {
          apiUrl = `${process.env.VUE_APP_API_URL}/api/user/favorites`;
        } else {
          console.error("Erro: VUE_APP_API_URL ou baseUrl não estão definidos.");
          return;
        }

        const response = await axios.get(apiUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        this.favorites = response.data;
      } catch (error) {
        console.error('Erro ao buscar favoritos:', error);
        // Lógica para lidar com erros de busca de favoritos
      }
    },
    editProfile() {
      // Lógica para redirecionar para a página de edição de perfil
      this.$router.push('/profile/edit');
    },
    viewOrderDetails(orderId) {
      // Lógica para redirecionar para a página de detalhes do pedido
      this.$router.push(`/orders/${orderId}`);
    },
    async removeFromFavorites(itemId) {
      const token = localStorage.getItem('userToken');
      const baseUrl = 'http://localhost:3000'; // Ajuste conforme sua API

      if (!token) return;

      try {
        let apiUrl = process.env.VUE_APP_API_URL;
        if (baseUrl) {
          apiUrl = `${baseUrl}/api/user/favorites/${itemId}`;
        } else if (process.env.VUE_APP_API_URL) {
          apiUrl = `${process.env.VUE_APP_API_URL}/api/user/favorites/${itemId}`;
        } else {
          console.error("Erro: VUE_APP_API_URL ou baseUrl não estão definidos.");
          return;
        }

        await axios.delete(apiUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        // Atualizar a lista de favoritos após a remoção
        this.fetchFavorites();
      } catch (error) {
        console.error('Erro ao remover dos favoritos:', error);
        // Lógica para lidar com erros de remoção de favoritos
      }
    },
    logout() {
      localStorage.removeItem('userToken');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.user-dashboard-container {
  font-family: 'Roboto', sans-serif;
  background-color: #f8f9fa;
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.user-dashboard-header {
  background-color: #007bff;
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 20px;
}

.user-dashboard-header h1 {
  margin-bottom: 5px;
  font-size: 28px;
}

.user-dashboard-header p {
  font-size: 16px;
  opacity: 0.8;
}

.user-dashboard-content {
  margin-top: 20px;
}

.user-dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  background-color: #28a745;
  color: white;
  padding: 15px;
  text-align: center;
}

.card-header h2 {
  font-size: 20px;
  margin-bottom: 0;
}

.card-body {
  padding: 20px;
  color: #333;
}

.card-body p {
  margin-bottom: 10px;
}

.card-body ul {
  list-style-type: none;
  padding: 0;
}

.card-body li {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-body li:last-child {
  border-bottom: none;
}

.card-body small {
  color: #777;
}

.card-body button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
}

.card-body button:hover {
  background-color: #0056b3;
}

.logout-button {
  display: block;
  width: 100%;
  padding: 10px 15px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 20px;
}

.logout-button:hover {
  background-color: #c82333;
}

.error {
  color: red;
  margin-top: 10px;
  text-align: center;
}

@media (min-width: 768px) {
  .user-dashboard-container {
    padding: 30px;
  }
  .user-dashboard-grid {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
}
</style>