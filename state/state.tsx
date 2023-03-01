import { atom, AtomEffect, useSetRecoilState } from 'recoil';
import { Product } from '../types/types';
import { recoilPersist } from 'recoil-persist';

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({ key: 'recoil-persist', storage: sessionStorage });

const ssrCompletedState = atom({
  key: 'SsrCompleted',
  default: false,
});

export const useSsrComplectedState = () => {
  const setSsrCompleted = useSetRecoilState(ssrCompletedState);
  return () => setSsrCompleted(true);
};

export const persistAtomEffect = <T,>(param: Parameters<AtomEffect<T>>[0]) => {
  param.getPromise(ssrCompletedState).then(() => persistAtom(param));
};

export const cartState = atom<Product[]>({
  key: 'cart',
  default: [],
  effects_UNSTABLE: [persistAtomEffect],
});

export const favoritesState = atom<Product[]>({
  key: 'favorites',
  default: [],
  effects_UNSTABLE: [persistAtomEffect],
});

export const userEmailState = atom<string | null>({
  key: 'userEmail',
  default: null,
  effects_UNSTABLE: [persistAtomEffect],
});
