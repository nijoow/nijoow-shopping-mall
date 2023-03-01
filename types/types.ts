export interface Product {
  productName: string;
  price: number;
  size: string | null;
  category: string;
  id: number;
}

export interface Order extends Product {
  status: string;
  orderDate: string;
}
