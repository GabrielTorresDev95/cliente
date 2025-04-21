<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Cadastro de Usuário</h2>
      <form @submit.prevent="cadastrarUsuario">
<div class="form-group">
  <label for="nome">Nome Completo:</label>
  <input
    v-model="usuario.nome"
    id="nome"
    type="text"
    placeholder="Digite seu nome completo"
    required
  />
</div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="usuario.email" id="email" type="email" placeholder="Digite seu email" required />
        </div>

        <div class="form-group">
          <label for="cpf">CPF:</label>
          <input v-model="usuario.cpf" id="cpf" type="text" placeholder="Digite seu CPF" required />
        </div>

        <div class="form-group">
          <label for="telefone">Telefone:</label>
          <input v-model="usuario.telefone" id="telefone" type="text" placeholder="Digite seu telefone" required />
        </div>

        <div class="form-group">
          <label for="endereco">Endereço:</label>
          <input v-model="usuario.endereco" id="endereco" type="text" placeholder="Digite seu endereço" required />
        </div>

        <div class="form-group">
          <label for="cidade">Cidade:</label>
          <input v-model="usuario.cidade" id="cidade" type="text" placeholder="Digite sua cidade" required />
        </div>

        <div class="form-group">
          <label for="estado">Estado:</label>
          <input v-model="usuario.estado" id="estado" type="text" placeholder="Digite seu estado" required />
        </div>

        <div class="form-group">
          <label for="senha">Senha:</label>
          <input v-model="usuario.senha" id="senha" type="password" placeholder="Crie uma senha" required />
        </div>

        <div class="form-group">
          <label for="confirmarSenha">Confirmar Senha:</label>
          <input v-model="usuario.confirmarSenha" id="confirmarSenha" type="password" placeholder="Confirme a senha" required />
        </div>

        <button type="submit" class="login-button">Cadastrar</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CadastroUsuario',
  data() {
    return {
      usuario: {
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
        endereco: '',
        cidade: '',
        estado: '',
        senha: '',
        confirmarSenha: ''
      }
    };
  },
  methods: {
    async cadastrarUsuario() {
      if (this.usuario.senha !== this.usuario.confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
      }

      try {
        await axios.post('/api/users', this.usuario);
        alert('Usuário cadastrado com sucesso!');
        this.usuario = {
          nome: '',
          email: '',
          cpf: '',
          telefone: '',
          endereco: '',
          cidade: '',
          estado: '',
          senha: '',
          confirmarSenha: ''
        };
      } catch (error) {
        console.error('Erro ao cadastrar:', error);
      }
    }
  }
};
</script>

<style scoped>
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
  width: 450px;
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
input[type="email"],
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
</style>
