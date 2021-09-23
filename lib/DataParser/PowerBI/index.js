import visualRowEventHandler from "../../common/VisualRowEventHandler";
import { ERoleType, EMeasureRole } from '../../models';
import PowerBiUtils from './utils';
export class PowerBIDataParser {
    /* getters */ get metadata() {
        if (this._metadata === null) {
            throw new Error("No dataset provided");
        }
        return this._metadata;
    }
    get dataset() {
        if (this._dataset === null) {
            throw new Error("No dataset provided");
        }
        return this._dataset;
    }
    constructor(){
        this.initConfig();
    }
    initConfig() {
        this.powerBiData = null;
        this._metadata = {
            rows: [],
            columns: [],
            measures: [],
            roles: [],
            visualMeasures: [],
            additionalMeasures: []
        };
        this._dataset = null;
    }
    updateData(rawData) {
        this.initConfig();
        this.powerBiData = rawData;
        this.updateMetadata();
        this._dataset = {
            groups: [],
            categories: [],
            groupMapping: new Map(),
            minMaxMapping: new Map()
        };
        this.gatherDataGroups();
        this.collectDatarows();
    }
    updateMetadata() {
        const powerBiData = this.powerBiData;
        const hasMeasures = powerBiData.matrix.valueSources.length > 0;
        const hasGroups = hasMeasures ? powerBiData.matrix.columns.levels.length > 1 : false;
        const hasRows = powerBiData.matrix.rows.levels.length > 0;
        hasMeasures && this.collectMeasures(powerBiData.matrix.valueSources);
        hasGroups && this.collectGroups(powerBiData.matrix.columns.levels.slice(0, powerBiData.matrix.columns.levels.length - 1));
        hasRows && this.collectRows(powerBiData.matrix.rows.levels[0].sources[0]);
    }
    collectMeasures(measureColumns) {
        let hasActualMeasure = false;
        let actualMeasureCount = 1;
        const prevPushedRoles = new Map();
        measureColumns.forEach((measureColumn)=>{
            const fieldName = measureColumn.queryName.replace('Sum(', '').slice(0, -1);
            const displayName = measureColumn.displayName;
            let role = 'dummy';
            let isAdditionalMeasure = false;
            const measureRoles = Object.keys(measureColumn.roles).map((roleKey)=>{
                let roleType = EMeasureRole[roleKey];
                if (roleKey === ERoleType.AC && hasActualMeasure) {
                    roleType = `AC${actualMeasureCount}`;
                    actualMeasureCount++;
                } else if (roleKey === ERoleType.AC && !hasActualMeasure) {
                    hasActualMeasure = true;
                }
                return roleType;
            });
            measureRoles.sort(PowerBiUtils.getSortedRole);
            measureRoles.forEach((roleType)=>{
                if (role === 'dummy') {
                    let prevRoleCount = prevPushedRoles.get(roleType);
                    if (prevRoleCount === undefined) {
                        prevPushedRoles.set(roleType, 0);
                        prevRoleCount = prevPushedRoles.get(roleType);
                    }
                    if (prevRoleCount === 0) {
                        role = roleType;
                        if (roleType !== 'TT') {
                            prevPushedRoles.set(roleType, 1);
                        }
                        isAdditionalMeasure = roleType === 'TT' || role.match(/[0-9]/g) !== null;
                    }
                }
            });
            this._metadata.roles.push(role);
            if (isAdditionalMeasure) {
                this._metadata.additionalMeasures.push({
                    displayName,
                    fieldName,
                    role
                });
            } else {
                this._metadata.measures.push({
                    displayName,
                    fieldName,
                    role
                });
            }
        });
    }
    collectGroups(groupColumns) {
        groupColumns.map((groupColumn, level)=>{
            const columnMeta = groupColumn.sources[0];
            const fieldName = columnMeta.queryName.replace('Sum(', '').slice(0, -1);
            const displayName = columnMeta.displayName;
            this._metadata.columns.push({
                displayName,
                fieldName,
                level
            });
        });
    }
    collectRows(rowColumn) {
        const fieldName = rowColumn.queryName.replace('Sum(', '').slice(0, -1);
        const displayName = rowColumn.displayName;
        this._metadata.rows.push({
            displayName,
            fieldName
        });
    }
    gatherDataGroups() {
        const columnsCount = this._metadata.columns.length;
        const groups = PowerBiUtils.getVisualGroup(columnsCount, this.powerBiData.matrix.columns.root.children);
        this._dataset.groups = groups;
    }
    collectDatarows() {
        const hasRows = this._metadata.rows.length > 0;
        const groups = this._dataset.groups;
        if (hasRows) {
            const powerbiRows = this.powerBiData.matrix.rows.root.children;
            for(let rowIndex = 0; rowIndex < powerbiRows.length; rowIndex += 1){
                const row = powerbiRows[rowIndex];
                const displayName = `${row.value}`;
                const rowId = PowerBiUtils.getSanitizedString(displayName);
                this._dataset.categories.push({
                    displayName,
                    unifiedName: rowId
                });
                for(let gIndex = 0; gIndex < groups.length; gIndex += 1){
                    const group = groups[gIndex];
                    if (group.subGroups && group.subGroups.length > 0) {
                        for(let subGroupIndex = 0; subGroupIndex < group.subGroups.length; subGroupIndex += 1){
                            const subGroup = group.subGroups[subGroupIndex];
                            this.collectGroupRows(rowId, subGroup, row, rowIndex);
                        }
                    } else {
                        this.collectGroupRows(rowId, group, row, rowIndex);
                    }
                }
            }
        }
    }
    collectGroupRows(rowId, group, row, rowIndex) {
        let groupDataRows = this._dataset.groupMapping.get(group.groupId);
        if (!groupDataRows) {
            groupDataRows = [];
        }
        let dataRow = {
            rowId
        };
        group.valueHandlers.forEach((valueIndex, roleIndex)=>{
            dataRow[this._metadata.roles[roleIndex]] = row.values[valueIndex].value;
        });
        const rowHandlerCount = visualRowEventHandler.getHandlerCount();
        for(let handlerIndex = 0; handlerIndex < rowHandlerCount; handlerIndex += 1){
            const rowHandler = visualRowEventHandler.getHandler(handlerIndex);
            dataRow = rowHandler(rowId, dataRow, rowIndex, group);
        }
        groupDataRows.push(dataRow);
        this._dataset.groupMapping.set(group.groupId, groupDataRows);
    }
}
