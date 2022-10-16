import { SheetsDto } from "../../../../shared/dtos/sheets/sheets.dto";
import { Mapper } from "../../../base/mapper";
import { SheetsEntity } from "../../entities/sheets.entity";




export class SheetsMapper extends Mapper<SheetsDto, SheetsEntity>{
    
   public mapFrom(sheets: SheetsDto): SheetsEntity {
        const entity = new SheetsEntity();
        
         entity.camisa = sheets.camisa;
         entity.despesas = sheets.despesas;
         entity.name = sheets.name;
         entity.numero = sheets.numero;
         entity.profisssao = sheets.profisssao;
         entity.salario = sheets.salario;
 
        return entity;
    }


    public mapTo(entity: SheetsEntity): SheetsDto {
        const sheets = new SheetsDto();

        sheets.camisa = entity.camisa;
        sheets.despesas = entity.despesas;
        sheets.name = entity.name;
        sheets.numero = entity.numero;
        sheets.profisssao = entity.profisssao;
        sheets.salario = entity.salario;

        return sheets;
    }


}