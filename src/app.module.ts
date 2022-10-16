import { Module } from '@nestjs/common';
import { SheetsController } from './controllers/sheets.controller';
import { SheetsRepository } from './core/repositories/sheet.repository';
import { SheetsService } from './services/sheets.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GoogleService } from './services/google.service';
import { RepositorySheets } from './data/sheets/repository-sheets';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './helpers/env/env.helper';

const envFilePath: string = getEnvPath(`${__dirname}/envs`);


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [SheetsController],
  providers: [
 {
  provide: SheetsRepository,
  useClass: RepositorySheets
 },
    SheetsService,
    GoogleService
  ],
})
export class AppModule {}
