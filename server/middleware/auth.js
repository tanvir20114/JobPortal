const admin = require('../config/firebase');
const rateLimit = require('express-rate-limit');

const verifyFireBaseToken = async (req, res, next) => {
  const authHeader = req.headers?.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'unauthorized access' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.decoded = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: 'unauthorized access' });
  }
}

const verifyTokenEmail = (req, res, next) => {
  
  if (req.query.email !== req.decoded.email) {
    return res.status(403).send({ message: 'forbidden access' });
  }
  next();
}

const applyLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 30,
  message: { message: 'Too many applications submitted, try again later.' }
});

const jobLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 30,
  message: { message: 'Too many jobs posted, try again later.' }
});

module.exports = { verifyFireBaseToken, verifyTokenEmail, applyLimiter, jobLimiter };