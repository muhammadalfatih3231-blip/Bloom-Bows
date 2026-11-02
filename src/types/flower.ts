export type ProductCategory = 'all' | 'buket' | 'meja' | 'box' | 'anggrek' | 'papan';

export interface ProductVariantSize {
  id: string;
  name: string;
  priceMultiplier: number;
  description: string;
}

export interface FlowerProduct {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  description: string;
  flowersIncluded: string[];
  image: string;
  badge?: string;
  sizes: ProductVariantSize[];
  ribbonColors: string[];
  bestFor: string[];
  careTips: string;
  inStock: boolean;
}

export interface GreetingCardData {
  recipient: string;
  sender: string;
  occasion: string;
  message: string;
}

export interface CartItem {
  cartItemId: string;
  product: FlowerProduct;
  quantity: number;
  selectedSize: ProductVariantSize;
  selectedRibbon: string;
  addVase: boolean;
  vasePrice: number;
  greetingCard: GreetingCardData;
  unitPrice: number;
}

export interface DeliveryDetails {
  customerName: string;
  customerPhone: string;
  recipientName: string;
  recipientPhone: string;
  deliveryAddress: string;
  deliveryCity: string;
  postalCode: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  deliveryNotes: string;
}

export type PaymentMethod = 'qris' | 'bca' | 'mandiri' | 'cod';

export interface FlowerOrder {
  orderId: string;
  createdAt: string;
  deliveryDetails: DeliveryDetails;
  items: CartItem[];
  subtotal: number;
  discount: number;
  discountCode?: string;
  shippingFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: 'Dikonfirmasi' | 'Diproses' | 'Dalam Pengiriman' | 'Terkirim';
}
