import { CreateCategoryDto } from '../dto/create-category.dto';

export class Category {
  constructor(CreateCategoryDto: CreateCategoryDto) {
    this.name = CreateCategoryDto.name;
    this.description = CreateCategoryDto.description;
    this.color_hex = CreateCategoryDto.color_hex;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  id: number;

  name: string;

  description: string;

  color_hex: string;

  createdAt: Date;

  updatedAt: Date;
}
