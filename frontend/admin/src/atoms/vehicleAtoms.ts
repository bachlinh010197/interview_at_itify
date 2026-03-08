import { atom } from 'jotai';
import type { Vehicle } from '../types/vehicle';

export const vehiclesAtom = atom<Vehicle[]>([]);
export const vehiclesLoadingAtom = atom<boolean>(false);
export const vehicleSearchAtom = atom<string>('');
