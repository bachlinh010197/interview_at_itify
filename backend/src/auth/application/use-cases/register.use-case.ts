import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../../domain/user.entity.js';
import { type UserRepositoryPort, USER_REPOSITORY_PORT } from '../../domain/user-repository.port.js';
import { Role } from '../../domain/role.enum.js';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(USER_REPOSITORY_PORT)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(input: { email: string; password: string }): Promise<Omit<UserEntity, 'password'>> {
    const existing = await this.userRepository.findByEmail(input.email);
    if (existing) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = new UserEntity({ email: input.email, password: hashedPassword, role: Role.USER });
    const saved = await this.userRepository.save(user);

    const { password, ...result } = saved;
    return result;
  }
}
