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
    if (queryOptions.except) {
      query = { ...query, _id: { $ne: queryOptions.except } };
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
    const data = {
      ...createProductDto,
      image: file.filename,
      slideimg: ['', '', '', ''],
    };
    const newProduct = await this.productModel.create(data);
    return newProduct;
  }
  async updateProduct(
    id: string,
    updateProductDto: ProductDto,
    file,
  ): Promise<Product> {
    console.log(updateProductDto.slideimg);
    const arrImg = updateProductDto.slideimg.split(',');
    console.log(arrImg);
    const arr = arrImg;
    if (file.image) {
      updateProductDto.image = file.image[0].filename;
    }
    for (let i = 1; i <= 4; i++) {
      const key = 'newImg' + i;
      if (file[key]) {
        arr[i - 1] = file[key][0].filename;
      }
    }
    const data = {
      ...updateProductDto,
      slideimg: arr,
    };
    console.log(data);
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
