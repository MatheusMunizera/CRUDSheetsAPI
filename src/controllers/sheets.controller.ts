import { Body, Controller, Get, Post } from "@nestjs/common";
import { Observable } from "rxjs";
import { SheetsService } from "../services/sheets.service";
import { SheetsResponseDto } from "../shared/dtos/sheets/sheets-response.dto";
import { SheetsDto } from "../shared/dtos/sheets/sheets.dto";
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';



@ApiTags('Sheets')
@Controller("Sheets")
export class SheetsController {


    constructor(
        private sheetsService: SheetsService,
    ) { }


    @Post()
    @ApiResponse({ status: 201, description: 'The data has been successfully created.', type: SheetsResponseDto})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    public create(@Body() sheets: SheetsDto): Observable<SheetsResponseDto> {
        return this.sheetsService.postSheets(sheets);
    }

     
    @Get()
    @ApiResponse({ status: 200, type: [SheetsResponseDto]})
    public getAll(): Observable<SheetsResponseDto[]> {
        return this.sheetsService.getAllSheets();
    }

}


