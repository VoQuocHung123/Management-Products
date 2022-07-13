import { IsNumber, Min, IsOptional, IsString } from 'class-validator';

export class QueryOptions {
  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsString()
  fields: string;
  text: string;

  @IsOptional()
  @IsString()
  cate: string;
  brand: string;
}
