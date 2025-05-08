<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Acessar Agora</h2>
      <form @submit.prevent="loginAdmin">
        <div class="form-group">
          <label for="username">Nome de Usuário:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="password">Senha:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit" class="login-button">Entrar</button>
      </form>
      <p class="signup-link">Não tem cadastro ?<router-link to="/admin/cadastro">Cadastre-se</router-link></p>
      <div v-if="error" class="error-message">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginAdmin',
  data() {
    return {
      username: '',
      password: '',
      error: null,
      ngrokURL: 'http://localhost:3000'
    };
  },
  methods: {
    async loginAdmin() {
      this.error = null;
  console.log("Tentando logar com:", this.username);
      
      try {
        const response = await axios.post(`https://cliente-4.onrender.com/`, {
          username: this.username,
          password: this.password,
        });
      console.log('Resposta da API:', response.data); 
        // Verificar se a resposta foi bem-sucedida (status code 2xx)
        if (response.status >= 200 && response.status < 300) {
          
          // Assumindo que o token JWT é retornado no campo 'token' do corpo da resposta
          const token = response.data.token;
          console.log("Token recebido:", token);
          
          if (token) {
            // Armazenar o token (localStorage é um exemplo, mas cookies HTTP são mais seguros)
            localStorage.setItem('adminToken', token);
            console.log("Token armazenado com sucesso.");
            // Redirecionar para a página do dashboard administrativo APÓS o login bem-sucedido
            this.$router.push(this.$route.query.redirect || '/admin/dashboard');

          } else {
            this.error = 'Token de autenticação não recebido.';
            console.warn("Token não veio na resposta.");
          }
        } else {
          // A resposta não foi bem-sucedida, verificar se há uma mensagem de erro no corpo
          this.error = response.data && response.data.message ? response.data.message : 'Erro ao fazer login.';
          console.warn("Erro de status HTTP:", response.status);
        }

      } catch (error) {
        console.error('Erro ao fazer login como administrador:', error);
        if (error.response && error.response.data && error.response.data.message) {
          this.error = error.response.data.message;
        } else {
          this.error = 'Erro ao conectar com o servidor.';
        }
      }
    },
  },
};
</script>

<style scoped>
/* Seus estilos CSS permanecem os mesmos */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #0a0a1a;
}

.login-box {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 400px;
  text-align: center;
  border: 1px solid rgba(255, 153, 0, 0.2);
}

h2 {
  color: #ff9900;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  color: #cccccc;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #333;
  border-radius: 5px;
  background-color: #1a1a2e;
  color: #ffffff;
  box-sizing: border-box;
}

.login-button {
  background: linear-gradient(90deg, #ff9900, #ff6600);
  color: #000;
  border: none;
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 5px 15px rgba(255, 153, 0, 0.4);
  width: 100%;
}

.login-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(255, 153, 0, 0.6);
}

.signup-link {
  margin-top: 20px;
  color: #aaaaaa;
}

.signup-link a {
  color: #ff9900;
  text-decoration: none;
  font-weight: bold;
}

.signup-link a:hover {
  text-decoration: underline;
}

.error-message {
  color: #ff4d4d;
  margin-top: 15px;
  font-weight: bold;
}
</style>
