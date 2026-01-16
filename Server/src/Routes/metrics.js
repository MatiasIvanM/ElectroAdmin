const { Router } = require('express');
const { readJson } = require('../utils/storage');

const router = Router();
const METRICS_FILE = 'metrics.json';

router.get('/', (req, res) => {
  const metrics = readJson(METRICS_FILE, {
    consultas: 0,
    conversiones: 0,
    productosMasVistos: [],
    stockCritico: 0,
  });
  res.json(metrics);
});

module.exports = router;
