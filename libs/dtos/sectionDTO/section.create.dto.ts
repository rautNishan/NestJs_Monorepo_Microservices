import { ApiProperty } from '@nestjs/swagger';
import { ITimeTable } from 'libs/interface/timeTable.interface';

export class SectionCreateDto {
  @ApiProperty({
    description: 'Section name',
    example: 'N5',
  })
  section: string;

  @ApiProperty({
    description: 'Time table',
    example: [
      {
        startTime: '09:00',
        endTime: '10:00',
      },
      {
        startTime: '10:00',
        endTime: '11:00',
      },
    ],
  })
  timeTable: ITimeTable[];
}
