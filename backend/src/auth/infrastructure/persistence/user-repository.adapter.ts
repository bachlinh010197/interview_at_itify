import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../domain/user.entity.js';
import { type UserRepositoryPort } from '../../domain/user-repository.port.js';
import { UserOrmEntity } from './user.orm-entity.js';

@Injectable()
export class UserRepositoryAdapter implements UserRepositoryPort {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repository: Repository<UserOrmEntity>,
  ) {}

  async save(user: UserEntity): Promise<UserEntity> {
    const ormEntity = this.repository.create({
      email: user.email,
      password: user.password,
    });
    const saved = await this.repository.save(ormEntity);
    return this.toDomain(saved);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const found = await this.repository.findOne({ where: { email } });
    return found ? this.toDomain(found) : null;
  }

  async findById(id: number): Promise<UserEntity | null> {
    const found = await this.repository.findOne({ where: { id } });
    return found ? this.toDomain(found) : null;
  }

  private toDomain(orm: UserOrmEntity): UserEntity {
    return new UserEntity({
      id: orm.id,
      email: orm.email,
      password: orm.password,
      createdAt: orm.createdAt,
    });
  }
}
