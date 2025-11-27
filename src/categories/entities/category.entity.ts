import { CreateCategoryDto } from '../dto/create-category.dto';

export class Category {
  constructor(CreateCategoryDto: CreateCategoryDto) {
    this.name = CreateCategoryDto.name;
    this.description = CreateCategoryDto.description;
    this.colorHex = CreateCategoryDto.colorHex;
  }

  id?: number;

  name: string;

  description?: string;

  colorHex: string;

  createdAt?: Date;

  updatedAt?: Date;
}
