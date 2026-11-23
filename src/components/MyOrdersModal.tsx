import React from 'react';
import { X, Truck, ShieldCheck, Printer, ArrowRight, Share2, Sliders } from 'lucide-react';
import { OrderRecord, BuildSpec } from '../types';
import { cyberAudio } from '../lib/cyberAudio';

interface MyOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderRecord[];
  onInspectBuild?: (build: BuildSpec) => void;
  onShareToChat: (build: BuildSpec) => void;
}

export const MyOrdersModal: React.FC<MyOrdersModalProps> = ({
  isOpen,
  onClose,
  orders,
  onInspectBuild,
  onShareToChat,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none">
      <div className="relative w-full max-w-3xl bg-neutral-950 border border-neutral-800 rounded-lg p-6 sm:p-8 shadow-2xl flex flex-col max-h-[85vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-red-950 border border-red-800 flex items-center justify-center text-red-500">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest block">
                CYBERFORGE FLEET GARAGE
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-sans uppercase text-white">
                My Cybertruck Reservations ({orders.length})
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              cyberAudio.playClick(600);
              onClose();
            }}
            className="text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Orders Listing */}
        {orders.length === 0 ? (
          <div className="text-center py-16 space-y-4 font-mono text-xs">
            <div className="w-14 h-14 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-600">
              <Truck className="w-6 h-6 text-red-500" />
            </div>
            <p className="text-neutral-400">No active vehicle reservations placed yet.</p>
            <p className="text-neutral-600 text-[11px]">
              Head over to the Configurator to specify and place an order for your custom Cybertruck!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-5 bg-neutral-900/80 border border-neutral-800 hover:border-red-900/80 rounded-lg clip-chamfer transition-all space-y-3 font-mono text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase block">RESERVATION ID</span>
                    <span className="text-base font-bold text-white">{order.orderNumber}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-neutral-400">
                      Ordered: {new Date(order.orderDate).toLocaleDateString()}
                    </span>
                    <span className="px-2.5 py-0.5 bg-red-950 text-red-400 border border-red-900 rounded font-bold text-[10px] uppercase">
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-neutral-300">
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase block">Model / Trim</span>
                    <span className="font-bold text-white">{order.buildSpec.powertrainName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase block">Allocated VIN</span>
                    <span className="font-bold text-red-400">{order.vin}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase block">Wrap Finish</span>
                    <span className="text-white">{order.buildSpec.finishName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase block">Total Price</span>
                    <span className="text-white font-bold">${order.totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="text-[11px] text-neutral-400 pt-1">
                  <span className="text-neutral-500">Delivery Hub: </span>
                  {order.deliveryHub} • Est. Window: <span className="text-emerald-400 font-bold">{order.estimatedDelivery}</span>
                </div>

                {/* Actions */}
                <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 text-emerald-400 text-[10px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>$250 Deposit Secured • Refundable</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {onInspectBuild && (
                      <button
                        onClick={() => {
                          cyberAudio.playClick(1000);
                          onInspectBuild(order.buildSpec);
                          onClose();
                        }}
                        className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded text-[11px] font-bold flex items-center gap-1"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        <span>Inspect Build</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        cyberAudio.playClick(1200);
                        onShareToChat(order.buildSpec);
                        onClose();
                      }}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded text-[11px] font-bold flex items-center gap-1 shadow-red-glow-sm"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share to Chat</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
