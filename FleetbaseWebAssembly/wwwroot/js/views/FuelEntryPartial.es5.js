'use strict';

function AddFuelRow(e) {

    var JurisdictionInput = e.target;
    var RowId = e.target.parentElement.parentElement.attributes[0].value;
    ValidateJurisdictionBeforeAddRow(JurisdictionInput, RowId).then(function (IsValidJurisdiction) {
        if (!IsValidJurisdiction) {
            e.preventDefault();
            return false;
        }
        AddRowForFuel(e, RowId);
    });
}

function AddRowForFuel(e, RowId) {
    var FuelDetailModelList = JSON.stringify({
        'FuelList': GetFuelDetailList(e.target)
    });

    var details = {
        fuelDetailModelList: FuelDetailModelList
    };
    $.ajax({
        url: '/Trip/AddNewFuelRow',
        data: { tripDetailPopupInfo: FuelDetailModelList },
        type: 'POST',
        success: function success(data, msg) {
            $('#FuelDetailTable').html(data.Object);
            var name = e.currentTarget.name;
            if (name) {
                if (name.match("Jurisdiction$")) {
                    $('input[name="FuelList[' + RowId + '].UserTrxDate"]').focus();
                } else if (name.match("UserTrxDate$")) {
                    $('input[name="FuelList[' + RowId + '].PurchaseQty"]').focus();
                } else if (name.match("PurchaseQty$")) {
                    $('input[name="FuelList[' + RowId + '].FuelClassName"]').focus();
                } else if (name.match("FuelClassName$")) {
                    $('input[name="FuelList[' + RowId + '].NonReceipted"]').focus();
                } else if (name.match("NonReceipted$")) {
                    $('input[name="FuelList[' + RowId + '].SiteName"]').focus();
                } else if (name.match("SiteName$")) {
                    $('input[name="FuelList[' + RowId + '].SiteCity"]').focus();
                } else if (name.match("SiteCity$")) {
                    $('input[name="FuelList[' + RowId + '].TrxNbr"]').focus();
                } else if (name.match("TrxNbr$")) {
                    $('input[name="FuelList[' + RowId + '].PurchasePrice"]').focus();
                } else if (name.match("PurchasePrice$")) {
                    var row = RowId + 1;
                    $('input[name="FuelList[' + row + '].Jurisdiction"]').focus();
                }
            }
        },
        error: function error(msg) {}
    });
    return false;
}

function DeleteFuel(e, RowNum) {

    var jsonData = JSON.stringify({
        'RowNo': RowNum,
        'fuelList': GetFuelDetailList(e)
    });

    $.ajax({
        url: '/Trip/DeleteFuelDetail',
        data: { tripDetailPopupInfo: jsonData },
        type: 'POST',
        success: function success(data, msg) {
            $('#FuelDetailTable').html(data.Object);
        },
        error: function error(msg) {}
    });
    return false;
}

function GetListOfFuelDetail() {
    var fuelDetail = [];
    var unitId = $("#_NewTrip #Unit").val();

    var table = $('table#FuelTable').clone();

    //set the values of input box
    $(table).find('input').each(function () {
        $(this).attr('value', $(this).val());
    });

    //set the values tru or false for each checkbox
    $(table).find('input[type="checkbox"]').each(function () {
        if ($(this).is(":checked")) {
            $(this).attr("checked", "checked");
            $(this).val(true);
        } else {
            $(this).removeAttr("checked");
            $(this).val(false);
        }
    });

    var totalData = table.find('tbody#FuelData tr').length;

    for (var i = 0; i < totalData; i++) {
        fuelDetail.push({
            'Jurisdiction': table.find('tbody#FuelData input[name="FuelList[' + i + '].Jurisdiction"]').val(),
            'JurisdictionId': table.find('tbody#FuelData input[name="FuelList[' + i + '].JurisdictionId"]').val(),
            'TrxDate': table.find('tbody#FuelData input[name="FuelList[' + i + '].TrxDate"]').val(),
            'PurchaseQty': table.find('tbody#FuelData input[name="FuelList[' + i + '].PurchaseQty"]').val(),
            'FuelClassName': table.find('tbody#FuelData input[name="FuelList[' + i + '].FuelClassName"]').val(),
            'FuelClassId': table.find('tbody#FuelData input[name="FuelList[' + i + '].FuelClassId"]').val(),
            'NonReceipted': table.find('tbody#FuelData input[name="FuelList[' + i + '].NonReceipted"]').val(),
            'SiteName': table.find('tbody#FuelData input[name="FuelList[' + i + '].SiteName"]').val(),
            'SiteCity': table.find('tbody#FuelData input[name="FuelList[' + i + '].SiteCity"]').val(),
            'TrxNbr': table.find('tbody#FuelData input[name="FuelList[' + i + '].TrxNbr"]').val(),
            'PurchasePrice': table.find('tbody#FuelData input[name="FuelList[' + i + '].PurchasePrice"]').val(),
            'UnitId': unitId
        });
    }
    return fuelDetail;
}

function GetFuelDetailList(e) {
    var fuelDetail = [];
    var unitId = $("#_NewTrip #Unit").val();

    var table = $(e).parents('table').clone();

    //set the values of input box
    $(table).find('input').each(function () {
        $(this).attr('value', $(this).val());
    });

    //set the values tru or false for each checkbox
    $(table).find('input[type="checkbox"]').each(function () {
        if ($(this).is(":checked")) {
            $(this).attr("checked", "checked");
            $(this).val(true);
        } else {
            $(this).removeAttr("checked");
            $(this).val(false);
        }
    });

    var totalData = table.find('tbody#FuelData tr').length;

    for (var i = 0; i < totalData; i++) {
        fuelDetail.push({
            'Jurisdiction': table.find('tbody#FuelData input[name="FuelList[' + i + '].Jurisdiction"]').val(),
            'JurisdictionId': table.find('tbody#FuelData input[name="FuelList[' + i + '].JurisdictionId"]').val(),
            'TrxDate': table.find('tbody#FuelData input[name="FuelList[' + i + '].TrxDate"]').val(),
            'PurchaseQty': table.find('tbody#FuelData input[name="FuelList[' + i + '].PurchaseQty"]').val(),
            'FuelClassName': table.find('tbody#FuelData input[name="FuelList[' + i + '].FuelClassName"]').val(),
            'FuelClassId': table.find('tbody#FuelData input[name="FuelList[' + i + '].FuelClassId"]').val(),
            'NonReceipted': table.find('tbody#FuelData input[name="FuelList[' + i + '].NonReceipted"]').val(),
            'SiteName': table.find('tbody#FuelData input[name="FuelList[' + i + '].SiteName"]').val(),
            'SiteCity': table.find('tbody#FuelData input[name="FuelList[' + i + '].SiteCity"]').val(),
            'TrxNbr': table.find('tbody#FuelData input[name="FuelList[' + i + '].TrxNbr"]').val(),
            'PurchasePrice': table.find('tbody#FuelData input[name="FuelList[' + i + '].PurchasePrice"]').val(),
            'UnitId': unitId
        });
    }
    return fuelDetail;
}

function ClearFuelCurrentRow(e, i) {
    $('tbody#FuelData input[name="FuelList[' + i + '].Jurisdiction"]').val("");
    $('tbody#FuelData input[name="FuelList[' + i + '].JurisdictionId"]').val("");
    $("tbody#FuelData span[id='FuelList[" + i + "].Jurisdiction']").html("");
    $('tbody#FuelData input[name="FuelList[' + i + '].UserTrxDate"]').val("");
    $("tbody#FuelData span[id='FuelList[" + i + "].UserTrxDate']").html("");
    $('tbody#FuelData input[name="FuelList[' + i + '].TrxDate"]').val("");
    $('tbody#FuelData input[name="FuelList[' + i + '].PurchaseQty"]').val("");
    $("tbody#FuelData span[id='FuelList[" + i + "].PurchaseQty']").html("");
    $('tbody#FuelData input[name="FuelList[' + i + '].FuelClassName"]').val("");
    $("tbody#FuelData span[id='FuelList[" + i + "].FuelClassName']").html("");
    $('tbody#FuelData input[name="FuelList[' + i + '].FuelClassId"]').val("");
    $('tbody#FuelData input[name="FuelList[' + i + '].SiteName"]').val("");
    $('tbody#FuelData input[name="FuelList[' + i + '].NonReceipted"]').prop("checked", false);
    $('tbody#FuelData input[name="FuelList[' + i + '].SiteCity"]').val("");
    $('tbody#FuelData input[name="FuelList[' + i + '].TrxNbr"]').val("");
    $('tbody#FuelData input[name="FuelList[' + i + '].PurchasePrice"]').val("");
    $("tbody#FuelData span[id='FuelList[" + i + "].PurchasePrice']").html("");
}

//verfiy trxdate
function VerifyTrxDate(e, rowNo) {

    var DisplayDate = e.value;
    if (DisplayDate === "") {
        //notify('error', 'Transaction date is must');
        $("tbody#FuelData span[id='FuelList[" + rowNo + "].UserTrxDate']").html("Transaction date is must");
        $("tbody#FuelData input[name='FuelList[" + rowNo + "].TrxDate']").val("");
        e.focus();
        return false;
    }
    if (DisplayDate.length > 8 && DisplayDate.includes('/')) {
        var values = DisplayDate.split('/');
        DisplayDate = values[0] + values[1] + values[2];
    }
    if (DisplayDate.length == 4 || DisplayDate.length == 6 || DisplayDate.length == 8) {
        var currenttime = new Date();
        var day;
        var mon;
        var year;
        if (DisplayDate.length == 4) {
            day = DisplayDate.substring(2, 4);
            mon = DisplayDate.substring(0, 2);
            year = currenttime.getFullYear();
        }
        if (DisplayDate.length == 6) {
            day = DisplayDate.substring(2, 4);
            mon = DisplayDate.substring(0, 2);
            year = "20" + DisplayDate.substring(4, 6);
        }
        if (DisplayDate.length == 8) {
            day = DisplayDate.substring(2, 4);
            mon = DisplayDate.substring(0, 2);
            year = DisplayDate.substring(4, 8);
        }
        if (isNaN(day) && isNaN(mon) && isNaN(year)) {
            //notify('error', 'Invalid Date Format');
            $("tbody#FuelData span[id='FuelList[" + rowNo + "].UserTrxDate']").html("Invalid Format");
            $("tbody#FuelData input[name='FuelList[" + rowNo + "].TrxDate']").val("");
            e.value = "";
            e.focus();
            flag = 1;
        } else {
            var isNumericDate = mon + '' + day + '' + year;
            if (isNaN(isNumericDate)) {
                $("tbody#FuelData input[name='FuelList[" + rowNo + "].TrxDate']").val("");
                //notify('error', "Not a valid Date");
                $("tbody#FuelData span[id='FuelList[" + rowNo + "].UserTrxDate']").html("Invalid Format");
                e.value = "";
                e.focus();
                flag = 1;
            } else {
                if (day > 31 || mon > 12) {
                    $("tbody#FuelData input[name='FuelList[" + rowNo + "].TrxDate']").val("");
                    //notify('error', "Not a valid Date");
                    $("tbody#FuelData span[id='FuelList[" + rowNo + "].UserTrxDate']").html("Invalid Format");
                    e.value = "";
                    e.focus();
                    flag = 1;
                } else if (day <= 0 || mon <= 0) {
                    $("tbody#FuelData input[name='FuelList[" + rowNo + "].TrxDate']").val(""); //hidden field empty
                    //notify('error', "Not a valid Date");
                    $("tbody#FuelData span[id='FuelList[" + rowNo + "].UserTrxDate']").html("Invalid Format");
                    e.value = "";
                    e.focus();
                } else {
                    var isFutureDate = hasFutureDate(mon, day, year);
                    if (isFutureDate) {
                        $("tbody#FuelData input[name='FuelList[" + rowNo + "].TrxDate']").val("");
                        $("tbody#FuelData span[id='FuelList[" + rowNo + "].UserTrxDate']").html("Can't be future date");
                        e.value = "";
                        e.focus();
                        return false;
                    }
                    e.value = mon + '/' + day + '/' + year;
                    $("tbody#FuelData input[name='FuelList[" + rowNo + "].TrxDate']").val(mon + '/' + day + '/' + year);
                    $("tbody#FuelData span[id='FuelList[" + rowNo + "].UserTrxDate']").html("");
                }
            }
        }
    } else {
        $("tbody#FuelData span[id='FuelList[" + rowNo + "].UserTrxDate']").html("Invalid Format");
        $("tbody#FuelData input[name='FuelList[" + rowNo + "].TrxDate']").val(mon + '/' + day + '/' + year);
        e.value = "";
        e.focus();
    }
}

function CheckQuantity(e, rowNo) {
    var PurchaseQty = e.value;
    if (PurchaseQty === "") {
        $("tbody#FuelData span[id='FuelList[" + rowNo + "].PurchaseQty']").html("*Required");
        $("tbody#FuelData span#FuelList[" + rowNo + "].PurchaseQty").val("* Required");
        e.focus();
        return false;
    }

    if (isNaN(PurchaseQty)) {
        //notify('error', 'Only Positive numbers are allowed');
        $("tbody#FuelData span[id='FuelList[" + rowNo + "].PurchaseQty']").html("Positive Numbers only");
        $("tbody#FuelData input[name='FuelList[" + rowNo + "].PurchaseQty']").val("");
        e.value = "";
        e.focus();
        return false;
    }

    PurchaseQty = parseFloat(parseFloat(PurchaseQty).toFixed(3));
    if (PurchaseQty < 0) {
        //notify('error', 'Only Positive numbers are allowed');
        $("tbody#FuelData span[id='FuelList[" + rowNo + "].PurchaseQty']").html("Positive Numbers only");
        $("tbody#FuelData input[name='FuelList[" + rowNo + "].PurchaseQty']").val("");
        e.value = "";
        e.focus();
        return false;
    } else {
        e.value = PurchaseQty;
        $("tbody#FuelData span[id='FuelList[" + rowNo + "].PurchaseQty']").html("");
    }
}

function CheckPrice(e, RowNo) {
    var PurchasePrice = e.value;
    if (PurchasePrice === "") {
        $("tbody#FuelData span[id='FuelList[" + RowNo + "].PurchasePrice']").html("");
        return;
    }
    if (isNaN(PurchasePrice)) {
        //notify('error', 'Only Positive numbers are allowed');
        $("tbody#FuelData span[id='FuelList[" + RowNo + "].PurchasePrice']").html("Positive Numbers only");
        $("tbody#FuelData input[name='FuelList[" + RowNo + "].PurchasePrice']").val("");
        e.value = "";
        e.focus();
        return false;
    }

    PurchasePrice = parseFloat(parseFloat(PurchasePrice).toFixed(2));
    if (PurchasePrice < 0) {
        $("tbody#FuelData input[name='FuelList[" + RowNo + "].PurchasePrice']").val("");
        $("tbody#FuelData span[id='FuelList[" + RowNo + "].PurchasePrice']").html("Positive Numbers only");
        e.value = "";
        e.focus();
        return false;
    } else {
        e.value = PurchasePrice;
        $("tbody#FuelData span[id='FuelList[" + RowNo + "].PurchasePrice']").html("");
    }
}

function CheckFuelClass(e, RowNo) {
    var val = e.value;
    if ($('#FuelClassList option').filter(function () {
        var listVal = this.value;
        return listVal === val;
    }).length) {
        alert(e.value);
    }
}

function ValidateFuelClass(e, RowNo) {
    var val = e.value;
    if (e.val == "") {
        $("tbody#FuelData input[name='FuelList[" + RowNo + "].FuelClassName']").val("");
        $("tbody#FuelData input[name='FuelList[" + RowNo + "].FuelClassId']").val("");
        $("tbody#FuelData span[id='FuelList[" + RowNo + "].FuelClassName']").html("*Required");
        //notify('error', 'Fuel Type Is must');
        e.value = "";
        e.focus();
        return false;
    }
    var FuelClassId = "";
    $.ajax({
        url: '/Trip/ValidFuelClass',
        data: { fuelClassCode: val },
        type: 'POST',
        success: function success(data, msg) {
            if (data.Success) {
                FuelClassId = data.FuelClassId;
                $("tbody#FuelData input[name='FuelList[" + RowNo + "].FuelClassName']").val(val.toUpperCase());
                $("tbody#FuelData input[name='FuelList[" + RowNo + "].FuelClassId']").val(FuelClassId);
                $("tbody#FuelData span[id='FuelList[" + RowNo + "].FuelClassName']").html("");
            } else {
                $("tbody#FuelData input[name='FuelList[" + RowNo + "].FuelClassName']").val("");
                $("tbody#FuelData input[name='FuelList[" + RowNo + "].FuelClassId']").val("");
                $("tbody#FuelData span[id='FuelList[" + RowNo + "].FuelClassName']").html("Enter valid fuel type");
                //notify('error', 'Please Enter Valid Fuel Type');
                e.value = "";
                e.focus();
                return false;
            }
        },
        error: function error(msg) {
            $("tbody#FuelData input[name='FuelList[" + RowNo + "].FuelClassName']").val("");
            $("tbody#FuelData input[name='FuelList[" + RowNo + "].FuelClassId']").val("");
            $("tbody#FuelData span[id='FuelList[" + RowNo + "].FuelClassName']").html("Enter valid fuel type");
            //notify('error', 'Please Enter Valid Fuel Type');
            e.value = "";
            e.focus();
            return false;
        }
    });

    return false;
}

function ValidateJurisdiction(e, RowNo) {
    var val = e.value;
    if (e.val == "") {
        $("tbody#FuelData input[name='FuelList[" + RowNo + "].Jurisdiction']").val("");
        $("tbody#FuelData input[name='FuelList[" + RowNo + "].JurisdictionId']").val("");
        $("tbody#FuelData span[id='FuelList[" + RowNo + "].Jurisdiction']").html("* Required");
        //notify('error', 'Jurisdiction Is must');
        e.value = "";
        e.focus();
        return false;
    }
    var JurisdictionId = "";
    $.ajax({
        url: '/Trip/ValidJurisdiction',
        data: { JurisdictionCode: val },
        type: 'POST',
        success: function success(data, msg) {
            if (data.Success) {
                JurisdictionId = data.JurisdictionId;
                $("tbody#FuelData input[name='FuelList[" + RowNo + "].Jurisdiction']").val(val.toUpperCase());
                $("tbody#FuelData input[name='FuelList[" + RowNo + "].JurisdictionId']").val(JurisdictionId);
                $("tbody#FuelData span[id='FuelList[" + RowNo + "].Jurisdiction']").html("Enter valid Jurisdiction");
            } else {
                $("tbody#FuelData input[name='FuelList[" + RowNo + "].Jurisdiction']").val("");
                $("tbody#FuelData input[name='FuelList[" + RowNo + "].JurisdictionId']").val("");
                $("tbody#FuelData span[id='FuelList[" + RowNo + "].Jurisdiction']").html("Enter valid Jurisdiction");
                //notify('error', 'Please Enter Valid Fuel Type');
                e.value = "";
                e.focus();
                return false;
            }
        },
        error: function error(msg) {
            $("tbody#FuelData input[name='FuelList[" + RowNo + "].Jurisdiction']").val("");
            $("tbody#FuelData input[name='FuelList[" + RowNo + "].JurisdictionId']").val("");
            $("tbody#FuelData span#FuelList[" + RowNo + "].Jurisdiction").val("Enter valid Jurisdiction");
            $("tbody#FuelData span[id='FuelList[" + RowNo + "].Jurisdiction']").html("Enter valid Jurisdiction");
            //notify('error', 'Please Enter Valid Fuel Type');
            e.value = "";
            e.focus();
            return false;
        }
    });

    return false;
}

function ValidateJurisdictionBeforeAddRow(e, RowNo) {
    var dfd = jQuery.Deferred();

    var val = e.value;
    if (e.val == "") {
        //notify('error', 'Jurisdiction Is must');
        $("tbody#FuelData input[name='FuelList[" + RowNo + "].Jurisdiction']").val("");
        $("tbody#FuelData input[name='FuelList[" + RowNo + "].JurisdictionId']").val("");
        $("tbody#FuelData span[id='FuelList[" + RowNo + "].Jurisdiction']").html("Required");
        e.value = "";
        e.focus();
        dfd.resolve(false);
    }
    var JurisdictionId = "";
    $.ajax({
        url: '/Trip/ValidJurisdiction',
        data: { JurisdictionCode: val },
        type: 'POST',
        success: function success(data, msg) {
            if (data.Success) {
                JurisdictionId = data.JurisdictionId;
                $("tbody#FuelData input[name='FuelList[" + RowNo + "].Jurisdiction']").val(val.toUpperCase());
                $("tbody#FuelData input[name='FuelList[" + RowNo + "].JurisdictionId']").val(JurisdictionId);
                $("tbody#FuelData span[id='FuelList[" + RowNo + "].Jurisdiction']").html("");
                dfd.resolve(true);
            } else {
                $("tbody#FuelData input[name='FuelList[" + RowNo + "].Jurisdiction']").val("");
                $("tbody#FuelData input[name='FuelList[" + RowNo + "].JurisdictionId']").val("");
                $("tbody#FuelData span[id='FuelList[" + RowNo + "].Jurisdiction']").html("Enter valid Jurisdiction");
                //notify('error', 'Please Enter Valid Fuel Type');
                e.value = "";
                e.focus();
                dfd.resolve(false);
            }
        },
        error: function error(msg) {
            $("tbody#FuelData input[name='FuelList[" + RowNo + "].Jurisdiction']").val("");
            $("tbody#FuelData input[name='FuelList[" + RowNo + "].JurisdictionId']").val("");
            $("tbody#FuelData span[id='FuelList[" + RowNo + "].Jurisdiction']").html("Enter valid Jurisdiction");
            //notify('error', 'Please Enter Valid Fuel Type');
            e.value = "";
            e.focus();
            dfd.resolve(false);
        }
    });
    return dfd.promise();
}

