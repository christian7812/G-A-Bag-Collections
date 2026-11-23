import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { dbStore } from '../db/index.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'pink_aura_secure_jwt_secret_2026';

// Admin Login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  // Validate admin credentials
  if (email.trim().toLowerCase() === 'admin@pinkaura.com' && password === 'pinkaura2026') {
    const user = {
      id: 'admin-01',
      name: 'Chief Brand Executive',
      email: 'admin@pinkaura.com',
      role: 'super_admin',
    };

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });

    return res.json({
      success: true,
      token,
      user,
    });
  }

  return res.status(401).json({ error: 'Invalid admin credentials.' });
});

// Admin Analytics
router.get('/analytics', async (_req: Request, res: Response) => {
  try {
    const orders = await dbStore.getOrders();
    const paidOrders = orders.filter((o) => o.paymentStatus === 'paid');

    const totalSales = paidOrders.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = orders.length;

    res.json({
      totalSales,
      totalOrders,
      dailySales: Math.round(totalSales * 0.18),
      weeklySales: Math.round(totalSales * 0.65),
      monthlySales: totalSales,
      completedOrders: paidOrders.length,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to compute analytics' });
  }
});

export default router;
