import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Customizer } from './components/Customizer';
import { VehicleFeatures } from './components/VehicleFeatures';
import { Gallery } from './components/Gallery';
import { CommunityChat } from './components/CommunityChat';
import { CommunityDirectory } from './components/CommunityDirectory';
import { ContactFeedback } from './components/ContactFeedback';
import { Footer } from './components/Footer';
import { UserProfileModal } from './components/UserProfileModal';
import { MyOrdersModal } from './components/MyOrdersModal';
import { UserProfile, BuildSpec, ChatMessage, OrderRecord } from './types';
import { CURRENT_DEFAULT_USER, chatBroadcast } from './lib/supabase';

const INITIAL_SAMPLE_ORDER: OrderRecord = {
  id: 'order-sample-1',
  orderNumber: 'CF-ORD-104928',
  vin: '7G2CE-BEAST-2026-X84910',
  customerName: 'Marcus Vance',
  customerEmail: 'marcus.vance@cyberforge.network',
  customerPhone: '+1 (512) 555-0199',
  deliveryAddress: '100 Tesla Road, Austin, TX 78725',
  deliveryHub: 'Austin Gigafactory Delivery Hub, TX',
  paymentMethod: 'credit_card',
  depositAmount: 250,
  totalPrice: 104190,
  buildSpec: {
    finishId: 'crimson',
    finishName: 'Satin Crimson Red',
    finishHex: '#b91c1c',
    finishCategory: 'Signature Wrap',
    wheelsId: 'turbine-22',
    wheelsName: '22" Cyber Turbine Forged',
    wheelsPrice: 4200,
    powertrainId: 'cyberbeast',
    powertrainName: 'Cyberbeast Tri-Motor AWD',
    powertrainPrice: 99990,
    interiorId: 'crimson-ambient',
    interiorName: 'Red Cyberline Ambient',
    accessories: ['lightbar', 'tonneau'],
    totalPrice: 104190,
    timestamp: new Date().toISOString()
  },
  orderDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  status: 'Production Queue',
  estimatedDelivery: 'Q1 2027 (Priority Allocation)'
};

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const [showOrdersModal, setShowOrdersModal] = useState<boolean>(false);

  // Placed Orders State
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    const saved = localStorage.getItem('cyberforge_orders');
    return saved ? JSON.parse(saved) : [INITIAL_SAMPLE_ORDER];
  });

  // Current active user persona
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('cyberforge_current_user');
    return saved ? JSON.parse(saved) : CURRENT_DEFAULT_USER;
  });

  // Pending Cybertruck build to share into community chat
  const [pendingShareBuild, setPendingShareBuild] = useState<BuildSpec | null>(null);

  // Unread badge count
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // Save current user to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem('cyberforge_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Save orders to localStorage
  useEffect(() => {
    localStorage.setItem('cyberforge_orders', JSON.stringify(orders));
  }, [orders]);

  // Compute unreads for badge
  useEffect(() => {
    const checkUnreads = () => {
      const savedMessages = localStorage.getItem('cyberforge_messages');
      if (savedMessages) {
        try {
          const parsed: ChatMessage[] = JSON.parse(savedMessages);
          const unreads = parsed.filter(m => m.recipientId === currentUser.id && !m.isRead).length;
          setUnreadCount(unreads);
        } catch (e) {}
      }
    };
    checkUnreads();
    const interval = setInterval(checkUnreads, 3000);
    return () => clearInterval(interval);
  }, [currentUser]);

  // Handle sharing build from Customizer
  const handleShareToChat = (build: BuildSpec) => {
    setPendingShareBuild(build);
    setActiveTab('community');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Inspect build from chat back in customizer
  const handleInspectBuild = (_build: BuildSpec) => {
    setActiveTab('customize');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch direct conversation from directory
  const handleStartDirectMessage = (_userId: string) => {
    setActiveTab('community');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Order Placement
  const handleOrderPlaced = (newOrder: OrderRecord) => {
    setOrders(prev => [newOrder, ...prev]);

    // Automatically post public announcement to Community Chat
    const orderAnnouncementMsg: ChatMessage = {
      id: `msg-order-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.displayName,
      senderAvatar: currentUser.avatarUrl,
      content: `🎉 NEW RESERVATION PLACED! Just ordered a ${newOrder.buildSpec.powertrainName} in ${newOrder.buildSpec.finishName}!\nAssigned VIN: ${newOrder.vin}`,
      buildData: newOrder.buildSpec,
      orderData: {
        orderNumber: newOrder.orderNumber,
        vin: newOrder.vin,
        model: newOrder.buildSpec.powertrainName,
        totalPrice: newOrder.totalPrice
      },
      createdAt: new Date().toISOString(),
      status: 'delivered'
    };

    const savedMessages = localStorage.getItem('cyberforge_messages');
    const existing: ChatMessage[] = savedMessages ? JSON.parse(savedMessages) : [];
    const nextMessages = [...existing, orderAnnouncementMsg];
    localStorage.setItem('cyberforge_messages', JSON.stringify(nextMessages));

    if (chatBroadcast) {
      chatBroadcast.postMessage({ type: 'NEW_MESSAGE', message: orderAnnouncementMsg });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-red-600 selection:text-white">
      
      {/* Premium Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        unreadCount={unreadCount}
        ordersCount={orders.length}
        onOpenUserModal={() => setShowUserModal(true)}
        onOpenOrdersModal={() => setShowOrdersModal(true)}
      />

      {/* Main Content Pane */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero
              onExplore={() => {
                setActiveTab('features');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onCustomize={() => {
                setActiveTab('customize');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenCommunity={() => {
                setActiveTab('community');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <VehicleFeatures />
          </>
        )}

        {activeTab === 'customize' && (
          <Customizer 
            onShareToChat={handleShareToChat}
            onOrderPlaced={handleOrderPlaced}
          />
        )}

        {activeTab === 'features' && (
          <VehicleFeatures />
        )}

        {activeTab === 'gallery' && (
          <Gallery onCustomizePrompt={() => setActiveTab('customize')} />
        )}

        {activeTab === 'community' && (
          <CommunityChat
            currentUser={currentUser}
            onSwitchUser={(user) => setCurrentUser(user)}
            pendingShareBuild={pendingShareBuild}
            onClearPendingShareBuild={() => setPendingShareBuild(null)}
            onInspectBuild={handleInspectBuild}
          />
        )}

        {activeTab === 'directory' && (
          <CommunityDirectory
            currentUser={currentUser}
            onStartDirectMessage={handleStartDirectMessage}
            onInspectBuild={handleInspectBuild}
          />
        )}

        {activeTab === 'contact' && (
          <ContactFeedback />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* User Persona & Identity Modal */}
      <UserProfileModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        currentUser={currentUser}
        onSaveProfile={(updated) => setCurrentUser(updated)}
        onSwitchUser={(user) => setCurrentUser(user)}
      />

      {/* My Orders / Fleet Garage Modal */}
      <MyOrdersModal
        isOpen={showOrdersModal}
        onClose={() => setShowOrdersModal(false)}
        orders={orders}
        onInspectBuild={handleInspectBuild}
        onShareToChat={handleShareToChat}
      />

    </div>
  );
}

export default App;
