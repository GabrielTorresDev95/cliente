const express = require('express');
const cors = require('cors');
const app = express();

// Middleware para habilitar CORS (ajuste para seu frontend render.com)
app.use(cors({
  origin: 'https://cliente-5.onrender.com', // Domínio do seu site estático
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware para ler JSON
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor funcionando com CORS!');
});

// Rota de login com nomes de campos corrigidos e retorno de token
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'Administrador' && password === 'novaSenha123') {
    // Retorna um token fake (substitua por JWT real no futuro)
    res.json({ token: 'fake-jwt-token' });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

// Porta dinâmica para funcionar no Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
