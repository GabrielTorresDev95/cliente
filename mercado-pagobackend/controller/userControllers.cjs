const express = require('express');
const router = express.Router();

// Usuários simulados
let users = [
  { id: 1, nome: 'Gabriel', email: 'gabriel@email.com' }
];

// Listar usuários
router.get('/', (req, res) => {
  res.json(users);
});

// Cadastrar novo usuário
router.post('/', (req, res) => {
  const novoUsuario = {
    id: users.length + 1,
    ...req.body
  };
  users.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

module.exports = router;
