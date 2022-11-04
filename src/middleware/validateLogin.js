const isValidEmail = (email) => {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
};

const isEmpty = (value) => value === undefined || value === '';

const emailEmpty = (res) => res.status(400)
  .json({ message: 'O campo "email" é obrigatório' });
const passwordEmpty = (res) => res.status(400)
  .json({ message: 'O campo "password" é obrigatório' });
const invalidEmail = (res) => res.status(400)
  .json({ message: 'O "email" deve ter o formato "email@email.com"' });
const invalidPassword = (res) => res.status(400)
  .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (isEmpty(email)) {
    return emailEmpty(res);
  }
  if (!isValidEmail(email)) {
    return invalidEmail(res);
  }
  if (isEmpty(password)) {
    return passwordEmpty(res);
  }
  if (password.length < 6) {
    return invalidPassword(res);
  } 
    return next();
};

module.exports = validateLogin;