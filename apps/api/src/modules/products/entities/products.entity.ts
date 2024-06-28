import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Brand } from './brands.entity';
import { Category } from './category.entity';
import { Image } from './image.entity';
import { User } from '@/modules/users/entities/user.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 5, scale: 2 })
  tax: number;

  @Column({ nullable: true })
  size: string;

  @Column()
  color: string;

  @Column()
  visible: boolean;

  @Column()
  featured: boolean;

  @Column()
  suggested: boolean;

  @Column()
  recommended: boolean;

  @Column()
  new: boolean;

  @Column()
  order: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true })
  authStrategy: string;

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToOne(() => Image, (image) => image.product)
  images: Image[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
  user: User;

  @Column()
  userEmail: string;
}
