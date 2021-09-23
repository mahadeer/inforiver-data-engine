import { ESourceType, TDataParaser } from "../models/DataParser";
import { PowerBIDataParser } from "./PowerBI";

export class DataParser {
    protected adapterMap: Map<ESourceType, TDataParaser>;

    constructor() {
        this.adapterMap = new Map<ESourceType, TDataParaser>();
        this.registerAdapters();
    }

    private registerAdapters() {
        this.adapterMap.set(ESourceType.POWER_BI, new PowerBIDataParser());
    }

    getSourceParser(sourceType: ESourceType) {
        return this.adapterMap.get(sourceType);
    }
}