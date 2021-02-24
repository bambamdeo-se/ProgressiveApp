
$(document).ready(function () {
    window.setTimeout(function () {
        refreshReport();
    }, 1000);
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

function onDaysOutDataBound(e, days) {
    e.sender.value(days);
}

function getFilterParams() {

    return {
        daysOut: $("#daysOut").data("kendoDropDownList").value()
    }
}