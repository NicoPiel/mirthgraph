import { PartialType } from '@nestjs/mapped-types';
import { CreatePortDto } from './create-port.dto';

export class UpdatePortDto extends PartialType(CreatePortDto) {}
