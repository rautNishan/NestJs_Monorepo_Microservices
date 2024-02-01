import { PartialType } from '@nestjs/swagger';
import { TeacherCreateDto } from './teacher.create.dot';

export class TeacherUpdateDto extends PartialType(TeacherCreateDto) {}
