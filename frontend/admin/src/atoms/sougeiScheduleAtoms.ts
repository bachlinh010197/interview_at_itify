import { atom } from 'jotai';
import type { SougeiSchedule } from '../types/sougeiSchedule';

export const sougeiSchedulesAtom = atom<SougeiSchedule[]>([]);
export const sougeiSchedulesLoadingAtom = atom<boolean>(false);
export const sougeiScheduleDateAtom = atom<string>(new Date().toISOString().split('T')[0]);
export const sougeiScheduleTypeFilterAtom = atom<string>('全て');
export const sougeiResidenceTypeAtom = atom<string>('自宅');
