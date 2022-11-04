const isEmpty = (value) => value === undefined || value === '';

const tokenNotFound = (res) => res.status(401)
  .json({ message: 'Token não encontrado' });
const invalidToken = (res) => res.status(401)
  .json({ message: 'Token inválido' });

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (isEmpty(authorization)) {
    return tokenNotFound(res);
  }
  if (authorization.length !== 16) {
    return invalidToken(res);
  } 
    return next();
};

module.exports = validateToken;
