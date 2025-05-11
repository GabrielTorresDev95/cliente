// app.cjs
const express = require('express');
const cors = require('cors');
const loginAdminRoutes = require('./loginAdmin.cjs');
const adminDashboardRoutes = require('./adminDashboardRoutes.cjs');
const minhaApiRoutes = require('./minharouterAPi.cjs'); // ✅ Importando com o nome de arquivo CORRETO
// const { verificarAdminToken } = require('./auth.cjs'); // Se estiver usando

const router = express.Router(); // Cria um router Express

// Configuração CORS (você pode manter aqui SE precisar de configurações específicas para essas rotas)
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Permite requisições sem origem (ex: curl)
    if (process.env.NODE_ENV === 'production') {
      if (origin === 'https://cliente-4.onrender.com') {
        callback(null, true);
      } else {
        callback(new Error('Origin não permitido'), false);
      }
    } else {
      // Development
      if (origin === 'http://localhost:8080') {
        callback(null, true);
      } else {
        callback(new Error('Origin não permitido'), false);
      }
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
