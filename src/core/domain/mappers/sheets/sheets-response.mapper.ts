import { Mapper } from "../../../base/mapper";
import { SheetsEntity } from "../../entities/sheets.entity";
import { SheetsResponseDto } from "../../../../shared/dtos/sheets/sheets-response.dto";


export class SheetsResponseMapper implements Mapper<SheetsResponseDto, SheetsEntity>{
    
    public mapFrom(response: SheetsResponseDto): SheetsEntity {
         const sheet = new SheetsEntity();
         
         sheet.camisa = response.camisa;
         sheet.despesas = response.despesas;
         sheet.name = response.name;
         sheet.numero = response.numero;
         sheet.profisssao = response.profisssao;
         sheet.salario = response.salario;
 
 
         return sheet;
     }
 
 
    public mapTo(sheet: SheetsEntity): SheetsResponseDto {
         const response = new SheetsResponseDto();
 
          response.camisa = sheet.camisa;
          response.despesas = sheet.despesas;
          response.name = sheet.name;
          response.numero = sheet.numero;
          response.profisssao = sheet.profisssao;
          response.salario = sheet.salario;
 
         return response;
     }
 
 
 }