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
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#d1d5db', '#9ca3af', '#6b7280']
      });

      setStep(4);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none">
      
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black font-mono text-white tracking-wide uppercase">
                {step === 4 ? 'RESERVATION CONFIRMED' : 'RESERVE YOUR CYBERTRUCK'}
              </h3>
              <p className="text-[11px] font-mono text-zinc-400">
                {step === 4 ? `ALLOCATION VIN: ${createdOrder?.vin}` : 'OFFICIAL FLEET ORDER CHECKOUT • $250 DEPOSIT'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              cyberAudio.playClick(800);
              onClose();
            }}
            className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step < 4 && (
          <div className="grid grid-cols-3 border-b border-zinc-800 text-center text-xs font-mono">
            <div className={`py-3 ${step === 1 ? 'bg-zinc-800 text-white font-bold border-b-2 border-zinc-300' : 'text-zinc-500'}`}>
              1. Build Summary
            </div>
            <div className={`py-3 ${step === 2 ? 'bg-zinc-800 text-white font-bold border-b-2 border-zinc-300' : 'text-zinc-500'}`}>
              2. Delivery Details
            </div>
            <div className={`py-3 ${step === 3 ? 'bg-zinc-800 text-white font-bold border-b-2 border-zinc-300' : 'text-zinc-500'}`}>
              3. Payment & Deposit
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* STEP 1: SPECIFICATION REVIEW */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-sm space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <span className="text-xs font-mono font-bold text-zinc-400 uppercase">Selected Model</span>
                  <span className="text-xs font-mono font-black text-white">{buildSpec.powertrainName}</span>
                </div>
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <span className="text-xs font-mono font-bold text-zinc-400 uppercase">Exterior Finish</span>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full border border-zinc-600" style={{ backgroundColor: buildSpec.finishHex }} />
                    <span className="text-xs font-mono text-white">{buildSpec.finishName}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <span className="text-xs font-mono font-bold text-zinc-400 uppercase">Wheels & Tires</span>
                  <span className="text-xs font-mono text-white">{buildSpec.wheelsName}</span>
                </div>
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <span className="text-xs font-mono font-bold text-zinc-400 uppercase">Equipment Package</span>
                  <span className="text-xs font-mono text-zinc-300">
                    {buildSpec.accessories.length > 0 ? `${buildSpec.accessories.length} Items Selected` : 'Standard'}
                  </span>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-sm space-y-2 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Vehicle Configured MSRP:</span>
                  <span>${buildSpec.totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Destination & Documentation Fee:</span>
                  <span>${destinationFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-800">
                  <span>Total Est. Vehicle Price:</span>
                  <span className="text-zinc-100 font-mono">${finalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-400 pt-1">
                  <span>Est. Financing (60 mo @ 5.49%):</span>
                  <span>~${estimatedMonthly.toLocaleString()}/mo</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-white pt-2 border-t border-zinc-800">
                  <span className="text-zinc-300">Due Today (Fully Refundable Deposit):</span>
                  <span className="text-white text-sm font-black">$250.00</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: DELIVERY DETAILS */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 uppercase block mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-xs font-mono text-white focus:border-zinc-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 uppercase block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-xs font-mono text-white focus:border-zinc-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 uppercase block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-xs font-mono text-white focus:border-zinc-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 uppercase block mb-1">Street Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-xs font-mono text-white focus:border-zinc-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-zinc-400 uppercase block mb-1">
                  Preferred Delivery Hub / Fulfillment Center
                </label>
                <select
                  value={formData.deliveryHub}
                  onChange={(e) => setFormData({ ...formData, deliveryHub: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-xs font-mono text-white focus:border-zinc-500 focus:outline-none cursor-pointer"
                >
                  {deliveryHubs.map((hub, idx) => (
                    <option key={idx} value={hub}>{hub}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'credit_card' })}
                  className={`p-3 rounded border text-center transition-all ${
                    formData.paymentMethod === 'credit_card'
                      ? 'border-zinc-300 bg-zinc-800 text-white font-bold'
                      : 'border-zinc-800 bg-zinc-900 text-zinc-400'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mx-auto mb-1" />
                  <span className="text-[11px] font-mono block">Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'apple_pay' })}
                  className={`p-3 rounded border text-center transition-all ${
                    formData.paymentMethod === 'apple_pay'
                      ? 'border-zinc-300 bg-zinc-800 text-white font-bold'
                      : 'border-zinc-800 bg-zinc-900 text-zinc-400'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 mx-auto mb-1" />
                  <span className="text-[11px] font-mono block">Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'crypto' })}
                  className={`p-3 rounded border text-center transition-all ${
                    formData.paymentMethod === 'crypto'
                      ? 'border-zinc-300 bg-zinc-800 text-white font-bold'
                      : 'border-zinc-800 bg-zinc-900 text-zinc-400'
                  }`}
                >
                  <Lock className="w-4 h-4 mx-auto mb-1" />
                  <span className="text-[11px] font-mono block">Dogecoin / Crypto</span>
                </button>
              </div>

              <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-sm space-y-3">
                <div>
                  <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Card Number</label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    readOnly
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs font-mono text-zinc-300"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Expiration</label>
                    <input
                      type="text"
                      value={formData.cardExpiry}
                      readOnly
                      className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs font-mono text-zinc-300"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">CVC Security</label>
                    <input
                      type="text"
                      value={formData.cardCvc}
                      readOnly
                      className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs font-mono text-zinc-300"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded text-xs font-mono text-zinc-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-zinc-300 shrink-0" />
                <span>256-bit SSL encrypted. Deposit of $250 is fully refundable prior to VIN production lock.</span>
              </div>
            </div>
          )}

          {/* STEP 4: ORDER SUCCESS */}
          {step === 4 && createdOrder && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-zinc-400 flex items-center justify-center mx-auto text-white shadow-lg">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black font-mono text-white tracking-wider uppercase">
                  CONGRATULATIONS, {formData.name.split(' ')[0].toUpperCase()}!
                </h3>
                <p className="text-xs font-mono text-zinc-400 max-w-md mx-auto">
                  Your reservation is secured in the CyberForge Production Queue. An official build sheet has been generated.
                </p>
              </div>

              {/* Digital VIN Card */}
              <div className="bg-zinc-900/90 border border-zinc-700 p-5 rounded-sm max-w-md mx-auto text-left space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">Assigned Production VIN</span>
                  <span className="text-xs font-mono font-bold text-zinc-200">{createdOrder.vin}</span>
                </div>
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">Order Number</span>
                  <span className="text-xs font-mono text-white">{createdOrder.orderNumber}</span>
                </div>
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">Fulfillment Hub</span>
                  <span className="text-xs font-mono text-zinc-300">{createdOrder.deliveryHub}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">Estimated Delivery</span>
                  <span className="text-xs font-mono text-white font-bold">{createdOrder.estimatedDelivery}</span>
                </div>
              </div>

              {/* Action Buttons for Completed Order */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrint}
                  className="w-full sm:w-auto px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-mono text-xs uppercase tracking-wider rounded border border-zinc-600 flex items-center justify-center gap-2 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Build Sheet</span>
                </button>

                <button
                  onClick={() => {
                    cyberAudio.playClick(1300);
                    onShareToChat(buildSpec);
                    onClose();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-zinc-200 hover:bg-white text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Announce to Community</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer / Navigation Controls */}
        {step < 4 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 bg-zinc-900/50">
            {step > 1 ? (
              <button
                onClick={() => setStep((step - 1) as any)}
                className="px-4 py-2 text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : <div />}

            <button
              onClick={handleNextStep}
              className="px-6 py-2.5 bg-zinc-200 hover:bg-white text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-md flex items-center gap-2"
            >
              <span>{step === 3 ? 'Confirm & Place $250 Deposit' : 'Continue'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
