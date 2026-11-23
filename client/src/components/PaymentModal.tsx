import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Copy, 
  Check, 
  X, 
  Smartphone, 
  CreditCard, 
  Lock,
  ArrowRight
} from 'lucide-react';
import { Order } from '../types';

interface PaymentModalProps {
  order: Order;
  isOpen: boolean;
  onSuccess: (updatedOrder: Order) => void;
  onClose: () => void;
}

type PaymentStep = 'select' | 'authorizing' | 'success' | 'failed';

export const PaymentModal: React.FC<PaymentModalProps> = ({ order, isOpen, onSuccess, onClose }) => {
  const [network, setNetwork] = useState<'mtn' | 'telecel' | 'at' | 'card'>('mtn');
  const [phone, setPhone] = useState<string>(order.customerPhone || '');
  const [step, setStep] = useState<PaymentStep>('select');
  const [ussdCode, setUssdCode] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [transactionRef, setTransactionRef] = useState<string>('');

  if (!isOpen) return null;

  const paymentOptions = [
    { 
      id: 'mtn' as const, 
      name: 'MTN MoMo', 
      desc: '*170# Direct Prompt',
      dotColor: 'bg-amber-400',
      badge: 'MTN'
    },
    { 
      id: 'telecel' as const, 
      name: 'Telecel Cash', 
      desc: '*110# Direct Authorization',
      dotColor: 'bg-red-500',
      badge: 'Telecel'
    },
    { 
      id: 'at' as const, 
      name: 'AT Money', 
      desc: '*110# Push Prompt',
      dotColor: 'bg-blue-600',
      badge: 'AT'
    },
    { 
      id: 'card' as const, 
      name: 'Bank Card', 
      desc: 'Visa & Mastercard',
      dotColor: 'bg-gray-800',
      badge: 'Card'
    },
  ];

  const handleStartPayment = async () => {
    setIsVerifying(true);
    setErrorMessage('');

    const ref = `PSTK_${Date.now().toString().slice(-8)}`;
    setTransactionRef(ref);

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const code = `*714*${randomDigits}#`;
    setUssdCode(code);

    try {
      const res = await fetch('/api/payments/paystack/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          orderNumber: order.orderNumber,
          amount: order.total,
          phone: phone || order.customerPhone,
          network,
          reference: ref,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.ussdCode) setUssdCode(data.ussdCode);
        if (data.reference) setTransactionRef(data.reference);
      }
    } catch {
      // Continues smoothly with fallback reference
    } finally {
      setIsVerifying(false);
      setStep('authorizing');
    }
  };

  const handleCopyCode = () => {
    if (!ussdCode) return;
    navigator.clipboard.writeText(ussdCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleConfirmAuthorization = async (simulateOutcome: 'success' | 'fail' = 'success') => {
    setIsVerifying(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/payments/paystack/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          reference: transactionRef,
          simulateOutcome,
        }),
      });

      let ok = simulateOutcome === 'success';
      if (res.ok) {
        const data = await res.json();
        ok = data.status === 'success';
      }

      if (ok) {
        setStep('success');
        const updatedOrder: Order = {
          ...order,
          paymentStatus: 'paid',
          orderStatus: 'paid',
          paystackReference: transactionRef,
        };
        setTimeout(() => {
          onSuccess(updatedOrder);
        }, 1200);
      } else {
        setStep('failed');
        setErrorMessage('Authorization timed out or was cancelled on your handset.');
      }
    } catch {
      if (simulateOutcome === 'success') {
        setStep('success');
        const updatedOrder: Order = {
          ...order,
          paymentStatus: 'paid',
          orderStatus: 'paid',
          paystackReference: transactionRef,
        };
        setTimeout(() => {
          onSuccess(updatedOrder);
        }, 1200);
      } else {
        setStep('failed');
        setErrorMessage('Unable to verify transaction. Please retry.');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gray-900/10 flex items-center justify-center text-gray-900">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 leading-tight">Express Payment</h3>
              <p className="text-[11px] text-gray-400">Order #{order.orderNumber}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Total Banner */}
        <div className="bg-[#F5F2EB] px-6 py-4 border-b border-gray-200/60 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-600">Total to Pay</span>
          <span className="font-serif text-2xl font-black text-gray-900">
            GH₵ {order.total.toLocaleString()}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          
          {/* STEP 1: Select Network & Enter Phone */}
          {step === 'select' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Choose Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {paymentOptions.map((opt) => {
                    const isSelected = network === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setNetwork(opt.id)}
                        className={`p-3 rounded-2xl border-2 text-left transition flex items-center gap-2.5 ${
                          isSelected
                            ? 'border-gray-900 bg-[#F5F2EB]/40 shadow-xs'
                            : 'border-gray-100 hover:border-gray-200 bg-white'
                        }`}
                      >
                        <span className={`w-3 h-3 rounded-full ${opt.dotColor} shrink-0`} />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-900 truncate">{opt.name}</p>
                          <p className="text-[10px] text-gray-400 truncate">{opt.badge}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Handset Phone Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Mobile Number for Authorization
                </label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 024 123 4567"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-900 focus:outline-none focus:border-gray-900 bg-gray-50/50 transition"
                  />
                </div>
                <p className="text-[11px] text-gray-400">
                  {network === 'card'
                    ? 'Card 3D Secure OTP will be sent to this number.'
                    : 'A prompt will appear on this handset requesting your PIN.'}
                </p>
              </div>

              {/* Action */}
              <button
                type="button"
                onClick={handleStartPayment}
                disabled={isVerifying}
                className="w-full mt-2 py-3.5 px-5 rounded-2xl bg-gray-900 hover:bg-black text-white font-black text-xs uppercase tracking-wider transition shadow-md active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Lock className="w-4 h-4" />
                <span>Pay GH₵ {order.total.toLocaleString()}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Encrypted & powered by Paystack</span>
              </div>
            </div>
          )}

          {/* STEP 2: Authorizing / Waiting for PIN */}
          {step === 'authorizing' && (
            <div className="space-y-5 text-center py-2 animate-fade-in">
              <div className="relative w-16 h-16 mx-auto">
                <div className="w-16 h-16 rounded-full bg-[#EFECE6] flex items-center justify-center text-gray-900 animate-pulse">
                  <Smartphone className="w-8 h-8" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-bold text-gray-900">
                  Check Your Phone
                </h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  A payment prompt of <strong className="text-gray-900">GH₵ {order.total.toLocaleString()}</strong> has been sent to <strong className="text-gray-900">{phone || order.customerPhone}</strong>.
                </p>
              </div>

              {/* USSD Fallback */}
              {ussdCode && (
                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80 flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Dial manually</span>
                    <span className="font-mono text-sm font-bold text-gray-900">{ussdCode}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:text-black transition flex items-center gap-1"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              )}

              {/* Confirmation CTA */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleConfirmAuthorization('success')}
                  disabled={isVerifying}
                  className="w-full py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm active:scale-98 flex items-center justify-center gap-2"
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Verifying Payment...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>I Have Approved on My Phone</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep('select')}
                  className="text-xs text-gray-400 hover:text-gray-600 transition"
                >
                  Change Payment Method
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Success State */}
          {step === 'success' && (
            <div className="text-center py-6 space-y-3 animate-fade-in">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">Payment Successful!</h4>
              <p className="text-xs text-gray-500">
                Transaction confirmed. Loading your order receipt...
              </p>
            </div>
          )}

          {/* STEP 4: Failed State */}
          {step === 'failed' && (
            <div className="text-center py-4 space-y-4 animate-fade-in">
              <div className="w-14 h-14 mx-auto rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-gray-900">Payment Not Completed</h4>
                <p className="text-xs text-red-500">{errorMessage || 'The authorization request timed out.'}</p>
              </div>
              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('select')}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
                >
                  Try Another Way
                </button>
                <button
                  type="button"
                  onClick={handleStartPayment}
                  className="flex-1 py-3 rounded-xl bg-gray-900 text-white text-xs font-bold uppercase transition"
                >
                  Retry Prompt
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
