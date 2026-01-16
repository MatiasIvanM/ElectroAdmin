const { Router } = require('express');
const { createSession, deleteSession } = require('../auth/sessionStore');
const {
  findUserByEmail,
  verifyPassword,
  sanitizeUser,
  ensureAdminUser,
} = require('../services/userService');
const { requireAuth } = require('../middleware/auth');

const router = Router();

router.post('/login', async (req, res) => {
  try {
    await ensureAdminUser();
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y password requeridos' });
    }
    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Credenciales invalidas' });
    }
    const valid = await verifyPassword(user, password);
    if (!valid) {
      return res.status(401).json({ error: 'Credenciales invalidas' });
    }
    const token = createSession(user);
    return res.json({ token, user: sanitizeUser(user) });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

router.post('/logout', requireAuth, (req, res) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (token) {
    deleteSession(token);
  }
  res.json({ ok: true });
});

module.exports = router;
