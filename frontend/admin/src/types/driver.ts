export interface Driver {
  id: number;
  name: string;
  phone: string;
  address: string;
  licenseNumber: string;
  licenseType: string;
  licenseIssuedDate: string;
  licenseExpiryDate: string;
  createdAt: string;
}

export interface CreateDriverDto {
  name: string;
  phone: string;
  address: string;
  licenseNumber: string;
  licenseType: string;
  licenseIssuedDate: string;
  licenseExpiryDate: string;
}

export type UpdateDriverDto = Partial<CreateDriverDto>;
