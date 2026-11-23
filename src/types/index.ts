export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  truckModel: string;
  isOnline: boolean;
  lastSeen?: string;
}

export interface BuildSpec {
  finishId: string;
  finishName: string;
  finishHex: string;
  finishCategory: string;
  wheelsId: string;
  wheelsName: string;
  wheelsPrice: number;
  powertrainId: string;
  powertrainName: string;
  powertrainPrice: number;
  interiorId: string;
  interiorName: string;
  accessories: string[];
  totalPrice: number;
  timestamp: string;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  vin: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryHub: string;
  paymentMethod: 'credit_card' | 'apple_pay' | 'crypto';
  depositAmount: number;
  totalPrice: number;
  buildSpec: BuildSpec;
  orderDate: string;
  status: 'Confirmed' | 'Production Queue' | 'Allocated' | 'In Transit';
  estimatedDelivery: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  recipientId?: string; // If undefined, it's a message in the public community room
  content: string;
  imageUrl?: string;
  replyTo?: {
    id: string;
    senderName: string;
    content: string;
  };
  buildData?: BuildSpec;
  orderData?: {
    orderNumber: string;
    vin: string;
    model: string;
    totalPrice: number;
  };
  createdAt: string;
  isRead?: boolean;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id: string;
  type: 'public' | 'direct';
  name: string;
  avatarUrl: string;
  recipientId?: string;
  lastMessage?: string;
  lastMessageTimestamp?: string;
  unreadCount: number;
  isOnline?: boolean;
}

export interface CustomizerOption {
  id: string;
  name: string;
  price: number;
  description: string;
  thumbnail?: string;
  hex?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'exoskeleton' | 'offroad' | 'night' | 'interior';
  url: string;
  caption: string;
  specsHighlight: string;
}
