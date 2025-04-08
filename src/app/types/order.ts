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
