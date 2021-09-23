// const getSanitizedString = (value: string) =>
// (typeof value === 'string' ?
//     value.replace(/[^A-Za-z0-9]/g, '~!~') :
//     value
// );
function getDefaultGroup(columnData) {
    const valueHandlers = columnData.map((_, valueIndex)=>{
        return valueIndex;
    });
    return [
        {
            groupId: 'NoGroup',
            groupName: '',
            valueHandlers,
            level: 0
        }
    ];
}
function getSingleVisualGroup(columnsData) {
    let groupIndexOffset = 0;
    return columnsData.map((column)=>{
        const valueHandlers = column.children.map((_, valueIndex)=>{
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
function getChildrenVisualGroup(parentKey, columnsData, parentGroupOffset) {
    let groupIndexOffset = parentGroupOffset;
    return [
        columnsData.map((column)=>{
            const valueHandlers = column.children.map((_, valueIndex)=>{
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
        }),
        groupIndexOffset
    ];
}
function getTwoVisualGroup(columnsData) {
    let groupIndexOffset = 0;
    return columnsData.reduce((groups, column)=>{
        const columnValue = `${column.value}`;
        const [subGroups, completedGroupOffset] = getChildrenVisualGroup(columnValue, column.children, groupIndexOffset);
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
const sortOrder = [
    'AC',
    'FC',
    'PY',
    'PL',
    'AC1',
    'AC2',
    'AC3',
    'AC4',
    'AC5',
    'TT'
];
const PowerBiUtils = {
    getSortedRole: (firstKey, secondKey)=>{
        if (sortOrder.includes(firstKey)) {
            return 1;
        }
        if (sortOrder.includes(secondKey)) {
            return -1;
        }
        return 0;
    },
    getSanitizedString: (value)=>typeof value === 'string' ? value.replace(/[^A-Za-z0-9]/g, '~!~') : value
    ,
    getVisualGroup: (columnCount, columnData)=>{
        switch(columnCount){
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
