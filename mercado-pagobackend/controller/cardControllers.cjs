const express = require('express');
const router = express.Router();

// Simulando um banco de dados em memória
let cards = [
  { id: 1, titulo: 'Curso PRF', descricao: 'Curso completo para a PRF' },
  { id: 2, titulo: 'Curso PM', descricao: 'Preparatório para Polícia Militar' }
];

// Buscar todos os cards
router.get('/', (req, res) => {
  res.json(cards);
});

// Adicionar um novo card
router.post('/', (req, res) => {
  const novoCard = {
    id: cards.length + 1,
    ...req.body
  };
  cards.push(novoCard);
  res.status(201).json(novoCard);
});

// Atualizar um card
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = cards.findIndex(card => card.id === id);

  if (index === -1) return res.status(404).json({ error: 'Card não encontrado' });

  cards[index] = { ...cards[index], ...req.body };
  res.json(cards[index]);
});

// Deletar um card
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  cards = cards.filter(card => card.id !== id);
  res.status(204).end();
});

module.exports = router;
