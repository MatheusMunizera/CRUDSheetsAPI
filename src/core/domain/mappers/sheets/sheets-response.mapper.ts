import { Mapper } from "src/core/base/mapper";
import { SheetsEntity } from "src/core/domain/entities/sheets.entity";
import { SheetsResponseDto } from "src/shared/dtos/sheets/sheets-response.dto";



export class SheetsResponseMapper implements Mapper<SheetsResponseDto, SheetsEntity>{
    
   public mapFrom(data: SheetsResponseDto): SheetsEntity {
        const user = new SheetsEntity();


        user.id = data.id;
        user.name = data.name;


        return user;
    }


   public mapTo(data: SheetsEntity): SheetsResponseDto {
        const user = new SheetsResponseDto();


        user.id = data.id;
        user.name = data.name;


        return user;
    }


}