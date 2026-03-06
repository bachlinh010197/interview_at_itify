import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { Role } from '../../domain/role.enum.js';

@Entity('users')
export class UserOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ length: 255 })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', length: 20, default: Role.USER })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;
}
