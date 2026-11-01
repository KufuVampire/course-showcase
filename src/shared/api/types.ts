export type ProductType = 'course' | 'workshop' | 'consultation';

export type ProductLevel = 'all' | 'beginner' | 'intermediate' | 'advanced';

export interface Instructor {
  name: string;
  role: string;
  bio?: string;
  avatarUrl?: string;
}

export interface SyllabusItem {
  title: string;
  topics: string[];
}

export interface Product {
  id: string;
  slug: string;
  type: ProductType;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  oldPrice?: number;
  durationHours: number;
  level: ProductLevel;
  instructor: Instructor;
  tags: string[];
  features: string[];
  syllabus?: SyllabusItem[];
  rating: number;
  reviewsCount: number;
  badge?: string;
  accentColor?: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'card' | 'sbp' | 'installments';

export interface CheckoutPayload {
  productId: string;
  fullName: string;
  email: string;
  phone: string;
  paymentMethod: PaymentMethod;
  agreedToTerms: boolean;
  promoCode?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  productId: string;
  productTitle: string;
  productType: ProductType;
  totalAmount: number;
  buyer: {
    fullName: string;
    email: string;
    phone: string;
  };
  paymentMethod: PaymentMethod;
  status: 'paid' | 'failed' | 'pending';
  paidAt?: string;
  createdAt: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  purchasedProductIds: string[];
}
