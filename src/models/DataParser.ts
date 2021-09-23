import { PowerBIDataParser } from "../DataParser/PowerBI";

export enum ESourceType {
    NONE = 'NONE',
    POWER_BI = 'POWER_BI'
}

export type TDataParaser = PowerBIDataParser;