export class SougeiScheduleEntity {
  id: number;
  userName: string;
  scheduleDate: Date;
  scheduleType: string;
  residenceType: string;
  municipality: string;
  vehicleId: number | null;
  driverId: number | null;
  scheduledTime: string | null;
  actualTime: string | null;
  note: string;
  createdAt: Date;

  constructor(partial: Partial<SougeiScheduleEntity>) {
    Object.assign(this, partial);
  }
}
