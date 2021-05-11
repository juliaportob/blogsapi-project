const jwt = require('jsonwebtoken');

const secret = 'Thor is the strongest Avenger';

const registerUser = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;

  if (displayName.length < 8) return res.status(400).json({ message: '"displayName" length must be at least 8 characters long' });

  if (!email) return res.status(400).json({ message: '"email" is required' });

  if (!regexEmail.test(email)) return res.status(400).json({ message: '"email" must be a valid email' });

  if (!password) return res.status(400).json({ message: '"password" is required' });

  if (password.length < 6) return res.status(400).json({ message: '"password" length must be 6 characters long' });

  next();
};

const verifylogin = (req, res, next) => {
  const { email, password } = req.body;

  if (email === '') return res.status(400).json({ message: '"email" is not allowed to be empty' });

  if (!email) return res.status(400).json({ message: '"email" is required' });

  if (password === '') return res.status(400).json({ message: '"password" is not allowed to be empty' });

  if (!password) return res.status(400).json({ message: '"password" is required' });

  next();
};

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });

  try {
    const teste = jwt.verify(authorization, secret);
    req.userData = teste.userData;
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }

  next();
};

module.exports = {
  registerUser,
  verifylogin,
  verifyToken,
};
