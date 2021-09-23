import { EMEASURE_TYPE, Operation } from "../models/VisualMeasure";
const visualMeasureConfig = {
    AC: [
        {
            id: 'PY',
            label: `PY`,
            operation: Operation.IND,
            formulaType: EMEASURE_TYPE.REF
        },
        {
            id: 'PL',
            label: `[PL]`,
            operation: Operation.IND,
            formulaType: EMEASURE_TYPE.REF
        },
        {
            id: 'FC',
            label: `[FC]`,
            operation: Operation.IND,
            formulaType: EMEASURE_TYPE.NULL
        },
        {
            id: 'AC',
            label: `[AC]`,
            operation: Operation.IND,
            formulaType: EMEASURE_TYPE.ACTUAL
        },
        {
            id: 'ΔPY',
            measureBasedLabel: `[AC] - [PY]`,
            label: 'ΔPY',
            operation: Operation.SUB,
            calcMeasures: [
                'AC',
                'PY'
            ],
            formulaType: EMEASURE_TYPE.ABSOLUTE_VARIANCE
        },
        {
            id: 'ΔPY%',
            measureBasedLabel: `([AC] - [PY])%`,
            label: `ΔPY%`,
            operation: Operation.PCT,
            calcMeasures: [
                'AC',
                'PY'
            ],
            formulaType: EMEASURE_TYPE.RELATIVE_VARIANCE
        },
        {
            id: 'ΔPL',
            measureBasedLabel: `[AC] - [PL]`,
            label: 'ΔPL',
            operation: Operation.SUB,
            calcMeasures: [
                'AC',
                'PL'
            ],
            formulaType: EMEASURE_TYPE.ABSOLUTE_VARIANCE
        },
        {
            id: 'ΔPL%',
            measureBasedLabel: `([AC] - [PL])%`,
            label: 'ΔPL%',
            operation: Operation.PCT,
            calcMeasures: [
                'ΔPL',
                'PL'
            ],
            formulaType: EMEASURE_TYPE.RELATIVE_VARIANCE
        },
        {
            id: 'Δ\xd8',
            measureBasedLabel: `[AC] - [Ø]`,
            label: 'Δ\xd8',
            operation: Operation.SUB,
            calcMeasures: [
                'AC',
                '\xd8'
            ],
            formulaType: EMEASURE_TYPE.ABSOLUTE_VARIANCE
        },
        {
            id: 'Δ\xd8%',
            measureBasedLabel: `([AC] - [Ø])%`,
            label: 'Δ\xd8%',
            operation: Operation.PCT,
            calcMeasures: [
                'Δ\xd8',
                '\xd8'
            ],
            formulaType: EMEASURE_TYPE.RELATIVE_VARIANCE
        }, 
    ],
    FC: [
        {
            id: 'PY',
            label: `PY`,
            operation: Operation.IND,
            formulaType: EMEASURE_TYPE.REF
        },
        {
            id: 'PL',
            label: `[PL]`,
            operation: Operation.IND,
            formulaType: EMEASURE_TYPE.REF
        },
        {
            id: 'FC',
            label: `[FC]`,
            operation: Operation.IND,
            formulaType: EMEASURE_TYPE.ACTUAL
        },
        {
            id: 'ΔPL',
            measureBasedLabel: `[FC] - [PL]`,
            label: 'ΔPL',
            operation: Operation.SUB,
            calcMeasures: [
                'FC',
                'PL'
            ],
            formulaType: EMEASURE_TYPE.ABSOLUTE_VARIANCE
        },
        {
            id: 'ΔPL%',
            measureBasedLabel: `([FC] - [PL])%`,
            label: 'ΔPL%',
            operation: Operation.PCT,
            calcMeasures: [
                'FC',
                'PL'
            ],
            formulaType: EMEASURE_TYPE.RELATIVE_VARIANCE
        },
        {
            id: 'ΔPY',
            measureBasedLabel: `[FC] - [PY]`,
            label: 'ΔPY',
            operation: Operation.SUB,
            calcMeasures: [
                'FC',
                'PY'
            ],
            formulaType: EMEASURE_TYPE.ABSOLUTE_VARIANCE
        },
        {
            id: 'ΔPY%',
            measureBasedLabel: `([FC] - [PY])%`,
            label: 'ΔPY%',
            operation: Operation.PCT,
            calcMeasures: [
                'FC',
                'PY'
            ],
            formulaType: EMEASURE_TYPE.RELATIVE_VARIANCE
        },
        {
            id: 'Δ\xd8',
            measureBasedLabel: `[FC] - [Ø]`,
            label: 'Δ\xd8',
            operation: Operation.SUB,
            calcMeasures: [
                'FC',
                '\xd8'
            ],
            formulaType: EMEASURE_TYPE.ABSOLUTE_VARIANCE
        },
        {
            id: 'Δ\xd8%',
            measureBasedLabel: `([FC] - [Ø])%`,
            label: 'Δ\xd8%',
            operation: Operation.PCT,
            calcMeasures: [
                'Δ\xd8',
                '\xd8'
            ],
            formulaType: EMEASURE_TYPE.RELATIVE_VARIANCE
        }, 
    ],
    PY: [
        {
            id: 'PY',
            label: `[PY]`,
            operation: Operation.IND,
            formulaType: EMEASURE_TYPE.ACTUAL
        },
        {
            id: 'PL',
            label: `[PL]`,
            operation: Operation.IND,
            formulaType: EMEASURE_TYPE.REF
        },
        {
            id: 'ΔPL',
            measureBasedLabel: `[PY] - [PL]`,
            label: 'ΔPL',
            operation: Operation.SUB,
            calcMeasures: [
                'PY',
                'PL'
            ],
            formulaType: EMEASURE_TYPE.ABSOLUTE_VARIANCE
        },
        {
            id: 'ΔPL%',
            measureBasedLabel: `([PY] - [PL])%`,
            label: 'ΔPL%',
            operation: Operation.PCT,
            calcMeasures: [
                'PY',
                'PL'
            ],
            formulaType: EMEASURE_TYPE.RELATIVE_VARIANCE
        },
        {
            id: 'Δ\xd8',
            measureBasedLabel: `[PY] - [Ø]`,
            label: 'Δ\xd8',
            operation: Operation.SUB,
            calcMeasures: [
                'PY',
                '\xd8'
            ],
            formulaType: EMEASURE_TYPE.ABSOLUTE_VARIANCE
        },
        {
            id: 'Δ\xd8%',
            measureBasedLabel: `([PY] - [Ø])%`,
            label: 'Δ\xd8%',
            operation: Operation.PCT,
            calcMeasures: [
                'Δ\xd8',
                '\xd8'
            ],
            formulaType: EMEASURE_TYPE.RELATIVE_VARIANCE
        }, 
    ],
    PL: [
        {
            id: 'PL',
            label: `[PL]`,
            operation: Operation.IND,
            formulaType: EMEASURE_TYPE.ACTUAL
        },
        {
            id: 'Δ\xd8',
            measureBasedLabel: `[PL] - [Ø]`,
            label: 'Δ\xd8',
            operation: Operation.SUB,
            calcMeasures: [
                'PL',
                '\xd8'
            ],
            formulaType: EMEASURE_TYPE.ABSOLUTE_VARIANCE
        },
        {
            id: 'Δ\xd8%',
            measureBasedLabel: `([PL] - [Ø])%`,
            label: 'Δ\xd8%',
            operation: Operation.PCT,
            calcMeasures: [
                'Δ\xd8',
                '\xd8'
            ],
            formulaType: EMEASURE_TYPE.RELATIVE_VARIANCE
        }, 
    ]
};
export const getVisualMeasureConfig = (measureKey)=>{
    return visualMeasureConfig[measureKey];
};
