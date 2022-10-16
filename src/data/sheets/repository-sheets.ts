import { Injectable } from '@nestjs/common';
import { Entity } from '../../core/base/entity';
import { Repository } from '../../core/base/repository';
import { GoogleService } from '../../services/google.service';

@Injectable()
export class RepositorySheets<
  TEntity extends Entity,
> extends Repository<TEntity> {
  constructor(private googleService: GoogleService) {
    super();
  }

  async get(request: TEntity): Promise<any> {
    return await this.googleService.GOOGLESHEETS.spreadsheets.values.get(request);
  }
  async create(request: TEntity): Promise<void> {
      await this.googleService.GOOGLESHEETS.spreadsheets.values.append(request);
  }
  async update(request: TEntity): Promise<void> {
     await this.googleService.GOOGLESHEETS.spreadsheets.values.update(request);
  }
  async remove(request?: TEntity): Promise<void> {
     await this.googleService.GOOGLESHEETS.spreadsheets.values.clear(
      request,
    );
  }
}
