const isEmpty = (value) => value === undefined || value === '';

const isValidWatchedAt = (date) => {
  const watchedAtRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/; // from stackoverflow
  return watchedAtRegex.test(date);
};

const isInvalidRate = (rate) => {
  const invalidRate = rate < 1 || rate > 5 || !Number.isInteger(rate);
  return invalidRate;
};

const nameNotFound = (res) => res.status(400)
  .json({ message: 'O campo "name" é obrigatório' });
const invalidName = (res) => res.status(400)
  .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
const ageNotFound = (res) => res.status(400)
  .json({ message: 'O campo "age" é obrigatório' });
const invalidAge = (res) => res.status(400)
  .json({ message: 'A pessoa palestrante deve ser maior de idade' });
const talkNotFound = (res) => res.status(400)
  .json({ message: 'O campo "talk" é obrigatório' });
const watchedAtNotFound = (res) => res.status(400)
  .json({ message: 'O campo "watchedAt" é obrigatório' });
const invalidWatchedAt = (res) => res.status(400)
  .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
const rateNotFound = (res) => res.status(400)
  .json({ message: 'O campo "rate" é obrigatório' });
const invalidRate = (res) => res.status(400)
  .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (isEmpty(name)) return nameNotFound(res);
  if (name.length < 3) return invalidName(res);
  return next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (isEmpty(age)) return ageNotFound(res);
  if (age < 18) return invalidAge(res);
  return next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (isEmpty(talk)) return talkNotFound(res);
  if (isEmpty(talk.watchedAt)) return watchedAtNotFound(res);
  if (!isValidWatchedAt(talk.watchedAt)) return invalidWatchedAt(res);
  return next();
};

const validateTalkRate = (req, res, next) => {
  const { talk } = req.body;

  if (isEmpty(talk.rate)) return rateNotFound(res);
  if (isInvalidRate(talk.rate)) return invalidRate(res);
  return next();
};

module.exports = {
  validateName,
  validateAge,
  validateTalk,
  validateTalkRate,
};
