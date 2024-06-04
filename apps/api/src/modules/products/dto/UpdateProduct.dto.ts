// update-product.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDTO } from './CreateProduct.dto';

export class UpdateProductDto extends PartialType(CreateProductDTO) {
  // Puedes agregar propiedades adicionales específicas para la actualización
  name?: string;
  description?: string;
}
