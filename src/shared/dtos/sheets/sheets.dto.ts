import {ApiProperty} from '@nestjs/swagger';
export class SheetsDto {
  
    @ApiProperty({
        example: 'Munizera',
        description: `O nome que será utilizado`,
    })
    name: string;
}