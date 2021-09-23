class VisualRowEventHandler {
    constructor(){
        this.handlerKeys = [];
        this.rowHandlers = [];
    }
    attachHandler(handlerKey, handlerFunction) {
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
    getHandler(handlerIndex) {
        return this.rowHandlers[handlerIndex];
    }
}
const visualRowEventHandler = new VisualRowEventHandler();
export default visualRowEventHandler;
visualRowEventHandler.attachHandler('dummyAgeValue', (rowId, dataRow, rowIndex, group)=>{
    // console.log(rowId, rowIndex, dataRow, group);
    return {
        ...dataRow,
        age: Math.ceil(Math.random() * 100)
    };
});
