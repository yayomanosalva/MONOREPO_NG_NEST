import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/products.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from '../dto/CreateProduct.dto';
import { UpdateProductDto } from '../dto/UpdateProduct.dto';
import { UserActiveInterface } from '@/common/interfaces/user-active.interface';
import { Role } from '@/common/enums/rol.enum';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  private readonly products: Product[] = [];

  async create(newProduct: CreateProductDTO, user: UserActiveInterface) {
    // const product = await this.validateProduct(newProduct.name);

    return await this.productRepository.save({
      ...newProduct,
      userEmail: user.email,
    });
  }

  // Lógica para obtener todos los productos
  async findAll(user: UserActiveInterface) {
    // console.log('user ', user);
    if (user.role === Role.ADMIN) {
      return await this.productRepository.find();
    }

    return await this.productRepository.find({
      //Email coincide con el usuario que crea
      where: { userEmail: user.email },
    });
  }

  async findOne(id: number, user: UserActiveInterface) {
    // Lógica para obtener un producto por ID
    const productFound = await this.productRepository.findOneBy({ id });

    if (!productFound) {
      return new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    this.validateOwnership(productFound, user);
    // console.log('productFound ===>>> ', productFound);
    return productFound;
  }

  remove(id: number) {
    // Lógica para eliminar un producto
    return this.productRepository.delete({ id });
  }

  async update(
    id: number,
    updateProduct: UpdateProductDto,
    user: UserActiveInterface,
  ) {
    // Lógica para actualizar un producto
    // return this.productRepository.update({ id }, updateProduct);
    await this.findOne(id, user);
    // const name = await this.validateProduct(updateProduct.name);

    return this.productRepository.update(id, {
      ...updateProduct,
      userEmail: user.email,
    });
  }

  private validateOwnership(productFound: Product, user: UserActiveInterface) {
    if (user.role !== Role.ADMIN && productFound.userEmail !== user.email) {
      throw new UnauthorizedException('You do not have permissions');
    }
  }

  private async validateProduct(product: string) {
    const productEntity = await this.productRepository.findOneBy({
      name: product,
    });

    if (!productEntity) {
      throw new BadRequestException('Product not found');
    }

    return productEntity;
  }
}
