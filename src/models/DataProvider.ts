import { TMeasureRoles } from "./VisualMeasure";

export type TGroupId = string;

export type TRowId = string;

export type TMinMaxArray = [number, number];

export enum ERoleType {
    ROW = 'category',
    COLUMN = 'group',
    AC = 'ameasure',
    PY = 'pymeasure',
    PL = 'plmeasure',
    FC = 'fcmeasure',
    TT = 'tmeasure',
}

export enum EMeasureRole {
    'ameasure' = 'AC',
    'pymeasure' = 'PY',
    'plmeasure' = 'PL',
    'fcmeasure' = 'FC',
    'tmeasure' = 'TT',
}

export interface ILevelInfo {
    level: number;
}

export interface IFieldInfo {
    displayName: string;
    fieldName: string;
}

export interface IRoleInfo {
    role: TMeasureRoles;
}

export type THierarchyFieldInfo = IFieldInfo & ILevelInfo;
export type TMeasureFieldInfo = IFieldInfo & IRoleInfo;

export interface IMetadata {
    rows: IFieldInfo[];
    columns: THierarchyFieldInfo[];
    measures: TMeasureFieldInfo[];
    roles: TMeasureRoles[];
    visualMeasures: TMeasureFieldInfo[];
    additionalMeasures: TMeasureFieldInfo[];
}

export interface ICategory {
    displayName: string;
    unifiedName: string;
}

export type TPrimitiveType = string | number | boolean | number[];

export type TGroupDataRow = Record<string, TPrimitiveType>;

export interface IData {
    groups: IVisualGroup[];
    categories: ICategory[];
    groupMapping: Map<TGroupId, TGroupDataRow[]>;
    minMaxMapping: Map<TGroupId, TMinMaxArray>;
}

export interface IVisualGroup {
    groupId: TGroupId;
    groupName: string;
    level: number;
    valueHandlers: number[];
    subGroups?: IVisualGroup[];
}

/**
 * Pipeline Order
 *  persist { groupMapping }(is aggregation is formed?)
 *  inversion (waterfall) { groupMapping }
 * ------
 *  calculated measures - (delPy)
 *  panel ranking (trellis) { groupMapping }
 *  ranking { groupMapping }
 *  sorting { groupMapping }
 *  waterfall start end calculation
 *  minMax (based on waterfall end value if chart type is waterfall)
 *  deviation
*/


// [
//     { AC: 23, PY: 24 } - Austarlia
// ]

// const avg = {
//     AC: [24],
//     PY: [-24],
//     dPY1: [2],
//     dPY2: [3],
// }

// const cfRows = [
//     { color: green},
//     { color: green}
// ]

// [
//     { AC: 24, PY:-24, delPY1: (AC-PY), delPY2: (PY-AC) },
//     { AC: 24, PY:-24, delPY1: (AC-PY), delPY2: (PY-AC) }
// ]


// [
//     { AC: 24, PY:-24, delPY1: (AC-PY), delPY2: (PY-AC), wAC: [20, 40] },
//     { AC: 24, PY:-24, delPY1: (AC-PY), delPY2: (PY-AC) }
// ]