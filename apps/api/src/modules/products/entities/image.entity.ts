import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './products.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  alt: string;

  @Column()
  feature: boolean;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
}
