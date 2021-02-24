
$(document).ready(function () {    
    window.setTimeout(function () { refresh(); }, 1000);
});

$(document)
    .ajaxStart(function () {
        $(".loading").show();
    })
    .ajaxStop(function () {
        $(".loading").hide();
    });

function refreshReport(parm1, parm1Id) {
    $("#resultGrid").data("kendoGrid").dataSource.read();

    if (parm1Id == "null") {
        switch (parm1) {
            case "WidgetUnitMake":
                $("#resultGrid").data("kendoGrid").dataSource.filter({ field: "Make", operator: "isnull", value: "" });
                break;
            case "WidgetUnitType":
            case "WidgetUnitTypeInactive":
                $("#resultGrid").data("kendoGrid").dataSource.filter({ field: "UnitType", operator: "isnull", value: "" });
                break;
        }
    }

    return false;
}

function onStatusDataBound(e, param1, id) {
    switch (param1) {
        case "WidgetUnitStatus":
            switch (id) {
                case "Active":
                    e.sender.value("true");
                    break;
                default:
                    e.sender.value("false");
                    break;
            }
            break;
        case "BPRRegistrationCounts":
        case "IRPRegistrationCounts":
        case "WidgetUnitMake":
        case "WidgetUnitType":
            e.sender.value("true");
            break;
        case "WidgetUnitTypeInactive":
            e.sender.value("false");
            break;
    }
}

function onRegTypeDataBound(e, param1) {
    switch (param1) {
        case "BPRRegistrationCounts":
            e.sender.value(1);
            break;
        case "IRPRegistrationCounts":
            e.sender.value(2);
            break;
    }
}

function onRsnIdDataBound(e, param1, id) {
    switch (param1) {
        case "WidgetUnitStatus":
            switch (id) {
                case "Active":
                case "Inactive":
                    e.sender.value(null);
                    break;
                default:
                    e.sender.value(param1Id);
                    break;
            }
            break;
    }
}

function onUnitTypeIdDataBound(e, param1, param1Id) {
    switch (param1) {
        case "WidgetUnitType":
        case "WidgetUnitTypeInactive":
            switch (param1Id) {
                case "null":
                    e.sender.value(null);
                    break;
                default:
                    e.sender.value(param1Id);
                    break;
            }
            break;
    }
}

function onMakeIdDataBound(e, param1, param1Id) {
    switch (param1) {
        case "WidgetUnitMake":
            switch (param1Id) {
                case "null":
                    e.sender.value(null);
                    break;
                default:
                    e.sender.value(param1Id);
                    break;
            }
            break;
    }
}

function onRegStatusIdDataBound(e, param1, param1Id) {
    switch (param1) {
        case "IRPRegistrationCounts":
        case "BPRRegistrationCounts":
            e.sender.value(param1Id);
            break;
    }
}

function getFilterParams() {
    return {
        rtnActive: $("#status").data("kendoDropDownList").value()
        , rsnId: $("#rsnId").data("kendoDropDownList").value()
        , makeId: $("#makeId").data("kendoDropDownList").value()
        , unitTypeId: $("#unitTypeId").data("kendoDropDownList").value()
        , regTypeId: $("#regType").data("kendoDropDownList").value()
        , regStatusId: $("#regStatusId").data("kendoDropDownList").value()
    }
}
