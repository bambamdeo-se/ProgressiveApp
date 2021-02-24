var totalFleetRecordsInOneColumns = 17;
function placeholder(element) {
    return element.clone().addClass("placeholder");
}

function hint(element) {
    return element.clone().addClass("hint")
        .height(element.height())
        .width(element.width());
}

var setMajorUnit = true;

function onFleetMPGChartDataBound(e, chartId) {
    var view = e.sender.dataSource.view();
    $("#" + chartId).parent(".chartContainer").find(".chartOverlay").toggle(view.length === 0);
}

function onIRPIFTASeriesClick(e, widget, contextId) {
    e.preventDefault();
    var field = e.series.field;

    switch (widget) {
        case "WidgetReportingNonReportingIRP":
            if (field == 'NonReportingCount') {
                var status = e.dataItem.NonReportingStatus ? '1' : '0';
				window.location.href = "/VehicleServices/Report/UnitList/" + contextId + "/" + widget + "/" + e.dataItem.PeriodMonth + "/" + e.dataItem.PeriodYear + "/" + status;
                //window.location.href = "/VehicleServices/Report/UnitDetails/" + contextId + "/" + e.dataItem.PeriodMonth + "_" + e.dataItem.PeriodYear + "/" + widget + "/" + status;

            } else {
                var status = e.dataItem.ReportingStatus ? '1' : '0';
				window.location.href = "/VehicleServices/Report/UnitList/" + contextId + "/" + widget + "/" + e.dataItem.PeriodMonth + "/" + e.dataItem.PeriodYear + "/" + status;
                //window.location.href = "/VehicleServices/Report/UnitDetails/" + contextId + "/" + e.dataItem.PeriodMonth + "_" + e.dataItem.PeriodYear + "/" + widget + "/" + status;
            }
            break;
        case "WidgetReportingNonReportingIFTA":
            if (field == 'NonReportingCount') {
                var status = e.dataItem.NonReportingStatus ? '1' : '0';
				window.location.href = "/VehicleServices/Report/UnitList/" + contextId + "/" + widget + "/" + e.dataItem.PeriodMonth + "/" + e.dataItem.PeriodYear + "/" + status;
                //window.location.href = "/VehicleServices/Report/UnitDetails/" + contextId + "/" + e.dataItem.PeriodMonth + "_" + e.dataItem.PeriodYear + "/" + widget + "/" + status;

            } else {
                var status = e.dataItem.ReportingStatus ? '1' : '0';
				window.location.href = "/VehicleServices/Report/UnitList/" + contextId + "/" + widget + "/" + e.dataItem.PeriodMonth + "/" + e.dataItem.PeriodYear + "/" + status;
                //window.location.href = "/VehicleServices/Report/UnitDetails/" + contextId + "/" + e.dataItem.PeriodMonth + "_" + e.dataItem.PeriodYear + "/" + widget + "/" + status;
            }
            break;
        default:
            window.location.href = "/VehicleServices/Report/UnitDetail/" + contextId + "/" + e.category + "/" + widget + "/" + e.dataItem.ParmId;
            break;
    }
}
function onFleetMPGSeriesClick(e, widget, contextId) {
    e.preventDefault();
    switch (widget) {
        case "WidgetFmtrMPG":
            if (e.dataItem.ParmId)
                window.location.href = "/VehicleServices/Report/UnitInventory/" + contextId;
            break;
        default:
            window.location.href = "/VehicleServices/Report/UnitDetail/" + contextId + "/" + e.category + "/" + widget + "/" + e.dataItem.ParmId;
            break;
    }
}

function onReportingNonReportingChartDataBound(e, chartId) {
    var view = e.sender.dataSource.view();
    $("#" + chartId).parent(".chartContainer").find(".chartOverlay").toggle(view.length === 0);
}

function onInterStateVsIntraStateChartDataBound(e, chartId) {
    var view = e.sender.dataSource.view();
    $("#" + chartId).parent(".chartContainer").find(".chartOverlay").toggle(view.length === 0);
}

function onChartDataBound(e, chartId) {
    var view = e.sender.dataSource.view();
    $("#" + chartId).parent(".chartContainer").find(".chartOverlay").toggle(view.length === 0);


    if (chartId == "WidgetFleetBreakdown") {
        var width = e.sender.element.width();
        var totalFleetRecords = e.sender.dataSource._data;
        var FleetRecordCount = totalFleetRecords.length;
        var widthToSet = (252 + 11); // i.e div width plus margin
        var FleetBreakdownDivWidth = 252;
        while (FleetRecordCount >= totalFleetRecordsInOneColumns) {
            FleetRecordCount = FleetRecordCount - totalFleetRecordsInOneColumns;
            FleetBreakdownDivWidth = FleetBreakdownDivWidth + widthToSet;
        }
        if (FleetRecordCount > 0) {
            FleetBreakdownDivWidth = FleetBreakdownDivWidth + widthToSet;
        }
        if (FleetBreakdownDivWidth == 0) {
            FleetBreakdownDivWidth = 252;
        }
        var finalDivWidthForFleetBreakdown = FleetBreakdownDivWidth + "px";
        $('div.WidgetFleetBreakdown').css('width', finalDivWidthForFleetBreakdown);
    }

    if (chartId == "BPRRenewalStatusWidget" ||
        chartId == "WidgetRegistration90Days" ||
        chartId == "DotExpirationStatusWidget" ||
        chartId == "WidgetReportingNonReportingIFTA" ||
        chartId == "WidgetReportingNonReportingIRP") {

        // *** Bar Chars (stacked and unstacked) - Major Unit ***
        // The majorUnit of the axis controls the increment value. Here we set
        // this value after the data is available based on the maximum value 
        // return per category to insure we never get a fraction axis (e.g. 1.5)

        if (setMajorUnit) {
            setMajorUnit = false;

            var maxCount = 0;
            var data = e.sender.dataSource.data();
            var categories = [];
            var sumOfValues = [];
            var found;
            var categoryIndex;

            // init sum values for each category at zero
            for (var i = 0; i < data.length; i++) {
                sumOfValues.push(0);
            }

            for (var i = 0; i < data.length; i++) {
                if (chartId == "BPRRenewalStatusWidget") {

                    // if category does not yet exist in array then add it
                    found = $.inArray(data[i].ExpirationMonth, categories);
                    if (found == -1) { categories.push(data[i].ExpirationMonth); }

                    // get the index of the current category
                    categoryIndex = $.inArray(data[i].ExpirationMonth, categories);

                    // add the current value to the running total (sum)
                    sumOfValues[categoryIndex] += data[i].CountRows;

                    // check if current sum is the highest one yet
                    if (sumOfValues[categoryIndex] > maxCount) { maxCount = sumOfValues[categoryIndex] }

                } else if (chartId == "DotExpirationStatusWidget") {

                    // if category does not yet exist in array then add it
                    found = $.inArray(data[i].ExpirationMonth, categories);
                    if (found == -1) { categories.push(data[i].ExpirationMonth); }

                    // get the index of the current category
                    categoryIndex = $.inArray(data[i].ExpirationMonth, categories);

                    // add the current value to the running total (sum)
                    sumOfValues[categoryIndex] += data[i].CountRows;

                    // check if current sum is the highest one yet
                    if (sumOfValues[categoryIndex] > maxCount) { maxCount = sumOfValues[categoryIndex] }

                } else if (chartId == "WidgetRegistration90Days") {

                    // if category does not yet exist in array then add it
                    found = $.inArray(data[i].Label, categories);
                    if (found == -1) { categories.push(data[i].Label); }

                    // get the index of the current category
                    categoryIndex = $.inArray(data[i].Label, categories);

                    // add the current value to the running total (sum)
                    sumOfValues[categoryIndex] += data[i].Value;

                    // check if current sum is the highest one yet
                    if (sumOfValues[categoryIndex] > maxCount) { maxCount = sumOfValues[categoryIndex] }

                }
                // else if (chartId == "WidgetReportingNonReportingIRP") {
                // // if category does not yet exist in array then add it
                // found = $.inArray(data[i].PeriodMonth, categories);
                // if (found == -1) { categories.push(data[i].PeriodMonth); }

                // // get the index of the current category
                // categoryIndex = $.inArray(data[i].PeriodMonth, categories);

                // // add the current value to the running total (sum)
                // sumOfValues[categoryIndex] += data[i].Count;

                // // check if current sum is the highest one yet
                // if (sumOfValues[categoryIndex] > maxCount) { maxCount = sumOfValues[categoryIndex] }

                // }
                // else if (chartId == "WidgetReportingNonReportingIFTA") {
                // // if category does not yet exist in array then add it
                // found = $.inArray(data[i].PeriodMonth, categories);
                // if (found == -1) { categories.push(data[i].PeriodMonth); }

                // // get the index of the current category
                // categoryIndex = $.inArray(data[i].PeriodMonth, categories);

                // // add the current value to the running total (sum)
                // sumOfValues[categoryIndex] += data[i].Count;

                // // check if current sum is the highest one yet
                // if (sumOfValues[categoryIndex] > maxCount) { maxCount = sumOfValues[categoryIndex] }

                // }
            }

            if (maxCount < 10) {
                e.sender.setOptions({ valueAxis: [{ majorUnit: 1 }] });
            } else if (maxCount < 50) {
                e.sender.setOptions({ valueAxis: [{ majorUnit: 5 }] });
            } else if (maxCount < 100) {
                e.sender.setOptions({ valueAxis: [{ majorUnit: 10 }] });
            } else if (maxCount < 2000) {
                e.sender.setOptions({ valueAxis: [{ majorUnit: 200 }] });
            }

            setMajorUnit = true;
        }
    }
}

function loadWidgets(widgets, column, i, contextId) {

    var widgetsArr = widgets.split(",");

    $.post("/Home/Widget_Load/" + contextId, {
        widget: widgetsArr[i]
    }
        , function (html) {
            //$("#column-" + column).append(html);
            $("#WidgetRows").append(html);
            var chart = $("#" + widgetsArr[i]).data("kendoChart");
            if (chart != undefined) { chart.dataSource.read(); }
            i++;
            if (i < widgetsArr.length) {
                loadWidgets(widgets, column, i, contextId);
            }
        });
}

function onSeriesClick(e, widget, contextId) {
    e.preventDefault();
    switch (widget) {
        case "WidgetRegistration90Days":
            window.location.href = "/VehicleServices/Report/UpcomingRenewals/" + contextId + "/" + e.category + "/" + widget + "/" + e.dataItem.ParmId;
            break;
        case "BPRRenewalStatusWidget":
            window.location.href = "/VehicleServices/Report/RegistrationRenewalStatus/" + contextId + "/" + e.dataItem.ExpirationMonth + "_" + e.dataItem.ExpirationYear + "/" + widget + "/" + e.dataItem.RenewalStatus;
            break;
        case "DotExpirationStatusWidget":
            window.location.href = "/VehicleServices/Report/DotExpirationDetail/" + contextId + "/" + e.dataItem.ExpirationMonth + "_" + e.dataItem.ExpirationYear + "/" + widget + "/" + e.dataItem.RenewalStatus;
            break;
        case "WidgetUnitInvalidVin":
            window.location.href = "/VehicleServices/Report/InvalidVins/" + contextId + "/" + e.category + "/" + widget + "/" + e.dataItem.ParmId;
            break;
        case "WidgetFleetBreakdown":
            window.location.href = "/VehicleServices/Report/FleetBreakdown/" + contextId + "/" + e.dataItem.ParmId;
            break;
        case "WidgetFmtrTaxType":
            window.location.href = "/VehicleServices/Report/UnitList/" + contextId + "/" + widget;
            break;
        case "WidgetFmtrReporting":
            if (e.dataItem.ParmId)
                window.location.href = "/VehicleServices/Report/UnitInventory/" + contextId;
            break;
        case "WidgetFmtrMPG":
            if (e.dataItem.ParmId)
                window.location.href = "/VehicleServices/Report/UnitInventory/" + contextId;
            break;
        case "WidgetReportingNonReportingIRP":
            //window.location.href = "/VehicleServices/Report/RegistrationRenewalStatus/" + contextId + "/" + e.dataItem.ExpirationMonth + "_" + e.dataItem.ExpirationYear + "/" + widget + "/" + e.dataItem.RenewalStatus;
            break;
        case "WidgetReportingNonReportingIFTA":
            //window.location.href = "/VehicleServices/Report/RegistrationRenewalStatus/" + contextId + "/" + e.dataItem.ExpirationMonth + "_" + e.dataItem.ExpirationYear + "/" + widget + "/" + e.dataItem.RenewalStatus;
            break;
        case 'WidgetInterstateVsIntraState':
            window.location.href = "/VehicleServices/Report/UnitList/" + contextId + "/" + widget + "/" + e.dataItem.PeriodMonth + "/" + e.dataItem.PeriodYear;
            break;
        default:
            //window.location.href = "/VehicleServices/Report/UnitDetail/" + contextId + "/" + e.category + "/" + widget + "/" + e.dataItem.ParmId;
            window.location.href = "/VehicleServices/Report/UnitDetail/" + contextId + "/" + e.category + "/" + widget + "/" + e.dataItem.ParmId;
            break;
    }
    //alert(kendo.format("Series click :: {0} ({1}): {2} {3}", e.series.name, e.category, e.value, e.dataItem.ParmId));
}

function onAxisLabelClick(e) {
    e.preventDefault();
    //alert(kendo.format("Axis label click :: {0} axis : {1}", e.axis.type, e.text));
}

function onPlotAreaClick(e) {
    e.preventDefault();
    //alert(kendo.format("Plot area click :: {0} : {1:N0}", e.category, e.value));
}

function onLegendItemHover(e, widget, contextId) {

    switch (widget) {
        case "WidgetFmtrTaxType":
            if (e.pointIndex) {
                if (!e.series.data[e.pointIndex].ParmId) {
                    $("#WidgetFmtrTaxType").css("cursor", "default");
                    $("#WidgetFmtrTaxType path").css("cursor", "default");
                }
            }
            if (e.dataItem) {
                if (!e.dataItem.ParmId) {
                    $("#WidgetFmtrTaxType").css("cursor", "default");
                    $("#WidgetFmtrTaxType path").css("cursor", "default");
                }
            }
            break;
        case "WidgetFmtrReporting":
            if (e.pointIndex) {
                if (!e.series.data[e.pointIndex].ParmId) {
                    $("#WidgetFmtrReporting").css("cursor", "default");
                    $("#WidgetFmtrReporting path").css("cursor", "default");
                }
            }
            if (e.dataItem) {
                if (!e.dataItem.ParmId) {
                    $("#WidgetFmtrReporting").css("cursor", "default");
                    $("#WidgetFmtrReporting path").css("cursor", "default");
                }
            }
            break;
        case "WidgetFmtrMPG":
            if (e.pointIndex) {
                if (!e.series.data[e.pointIndex].ParmId) {
                    $("#WidgetFmtrMPG").css("cursor", "default");
                    $("#WidgetFmtrMPG path").css("cursor", "default");
                }
            }
            if (e.dataItem) {
                if (!e.dataItem.ParmId) {
                    $("#WidgetFmtrMPG").css("cursor", "default");
                    $("#WidgetFmtrMPG path").css("cursor", "default");
                }
            }
            break;
    }
}
function onSeriesItemHover(e, widget, contextId) {

    switch (widget) {
        case "WidgetFmtrTaxType":
            if (e.pointIndex) {
                if (!e.series.data[e.pointIndex].ParmId) {
                    $("#WidgetFmtrTaxType").css("cursor", "default");
                    $("#WidgetFmtrTaxType path").css("cursor", "default");
                }
            }
            if (e.dataItem) {
                if (!e.dataItem.ParmId) {
                    $("#WidgetFmtrTaxType").css("cursor", "default");
                    $("#WidgetFmtrTaxType path").css("cursor", "default");
                }
            }
            break;
        case "WidgetFmtrReporting":
            if (e.pointIndex) {
                if (!e.series.data[e.pointIndex].ParmId) {
                    $("#WidgetFmtrReporting").css("cursor", "default");
                    $("#WidgetFmtrReporting path").css("cursor", "default");
                }
            }
            if (e.dataItem) {
                if (!e.dataItem.ParmId) {
                    $("#WidgetFmtrReporting").css("cursor", "default");
                    $("#WidgetFmtrReporting path").css("cursor", "default");
                }
            }
            break;
        case "WidgetFmtrMPG":
            if (e.pointIndex) {
                if (!e.series.data[e.pointIndex].ParmId) {
                    $("#WidgetFmtrMPG").css("cursor", "default");
                    $("#WidgetFmtrMPG path").css("cursor", "default");
                }
            }
            if (e.dataItem) {
                if (!e.dataItem.ParmId) {
                    $("#WidgetFmtrMPG").css("cursor", "default");
                    $("#WidgetFmtrMPG path").css("cursor", "default");
                }
            }
            break;
    }
}

function onLegendItemClick(e, widget, contextId) {
    e.preventDefault();
    switch (widget) {
        case "WidgetUnitInvalidVin":
            window.location.href = "/VehicleServices/Report/InvalidVins/" + contextId + "/" + e.text + "/" + widget + "/" + e.series.data[e.pointIndex].ParmId;
            break;
        case "WidgetFleetBreakdown":
            window.location.href = "/VehicleServices/Report/FleetBreakdown/" + contextId + "/" + e.series.data[e.pointIndex].ParmId;
            break;
        case "WidgetFmtrTaxType":

            if (e.series.data[e.pointIndex].ParmId)
                window.location.href = "/VehicleServices/Report/UnitInventory/" + contextId;
            break;
        case "WidgetFmtrReporting":
            if (e.series.data[e.pointIndex].ParmId)
                window.location.href = "/VehicleServices/Report/UnitInventory/" + contextId;
            break;
        case "WidgetFmtrMPG":
            if (e.series.data[e.pointIndex].ParmId)
                window.location.href = "/VehicleServices/Report/UnitInventory/" + contextId;
            break;
        default:
            window.location.href = "/VehicleServices/Report/UnitDetail/" + contextId + "/" + e.text + "/" + widget + "/" + e.series.data[e.pointIndex].ParmId;
            break;
    }
    //alert(kendo.format("Legend item click :: {0} {1}", e.text, e.series.data[e.pointIndex].ParmId));
}
function GetArrayOfSortedWidget(content) {
    var contentArray = $.parseHTML(content);
    var sortedArray = new Array();
    $.each(contentArray, function (index, element) {

        if (element.tagName) {
            if (element.tagName === 'DIV') {
                if ($('.' + element.className).css('display') != 'none')
                    sortedArray.push(element.className);
            }
        }
    });
    return sortedArray;
}
function onWidgetChange() {
    // persist widget location via a cookie
    for (var i = 1; i < 5; i++) {
        var column = i.toString();
        var ids = [];
        $("#column-" + column + " .chartContainer").find("div[id]").each(function () {
            ids.push(this.id);
        });
        Cookies.set("widgets" + column, ids.join(), { expires: 365, path: "/" });
    }

    var content = $("#WidgetRows").getKendoSortable().element[0].innerHTML;
    var sortedArray = GetArrayOfSortedWidget(content);
    SortWidgets(sortedArray);
    //SortWidgets(content);
    //localStorage.setItem("WidgetRows", content);
}

function SortWidgets(sortedArray) {
    var postData = { sortWidget: sortedArray };
    $.ajax({
        url: '/Home/SaveWidgetSortingPos',
        type: 'POST',
        data: postData,
        success: function (resp) {
            //console.log(resp.Status);
        }
    });
}

function refreshVSAlert(alertName) {
    $.ajax({
        url: '/Home/GetVSAlertList',
        type: 'POST',
        success: function (resp) {
            $("#VSAlertList").html('');
            $("#VSAlertList").html(resp.Object);
        }
    });
}

function getIndexOfWidget(actualWidgetArray, className) {
    for (var i = 0; i < actualWidgetArray.length; i++) {
        if (actualWidgetArray[i]) {
            if (actualWidgetArray[i].className === className) {
                return i;
            }
        }
    }
    return -1;
}

function GetSortedWidgetsToDisplay() {
    $.ajax({
        url: '/Home/GetSortedWidgetsToDisplay',
        type: 'POST',
        success: function (resp) {
            if (resp.Results2) {
                if (resp.Results2.length > 2) {
                    //$("#WidgetRows").html(resp.Object);
                    var actualWidgetArray = $("div#WidgetRows > div");
                    for (var i = 0; i < resp.Results2.length; i++) {
                        //var indexOFelement = $('div.' + resp.Results2[i]).index();
                        var indexOFelement = getIndexOfWidget(actualWidgetArray, resp.Results2[i]);
                        if (indexOFelement != -1) {
                            var temp = actualWidgetArray[i];
                            actualWidgetArray[i] = actualWidgetArray[indexOFelement];
                            actualWidgetArray[indexOFelement] = temp;
                        }
                    }
                    $("div#WidgetRows").html(actualWidgetArray);
                }
            }
            if (resp.Results) {
                var IncludedList = resp.Results;
                $.each(IncludedList, function (index, value) {
                    if (value) {
                        if (value != "WidgetAlerts" && value != "WidgetUnitInvalidVin") {
                            var chart = $("#" + value).data("kendoChart");
                            if (chart) // if chart exist then only perform read operation on it
                                chart.dataSource.read();
                            else
                                $('div.' + value).hide();

                        }
                    }
                });

            }
            $("#WidgetRows").show();
            $("#ExcludedWidgetList").data("kendoDropDownList").dataSource.read();
            kendo.resize($(".widget-row"));
        }
    });
}

//function SortWidgets(content) {
//    $.ajax({
//        url: '/Home/SaveWidgetSortingPos',
//        type: 'POST',
//        data: { widgetDivsHtml: content },
//        success: function (resp) {
//            console.log(resp.Status);
//        }
//    });
//}

function loadInvalidVinWidget(contextId) {
    $.post("/Home/WidgetUnitInvalidVin_Read/" + contextId, {
        widget: "WidgetUnitInvalidVin"
    }
        , function (data) {
            var gauge = $("#WidgetUnitInvalidVin").data("kendoRadialGauge");
            var total = parseInt(data);
            if (gauge) {
                gauge.options.scale.max = total + 50;
                gauge.value(total);
                gauge.redraw();
                $("#WidgetUnitInvalidVin").parent(".chartContainer").find(".chartOverlay").toggle(total === 0);
                $("#invalidVinDetails").attr("href", "/VehicleServices/Report/InvalidVins/" + contextId);

                $("#WidgetUnitInvalidVin").on("click", function () {
                    window.location.href = "/VehicleServices/Report/InvalidVins/" + contextId;
                });

            }
        });
}

// adds total count ot BPR and IRP Registration Counts widget - high overhead
//$.post("/Home/BPRRegistrationSum_Read", {
//    ContextId: "@ViewContext.RouteData.Values["ContextId"]"
//}
//            , function (data) {
//                var sum1 = data;
//                var chart1 = $("#BPRRegistrationCounts").data("kendoChart");
//                chart1.options.title.text = addCommas(sum1) + " Total";
//                chart1.dataSource.read();
//            });

//$.post("/Home/IRPRegistrationSum_Read", {
//    ContextId: "@ViewContext.RouteData.Values["ContextId"]"
//}
//, function (data) {
//    var sum2 = data;
//    var chart2 = $("#IRPRegistrationCounts").data("kendoChart");
//    chart2.options.title.text = addCommas(sum2) + " Total";
//    chart2.dataSource.read();
//});