import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ToolsService } from './tools.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { Department, ToolStatus } from '../../generated/prisma/enums';
import {
  ApiParam,
  ApiBody,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('tools')
@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post()
  @ApiOperation({ summary: 'Crée de nouveau outils' })
  @ApiResponse({ status: 200, description: 'Création réussi' })
  create(@Body() createToolDto: CreateToolDto) {
    return this.toolsService.create(createToolDto);
  }

  @Get()
  @ApiOperation({ summary: 'Trouver tous les outils avec des filtres' })
  @ApiResponse({
    status: 200,
    description: 'Outils trouvés',
  })
  @ApiResponse({ status: 400, description: 'Requête invalide' })
  @ApiResponse({ status: 404, description: 'Aucun outil trouvé' })
  @ApiQuery({
    name: 'department',
    required: false,
    enum: Department,
    description: 'Filtrer par département',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ToolStatus,
    description: 'Filtrer par statut',
  })
  @ApiQuery({
    name: 'min_cost',
    required: false,
    type: Number,
    description: 'Coût minimum',
  })
  @ApiQuery({
    name: 'max_cost',
    required: false,
    type: Number,
    description: 'Coût maximum',
  })
  @ApiQuery({
    name: 'category',
    required: false,
    type: String,
    description: 'Filtrer par catégorie',
  })
  @ApiResponse({ status: 200, description: 'Outil trouvé' })
  @ApiResponse({ status: 404, description: 'Aucun outil trouvé' })
  async findWithFilter(
    @Query('department') department?: Department,
    @Query('status') status?: ToolStatus,
    @Query('min_cost') minCost?: string,
    @Query('max_cost') maxCost?: string,
    @Query('category') category?: string,
  ) {
    // Convert string query params to numbers
    const minCostNum = minCost ? parseFloat(minCost) : undefined;
    const maxCostNum = maxCost ? parseFloat(maxCost) : undefined;

    return await this.toolsService.findWithFilters(
      department,
      status,
      minCostNum,
      maxCostNum,
      category,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Trouver un outil par avec id' })
  @ApiResponse({
    status: 200,
    description: 'Outil trouvé',
  })
  @ApiResponse({ status: 400, description: 'Requête invalide' })
  @ApiResponse({ status: 404, description: 'Aucun outil trouvé' })
  findOne(@Param('id') id: string) {
    return this.toolsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un outil par son ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: "ID de l'outil à modifier",
    example: 1,
  })
  @ApiBody({
    type: UpdateToolDto,
    description: 'Données à mettre à jour',
  })
  @ApiResponse({
    status: 200,
    description: 'Mise à jour réussie',
  })
  @ApiResponse({
    status: 400,
    description: 'Requête invalide (ID ou données incorrectes)',
  })
  @ApiResponse({
    status: 404,
    description: 'Aucun outil trouvé avec cet ID',
  })
  update(@Param('id') id: string, @Body() updateToolDto: UpdateToolDto) {
    return this.toolsService.update(+id, updateToolDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un outil par son ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: "ID de l'outil à supprimer",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Outil supprimé avec succès',
  })
  @ApiResponse({
    status: 400,
    description: 'ID invalide',
  })
  @ApiResponse({
    status: 404,
    description: 'Aucun outil trouvé avec cet ID',
  })
  remove(@Param('id') id: string) {
    return this.toolsService.remove(+id);
  }
}
