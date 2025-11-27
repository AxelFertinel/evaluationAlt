import { PartialType } from '@nestjs/mapped-types';
import { CreateUsageLogDto } from './create-usage_log.dto';

export class UpdateUsageLogDto extends PartialType(CreateUsageLogDto) {}
