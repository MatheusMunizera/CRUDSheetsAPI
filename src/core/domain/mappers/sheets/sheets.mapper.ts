import { SheetsDto } from "../../../../shared/dtos/sheets/sheets.dto";
import { Mapper } from "../../../base/mapper";
import { SheetsEntity } from "../../entities/sheets.entity";




export class SheetsMapper extends Mapper<SheetsDto, SheetsEntity>{
    
   public mapFrom(data: SheetsDto): SheetsEntity {
        const sheets = new SheetsEntity();
        sheets.name = data.name;
        return sheets;
    }


    public mapTo(data: SheetsEntity): SheetsDto {
        const sheets = new SheetsDto();

        sheets.name = data.name;

        return sheets;
    }


}