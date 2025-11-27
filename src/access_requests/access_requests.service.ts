import { Injectable } from '@nestjs/common';
import { CreateAccessRequestDto } from './dto/create-access_request.dto';
import { UpdateAccessRequestDto } from './dto/update-access_request.dto';

@Injectable()
export class AccessRequestsService {
  create(createAccessRequestDto: CreateAccessRequestDto) {
    return 'This action adds a new accessRequest';
  }

  findAll() {
    return `This action returns all accessRequests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accessRequest`;
  }

  update(id: number, updateAccessRequestDto: UpdateAccessRequestDto) {
    return `This action updates a #${id} accessRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} accessRequest`;
  }
}
