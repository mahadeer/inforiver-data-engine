import { IVisualGroup, TGroupDataRow, TPrimitiveType } from "../models/DataProvider";

export type TExtendedDataRow = Record<string, TPrimitiveType>;

export type THandlerFunction = (
    rowId: string,
    dataRow: TGroupDataRow,
    rowIndex: number,
    group: IVisualGroup
) => TExtendedDataRow;

class VisualRowEventHandler {
    private handlerKeys: string[];
    private rowHandlers: THandlerFunction[];

    constructor() {
        this.handlerKeys = [];
        this.rowHandlers = [];
    }

    attachHandler(handlerKey: string, handlerFunction: THandlerFunction) {
        const handlerIndex = this.handlerKeys.indexOf(handlerKey);
        if (handlerIndex === -1) {
            this.handlerKeys.push(handlerKey);
            this.rowHandlers.push(handlerFunction);
        } else {
            this.rowHandlers[handlerIndex] = handlerFunction;
        }
    }

    getHandlerCount() {
        return this.rowHandlers.length;
    }

    getHandler(handlerIndex: number) {
        return this.rowHandlers[handlerIndex];
    }
}

const visualRowEventHandler = new VisualRowEventHandler();

export default visualRowEventHandler;


visualRowEventHandler.attachHandler('dummyAgeValue', (
    rowId: string,
    dataRow: TGroupDataRow,
    rowIndex: number,
    group: IVisualGroup
) => {
    // console.log(rowId, rowIndex, dataRow, group);
    return { ...dataRow, age: Math.ceil(Math.random() * 100) }
})