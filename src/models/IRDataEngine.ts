import powerbi from "powerbi-visuals-api";
import { ESourceType } from "./DataParser";

export type TPropsChanged = Set<string>;

export type TExecuteFunction = [string, Function];

export interface IRDataEngineProps {
    sourceType: ESourceType;
    rawData: powerbi.DataView;
}