import { UserEntity } from './user.entity.js';

export interface UserRepositoryPort {
  save(user: UserEntity): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: number): Promise<UserEntity | null>;
}

export const USER_REPOSITORY_PORT = Symbol('USER_REPOSITORY_PORT');
