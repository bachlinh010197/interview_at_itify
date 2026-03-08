import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('vehicles')
export class VehicleOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  numberPlate: string;

  @Column()
  seatCount: number;

  @Column({ default: false })
  hasWheelchair: boolean;

  @Column({ length: 255 })
  responsible: string;

  @CreateDateColumn()
  createdAt: Date;
}
