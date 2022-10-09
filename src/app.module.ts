import { Module } from '@nestjs/common';
import { SheetsController } from './controllers/sheets.controller';
import { SheetsRepository } from './core/repositories/sheet.repository';
import { SheetsCacheRepository } from './data/cache/sheets-cache/repository-cache.repository';
import { SheetsService } from './services/sheets.service';

@Module({
  imports: [],
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
