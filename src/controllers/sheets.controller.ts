import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { SheetsService } from '../services/sheets.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ApiHeaders } from '../helpers/headers/headers';
import { SheetsDto } from '../shared/dtos/sheets/sheets.dto';
import { SheetsResponseDto } from '../shared/dtos/sheets/sheets-response.dto';
import { BadRequestSwagger } from '../helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from '../helpers/swagger/not-found.swagger';
import { NoContentSwagger } from '../helpers/swagger/no-content.swagger';

@ApiTags('Sheets')
@Controller('sheets')
export class SheetsController {
  constructor(private sheetsService: SheetsService) {}

  //#region Endpoints to CREATE data
  @Post()
  @ApiHeaders()
  @ApiResponse({
    status: 201,
    description: 'The data has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Sheets cannot be found',
    type: NotFoundSwagger,
  })
  public async writeRow(@Body() sheets: SheetsDto, @Headers() headers) {
    headers['x-identify-sheet'] ? this.sheetsService.spreadsheetId = headers['x-identify-sheet']: '';
    headers['x-name-sheet'] ? this.sheetsService.nameSheet = headers['x-name-sheet']: '';
    
    await this.sheetsService.write(sheets);
    throw new HttpException('Sheets has been created', HttpStatus.CREATED);
  }
  //#endregion

  //#region Endpoints to UPDATE data 
  @Put(':range')
  @ApiHeaders()
  @ApiResponse({
    status: 204,
    description: 'Sheets has been updated',
    type: NoContentSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Sheets cannot be found',
    type: NotFoundSwagger,
  })
  public async updateRow(
    @Body() sheets: SheetsDto,
    @Param('range') range: string,
    @Headers() headers,
  ): Promise<void> {
    headers['x-identify-sheet'] ? this.sheetsService.spreadsheetId = headers['x-identify-sheet']: '';
    headers['x-name-sheet'] ? this.sheetsService.nameSheet = headers['x-name-sheet']: '';

    await this.sheetsService.updateByRange(sheets, range);
    throw new HttpException('Sheets has been updated', HttpStatus.NO_CONTENT);
  }
  //#endregion

  //#region Endpoints to GET data
  @Get('todos')
  @ApiHeaders()
  @ApiResponse({
    status: 200,
    description: 'All data from you sheets was been retrieved',
    type: [SheetsResponseDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Sheets cannot be found',
    type: NotFoundSwagger,
  })
  public async getAllRows(@Headers() headers): Promise<any> {
    headers['x-identify-sheet'] ? this.sheetsService.spreadsheetId = headers['x-identify-sheet']: '';
    headers['x-name-sheet'] ? this.sheetsService.nameSheet = headers['x-name-sheet']: '';
    return await this.sheetsService.getRows();
  }
  @Get(':range')
  @ApiHeaders()
  @ApiResponse({
    status: 200,
    description: 'All data from you sheets was been retrieved',
    //type: [any],
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Sheets cannot be found',
    type: NotFoundSwagger,
  })
  public async getRow(
    @Param('range') range: string,
    @Headers() headers,
  ): Promise<any> {
    headers['x-identify-sheet'] ? this.sheetsService.spreadsheetId = headers['x-identify-sheet']: '';
    headers['x-name-sheet'] ? this.sheetsService.nameSheet = headers['x-name-sheet']: '';
    return await this.sheetsService.getRows(range);
  }

  //#endregion

  //#region Endpoints to DELETE data
  @Delete(':range')
  @ApiHeaders()
  @ApiResponse({
    status: 204,
    description: 'The range of your sheets has been clean',
    type: NoContentSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Sheets cannot be found',
    type: NotFoundSwagger,
  })
  public async deleteRow(
    @Param('range') range: string,
    @Headers() headers,
  ): Promise<void> {
    headers['x-identify-sheet'] ? this.sheetsService.spreadsheetId = headers['x-identify-sheet']: '';
    headers['x-name-sheet'] ? this.sheetsService.nameSheet = headers['x-name-sheet']: '';
    await this.sheetsService.clearRows(range);
    throw new HttpException('Sheets has been clean', HttpStatus.NO_CONTENT);
  }

  @Delete()
  @ApiHeaders()
  @ApiResponse({
    status: 204,
    description: 'Sheets has been clean',
    type: NoContentSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Sheets cannot be found',
    type: NotFoundSwagger,
  })
  public async deleteRows(@Headers() headers): Promise<void> {
    headers['x-identify-sheet'] ? this.sheetsService.spreadsheetId = headers['x-identify-sheet']: '';
    headers['x-name-sheet'] ? this.sheetsService.nameSheet = headers['x-name-sheet']: '';
    await this.sheetsService.clearRows();
    throw new HttpException('Sheets has been clean', HttpStatus.NO_CONTENT);
  }

  //#endregion
}
