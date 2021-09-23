import { ESourceType } from "../models/DataParser";
import { PowerBIDataParser } from "./PowerBI";
export class DataParser {
    constructor(){
        this.adapterMap = new Map();
        this.registerAdapters();
    }
    registerAdapters() {
        this.adapterMap.set(ESourceType.POWER_BI, new PowerBIDataParser());
    }
    getSourceParser(sourceType) {
        return this.adapterMap.get(sourceType);
    }
}
