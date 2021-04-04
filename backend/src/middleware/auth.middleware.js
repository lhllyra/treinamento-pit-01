const jwt = require('jsonwebtoken');

const publicRoutes = ['/'];

const authMiddleware = (req, res, next) => {
  const { headers: { authorization }, url, method } = req;

  if (publicRoutes.includes(url) || (url === '/api/user' && method === 'POST') || (url === '/api/auth' && method === 'POST')) {
    return next(); // é possivel que essa linha precise de um return
  }

  try {
    if (!authorization) {
      throw new Error('Authorization does not exist');
    }

    const [, token] = authorization.split(' ');
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.headers.loggedUser = user;

    return next();
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
};

module.exports = authMiddleware;
