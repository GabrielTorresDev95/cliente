const express = require('express');
const cors = require('cors');
const app = express();

// Middleware para habilitar CORS
app.use(cors({
  origin: 'https://cliente-4.onrender.com', // Altere para o domínio do seu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware para ler JSON
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor funcionando com CORS!');
});

// Substitua isso com suas rotas reais de login/admin
app.post('/admin/login', (req, res) => {
  const { user, senha } = req.body;
  if (user === 'Administrador' && senha === 'novaSenha123') {
    res.json({ mensagem: 'Login bem-sucedido!' });
  } else {
    res.status(401).json({ erro: 'Credenciais inválidas' });
  }
});

// Porta (padrão: Railway usa process.env.PORT)
//const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => {
  //console.log(`Servidor rodando na porta ${PORT}`);
//});
// Porta fixa na 10000
const PORT = 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

