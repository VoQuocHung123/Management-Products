import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
export class ProductDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  readonly category: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  readonly brand: string;

  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  @IsString()
  @IsDefined()
  readonly description: string;

  @ApiProperty()
  readonly image: string;
  readonly updatedAt: string;
  readonly createdAt: string;
}
