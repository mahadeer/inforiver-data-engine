import { DataParser } from "./DataParser";
import { ESourceType } from "./models";
export class IRDataEngine {
    constructor(){
        const sourceType = ESourceType.NONE;
        this.props = {
            sourceType,
            rawData: null
        };
    }
    getPropsChanged(props) {
        const propsChanged = new Set();
        Object.keys(this.props).forEach((key)=>{
            if (Object.prototype.hasOwnProperty.call(props, key) && props[key] != null && this.props[key] !== props[key]) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                this.props[key] = props[key];
                propsChanged.add(key);
            }
        });
        return propsChanged;
    }
    execute(executeFunctions, propsChanged) {
        executeFunctions.forEach(([dependentProp, executeFunction])=>{
            if (propsChanged.has(dependentProp)) {
                executeFunction.call(this);
            }
        });
    }
    updateProps(props) {
        const propsChanged = this.getPropsChanged(props);
        this.execute([
            [
                'sourceType',
                this.onAdapterChange
            ],
            [
                'rawData',
                this.onRawDataChange
            ], 
        ], propsChanged);
    }
    getData() {
        return this.dataParser.dataset;
    }
    onAdapterChange() {
        this.dataParser = new DataParser().getSourceParser(this.props.sourceType);
    }
    onRawDataChange() {
        this.dataParser.updateData(this.props.rawData);
    }
}
