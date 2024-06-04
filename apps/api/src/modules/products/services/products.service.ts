import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/products.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from '../dto/CreateProduct.dto';
import { UpdateProductDto } from '../dto/UpdateProduct.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  private readonly products: Product[] = [];

  async createProduct(createProductDTO: CreateProductDTO) {
    const productFound = await this.productRepository.findOne({
      where: {
        name: createProductDTO.name,
      },
    });

    if (productFound) {
      return new HttpException('Product already exists', HttpStatus.CONFLICT);
    }

    const newProduct = this.productRepository.create(createProductDTO);
    this.productRepository.save(newProduct);
  }

  findAll() {
    // Lógica para obtener todos los productos
    return this.productRepository.find();
  }

  async findOne(id: number) {
    // Lógica para obtener un producto por ID
    const productFound = this.productRepository.findOne({
      where: {
        id,
      },
    });

    if (!productFound) {
      return new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return productFound;
  }

  remove(id: number) {
    // Lógica para eliminar un producto
    return this.productRepository.delete({ id });
  }

  update(id: number, updateProduct: UpdateProductDto) {
    // Lógica para actualizar un producto
    return this.productRepository.update({ id }, updateProduct);
  }
}
