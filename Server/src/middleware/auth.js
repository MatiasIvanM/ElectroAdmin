const { getSession } = require('../auth/sessionStore');

const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }
  const session = getSession(token);
  if (!session) {
    return res.status(401).json({ error: 'Token invalido' });
  }
  req.user = session;
  return next();
};

const requireRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({ error: 'No autorizado' });
  }
  return next();
};

module.exports = {
  requireAuth,
  requireRole,
};
