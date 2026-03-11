import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('sougei_schedules')
export class SougeiScheduleOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  userName: string;

  @Column({ type: 'date' })
  scheduleDate: Date;

  @Column({ length: 255 })
  scheduleType: string;

  @Column({ length: 255 })
  residenceType: string;

  @Column({ length: 255, nullable: true })
  municipality: string;

  @Column({ type: 'int', nullable: true })
  vehicleId: number | null;

  @Column({ type: 'int', nullable: true })
  driverId: number | null;

  @Column({ type: 'varchar', length: 10, nullable: true })
  scheduledTime: string | null;

  @Column({ type: 'varchar', length: 10, nullable: true })
  actualTime: string | null;

  @Column({ type: 'text', nullable: true })
  note: string;

  @CreateDateColumn()
  createdAt: Date;
}
