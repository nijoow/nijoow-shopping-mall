import { atom } from 'recoil';
import { Product } from '../types/types';

export const cartState = atom<Product[]>({
  key: 'cart',
  default: [],
});

export const favoritesState = atom<Product[]>({
  key: 'favorites',
  default: [],
});
