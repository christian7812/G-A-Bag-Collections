import { Router } from 'express';
import { dbStore } from '../db/index.js';
const router = Router();
// GET all orders (admin)
router.get('/', async (_req, res) => {
    try {
        const orders = await dbStore.getOrders();
        res.json(orders);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});
// GET single order
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const order = await dbStore.getOrderById(id);
        if (!order)
            return res.status(404).json({ error: 'Order not found' });
        res.json(order);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch order' });
    }
});
// POST create guest order
router.post('/', async (req, res) => {
    try {
        const orderData = {
            ...req.body,
            id: req.body.id || `ord-${Date.now()}`,
            orderNumber: req.body.orderNumber || `PA-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
            createdAt: req.body.createdAt || new Date().toISOString(),
            orderStatus: req.body.orderStatus || 'pending',
            paymentStatus: req.body.paymentStatus || 'pending',
        };
        const saved = await dbStore.saveOrder(orderData);
        res.status(201).json(saved);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to create order' });
    }
});
// PATCH update order status
router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { orderStatus, paymentStatus } = req.body;
        const updated = await dbStore.updateOrderStatus(id, orderStatus, paymentStatus);
        if (!updated)
            return res.status(404).json({ error: 'Order not found' });
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to update order status' });
    }
});
export default router;
