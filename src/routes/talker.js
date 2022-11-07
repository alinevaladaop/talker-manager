const express = require('express');
const talkersRepository = require('../repositories/talkersRepository');
const validateToken = require('../middleware/validateToken');
const {
  validateName,
  validateAge,
  validateTalk,
  validateTalkRate,
} = require('../middleware/validateTalker');

const router = express.Router();

router.get('/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const foundTalker = await talkersRepository.searchTalker(q);
  return res.status(200).json(foundTalker);
});

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

router.post('/', validateToken, validateName, validateAge, validateTalk, validateTalkRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const id = await talkersRepository.createNewPerson(name, age, talk);
    const result = await talkersRepository.findTalkerById(id);
    return res.status(201).json(result);
  });

router.put('/:id', validateToken, validateName, validateAge, validateTalk, validateTalkRate,
async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  await talkersRepository.updatePerson(id, name, age, talk);
  const result = await talkersRepository.findTalkerById(id);
  return res.status(200).json(result);
});

router.delete('/:id', validateToken, async (req, res) => {
  const idParam = req.params.id;
  await talkersRepository.deletePerson(idParam);
  return res.status(204).end();
});

module.exports = router;
