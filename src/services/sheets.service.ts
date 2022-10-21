import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SheetsResponseMapper } from '../core/domain/mappers/sheets/sheets-response.mapper';
import { SheetsMapper } from '../core/domain/mappers/sheets/sheets.mapper';
import { SheetsRepository } from '../core/repositories/sheet.repository';
import { SheetsResponseDto } from '../shared/dtos/sheets/sheets-response.dto';
import { SheetsDto } from '../shared/dtos/sheets/sheets.dto';
import { GoogleService } from './google.service';

@Injectable()
export class SheetsService extends GoogleService {
  @Inject(ConfigService)
  //TO DO
  //Authentication
  //Ajustar mapper
  
  private sheetsMapper: SheetsMapper;
  private sheetsResponseMapper: SheetsResponseMapper;
  public spreadsheetId: string = process.env.SPREADSHEETID;
  public nameSheet: string = process.env.NAMESHEET;
  public config: ConfigService;

  constructor(private readonly repository: SheetsRepository) {
    super();
    this.sheetsMapper = new SheetsMapper();
    this.sheetsResponseMapper = new SheetsResponseMapper();
  }

  public async clearRows(rangeRow?: string) {
    console.time('Clear');
    let range = this.nameSheet;
    if (rangeRow) {
      if (
        rangeRow.startsWith('1') ||
        rangeRow.includes('A1:') ||
        rangeRow.endsWith('A1')
      ){
        console.timeEnd('Clear');
        throw new HttpException(
          `Invalid Range: You dont have access to change the first row`,
          400,
        );
      }

      if (
        !rangeRow.includes(':') &&
        rangeRow.length == 2 &&
        rangeRow.endsWith('1')
      ){
        console.timeEnd('Clear');
        throw new HttpException(
          `Invalid Range: You dont have access to change the first row`,
          400,
        );
      }

      range = `${this.nameSheet}!${rangeRow}`;
    }

    const firstRow = await this.getRows('1:2');

    const request = {
      spreadsheetId: this.spreadsheetId,
      range,
      auth: this.AUTH,
    };

    try {
      await this.repository.remove(request);

      if (!rangeRow) {
        await this.write(firstRow[0]);
      }
      console.timeEnd('Clear');
    } catch (ex) {
      console.error('Erro clearing row: ', ex.message);
      throw new Error(`Erro clearing row: ${ex.message}`);
    }
  }

  public async updateByRange(sheets: SheetsDto, rangeRow: string) {
    console.time('Update');
    if (
      rangeRow.startsWith('1') ||
      rangeRow.includes('A1:') ||
      rangeRow.endsWith('A1')
    ) {
      console.timeEnd('Update');
      throw new HttpException(
        `Invalid Range: You dont have access to change the first row`,
        400,
      );
    }

    if (
      !rangeRow.includes(':') &&
      rangeRow.length == 2 &&
      rangeRow.endsWith('1')
    ) {
      console.timeEnd('Update');
      throw new HttpException(
        `Invalid Range: You dont have access to change the first row`,
        400,
      );
    }

    const range = `${this.nameSheet}!${rangeRow}`;

    const request = {
      spreadsheetId: this.spreadsheetId,
      range: range,
      auth: this.AUTH,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [Object.values(sheets)],
      },
    };

    try {
      await this.repository.update(request);
      console.timeEnd('Update');
    } catch (ex) {
      console.timeEnd('Update');
      console.error('Erro updating row: ', ex.message);
      throw new HttpException(ex.message, 400);
    }
  }

  public async write(sheets: SheetsDto) {
    console.time('Write');
    const range = this.nameSheet;
    
    const request = {
      spreadsheetId: this.spreadsheetId,
      range: range,
      auth: this.AUTH,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [Object.values(sheets)],
      },
    };

    console.log(sheets)

    try {
      await this.repository.create(request);
      console.timeEnd('Write');
    } catch (ex) {
      console.time('Write');
      console.log(ex.message);
      throw new HttpException(ex.message, 400);
    }
  }

  public async getRows(rangeRow?: string): Promise<SheetsResponseDto[]> {
    console.time('Get');
    let range = this.nameSheet;

    if (rangeRow) {
      range = `${this.nameSheet}!${rangeRow}`;
    }

    const request = {
      spreadsheetId: this.spreadsheetId,
      range: range,
      auth: this.AUTH,
      valueRenderOption: 'FORMATTED_VALUE',
    };

    try {
      const getRows = await this.repository.get(request);

      const allRows: string[][] = getRows.data.values;

      const result = [];

      let index = 1;
      if (rangeRow) {
        index = 0;
      }

      if (
        (rangeRow?.includes('A') && rangeRow?.includes('S')) ||
        range == 'CRUD'
      ) {
        for (let i = index; i < allRows.length; i++) {
          result.push(new SheetsResponseDto(allRows[i]));
        }
      } else {
        result.push(...allRows);
      }

      console.timeEnd('Get');
      return result;
    } catch (ex) {
      console.time('Get');
      console.error('Erro on getting row: ', ex.message);
      throw new HttpException(`Erro getting row: ${ex.message}`, 404);
    }
  }
}
