const { Router } = require('express');
const { readJson, writeJson } = require('../utils/storage');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = Router();
const PRODUCTS_FILE = 'products.json';

router.get('/', (req, res) => {
  const products = readJson(PRODUCTS_FILE, []);
  res.json(products);
});

router.post('/', requireAuth, requireRole('admin'), (req, res) => {
  const products = readJson(PRODUCTS_FILE, []);
  const { name, brand, category, compatibleModels, stock, criticalStock, notes } = req.body;
  if (!name || !brand) {
    return res.status(400).json({ error: 'Nombre y marca requeridos' });
  }
  const newProduct = {
    id: `prd-${Date.now()}`,
    name,
    brand,
    category: category || 'General',
    compatibleModels: compatibleModels || [],
    stock: Number.isFinite(stock) ? stock : 0,
    criticalStock: Number.isFinite(criticalStock) ? criticalStock : 0,
    notes: notes || '',
  };
  products.push(newProduct);
  writeJson(PRODUCTS_FILE, products);
  return res.status(201).json(newProduct);
});

module.exports = router;
