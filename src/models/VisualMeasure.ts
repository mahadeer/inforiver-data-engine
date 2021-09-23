// measure fields type base structure
export type TMeasureFields = 'AC' | 'AC1' | 'AC2' | 'AC3' | 'AC4' | 'AC5' | 'FC' | 'PY' | 'PL' | 'Ø' | 'dummy';

export type TCalculatedVarianceMeasureFields = 'ΔAC' | 'ΔFC' | 'ΔPY' | 'ΔPL' | 'ΔØ'; // all possible measure values has been added (AC / FC might also have variance and veriance percentage in future)

export type TCalculatedVariancePercentageMeasureFields = 'ΔAC%' | 'ΔFC%' | 'ΔPY%' | 'ΔPL%' | 'ΔØ%'; // all possible measure values has been added (AC / FC might also have variance and veriance percentage in future)

export type TMeasureRoles =
    | TMeasureFields
    | TCalculatedVarianceMeasureFields
    | TCalculatedVariancePercentageMeasureFields;

export enum Operation {
    IND = 'IND', // Index
    ADD = 'ADD', // Addition
    SUB = 'SUB', // Subtraction
    MUL = 'MUL', // Multiplication
    DIV = 'DIV', // Division
    PCT = 'PCT', // Percentage
    FXP = 'FXP', // Formula Expression
    PCB = 'PCB', // Percent Contribution to Grand Total
    PCBP = 'PCBP', // Percent Contribution to Parent
    RTL = 'RTL', // Running Total
    VAS = 'VAS', // Vertical Analysis
    STA = 'STA', // Static column
}

export enum EMEASURE_TYPE {
    ACTUAL = 'ACTUAL',
    REF = 'REF',
    NULL = 'NULL',
    ABSOLUTE_VARIANCE = 'ABSOLUTE_VARIANCE',
    RELATIVE_VARIANCE = 'RELATIVE_VARIANCE',
    ADDITIONAL_ACTUAL = 'ADDITIONAL_ACTUAL',
}

export interface IRawMeasureConfig {
    id: TMeasureRoles;
    label: string;
    operation?: Operation;
    formulaType?: EMEASURE_TYPE;
    measureBasedLabel?: string;
    calcMeasures?: string[];
}

export type TVisualMeasureConfig = Partial<{ [key in TMeasureRoles]: IRawMeasureConfig[] }>;
