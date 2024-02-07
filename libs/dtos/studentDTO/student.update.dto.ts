import { PartialType } from '@nestjs/swagger';
import { StudentCreateDto } from './student.register.dto';

export class StudentUpdateDto extends PartialType(StudentCreateDto) {}
