function onIFTAFuelItemGridEdit(e) {

    $("a.k-grid-update").html("<i class=\"fa fa-check\"></i>");
    $("a.k-grid-cancel").html("<i class=\"fa fa-ban\"></i>");
    $(".k-grid-content .k-grid-update, .k-grid-content .k-grid-cancel").removeClass("k-button k-button-icontext");

    e.container.find('[data-container-for="Reason"]').prop('disabled', true);
    $('input[name="TrxDisplayDate"]').on('change', function (e) {

        var date = e.target.value;
        if (date.length > 8 && date.includes('/')) {
            var values = date.split('/');
            date = values[0] + values[1] + values[2];
        }
        if (date.length == 4 || date.length == 6 || date.length == 8) {
            var currenttime = new Date();
            var day;
            var mon;
            var year;
            if (date.length == 4) {
                day = date.substring(2, 4);
                mon = date.substring(0, 2);
                year = currenttime.getFullYear();
            }
            if (date.length == 6) {
                day = date.substring(2, 4);
                mon = date.substring(0, 2);
                year = "20" + date.substring(4, 6);
            }
            if (date.length == 8) {
                day = date.substring(2, 4);
                mon = date.substring(0, 2);
                year = date.substring(4, 8);
            }
            if (isNaN(day) && isNaN(mon) && isNaN(year)) {
                notify("error", "Invalid Date Format");
                e.target.value = "";
                e.target.focus();
                return false;
            } else {
                var isNumericDate = mon + '' + day + '' + year;
                if (isNaN(isNumericDate)) {
                    notify("error", "Not a valid Date");
                    e.target.value = "";
                    e.target.focus();
                    return false;
                    flag = 1;
                } else {
                    if ((day > 31) || (mon > 12)) {
                        notify("error", "Not a valid Date");
                        e.target.value = "";
                        e.target.focus();
                        return false;
                        flag = 1;
                    } else if (day <= 0 || mon <= 0) {
                        notify("error", "Not a valid Date");
                        e.target.value = "";
                        e.target.focus();
                        return false;
                    } else {
                        var IsValidDate = validateEndOfMonth(mon, day, year);
                        if (!IsValidDate) {
                            notify("error", "Not a valid Date");
                            e.target.value = "";
                            e.target.focus();
                            return false;
                        }

                        e.target.value = mon + '/' + day + '/' + year;
                    }
                }

            }
        }

        else {

            notify("error", "Invalid Date Format");
            e.target.value = "";
            e.target.focus();
            return false;
        }


    });
}
function onIFTAFuelItemGridCancel(e) {
    //// hack - so delete, up & dn button icons don't disappear on cancel
    var grid = $("#IFTAFuelTransactionGrid").data("kendoGrid");
    grid.dataSource.read();
}
function onIFTAFuelByUnitQuarterError(e) {


}
function onIFTAFuelByUnitQuarterRequestEnd(e) {

    if (e.type == "update") {
        var grid = $("#IFTAFuelTransactionGrid").data("kendoGrid");
        grid.dataSource.read();
    }
}
// on change event for Quarter dropdown
function FilterFuelDetailAsPerQuarter(e) {
    var quarter = e.sender.element.val();
    var Promise = SaveSelectedQuarterInfo(quarter);
    Promise.then(function () {
        var grid = $("#IFTAFuelTransactionGrid").data("kendoGrid");
        if (grid) {
            grid.dataSource.read();
        }
    });
}
function DataBoundForFuelQuarter(e) {
    var quarterdropdownlist = $("#Quarter").data("kendoDropDownList");
    var quarterData = quarterdropdownlist.dataSource._data;
    $.each(quarterData, function (index, value) {
        if (value.Selected) {
            quarterdropdownlist.select(index);
        }
    });
    var grid = $("#IFTAFuelTransactionGrid").data("kendoGrid");
    if (grid) {
        grid.dataSource.read();
    }
}


function SaveFuelDetailData(sender) {
    var flag = 0;
    if ($("#PurchaseQty").val() == "") {
        $("#PurchaseQty").parents('div.col-md-8').find('span.error').text("Required");
        flag = 1;
    }
    else {
        var qty = $("#PurchaseQty").val();
        if (isNaN(qty)) {
            $("#PurchaseQty").parents('div.col-md-8').find('span.error').text("Invalid Purchase Quantity");
            flag = 1;
        } else {
            if (qty == 0) {
                $("#PurchaseQty").parents('div.col-md-8').find('span.error').text("Zero Purchase Quantity");
                flag = 1;
            } else {
                $("#PurchaseQty").parents('div.col-md-8').find('span.error').text("")
            }
            if (qty < 0) {
                $("#PurchaseQty").parents('div.col-md-8').find('span.error').text("Negative Purchase Quantity");
                flag = 1;
            }
        }
    }

    var Jurisdiction = $("#JurisdictionId").data("kendoDropDownList").text();
    if (Jurisdiction == "--Select One--") {
        $("#JurisdictionId").parents('div.col-md-6').find('span.error').text("Required");
        flag = 1;
    } else {
        $("#JurisdictionId").parents('div.col-md-6').find('span.error').text("")
    }
    var Fuel_FuelClassId = $("#FuelClassId").data("kendoDropDownList").text();
    if (Fuel_FuelClassId == "--Select One--") {
        $("#FuelClassId").parents('div.col-md-6').find('span.error').text("Required");
        flag = 1;
    } else {
        $("#FuelClassId").parents('div.col-md-6').find('span.error').text("");
    }
    if (flag == 1) {
        return false;
    }
    $.ajaxExt({
        url: '/Unit/CreateFuel',
        type: 'POST',
        showErrorMessage: false,
        validate: false,
        formToPost: $('#FuelEntryForm'),
        showThrobber: false,
        throbberCenter: true,
        containFiles: true,
        success: function (data, msg) {
            notify("success", msg);
            $("#lightbox_overlay").hide();
            var grid = $("#IFTAFuelTransactionGrid").data("kendoGrid");
            if (grid) {
                grid.dataSource.read();
            }
            CloseFuelPopUp();
        },

        successServerError: function (data) {
            notify("error", data.Message);
            $("#lightbox_overlay").hide();
        }
    });
    return false;
}