// routes/login.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
require('dotenv').config(); // Carrega as variáveis do .env

const router = express.Router();

const jwtSecret = process.env.JWT_SECRET || 'segredo-super-seguro';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'nozomi.proxy.rlwy.net',
  port: process.env.DB_PORT || 10051,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'SUA_SENHA_RAILWAY',
  database: process.env.DB_NAME || 'railway',
});

// 🔐 Login de Administrador
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // busca por nome na tabela correta
    const [admins] = await pool.execute('SELECT * FROM administradores WHERE usuario = ?', [username]);
    const admin = admins[0];

    if (!admin) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
    }

    const passwordMatch = await bcrypt.compare(password, admin.senha);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
    }

    // Gera o token
    const token = jwt.sign(
      { adminId: admin.id, username: admin.usuario },
      jwtSecret,
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch (error) {
    console.error('Erro no login do administrador:', error);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

module.exports = router;
