const { Router } = require('express');
const authRoutes = require('./auth');
const productsRoutes = require('./products');
const metricsRoutes = require('./metrics');
const usersRoutes = require('./users');

const router = Router();

router.get('/health', (req, res) => {
  res.json({ ok: true });
});

router.use('/api/auth', authRoutes);
router.use('/api/products', productsRoutes);
router.use('/api/metrics', metricsRoutes);
router.use('/api/users', usersRoutes);

module.exports = router;
