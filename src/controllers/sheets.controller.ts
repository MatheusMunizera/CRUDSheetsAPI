import { Body, Controller, Get, Post } from "@nestjs/common";
import { Observable } from "rxjs";
import { SheetsService } from "src/services/sheets.service";
import { SheetsResponseDto } from "src/shared/dtos/sheets/sheets-response.dto";
import { SheetsDto } from "src/shared/dtos/sheets/sheets.dto";



@Controller("/sheets")
export class SheetsController {


    constructor(
        private sheetsService: SheetsService,
    ) { }


    @Post()
    public create(@Body() sheets: SheetsDto): Observable<SheetsResponseDto> {
        return this.sheetsService.postSheets(sheets);
    }


    @Get()
    public getAll(): Observable<SheetsResponseDto[]> {
        return this.sheetsService.getAllSheets();
    }

}