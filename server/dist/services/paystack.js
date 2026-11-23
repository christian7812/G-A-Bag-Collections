import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || 'sk_test_demo_placeholder_key_do_not_expose';
const PAYSTACK_PUBLIC_KEY = process.env.PAYSTACK_PUBLIC_KEY || 'pk_test_demo_placeholder_key';
const PAYSTACK_WEBHOOK_SECRET = process.env.PAYSTACK_WEBHOOK_SECRET || 'whsec_demo_secret';
// In-memory set of processed transaction references to prevent duplicate payment processing
const processedTransactions = new Set();
export const paystackService = {
    /**
     * Generates a USSD payment initiation session
     */
    initiateUSSD: async (params) => {
        const reference = params.reference || `PSTK_USSD_${Date.now()}`;
        const codeSuffix = Math.floor(1000 + Math.random() * 9000);
        const ussdCode = `*714*44*${codeSuffix}#`;
        // If live Paystack keys are provided in environment, we can interact with Paystack API:
        // https://api.paystack.co/charge
        if (process.env.PAYSTACK_SECRET_KEY && !process.env.PAYSTACK_SECRET_KEY.includes('placeholder')) {
            try {
                const response = await fetch('https://api.paystack.co/charge', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        amount: params.amount * 100, // Paystack uses pesewas/kobo
                        email: `guest-${params.orderNumber.toLowerCase()}@pinkaura.com`,
                        currency: 'GHS',
                        reference,
                        ussd: {
                            type: params.network || '714',
                        },
                    }),
                });
                const data = (await response.json());
                if (data.status && data.data?.ussd_code) {
                    return {
                        reference: data.data.reference,
                        ussdCode: data.data.ussd_code,
                        amount: params.amount,
                        provider: 'Paystack USSD Live Gateway',
                        status: 'pending',
                        instructions: [
                            `Dial ${data.data.ussd_code} on your registered phone.`,
                            'Input your PIN to authorize payment.',
                        ],
                    };
                }
            }
            catch (err) {
                console.warn('Paystack live charge initiation exception; continuing in sandboxed USSD flow');
            }
        }
        // Modular mock demonstration mode compliant with Paystack USSD specification
        return {
            reference,
            ussdCode,
            amount: params.amount,
            provider: 'Paystack USSD Sandbox (Ghana)',
            status: 'pending',
            instructions: [
                `Check your mobile phone handset for the authorization prompt.`,
                `If no prompt appears within 10 seconds, dial ${ussdCode} directly.`,
                `Enter your Mobile Money / USSD PIN to confirm GH₵ ${params.amount.toLocaleString()}.`,
                'Keep this window open while verification finishes.',
            ],
        };
    },
    /**
     * Verifies the payment with Paystack backend.
     * Prevents duplicate payment processing.
     */
    verifyTransaction: async (reference, simulateOutcome = 'success') => {
        // 1. Check for duplicate processing
        if (processedTransactions.has(reference)) {
            return {
                verified: true,
                reference,
                message: 'Transaction has already been verified and processed.',
            };
        }
        // 2. If live Paystack keys are provided, query Paystack endpoint:
        if (process.env.PAYSTACK_SECRET_KEY && !process.env.PAYSTACK_SECRET_KEY.includes('placeholder')) {
            try {
                const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    },
                });
                const data = (await response.json());
                if (data.status && data.data?.status === 'success') {
                    processedTransactions.add(reference);
                    return {
                        verified: true,
                        reference,
                        amount: data.data.amount / 100,
                        message: 'Payment verified successfully by Paystack.',
                    };
                }
                else {
                    return {
                        verified: false,
                        reference,
                        message: data.message || 'Payment not verified by network.',
                    };
                }
            }
            catch (err) {
                console.error('Error verifying transaction with Paystack:', err);
            }
        }
        // 3. Modular mock sandbox verification for demonstration:
        if (simulateOutcome === 'success') {
            processedTransactions.add(reference);
            return {
                verified: true,
                reference,
                message: 'Mock USSD transaction verified successfully on backend.',
            };
        }
        return {
            verified: false,
            reference,
            message: 'USSD prompt timed out or declined by user on handset.',
        };
    },
    /**
     * Webhook Signature Validation for incoming Paystack webhooks
     */
    verifyWebhookSignature: (payload, signature) => {
        if (!signature)
            return false;
        const hash = crypto
            .createHmac('sha512', PAYSTACK_WEBHOOK_SECRET)
            .update(payload)
            .digest('hex');
        return hash === signature;
    },
};
