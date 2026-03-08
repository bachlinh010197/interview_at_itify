export class VehicleEntity {
  id: number;
  name: string;
  numberPlate: string;
  seatCount: number;
  hasWheelchair: boolean;
  responsible: string;
  createdAt: Date;

  constructor(partial: Partial<VehicleEntity>) {
    Object.assign(this, partial);
  }
}
