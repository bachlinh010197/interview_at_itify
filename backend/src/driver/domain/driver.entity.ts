export class DriverEntity {
  id: number;
  name: string;
  phone: string;
  address: string;
  licenseNumber: string;
  licenseType: string;
  licenseIssuedDate: Date;
  licenseExpiryDate: Date;
  createdAt: Date;

  constructor(partial: Partial<DriverEntity>) {
    Object.assign(this, partial);
  }
}
