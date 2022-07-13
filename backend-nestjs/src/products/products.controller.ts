import { QueryOptions } from './dtos/queryOptions';
import { ValidationPipe } from './../common/pipes/validation.pipe';
import { ProductDto } from './dtos/product.dto';
import { ProductService } from './products.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Product } from 'src/schemas/product.schemas';
import { multerOptions } from 'src/config/multerConfig';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
@ApiTags('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getAll(@Query() queryOptions: QueryOptions) {
    return this.productService.getAll(queryOptions);
  }

  @Get(':productId')
  getById(@Param('productId') productId: string): Promise<Product> {
    return this.productService.getById(productId);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('image', multerOptions))
  createProduct(
    @Body() createProductDto: ProductDto,
    @UploadedFile() file,
  ): Promise<Product> {
    return this.productService.createProduct(createProductDto, file);
  }

  @Put(':productId')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FilesInterceptor('image', 5, multerOptions))
  updateProduct(
    @Param('productId') productId: string,
    @Body() updateProductDto: ProductDto,
    @UploadedFiles() file,
  ): Promise<Product> {
    return this.productService.updateProduct(productId, updateProductDto, file);
  }

  @Delete(':productId')
  deleteProduct(@Param('productId') productId: string): Promise<Product> {
    return this.productService.deleteProduct(productId);
  }
}
