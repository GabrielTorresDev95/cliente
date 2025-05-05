// loginAdmin.cjs

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || 'ASOACOASaskodaksoASOPAKSDOaoxakOSKOPsdkOPD';

// ✅ Criação correta do pool de conexão
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, // substitua pelo nome do seu banco
});

// 🔐 Rota de Login de Administrador
// rota de login do administrador
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // busca o admin pelo nome
    const [admins] = await pool.execute('SELECT * FROM admins WHERE nome = ?', [username]);
    const admin = admins[0];

    if (!admin) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // verifica a senha
    const passwordMatch = await bcrypt.compare(password, admin.senha);

    if (passwordMatch) {
      // cria o token JWT
      const token = jwt.sign(
        { adminId: admin.id, username: admin.nome },
        jwtSecret,
        { expiresIn: '1h' }
      );
      
      // envia o token na resposta
      return res.json({ token });
    } else {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ message: 'Erro ao fazer login.' });
  }
});


module.exports = router;
