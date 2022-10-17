
import { BloodEnum } from "../../../shared/enum/blood.enum";
import { GenderEnum } from "../../../shared/enum/gender.enum";
import { Entity } from "../../base/entity";

//name	birthdate	gender	sign	cpf	rg	father	mother	email	cep	address	number	district	city	phone	height	weight	blood	color							
export class SheetsEntity extends Entity {
    public name : string;
    public birthdate : Date;
    public gender : GenderEnum;
    public sign : string;
    public cpf : number;
    public rg : string;
    public father : string;
    public mother : string;
    public email : string;
    public cep : string;
    public address : string;
    public number : string;
    public district : string;
    public city : string;
    public phone : number;
    public height : string;
    public weight : string;
    public blood : BloodEnum;
    public color : string;
}