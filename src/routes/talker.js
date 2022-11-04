const express = require('express');
const talkersRepository = require('../repositories/talkersRepository');

const router = express.Router();

router.get('/', async (_req, res) => {
    const result = await talkersRepository.findAllTalkers();
    return res.status(200).json(result);
});

router.get('/:id', async (req, res) => {
  const idTalker = req.params.id;
  const result = await talkersRepository.findTalkerById(idTalker);
  if (result === undefined) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } 
    return res.status(200).json(result);
});

module.exports = router;
