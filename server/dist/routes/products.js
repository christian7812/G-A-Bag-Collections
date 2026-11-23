import { Router } from 'express';
import { dbStore } from '../db/index.js';
const router = Router();
// GET all products
router.get('/', async (_req, res) => {
    try {
        const products = await dbStore.getProducts();
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});
// GET single product
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await dbStore.getProductById(id);
        if (!product)
            return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});
// POST new product (admin)
router.post('/', async (req, res) => {
    try {
        const productData = {
            ...req.body,
            id: req.body.id || `pa-prod-${Date.now()}`,
        };
        const saved = await dbStore.saveProduct(productData);
        res.status(201).json(saved);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to save product' });
    }
});
// PUT update product (admin)
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const existing = await dbStore.getProductById(id);
        if (!existing)
            return res.status(404).json({ error: 'Product not found' });
        const updated = {
            ...existing,
            ...req.body,
            id,
        };
        const saved = await dbStore.saveProduct(updated);
        res.json(saved);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to update product' });
    }
});
// DELETE product (admin)
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await dbStore.deleteProduct(id);
        res.json({ success: true });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
});
export default router;
