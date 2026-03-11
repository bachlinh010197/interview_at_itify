export interface SougeiSchedule {
  id: number;
  userName: string;
  scheduleDate: string;
  scheduleType: string;
  residenceType: string;
  municipality: string;
  vehicleId: number | null;
  driverId: number | null;
  scheduledTime: string | null;
  actualTime: string | null;
  note: string;
  createdAt: string;
}

export interface CreateSougeiScheduleDto {
  userName: string;
  scheduleDate: string;
  scheduleType: string;
  residenceType: string;
  municipality: string;
  vehicleId?: number | null;
  driverId?: number | null;
  scheduledTime?: string | null;
  actualTime?: string | null;
  note?: string;
}

export type UpdateSougeiScheduleDto = Partial<CreateSougeiScheduleDto>;
