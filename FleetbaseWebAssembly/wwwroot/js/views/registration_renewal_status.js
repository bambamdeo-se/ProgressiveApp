
$(document).ready(function () {
    window.setTimeout(function () { refreshReport(); }, 1000);
});

$(document)
    .ajaxStart(function () {
        $(".loading").show();
    })
    .ajaxStop(function () {
        $(".loading").hide();
    });

function refreshReport() {
    $("#resultGrid").data("kendoGrid").dataSource.read();
    return false;
}

function onRegStatusIdDataBound(e, status, expDate) {

    var dateParts = expDate.split("_");
    $("#expirationDate").data("kendoDatePicker").value(kendo.parseDate(dateParts[0] + "/1/" + dateParts[1]));

    switch (status) {
        case "Complete":
            e.sender.value(1);
            break;
        case "Open":
            e.sender.value(2);
            break;
        case "Pending Submission":
            e.sender.value(3);
            break;
        case "Pending Receipt":
            e.sender.value(4);
            break;
        case "Pending Distribution":
            e.sender.value(5);
            break;
    }
}

function getFilterParams() {

    var expDate = $("#expirationDate").data("kendoDatePicker").value();

    return {
        expYear: expDate.getFullYear()
        , expMonth: expDate.getMonth() + 1 // zero-based
        , status: $("#regStatusId").data("kendoDropDownList").value()
    }
}
