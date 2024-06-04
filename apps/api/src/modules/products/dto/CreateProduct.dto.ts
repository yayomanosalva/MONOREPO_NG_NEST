import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { ImageDTO } from './Image.dto';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  tax: number;

  @IsString()
  size: string;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsBoolean()
  visible: boolean;

  @IsBoolean()
  featured: boolean;

  @IsBoolean()
  suggested: boolean;

  @IsBoolean()
  recommended: boolean;

  @IsBoolean()
  new: boolean;

  @IsNumber()
  order: number;

  @IsNumber()
  brandId: number;

  @IsNumber()
  categoryId: number;

  @IsArray()
  @ValidateNested({ each: true })
  images: ImageDTO[];
}
