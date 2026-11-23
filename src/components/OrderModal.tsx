import React, { useState } from 'react';
import { 
  X, 
  Check, 
  CreditCard, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  DollarSign, 
  Share2, 
  Printer, 
  ArrowRight, 
  ArrowLeft,
  Flame,
  Zap,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BuildSpec, OrderRecord } from '../types';
import { cyberAudio } from '../lib/cyberAudio';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  buildSpec: BuildSpec;
  onOrderPlaced: (order: OrderRecord) => void;
  onShareToChat: (build: BuildSpec) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  buildSpec,
  onOrderPlaced,
  onShareToChat,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [formData, setFormData] = useState({
    name: 'Marcus Vance',
    email: 'marcus.vance@cyberforge.network',
    phone: '+1 (512) 555-0199',
    address: '100 Tesla Road',
    city: 'Austin',
    state: 'TX',
    zip: '78725',
    deliveryHub: 'Austin Gigafactory Delivery Hub, TX',
    paymentMethod: 'credit_card' as 'credit_card' | 'apple_pay' | 'crypto',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '888',
  });

  const [createdOrder, setCreatedOrder] = useState<OrderRecord | null>(null);

  const deliveryHubs = [
    'Austin Gigafactory Delivery Hub, TX',
    'Fremont Advanced Vehicle Center, CA',
    'Moab Overland Logistics Hub, UT',
    'Direct-to-Home Flatbed White Glove Delivery',
  ];

  // Pricing calculations
  const deposit = 250;
  const destinationFee = 1995;
  const finalPrice = buildSpec.totalPrice + destinationFee;
  const estimatedMonthly = Math.round((finalPrice * 0.9) / 60);

  const handleNextStep = () => {
    cyberAudio.playClick(1100);
    if (step < 3) {
      setStep((step + 1) as any);
    } else if (step === 3) {
      // Place Order
      const randomVinNumber = Math.floor(10000 + Math.random() * 90000);
      const generatedVin = `7G2CE-${buildSpec.powertrainId.substring(0, 4).toUpperCase()}-2026-X${randomVinNumber}`;
      const generatedOrderNum = `CF-ORD-${Math.floor(100000 + Math.random() * 900000)}`;

      const newOrder: OrderRecord = {
        id: `order-${Date.now()}`,
        orderNumber: generatedOrderNum,
        vin: generatedVin,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        deliveryAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
        deliveryHub: formData.deliveryHub,
        paymentMethod: formData.paymentMethod,
        depositAmount: deposit,
        totalPrice: finalPrice,
        buildSpec: buildSpec,
        orderDate: new Date().toISOString(),
        status: 'Confirmed',
        estimatedDelivery: 'Q1 2027 (Production Priority)',
      };

      setCreatedOrder(newOrder);
      onOrderPlaced(newOrder);

      cyberAudio.playLaser();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#ffffff', '#cbd5e1', '#b91c1c']
      });

      setStep(4);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none">
      <div className="relative w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-lg p-6 sm:p-8 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
          <div>
            <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest block">
              OFFICIAL CYBERFORGE VEHICLE RESERVATION
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-sans uppercase text-white">
              {step === 4 ? 'RESERVATION CONFIRMED' : 'RESERVE YOUR CYBERTRUCK'}
            </h2>
          </div>
          
          <button
            onClick={() => {
              cyberAudio.playClick(600);
              onClose();
            }}
            className="text-neutral-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Tracker (Steps 1-3) */}
        {step < 4 && (
          <div className="flex items-center justify-between mb-6 border-b border-neutral-900 pb-4 text-xs font-mono">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-red-500 font-bold' : 'text-neutral-600'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step >= 1 ? 'bg-red-600 text-white' : 'bg-neutral-800 text-neutral-400'
              }`}>1</span>
              <span>Review Spec</span>
            </div>
            <div className="w-8 h-[1px] bg-neutral-800" />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-red-500 font-bold' : 'text-neutral-600'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step >= 2 ? 'bg-red-600 text-white' : 'bg-neutral-800 text-neutral-400'
              }`}>2</span>
              <span>Destination</span>
            </div>
            <div className="w-8 h-[1px] bg-neutral-800" />
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-red-500 font-bold' : 'text-neutral-600'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step >= 3 ? 'bg-red-600 text-white' : 'bg-neutral-800 text-neutral-400'
              }`}>3</span>
              <span>Deposit</span>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 1: SPECIFICATION & PRICE REVIEW                     */}
        {/* ======================================================== */}
        {step === 1 && (
          <div className="space-y-5 flex-1">
            <div className="p-4 bg-neutral-900/70 border border-neutral-800 rounded clip-chamfer space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                <span className="text-white font-bold text-sm">{buildSpec.powertrainName}</span>
                <span className="text-red-500 font-bold text-sm">${buildSpec.powertrainPrice.toLocaleString()}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-neutral-300">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block">Exterior Wrap</span>
                  <span className="font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: buildSpec.finishHex }} />
                    {buildSpec.finishName}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block">Wheel Set</span>
                  <span className="font-bold text-white block mt-0.5">{buildSpec.wheelsName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block">Interior Trim</span>
                  <span className="text-white block mt-0.5">{buildSpec.interiorName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block">Accessories ({buildSpec.accessories.length})</span>
                  <span className="text-white block mt-0.5">
                    {buildSpec.accessories.join(', ') || 'None selected'}
                  </span>
                </div>
              </div>

              {/* Itemized Pricing */}
              <div className="border-t border-neutral-800 pt-3 space-y-1.5 text-neutral-400">
                <div className="flex justify-between">
                  <span>Base Vehicle MSRP:</span>
                  <span>${buildSpec.powertrainPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Custom Wrap & Wheels:</span>
                  <span>+${(buildSpec.wheelsPrice + (buildSpec.finishCategory !== 'Factory Raw' ? 4200 : 0)).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Destination & Documentation:</span>
                  <span>+${destinationFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white font-bold pt-2 border-t border-neutral-800 text-sm">
                  <span>Total Vehicle Price:</span>
                  <span className="text-red-500 font-mono text-base">${finalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] text-neutral-500">
                  <span>Estimated 60-Month Lease:</span>
                  <span>~${estimatedMonthly.toLocaleString()} / month</span>
                </div>
              </div>
            </div>

            {/* Deposit Notice */}
            <div className="p-3.5 bg-neutral-900 border border-red-900/60 rounded flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-red-500 flex-shrink-0" />
                <div>
                  <span className="font-bold text-white block">Due Today: $250 Reservation Deposit</span>
                  <span className="text-[10px] text-neutral-400">100% Fully Refundable prior to VIN allocation.</span>
                </div>
              </div>
              <span className="text-base font-black text-white font-mono">$250.00</span>
            </div>

            <div className="pt-3">
              <button
                onClick={handleNextStep}
                className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-widest clip-chamfer transition-all shadow-red-glow flex items-center justify-center gap-2"
              >
                <span>Proceed to Delivery Destination</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 2: DELIVERY & BUYER INFO                            */}
        {/* ======================================================== */}
        {step === 2 && (
          <div className="space-y-4 flex-1 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-neutral-400 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-neutral-400 block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Preferred Delivery Hub</label>
                <select
                  value={formData.deliveryHub}
                  onChange={(e) => setFormData({ ...formData, deliveryHub: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
                >
                  {deliveryHubs.map(hub => (
                    <option key={hub} value={hub}>{hub}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Street Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-neutral-400 block mb-1">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">ZIP</label>
                <input
                  type="text"
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
                />
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 rounded flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-wider rounded clip-chamfer shadow-red-glow flex items-center justify-center gap-2"
              >
                <span>Continue to Payment Method</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 3: PAYMENT METHOD & DEPOSIT CONFIRMATION            */}
        {/* ======================================================== */}
        {step === 3 && (
          <div className="space-y-5 flex-1 font-mono text-xs">
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'credit_card', label: 'Credit Card', icon: CreditCard },
                { id: 'apple_pay', label: 'Apple / Google Pay', icon: DollarSign },
                { id: 'crypto', label: 'Crypto / BTC', icon: Zap },
              ].map(method => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: method.id as any })}
                  className={`p-3 rounded border text-center transition-all flex flex-col items-center gap-1.5 ${
                    formData.paymentMethod === method.id
                      ? 'border-red-600 bg-red-950/20 text-white shadow-red-glow-sm'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  <method.icon className="w-4 h-4 text-red-500" />
                  <span className="text-[10px] font-bold uppercase">{method.label}</span>
                </button>
              ))}
            </div>

            {formData.paymentMethod === 'credit_card' ? (
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded space-y-3">
                <div>
                  <label className="text-neutral-400 block mb-1">Card Number</label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full bg-black border border-neutral-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-400 block mb-1">Expiration Date</label>
                    <input
                      type="text"
                      value={formData.cardExpiry}
                      onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                      className="w-full bg-black border border-neutral-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 block mb-1">Security Code (CVV)</label>
                    <input
                      type="password"
                      value={formData.cardCvc}
                      onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                      className="w-full bg-black border border-neutral-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-neutral-900 border border-neutral-800 rounded text-center space-y-2">
                <Lock className="w-8 h-8 text-red-500 mx-auto" />
                <h4 className="text-sm font-bold text-white">Instant Wallet Authorization</h4>
                <p className="text-neutral-400 text-[11px]">
                  Deposit of $250.00 will be authorized via {formData.paymentMethod === 'crypto' ? 'Bitcoin / Lightning Network' : 'Apple Pay biometric verification'}.
                </p>
              </div>
            )}

            <div className="p-3 bg-neutral-900/60 rounded border border-neutral-800 text-[11px] text-neutral-400">
              By placing this reservation, your spot in the CyberForge manufacturing queue is immediately locked. You can cancel and receive a 100% refund at any time prior to chassis delivery.
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 rounded flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="flex-1 py-4 bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-widest rounded clip-chamfer shadow-red-glow flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Authorize & Place Order ($250 Deposit)</span>
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 4: ORDER CONFIRMED & VIN RECEIPT                    */}
        {/* ======================================================== */}
        {step === 4 && createdOrder && (
          <div className="space-y-5 flex-1 font-mono text-xs">
            <div className="text-center py-4 space-y-2">
              <div className="w-14 h-14 bg-red-600/20 border border-red-600 rounded-full flex items-center justify-center mx-auto text-red-500 shadow-red-glow-sm">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black font-sans uppercase text-white">
                ORDER OFFICIALLY CONFIRMED
              </h3>
              <p className="text-neutral-400 text-xs">
                Welcome to the fleet, <span className="text-white font-bold">{createdOrder.customerName}</span>. Your vehicle is queued for Gigafactory production.
              </p>
            </div>

            {/* Official Digital VIN Receipt Sheet */}
            <div className="p-4 bg-neutral-900 border border-red-900/80 rounded clip-chamfer space-y-3">
              <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                <div>
                  <span className="text-[9px] text-neutral-500 uppercase block">ORDER IDENTIFIER</span>
                  <span className="font-bold text-white text-sm">{createdOrder.orderNumber}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-neutral-500 uppercase block">STATUS</span>
                  <span className="bg-red-950 text-red-400 border border-red-900 px-2 py-0.5 rounded text-[10px] font-bold">
                    PRODUCTION QUEUE
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-neutral-300">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Allocated VIN:</span>
                  <span className="font-bold text-red-400">{createdOrder.vin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Configured Trim:</span>
                  <span className="text-white font-bold">{createdOrder.buildSpec.powertrainName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Exoskeleton Finish:</span>
                  <span className="text-white">{createdOrder.buildSpec.finishName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Delivery Hub:</span>
                  <span className="text-white">{createdOrder.deliveryHub}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Est. Delivery Window:</span>
                  <span className="text-emerald-400 font-bold">{createdOrder.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-neutral-800 font-bold text-white">
                  <span>Total Vehicle MSRP:</span>
                  <span className="text-red-500">${createdOrder.totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Deposit Paid Today:</span>
                  <span className="text-white">$250.00 (Refundable)</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={() => {
                  cyberAudio.playClick(1200);
                  onShareToChat(createdOrder.buildSpec);
                  onClose();
                }}
                className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-wider rounded clip-chamfer flex items-center justify-center gap-2 shadow-red-glow-sm"
              >
                <Share2 className="w-4 h-4" />
                <span>Broadcast Order to Chat</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 rounded border border-neutral-800 flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Build Sheet</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded border border-neutral-800"
              >
                Done
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
