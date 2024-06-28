import { Role } from '@/common/enums/rol.enum';
import { Column, DeleteDateColumn, Entity } from 'typeorm';

@Entity()
export class User {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ array: true, type: 'enum', enum: Role, default: [Role.USER] })
  role: Role[];

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;
}
