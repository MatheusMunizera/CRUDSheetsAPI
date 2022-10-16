import { Injectable } from '@nestjs/common';
import { Service } from '../core/base/service';
import { google } from 'googleapis';
import { SheetsDto } from '../shared/dtos/sheets/sheets.dto';

@Injectable()
export class GoogleService implements Service<SheetsDto> {
  public AUTH;
  public GOOGLESHEETS;

  constructor() {
    this.getGoogleSheets();
  }

  public async getGoogleSheets() {
    const client = await this.authenticate().then((auth: any) => {
      return auth.getClient();
    });

    this.GOOGLESHEETS = google.sheets({ version: 'v4', auth: client });
  }
  private async authenticate() {
    try {
      const credentials: string = process.env.CREDENTIALS;
      const auth = new google.auth.GoogleAuth({
        credentials: JSON.parse(credentials),
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
      });
      this.AUTH = auth;
      return auth;
    } catch (error) {
        console.error('Error on authenticate googleapi', error.message)
        throw new Error(error.message)
    }
  }
}
