import { ApiProperty} from '@nestjs/swagger';
import { CamisaEnum } from '../../enum/camisa.enum';

export class SheetsDto {

    @ApiProperty({
        example: 'Matheus Muniz Dantas',
        description: `The Colunm 'Names' on default sheet`,
    })
    name: string;

    @ApiProperty({
        example: 'Desenvolvedor',
        description: `The Colunm 'Profissao' on default sheet`,
    })
    profisssao: string;

    @ApiProperty({
        example: 'M',
        description: `The Colunm 'Camisa' on default sheet`,
    })
    camisa: CamisaEnum;

    @ApiProperty({
        example: '40',
        description: `The Colunm 'Numero' on default sheet`,
    })
    numero: number;

    @ApiProperty({
        example: '1200',
        description: `The Colunm 'Salario' on default sheet`,
    })
    salario: string;

    @ApiProperty({
        example: '200',
        description: `The Colunm 'Despesas' on default sheet`,
    })
    despesas: string;
}