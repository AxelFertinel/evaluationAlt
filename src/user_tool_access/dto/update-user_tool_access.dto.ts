import { PartialType } from '@nestjs/mapped-types';
import { CreateUserToolAccessDto } from './create-user_tool_access.dto';

export class UpdateUserToolAccessDto extends PartialType(CreateUserToolAccessDto) {}
