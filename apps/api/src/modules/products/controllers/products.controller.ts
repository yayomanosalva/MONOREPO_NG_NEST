import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDTO } from '../dto/CreateProduct.dto';
import { Product } from '../entities/products.entity';
import { UpdateProductDto } from '../dto/UpdateProduct.dto';
import { Role } from '@/common/enums/rol.enum';
import { Auth } from '@/modules/auth/decorators/auth.decorator';
import { ActiveUser } from '@/common/decorators/active-user.decorator';
import { UserActiveInterface } from '@/common/interfaces/user-active.interface';
// import { UpdateProductDto } from '../dto/UpdateProduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth([Role.ADMIN, Role.USER])
  create(
    @Body() newProduct: CreateProductDTO,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.productsService.create(newProduct, user);
  }

  @Get()
  findAll(@ActiveUser() user: UserActiveInterface): Promise<Product[]> {
    console.log('user findAll ->>> ', user);
    return this.productsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    // console.log('user findOne ->>> ', user);
    return this.productsService.findOne(id, user);
  }

  @Get('images/:imageName')
  getImage(@Param('imageName') imageName: string) {
    // Construye la ruta completa a la imagen
    const imagePath = `images/${imageName}`;
    // Realiza las operaciones necesarias con la imagen (por ejemplo, enviarla al cliente)
    // ...
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProduct: UpdateProductDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.productsService.update(id, updateProduct, user);
  }
}
