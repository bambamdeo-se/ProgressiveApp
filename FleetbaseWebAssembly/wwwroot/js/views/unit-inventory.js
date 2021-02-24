
$(document)
    .ajaxStart(function () {
        $(".loading").show();
    })
    .ajaxStop(function () {
        $(".loading").hide();
    });

function getFilterParams() {
    return { status: $("#status").data("kendoDropDownList").value(), regType: $("#regType").data("kendoDropDownList").value() }
}

function refreshReport() {
    $("#resultGrid").data("kendoGrid").dataSource.read();
}

function openCompanyWin() {
    $("#companyTreeWin").data("kendoWindow").open().center(); // popup company tree
    var tree = $('#companyTreeView').data('kendoTreeView');
    tree.dataSource.read();
}

function onCompanyWinTreeSelect(e) { // popup company tree
    $("#TenantName").text(this.text(e.node));
    $("#TenantName").append("&nbsp;&nbsp;<a class=\"btn btn-sm\" href=\"#\" onClick=\"openCompanyWin()\"><i class=\"fa fa-pencil\"></i></a>");
    $("#TenantId").val(this.dataItem(e.node).id);
}