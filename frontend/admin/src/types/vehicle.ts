export interface Vehicle {
  id: number;
  name: string;
  numberPlate: string;
  seatCount: number;
  hasWheelchair: boolean;
  responsible: string;
  createdAt: string;
}

export interface CreateVehicleDto {
  name: string;
  numberPlate: string;
  seatCount: number;
  hasWheelchair: boolean;
  responsible: string;
}

export type UpdateVehicleDto = Partial<CreateVehicleDto>;
