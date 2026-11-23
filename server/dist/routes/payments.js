import { Router } from 'express';
import { paystackService } from '../services/paystack.js';
import { dbStore } from '../db/index.js';
const router = Router();
// 1. Initiate Paystack USSD Payment
router.post('/paystack/initiate', async (req, res) => {
    try {
        const { orderId, orderNumber, amount, phone, network, reference } = req.body;
        if (!orderId || !amount || !phone) {
            return res.status(400).json({ error: 'Missing orderId, amount or phone.' });
        }
        const session = await paystackService.initiateUSSD({
            orderId,
            orderNumber: orderNumber || `PA-${Date.now()}`,
            amount: Number(amount),
            phone,
            network,
            reference,
        });
        res.json(session);
    }
    catch (error) {
        console.error('Payment initiation error:', error);
        res.status(500).json({ error: 'Failed to initiate USSD payment.' });
    }
});
// 2. Verify Paystack Payment
router.post('/paystack/verify', async (req, res) => {
    try {
        const { orderId, reference, simulateOutcome } = req.body;
        if (!reference) {
            return res.status(400).json({ error: 'Transaction reference is required.' });
        }
        const result = await paystackService.verifyTransaction(reference, simulateOutcome || 'success');
        if (result.verified) {
            // Safely update order to paid & decrement stock in database
            if (orderId) {
                await dbStore.updateOrderStatus(orderId, 'paid', 'paid');
            }
            return res.json({
                status: 'success',
                verified: true,
                reference: result.reference,
                message: result.message,
            });
        }
        else {
            if (orderId) {
                await dbStore.updateOrderStatus(orderId, 'pending', 'failed');
            }
            return res.status(400).json({
                status: 'failed',
                verified: false,
                reference,
                message: result.message,
            });
        }
    }
    catch (error) {
        console.error('Payment verification error:', error);
        res.status(500).json({ error: 'Internal error verifying payment.' });
    }
});
// 3. Paystack Webhook Handler
router.post('/paystack/webhook', async (req, res) => {
    try {
        const signature = req.headers['x-paystack-signature'];
        const rawBody = JSON.stringify(req.body);
        const isValid = paystackService.verifyWebhookSignature(rawBody, signature);
        if (!isValid && process.env.NODE_ENV === 'production') {
            return res.status(401).send('Invalid webhook signature');
        }
        const event = req.body;
        if (event?.event === 'charge.success') {
            const reference = event.data?.reference;
            // Mark matching order as paid and decrement stock safely
            const orders = await dbStore.getOrders();
            const matchingOrder = orders.find((o) => o.paystackReference === reference);
            if (matchingOrder) {
                await dbStore.updateOrderStatus(matchingOrder.id, 'paid', 'paid');
            }
        }
        res.status(200).send('Webhook processed');
    }
    catch (error) {
        console.error('Webhook processing error:', error);
        res.status(500).send('Webhook error');
    }
});
export default router;
