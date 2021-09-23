import powerbi from "powerbi-visuals-api";
import { IVisualGroup } from "../../models";

// const getSanitizedString = (value: string) =>
// (typeof value === 'string' ?
//     value.replace(/[^A-Za-z0-9]/g, '~!~') :
//     value
// );

function getDefaultGroup(columnData: powerbi.DataViewMatrixNode[]): IVisualGroup[] {
    const valueHandlers = columnData.map((_, valueIndex: number) => {
        return valueIndex;
    });
    return [{
        groupId: 'NoGroup',
        groupName: '',
        valueHandlers,
        level: 0,
    }];
}

function getSingleVisualGroup(columnsData: powerbi.DataViewMatrixNode[]): IVisualGroup[] {
    let groupIndexOffset = 0;
    return columnsData.map((column: powerbi.DataViewMatrixNode) => {
        const valueHandlers = column.children.map((_, valueIndex: number) => {
            return valueIndex + groupIndexOffset;
        });
        groupIndexOffset += column.children.length;
        const columnValue = `${column.value}`;
        return {
            groupId: PowerBiUtils.getSanitizedString(columnValue),
            groupName: columnValue,
            valueHandlers,
            level: column.level
        };
    });
}

function getChildrenVisualGroup(
    parentKey: string,
    columnsData: powerbi.DataViewMatrixNode[],
    parentGroupOffset: number
): [IVisualGroup[], number] {
    let groupIndexOffset = parentGroupOffset;
    return [columnsData.map((column: powerbi.DataViewMatrixNode) => {
        const valueHandlers = column.children.map((_, valueIndex: number) => {
            return valueIndex + groupIndexOffset;
        });
        groupIndexOffset += column.children.length;
        const columnValue = `${column.value}`;
        return {
            groupId: PowerBiUtils.getSanitizedString(`${parentKey} ${columnValue}`),
            groupName: columnValue,
            valueHandlers,
            level: column.level
        };
    }), groupIndexOffset];
}

function getTwoVisualGroup(columnsData: powerbi.DataViewMatrixNode[]): IVisualGroup[] {
    let groupIndexOffset = 0;
    return columnsData.reduce((groups: IVisualGroup[], column: powerbi.DataViewMatrixNode) => {
        const columnValue = `${column.value}`;
        const [subGroups, completedGroupOffset] = getChildrenVisualGroup(
            columnValue,
            column.children,
            groupIndexOffset
        );
        groupIndexOffset = completedGroupOffset;
        groups.push({
            groupId: PowerBiUtils.getSanitizedString(columnValue),
            groupName: columnValue,
            valueHandlers: [],
            level: column.level,
            subGroups
        });
        return groups;
    }, []);
}

const sortOrder = ['AC', 'FC', 'PY', 'PL', 'AC1', 'AC2', 'AC3', 'AC4', 'AC5', 'TT'];

const PowerBiUtils = {
    getSortedRole: (firstKey, secondKey) => {
        if (sortOrder.includes(firstKey)) {
            return 1;
        }
        if (sortOrder.includes(secondKey)) {
            return -1;
        }
        return 0;
    },
    getSanitizedString: (value: string) => (typeof value === 'string' ? value.replace(/[^A-Za-z0-9]/g, '~!~') : value),
    getVisualGroup: (
        columnCount: number,
        columnData: powerbi.DataViewMatrixNode[]
    ): IVisualGroup[] => {
        switch (columnCount) {
            case 1:
                return getSingleVisualGroup(columnData);
            case 2:
                return getTwoVisualGroup(columnData);
            case 0:
            default:
                return getDefaultGroup(columnData);
        }
    }
};

export default PowerBiUtils;
