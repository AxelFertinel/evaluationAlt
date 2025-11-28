import {
  IsNotEmpty,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { Department, ToolStatus } from '../../../generated/prisma/enums';
import { ApiProperty } from '@nestjs/swagger';

export class CreateToolDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Tournevis' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Tournevis rouge' })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Leroy Merlin' })
  vendor?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'https://www.leroymerlin.fr/' })
  websiteUrl?: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 1 })
  categoryId: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 5 })
  monthlyCost: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 5 })
  activeUsersCount: number;

  @IsNotEmpty()
  @IsEnum(Department)
  @ApiProperty({ example: 'Engineering' })
  ownerDepartment: Department;

  @IsNotEmpty()
  @IsEnum(ToolStatus)
  @ApiProperty({ example: 'active' })
  status: ToolStatus;
}
