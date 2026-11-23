import React, { useState } from 'react';
import { 
  Search, 
  Package, 
  Eye, 
  CheckCircle2, 
  Clock, 
  X, 
  ShieldCheck, 
  Truck, 
  Phone, 
  MapPin, 
  Filter
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { Order, OrderStatus, PaymentStatus } from '../types';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus } = useProducts();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleOpenDetail = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    await updateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, orderStatus: newStatus });
    }
  };

  const handlePaymentStatusChange = async (orderId: string, newPaymentStatus: PaymentStatus) => {
    await updateOrderStatus(orderId, selectedOrder?.orderStatus || 'paid', newPaymentStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, paymentStatus: newPaymentStatus });
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = 
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerPhone.includes(search) ||
      o.city.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || o.orderStatus === statusFilter || o.paymentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-brand-border/60 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-charcoal">
            Order Management & Fulfillment
          </h2>
          <p className="text-xs text-brand-muted mt-0.5">
            Track customer orders, inspect Paystack USSD transaction references, and dispatch nationwide couriers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-brand-bg border border-brand-border text-brand-charcoal">
            Total Orders: <strong>{orders.length}</strong>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-brand-border/60 shadow-soft flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order #, customer name, phone or city..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-brand-border bg-brand-bg/40 text-xs text-brand-charcoal focus:outline-none focus:border-brand-accent transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-brand-muted whitespace-nowrap">Filter:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-brand-bg border border-brand-border rounded-xl px-3 py-2 text-xs text-brand-charcoal focus:outline-none focus:border-brand-accent cursor-pointer"
          >
            <option value="all">All Orders</option>
            <option value="paid">Paid (Paystack Verified)</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-brand-border/60 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-brand-bg/50 text-brand-muted uppercase tracking-wider text-[10px] border-b border-brand-border/40">
              <tr>
                <th className="py-3.5 px-6">Order Number</th>
                <th className="py-3.5 px-6">Customer & Phone</th>
                <th className="py-3.5 px-6">Destination</th>
                <th className="py-3.5 px-6">Items</th>
                <th className="py-3.5 px-6">Total (GH₵)</th>
                <th className="py-3.5 px-6">Payment</th>
                <th className="py-3.5 px-6">Fulfillment Status</th>
                <th className="py-3.5 px-6 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/40 text-brand-charcoal font-medium">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-brand-muted text-xs">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-brand-bg/30 transition">
                    <td className="py-4 px-6 font-mono font-bold text-brand-charcoal">
                      {ord.orderNumber}
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-bold">{ord.customerName}</p>
                      <p className="text-[11px] text-brand-muted">{ord.customerPhone}</p>
                    </td>
                    <td className="py-4 px-6 text-brand-muted">
                      {ord.city}, {ord.region}
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold">{ord.items.length} handbag{ord.items.length > 1 ? 's' : ''}</span>
                    </td>
                    <td className="py-4 px-6 font-serif font-bold text-sm">
                      GH₵ {ord.total.toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        ord.paymentStatus === 'paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ord.paymentStatus === 'failed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {ord.paymentStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                        className="bg-brand-bg border border-brand-border text-xs rounded-lg px-2.5 py-1 text-brand-charcoal font-semibold focus:outline-none focus:border-brand-accent cursor-pointer"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="paid">Paid</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleOpenDetail(ord)}
                        className="p-2 rounded-lg bg-brand-bg hover:bg-brand-soft/40 text-brand-charcoal transition"
                        title="View Full Order Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {isDetailModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-brand-border overflow-hidden animate-fade-in my-8">
            <div className="p-6 bg-brand-charcoal text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] text-brand-soft font-mono uppercase tracking-wider">
                  Order Telemetry
                </span>
                <h3 className="font-serif text-xl font-bold">
                  {selectedOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1 rounded-full text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-xs text-brand-charcoal">
              {/* Customer and Delivery Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-brand-bg p-5 rounded-2xl border border-brand-border/60">
                <div className="space-y-1">
                  <span className="font-bold text-[10px] uppercase text-brand-muted tracking-wider">
                    Customer Information
                  </span>
                  <p className="font-bold text-sm">{selectedOrder.customerName}</p>
                  <p className="text-brand-muted flex items-center gap-1.5 mt-1">
                    <Phone className="w-3.5 h-3.5 text-brand-accent" />
                    <span>{selectedOrder.customerPhone}</span>
                  </p>
                  {selectedOrder.customerEmail && (
                    <p className="text-brand-muted">{selectedOrder.customerEmail}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-[10px] uppercase text-brand-muted tracking-wider">
                    Delivery Destination
                  </span>
                  <p className="font-semibold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-accent" />
                    <span>{selectedOrder.deliveryAddress}</span>
                  </p>
                  <p className="text-brand-muted">{selectedOrder.city}, {selectedOrder.region} Region</p>
                  {selectedOrder.deliveryInstructions && (
                    <p className="text-[11px] text-brand-accent italic mt-1">
                      Notes: {selectedOrder.deliveryInstructions}
                    </p>
                  )}
                </div>
              </div>

              {/* Paystack Reference & Status Manager */}
              <div className="bg-white p-5 rounded-2xl border border-brand-border/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-[10px] uppercase text-brand-muted tracking-wider">
                      Paystack USSD Gateway Reference
                    </span>
                    <p className="font-mono text-xs font-bold text-brand-charcoal">
                      {selectedOrder.paystackReference || 'PSTK_USSD_PENDING'}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    selectedOrder.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {selectedOrder.paymentStatus}
                  </span>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <span className="font-semibold text-brand-muted">Update Payment Status:</span>
                  <button
                    onClick={() => handlePaymentStatusChange(selectedOrder.id, 'paid')}
                    className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-semibold text-[11px]"
                  >
                    Mark as Paid (Verified)
                  </button>
                  <button
                    onClick={() => handlePaymentStatusChange(selectedOrder.id, 'failed')}
                    className="px-3 py-1 rounded-lg bg-red-100 text-red-700 font-semibold text-[11px]"
                  >
                    Mark as Failed
                  </button>
                </div>
              </div>

              {/* Items Purchased List */}
              <div className="space-y-3">
                <h4 className="font-serif text-sm font-bold text-brand-charcoal">
                  Items In This Order ({selectedOrder.items.length})
                </h4>
                <div className="divide-y divide-brand-border/40 border border-brand-border/60 rounded-2xl overflow-hidden bg-white">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-12 h-14 object-cover rounded-xl border border-brand-border/60"
                        />
                        <div>
                          <p className="font-serif font-bold text-brand-charcoal">{item.productName}</p>
                          <p className="text-brand-muted text-[11px]">Color: {item.selectedColor}</p>
                          <p className="text-brand-muted text-[11px]">Qty: {item.quantity} × GH₵ {item.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <span className="font-serif font-bold text-sm">
                        GH₵ {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="pt-2 flex justify-end">
                <div className="w-64 space-y-1.5 text-right">
                  <div className="flex justify-between text-brand-muted">
                    <span>Subtotal</span>
                    <span>GH₵ {selectedOrder.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-brand-muted">
                    <span>Delivery Fee</span>
                    <span>GH₵ {selectedOrder.deliveryFee}</span>
                  </div>
                  <div className="pt-2 border-t border-brand-border flex justify-between font-serif text-base font-bold text-brand-charcoal">
                    <span>Total Amount</span>
                    <span className="text-brand-accent">GH₵ {selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
