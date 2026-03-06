import { Role } from './role.enum.js';

export class UserEntity {
  id: number;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
