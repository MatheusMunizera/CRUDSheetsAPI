import {ApiProperty} from '@nestjs/swagger';
export class SheetsResponseDto  {
    @ApiProperty({
        example: '1',
        description: `Identificação`,
    })
    id: number;
    @ApiProperty({
        example: 'Munizera',
        description: `O nome que será utilizado`,
    })
    name: string;
}