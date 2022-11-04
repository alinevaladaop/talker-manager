const express = require('express');
const validateLogin = require('../middleware/validateLogin');

const router = express.Router();

function randomToken(length) { // function from stackoverflow
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

router.post('/', validateLogin, async (req, res) => 
  // const { email, password } = req.body;
     res.status(200).json({
      token: randomToken(16),
    }));

module.exports = router;
