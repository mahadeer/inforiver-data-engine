import { DataParser } from "./DataParser";
import {
    TDataParaser,
    IRDataEngineProps,
    ESourceType,
    TPropsChanged,
    TExecuteFunction,
    IData
} from "./models";

export class IRDataEngine {

    protected dataParser: TDataParaser;

    private props: IRDataEngineProps;

    constructor() {
        const sourceType = ESourceType.NONE;
        this.props = {
            sourceType,
            rawData: null
        };
    }

    private getPropsChanged(props: IRDataEngineProps): TPropsChanged {
        const propsChanged: TPropsChanged = new Set<string>();
        Object.keys(this.props).forEach((key: string) => {
            if (
                Object.prototype.hasOwnProperty.call(props, key) &&
                props[key] != null &&
                this.props[key] !== props[key]
            ) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                this.props[key] = props[key];
                propsChanged.add(key);
            }
        });
        return propsChanged;
    }

    private execute(executeFunctions: TExecuteFunction[], propsChanged: TPropsChanged) {
        executeFunctions.forEach(([dependentProp, executeFunction]) => {
            if (propsChanged.has(dependentProp)) {
                executeFunction.call(this);
            }
        });
    }

    updateProps(props: IRDataEngineProps) {
        const propsChanged = this.getPropsChanged(props);
        this.execute([
            ['sourceType', this.onAdapterChange],
            ['rawData', this.onRawDataChange],
        ], propsChanged);
    }

    getData(): IData {
        return this.dataParser.dataset;
    }

    private onAdapterChange() {
        this.dataParser = new DataParser().getSourceParser(this.props.sourceType);
    }

    private onRawDataChange() {
        this.dataParser.updateData(this.props.rawData);
    }
}