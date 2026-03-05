export class UserEntity {
  id: number;
  email: string;
  password: string;
  createdAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
