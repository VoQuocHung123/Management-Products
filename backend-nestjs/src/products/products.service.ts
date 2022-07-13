import { QueryOptions } from './dtos/queryOptions';
import { ProductDto } from './dtos/product.dto';
import { Injectable } from '@nestjs/common';
import { Product, ProductDocument } from 'src/schemas/product.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async getAll(queryOptions: QueryOptions) {
    if (!queryOptions.page) queryOptions.page = 1;
    if (!queryOptions.limit) queryOptions.limit = 6;
    const skip = Number(queryOptions.limit) * (Number(queryOptions.page) - 1);
    let query = {};
    if (queryOptions.cate) {
      query = { ...query, category: queryOptions.cate };
    }
    if (queryOptions.brand) {
      query = { ...query, brand: queryOptions.brand };
    }
    if (queryOptions.fields) {
      const content = new RegExp(queryOptions.text);
      query = { ...query, [queryOptions.fields]: content };
    }
    const products = await this.productModel
      .find(query)
      .skip(skip)
      .limit(queryOptions.limit);
    const countProduct = await this.productModel.countDocuments(query);
    return { products, countProduct };
  }
  async getById(id: string): Promise<Product> {
    return this.productModel.findOne({ _id: id }).exec();
  }
  async createProduct(createProductDto: ProductDto, file): Promise<Product> {
    console.log(createProductDto);
    console.log(file.filename);
    const data = { ...createProductDto, image: file.filename };
    const newProduct = await this.productModel.create(data);
    return newProduct;
  }
  async updateProduct(
    id: string,
    updateProductDto: ProductDto,
    file,
  ): Promise<Product> {
    const data = { ...updateProductDto, image: file.filename };
    const updatedProduct = await this.productModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedProduct;
  }
  async deleteProduct(id: string): Promise<Product> {
    const deletedProduct = this.productModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedProduct;
  }
}
