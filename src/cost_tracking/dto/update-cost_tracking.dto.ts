import { PartialType } from '@nestjs/mapped-types';
import { CreateCostTrackingDto } from './create-cost_tracking.dto';

export class UpdateCostTrackingDto extends PartialType(CreateCostTrackingDto) {}
