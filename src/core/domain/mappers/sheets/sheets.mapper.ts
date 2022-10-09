import { Mapper } from "src/core/base/mapper";
import { SheetsEntity } from "src/core/domain/entities/sheets.entity";
import { SheetsDto } from "src/shared/dtos/sheets/sheets.dto";



export class SheetsMapper extends Mapper<SheetsDto, SheetsEntity>{
    
   public mapFrom(data: SheetsDto): SheetsEntity {
        const sheets = new SheetsEntity();
        sheets.name = data.name;
        return sheets;
    }


    public mapTo(data: SheetsEntity): SheetsDto {
        const sheets = new SheetsDto();


        sheets.id = data.id;
        sheets.name = data.name;

        return sheets;
    }


}