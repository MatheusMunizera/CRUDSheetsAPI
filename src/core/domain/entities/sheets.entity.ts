import { CamisaEnum } from "../../../shared/enum/camisa.enum";
import { Entity } from "../../base/entity";


export class SheetsEntity extends Entity {
    public camisa : CamisaEnum;
    public despesas : string;
    public name : string;
    public numero : number;
    public profisssao : string;
    public salario : string;
}