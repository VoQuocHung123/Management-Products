import { Injectable } from '@nestjs/common';
import { Category } from './interfaces/category.interface';
@Injectable()
export class CategoryService {
  private readonly category: Category[] = [
    {
      name: 'Ô Tô',
      value: 'oto',
      brands: ['BMW', 'Audi', 'VinFast'],
    },
    {
      name: 'Xe Máy',
      value: 'xemay',
      brands: ['Ducati', 'Honda', 'Yamaha'],
    },
    {
      name: 'Xe Đạp',
      value: 'xedap',
      brands: ['Yamaha'],
    },
  ];
  getAllCategory() {
    return this.category;
  }
}
