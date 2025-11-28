import { PartialType } from '@nestjs/swagger';
import { CreateAnalitycDto } from './create-analityc.dto';

export class UpdateAnalitycDto extends PartialType(CreateAnalitycDto) {}
