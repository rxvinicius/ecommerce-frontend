export type OrderDTO = {
  items: {
    productId: string;
    quantity: number;
  }[];
  total: number;
  card: {
    number: string;
    name: string;
    expiry: string;
  };
};

export type OrderItem = {
  id: string;
  orderId: string;
  product: {
    id: string;
    images: string;
    name: string;
  };
  productId: string;
  quantity: number;
};

export type OrderResponse = {
  id: string;
  userId: string;
  total: number;
  createdAt: string;
  updatedAt: string;

  cardName: string;
  cardNumber: string;
  cardExpiry: string;

  items: OrderItem[];
};
