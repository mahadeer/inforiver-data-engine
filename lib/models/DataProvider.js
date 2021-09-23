export var ERoleType;
(function(ERoleType) {
    ERoleType["ROW"] = 'category';
    ERoleType["COLUMN"] = 'group';
    ERoleType["AC"] = 'ameasure';
    ERoleType["PY"] = 'pymeasure';
    ERoleType["PL"] = 'plmeasure';
    ERoleType["FC"] = 'fcmeasure';
    ERoleType["TT"] = 'tmeasure';
})(ERoleType || (ERoleType = {
}));
export var EMeasureRole;
(function(EMeasureRole) {
    EMeasureRole['ameasure'] = 'AC';
    EMeasureRole['pymeasure'] = 'PY';
    EMeasureRole['plmeasure'] = 'PL';
    EMeasureRole['fcmeasure'] = 'FC';
    EMeasureRole['tmeasure'] = 'TT';
})(EMeasureRole || (EMeasureRole = {
}));
