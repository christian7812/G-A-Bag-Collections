import { Router, Request, Response } from 'express';
import { dbStore, ProductData } from '../db/index.js';

const router = Router();

// GET all products
router.get('/', async (_req: Request, res: Response) => {
  try {
    const products = await dbStore.getProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET single product
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const product = await dbStore.getProductById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST new product (admin)
router.post('/', async (req: Request, res: Response) => {
  try {
    const productData: ProductData = {
      ...req.body,
      id: req.body.id || `pa-prod-${Date.now()}`,
    };
    const saved = await dbStore.saveProduct(productData);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save product' });
  }
});

// PUT update product (admin)
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const existing = await dbStore.getProductById(id);
    if (!existing) return res.status(404).json({ error: 'Product not found' });

    const updated: ProductData = {
      ...existing,
      ...req.body,
      id,
    };
    const saved = await dbStore.saveProduct(updated);
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE product (admin)
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await dbStore.deleteProduct(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

export default router;
