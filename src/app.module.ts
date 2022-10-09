import { Module } from '@nestjs/common';
import { SheetsController } from './controllers/sheets.controller';
import { SheetsRepository } from './core/repositories/sheet.repository';
import { SheetsCacheRepository } from './data/cache/sheets-cache/repository-cache.repository';
import { SheetsService } from './services/sheets.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [SheetsController],
  providers: [
 {
  provide: SheetsRepository,
  useClass: SheetsCacheRepository
 },
    SheetsService
  ],
})
export class AppModule {}
