const express = require('express');
const talkersRepository = require('../repositories/talkersRepository');

const router = express.Router();

router.get('/', async (_req, res) => {
    const result = await talkersRepository.findAllTalkers();
    return res.status(200).json(result);
});

module.exports = router;