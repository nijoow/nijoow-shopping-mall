import { atom } from 'recoil';

interface Cart {
  productName: string;
  price: number;
  size: string | null;
  category: string;
  id: number;
}
export const cartState = atom<Cart[]>({
  key: 'cart',
  default: [],
});
