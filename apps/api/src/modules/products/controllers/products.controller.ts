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
// import { UpdateProductDto } from '../dto/UpdateProduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  createProduct(@Body() newProduct: CreateProductDTO) {
    return this.productsService.createProduct(newProduct);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProduct: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProduct);
  }
}
