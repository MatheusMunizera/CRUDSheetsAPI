import { Observable } from "rxjs";
import { Entity } from "./entity";

export abstract class Repository<TEntity extends Entity> {
    abstract get(request: TEntity): Promise<TEntity>
    abstract create(request: TEntity ): Promise<void>;
    abstract update(request: TEntity): Promise<void>;
    abstract remove(request?: TEntity): Promise<void>;
}