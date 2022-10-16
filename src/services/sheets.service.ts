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
  //Todo | TO DO
  //Authentication
  //Arrumar get e estrutura
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
    let range = this.nameSheet;
    if (rangeRow) {
      if (
        rangeRow.startsWith('1') ||
        rangeRow.includes('A1:') ||
        rangeRow.endsWith('A1')
      )
        throw new Error(`Invalid Range: Dont acces to change the first row`);

      if (
        !rangeRow.includes(':') &&
        rangeRow.length == 2 &&
        rangeRow.endsWith('1')
      )
        throw new Error(`Invalid Range: Dont acces to change the first row`);

      range = `${this.nameSheet}!${rangeRow}`;
    }

    const firstRow = await this.getRows('1:1');
    const request = {
      spreadsheetId: this.spreadsheetId,
      range,
      auth: this.AUTH,
    };

    try {
      await this.repository.remove(request);

      if (!range) {
        const keysFirstRow = Object.keys(firstRow);
        await this.write(keysFirstRow);
      }
    } catch (ex) {
      console.error('Erro clearing row: ', ex.message);
      throw new Error(`Erro clearing row: ${ex.message}`);
    }
  }

  public async updateByRange(sheets: SheetsDto, rangeRow: string) {
    if (
      rangeRow.startsWith('1') ||
      rangeRow.includes('A1:') ||
      rangeRow.endsWith('A1')
    )
      throw new Error(`Invalid Range: Dont acces to change the first row`);

    if (
      !rangeRow.includes(':') &&
      rangeRow.length == 2 &&
      rangeRow.endsWith('1')
    )
      throw new Error(`Invalid Range: Dont acces to change the first row`);

    const range = `${this.nameSheet}!${rangeRow}`;

    const request = {
      spreadsheetId: this.spreadsheetId,
      range : range,
      auth: this.AUTH,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [Object.values(sheets)],
      },
    };

    try {
      await this.repository.update(request);
    } catch (ex) {
      console.error('Erro updating row: ', ex.message);
      throw new Error(`Erro updating row: ${ex.message}`);
    }
  }

  public async write(sheets: SheetsDto | string[]) {
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

    try {
      await this.repository.create(request);
    } catch (ex) {
      console.log(ex.message);
      throw new HttpException(ex.message, 400);
    }
  }

  public async getRows(rangeRow?: string): Promise<SheetsResponseDto> {
    let range = this.nameSheet
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

      const allRows = getRows.data.values;
      const cols = allRows[0];
      const values = [];
      let aux = [];

      for (let i = 0; i < cols.length; i++) {
        for (let j = 1; j < allRows.length; j++) {
          aux.push(allRows[j][i]);
        }

        values.push(aux.filter((e) => e !== undefined));
        aux = [];
      }

      let auxResult = 1;
      const formatted: string[] = [...cols];

      for (let i = 0; i <= cols.length; i++) {
        formatted.splice(i + auxResult, 0, values[i]);
        auxResult++;
      }
      const result = new SheetsResponseDto();

      for (let i = 0; i < cols.length; i++) {
        result[`${formatted.splice(0, 1)}`] = `${formatted.splice(0, 1)}`;
      }
      return result;
    } catch (ex) {
      console.error('Erro on getting row: ', ex.message);
      throw new HttpException(`Erro getting row: ${ex.message}`, 404);
    }
  }
}
