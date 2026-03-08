import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('drivers')
export class DriverOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, nullable: true })
  phone: string;

  @Column({ length: 255, nullable: true })
  address: string;

  @Column({ length: 255 })
  licenseNumber: string;

  @Column({ length: 255 })
  licenseType: string;

  @Column({ type: 'date' })
  licenseIssuedDate: Date;

  @Column({ type: 'date' })
  licenseExpiryDate: Date;

  @CreateDateColumn()
  createdAt: Date;
}
