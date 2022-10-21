import { ApiProperty } from '@nestjs/swagger';
import { BloodEnum } from '../../enum/blood.enum';
import { GenderEnum } from '../../enum/gender.enum';

export class SheetsResponseDto {

 
 
  constructor(values? : string[]) {
    if(values){
      this.name = values[0];
      this.birthdate = new Date(values[1]);
      this.age = +values[2];
      this.gender = GenderEnum[values[3]];
      this.sign = values[4];
      this.cpf = +values[5];
      this.rg = values[6];
      this.father = values[7]; 
      this.mother = values[8];
      this.email = values[9];
      this.cep = values[10];
      this.address = values[11];
      this.number = values[12];
      this.district = values[13];
      this.city = values[14];
      this.phone = +values[15];
      this.height = values[16];
      this.weight = values[17];
      this.blood = BloodEnum[values[18]];
      this.color = values[19];
    }
      
  }


  @ApiProperty({
    example: 'Matheus Muniz Dantas',
  })
  name: string;

  @ApiProperty({
    example: '01/05/2001',
  })
  birthdate: Date;

  @ApiProperty({
    example: 21,
  })
  age: number;

  @ApiProperty({
    example: GenderEnum.MALE.toString(),
  })
  gender: GenderEnum;

  @ApiProperty({
    example: 'Touro',
  })
  sign: string;
  @ApiProperty({
    example: 19497567340,
  })
  cpf: number;
  @ApiProperty({
    example: '27058665X',
  })
  rg: string;
  @ApiProperty({
    example: 'Daniel Alexandre Lorenzo da Mota',
  })
  father: string;
  @ApiProperty({
    example: 'Antônia Camila',
  })
  mother: string;
  @ApiProperty({
    example: 'matheus.munizera@gmail.com',
  })
  email: string;
  @ApiProperty({
    example: '60181210',
  })
  cep: string;
  @ApiProperty({
    example: 'Rua Ponta Mar',
  })
  address: string;
  @ApiProperty({
    example: '113',
  })
  number: string;
  @ApiProperty({
    example: 'Vicente Pinzon',
  })
  district: string;
  @ApiProperty({
    example: 'Fortaleza',
  })
  city: string;
  @ApiProperty({
    example: 85983187119,
  })
  phone: number;
  @ApiProperty({
    example: '1,82',
  })
  height: string;
  @ApiProperty({
    example: '86',
  })
  weight: string;
  @ApiProperty({
    example: BloodEnum['A+'],
  })
  blood: BloodEnum;
  @ApiProperty({
    example: 'vermelho',
  })
  color: string;
}
