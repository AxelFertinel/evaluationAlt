import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserToolAccessService } from './user_tool_access.service';
import { CreateUserToolAccessDto } from './dto/create-user_tool_access.dto';
import { UpdateUserToolAccessDto } from './dto/update-user_tool_access.dto';

@Controller('user-tool-access')
export class UserToolAccessController {
  constructor(private readonly userToolAccessService: UserToolAccessService) {}

  @Post()
  create(@Body() createUserToolAccessDto: CreateUserToolAccessDto) {
    return this.userToolAccessService.create(createUserToolAccessDto);
  }

  @Get()
  findAll() {
    return this.userToolAccessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userToolAccessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserToolAccessDto: UpdateUserToolAccessDto) {
    return this.userToolAccessService.update(+id, updateUserToolAccessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userToolAccessService.remove(+id);
  }
}
