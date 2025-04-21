<template>
  <div class="dashboard-container">
    <!-- Botão para abrir/fechar o menu -->
    <button class="menu-toggle" @click="toggleSidebar">☰ Menu</button>

    <!-- Sidebar -->
    <aside v-show="sidebarOpen" class="sidebar">
      <nav>
        <ul>
          <li><a href="#">🏠 Dashboard</a></li>
          <li><a href="#">👥 Usuários</a></li>
          <li><a href="#">📊 Relatórios</a></li>
          <li><a href="#">⚙️ Configurações</a></li>
           <li><router-link to="/admin/cards">🗂️ Gestão de Cards</router-link></li>
          <li><a href="#" @click="logout">🚪 Sair</a></li>
        </ul>
      </nav>
    </aside>

    <!-- Cabeçalho -->
    <header class="dashboard-header">
      <h1>Dashboard Administrativo</h1>
      <p>Bem-vindo ao painel do administrador!</p>
    </header>

    <!-- Conteúdo -->
    <main class="dashboard-content">
      <div class="dashboard-grid">
        <section class="card card-users">
          <div class="card-header">
            <h2>👥 Usuários</h2>
            <p>Gerencie contas e permissões.</p>
          </div>
          <div class="card-body">
            <div v-if="adminData && adminData.userCount">
              <p><strong>Total de Usuários:</strong> {{ adminData.userCount }}</p>
            </div>
            <div v-else>
              <p>Carregando número de usuários...</p>
            </div>
          </div>
        </section>

        <section class="card card-reports">
          <div class="card-header">
            <h2>📊 Relatórios</h2>
            <p>Acompanhe dados importantes.</p>
          </div>
          <div class="card-body">
            <div v-if="adminData && adminData.reportCount">
              <p><strong>Número de Relatórios:</strong> {{ adminData.reportCount }}</p>
            </div>
            <div v-else>
              <p>Carregando número de relatórios...</p>
            </div>
          </div>
        </section>

        <section class="card card-settings">
          <div class="card-header">
            <h2>⚙️ Configurações</h2>
            <p>Personalize o sistema.</p>
          </div>
          <div class="card-body">
            <div v-if="adminData && adminData.settingCount">
              <p><strong>Número de Configurações:</strong> {{ adminData.settingCount }}</p>
            </div>
            <div v-else>
              <p>Carregando número de configurações...</p>
            </div>
          </div>
        </section>

        <section class="card card-pie-chart">
          <div class="card-header">
            <h2>🍰 Distribuição de Usuários</h2>
            <p>Veja como os usuários estão distribuídos por categorias.</p>
          </div>
          <div class="card-body">
            <apexchart width="100%" type="pie" :options="pieChartOptions" :series="pieSeries" />
          </div>
        </section>

        <section class="card card-analytics">
          <div class="card-header">
            <h2>📈 Visão Geral</h2>
            <p>Acompanhe o desempenho e métricas em tempo real.</p>
          </div>
          <div class="card-body">
            <apexchart width="100%" type="bar" :options="chartOptions" :series="series" />
          </div>
        </section>
      </div>
    </main>

    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios';
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      sidebarOpen: false,
      adminData: null,
      error: null,
      chartOptions: {
        chart: {
          id: "basic-bar",
          toolbar: {
            show: false
          }
        },
        xaxis: {
          categories: ["Usuários", "Relatórios", "Configurações"],
        },
        colors: ['#1E88E5'],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '50%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            colors: ['#fff']
          }
        },
        title: {
          text: "Estatísticas do Sistema",
          align: 'center',
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#333'
          }
        },
      },
      series: [
        {
          name: "Contagem",
          data: [0, 0, 0],
        },
      ],
      pieChartOptions: {
        labels: ['Ativos', 'Inativos', 'Pendentes'],
        colors: ['#000', '#e67e22'],
        legend: {
          position: 'bottom',
        },
        title: {
          text: "Distribuição de Usuários",
          align: 'center',
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#333'
          }
        },
      },
      pieSeries: [60, 30, 10],
    };
  },
  watch: {
    adminData(newData) {
      if (newData) {
        this.series[0].data = [
          newData.userCount || 0,
          newData.reportCount || 0,
          newData.settingCount || 0,
        ];
      }
    },
  },
  mounted() {
    this.fetchAdminDashboardData();
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    async fetchAdminDashboardData() {
      const token = localStorage.getItem('adminToken');
      const baseUrl = 'http://localhost:3000';

      if (!token) {
        this.$router.push('/login');
        return;
      }

      try {
        let apiUrl = process.env.VUE_APP_API_URL;
        if (baseUrl) {
          apiUrl = `${baseUrl}/api/admin/dashboard`;
        } else if (process.env.VUE_APP_API_URL) {
          apiUrl = `${process.env.VUE_APP_API_URL}/api/admin/dashboard`;
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

        this.adminData = response.data;
        this.error = null;
      } catch (error) {
        console.error('Erro ao buscar dados do painel:', error);
        this.error = 'Erro ao carregar os dados do painel. Por favor, faça login novamente.';
        localStorage.removeItem('adminToken');
        this.$router.push('/login');
      }
    },
    logout() {
      localStorage.removeItem('adminToken');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  font-family: 'Roboto', sans-serif;
  background-color: #f4f7fc;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.menu-toggle {
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 18px;
  cursor: pointer;
  z-index: 1001;
  border-radius: 5px;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  background-color: #34495e;
  color: white;
  padding: 20px;
  z-index: 1000;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 20px;
}

.sidebar a {
  color: white;
  text-decoration: none;
  font-size: 16px;
}

.sidebar a:hover {
  text-decoration: underline;
}

.dashboard-header {
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
}

.dashboard-header h1 {
  margin-bottom: 10px;
  font-size: 24px;
}

.dashboard-header p {
  margin-top: 0;
  font-size: 16px;
}

.dashboard-content {
  margin-top: 20px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  background-color: #3498db;
  color: white;
  padding: 15px;
  text-align: center;
}

.card-header h2 {
  font-size: 18px;
}

.card-header p {
  font-size: 14px;
}

.card-body {
  padding: 20px;
  color: #333;
}

.card-pie-chart .card-body {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  padding: 10px 15px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 20px;
}

button:hover {
  background-color: #c0392b;
}

.error {
  color: red;
  margin-top: 10px;
  text-align: center;
}

@media (min-width: 1400px) {
  .dashboard-container {
    padding: 40px;
  }
}
</style>
