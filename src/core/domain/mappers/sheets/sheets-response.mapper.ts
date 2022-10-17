import { Mapper } from '../../../base/mapper';
import { SheetsEntity } from '../../entities/sheets.entity';
import { SheetsResponseDto } from '../../../../shared/dtos/sheets/sheets-response.dto';

export class SheetsResponseMapper
  implements Mapper<SheetsResponseDto, SheetsEntity>
{
  public mapFrom(response: SheetsResponseDto): SheetsEntity {
    const sheet = new SheetsEntity();

    sheet.name = response.name;
    sheet.birthdate = response.birthdate;
    sheet.gender = response.gender;
    sheet.sign = response.sign;
    sheet.cpf = response.cpf;
    sheet.rg = response.rg;
    sheet.father = response.father;
    sheet.mother = response.mother;
    sheet.email = response.email;
    sheet.cep = response.cep;
    sheet.address = response.address;
    sheet.number = response.number;
    sheet.district = response.district;
    sheet.city = response.city;
    sheet.phone = response.phone;
    sheet.height = response.height;
    sheet.weight = response.weight;
    sheet.blood = response.blood;
    sheet.color = response.color;

    return sheet;
  }

  public mapTo(sheet: SheetsEntity): SheetsResponseDto {
    const response = new SheetsResponseDto();

    response.name = sheet.name;
    response.birthdate = sheet.birthdate;
    response.gender = sheet.gender;
    response.sign = sheet.sign;
    response.cpf = sheet.cpf;
    response.rg = sheet.rg;
    response.father = sheet.father;
    response.mother = sheet.mother;
    response.email = sheet.email;
    response.cep = sheet.cep;
    response.address = sheet.address;
    response.number = sheet.number;
    response.district = sheet.district;
    response.city = sheet.city;
    response.phone = sheet.phone;
    response.height = sheet.height;
    response.weight = sheet.weight;
    response.blood = sheet.blood;
    response.color = sheet.color;

    return response;
  }
}
