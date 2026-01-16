const crypto = require('crypto');

const sessions = new Map();

const createSession = (user) => {
  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, {
    userId: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
    createdAt: Date.now(),
  });
  return token;
};

const getSession = (token) => sessions.get(token);

const deleteSession = (token) => sessions.delete(token);

module.exports = {
  createSession,
  getSession,
  deleteSession,
};
