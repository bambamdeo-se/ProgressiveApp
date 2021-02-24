
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
        case "Expired":
            e.sender.value(1);
            break;
    }
}

function getFilterParams() {

    var expDate = $("#expirationDate").data("kendoDatePicker").value();
    return {
          expYear: 2019
        , expMonth: expDate.getMonth() + 1
        , status: 1
    }
}
