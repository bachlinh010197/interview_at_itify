import { atom } from 'jotai';
import type { Driver } from '../types/driver';

export const driversAtom = atom<Driver[]>([]);
export const driversLoadingAtom = atom<boolean>(false);
export const driverSearchAtom = atom<string>('');
