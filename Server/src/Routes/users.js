const { Router } = require('express');
const { requireAuth, requireRole } = require('../middleware/auth');
const {
  loadUsers,
  sanitizeUser,
  createUser,
  updateUserRole,
} = require('../services/userService');

const router = Router();

router.get('/', requireAuth, requireRole('admin'), (req, res) => {
  const users = loadUsers().map(sanitizeUser);
  res.json(users);
});

router.post('/', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Datos incompletos' });
    }
    const user = await createUser({ name, email, password, role });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put('/:id/role', requireAuth, requireRole('admin'), (req, res) => {
  try {
    const { role } = req.body;
    if (!role) {
      return res.status(400).json({ error: 'Role requerido' });
    }
    const user = updateUserRole(req.params.id, role);
    return res.json(user);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

module.exports = router;
