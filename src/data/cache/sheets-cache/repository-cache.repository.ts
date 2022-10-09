import { Injectable } from "@nestjs/common";
import { SheetsEntity } from "src/core/domain/entities/sheets.entity";
import { SheetsRepository } from "src/core/repositories/sheet.repository";
import { RepositoryCache } from "../repository-cache";



@Injectable()
// export class MyClass extends OqueQuiserUsarClass implements OqueForImplementar {}
export class SheetsCacheRepository extends RepositoryCache<SheetsEntity> implements SheetsRepository { }
