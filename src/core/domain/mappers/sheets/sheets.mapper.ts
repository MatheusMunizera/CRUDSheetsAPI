import { SheetsDto } from '../../../../shared/dtos/sheets/sheets.dto';
import { Mapper } from '../../../base/mapper';
import { SheetsEntity } from '../../entities/sheets.entity';

export class SheetsMapper extends Mapper<SheetsDto, SheetsEntity> {
  
  public mapFrom(sheets: SheetsDto): SheetsEntity {
    const entity = new SheetsEntity();

    entity.name = sheets.name;
    entity.birthdate = sheets.birthdate;
    entity.gender = sheets.gender;
    entity.sign = sheets.sign;
    entity.cpf = sheets.cpf;
    entity.rg = sheets.rg;
    entity.father = sheets.father;
    entity.mother = sheets.mother;
    entity.email = sheets.email;
    entity.cep = sheets.cep;
    entity.address = sheets.address;
    entity.number = sheets.number;
    entity.district = sheets.district;
    entity.city = sheets.city;
    entity.phone = sheets.phone;
    entity.height = sheets.height;
    entity.weight = sheets.weight;
    entity.blood = sheets.blood;
    entity.color = sheets.color;

    return entity;
  }

  public mapTo(entity: SheetsEntity): SheetsDto {
    const sheets = new SheetsDto();

    sheets.name = entity.name;
    sheets.birthdate = entity.birthdate;
    sheets.gender = entity.gender;
    sheets.sign = entity.sign;
    sheets.cpf = entity.cpf;
    sheets.rg = entity.rg;
    sheets.father = entity.father;
    sheets.mother = entity.mother;
    sheets.email = entity.email;
    sheets.cep = entity.cep;
    sheets.address = entity.address;
    sheets.number = entity.number;
    sheets.district = entity.district;
    sheets.city = entity.city;
    sheets.phone = entity.phone;
    sheets.height = entity.height;
    sheets.weight = entity.weight;
    sheets.blood = entity.blood;
    sheets.color = entity.color;

    return sheets;
  }
}
