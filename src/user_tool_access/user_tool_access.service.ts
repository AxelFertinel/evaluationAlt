import { Injectable } from '@nestjs/common';
import { CreateUserToolAccessDto } from './dto/create-user_tool_access.dto';
import { UpdateUserToolAccessDto } from './dto/update-user_tool_access.dto';

@Injectable()
export class UserToolAccessService {
  create(createUserToolAccessDto: CreateUserToolAccessDto) {
    return 'This action adds a new userToolAccess';
  }

  findAll() {
    return `This action returns all userToolAccess`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userToolAccess`;
  }

  update(id: number, updateUserToolAccessDto: UpdateUserToolAccessDto) {
    return `This action updates a #${id} userToolAccess`;
  }

  remove(id: number) {
    return `This action removes a #${id} userToolAccess`;
  }
}
