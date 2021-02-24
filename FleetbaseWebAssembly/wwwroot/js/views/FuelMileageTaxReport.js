//_LoadReportParameters
function loadDomainData(contextId) {
    $.post("/ReportLauncher/Domain_Read", {
        ContextId: contextId
    }, function (data) {
        var DomainDropDown = $("#DomainId").data("kendoDropDownList");
        if (data[0].Name === "NECS") {
            //DomainDropDown.value(data[0].Id);
        } else {
            DomainDropDown.value(data[0].Id);
            DomainDropDown.enable(false);
        }

    });
}




function ValidateForm() {
    var dfd = jQuery.Deferred();
    var isValid = true;

    var reportId = $("#ReportId").data("kendoDropDownList").value();
    var reportSpn = $("#ReportId").parents('div.col-md-8').find('span.error');
    if (reportId === "") {
        reportSpn.text("Please select a report");
        isValid = false;
        dfd.resolve(isValid);
    }
    else
        reportSpn.text("");

    GetReportCode(reportId).then(function (reportCode) {
        if (reportCode === 'KYWTDIST' ||
            reportCode == "NMWTDIST" ||
            reportCode === "NYWTDIST" ||
            reportCode === "ORWTDIST" ||
            reportCode === "IFTA"
        ) {
            var taxAccountSelectedList = $('#SelectedTaxAccount').val();
            var BegDate = $("#BeginDate").val();
            var EndDate = $("#EndDate").val();
            var BegDateSpn = $("#BeginDate").parents('td').find('span.error');
            var EndDateSpn = $("#EndDate").parents('td').find('span.error');
            var SelectedTaxAccount = $("#SelectedTaxAccount").parents('td').find('span.error');
            if (taxAccountSelectedList == null) {
                SelectedTaxAccount.text('Select atleast one tax account');
                isValid = false;
            } else {
                SelectedTaxAccount.text('');
            }

            if (BegDate === "") {
                BegDateSpn.text("Begin Date is required");
                isValid = false;
            }
            else {
                if (!checkDate(BegDate)) {
                    BegDateSpn.text("Invalid Begin Date ");
                    isValid = false;
                } {
                    BegDateSpn.text("");
                }
            }

            if (EndDate === "") {
                EndDateSpn.text("End Date is required");
                isValid = false;
            }
            else {
                if (!checkDate(EndDate)) {
                    BegDateSpn.text("Invalid End Date");
                    isValid = false;
                } else {
                    EndDateSpn.text("");
                }
            }
        } else if (reportCode === "TRIPERR"
            || reportCode === "MPGREPORT"
            || reportCode === "MILESUMMARY"
            || reportCode === "STATEREPORT"
            || reportCode === "STATESUMMARY"
            || reportCode === "INTERSTATETRAVEL"
            || reportCode === "NONREPORTING"
            || reportCode === "GPSREPORTING"
            || reportCode === "FUELSUMMARY"
        ) {
            var BegDate = $("#BeginDate").val();
            var EndDate = $("#EndDate").val();
            var BegDateSpn = $("#BeginDate").parents('td').find('span.error');
            var EndDateSpn = $("#EndDate").parents('td').find('span.error');
            if (BegDate === "") {
                BegDateSpn.text("Begin Date is required");
                isValid = false;
            }
            else {
                if (!checkDate(BegDate)) {
                    BegDateSpn.text("Invalid Begin Date ");
                    isValid = false;
                } {
                    BegDateSpn.text("");
                }
            }

            if (EndDate === "") {
                EndDateSpn.text("End Date is required");
                isValid = false;
            }
            else {
                if (!checkDate(EndDate)) {
                    BegDateSpn.text("Invalid End Date");
                    isValid = false;
                } else {
                    EndDateSpn.text("");
                }
            }

        } else {
            notify("error", "Report has to be configured yet.");
            dfd.resolve(false);
        }
        dfd.resolve(isValid);
    });

    return dfd.promise();
}
function checkDate(date) {
    if (isNaN(Date.parse(date))) {
        return false;
    } 
    return true;
}
function returnFullDate(date,whichDate) {
    if (!checkDate(date)) {
        return null;
    } else {
        var fullDate = new Date(date);
        if (whichDate === "BeginDate")
            return (fullDate.getMonth() + 1) + "/" + fullDate.getDate() + "/" + fullDate.getFullYear();
        else {
            var mon = fullDate.getMonth();
            var year = fullDate.getFullYear();
            var d = new Date(year, mon + 1, 0);
            return (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
        }
    }
}

function ProceedToSave(sender, reportQueueModel) {
    $.ajax({
        url: '/ReportLauncher/LaunchReportQueue',
        data: { reportQueueDetails: reportQueueModel },
        type: 'POST',
        success: function (data, msg) {
            if (data.Success) {
                notify("success", "Data Successfully Saved");
                $.ClosePopupWindow();
                $('#lightbox_overlay1').remove();
            } else {
                notify("error", "Unable to save data");
                handleError(data.ErrorText)
            }
        },
        error: function (data) {
            notify("error", "Unable to save data");
            handleError(data.ErrorText)
        }
    });
}


function OnOutputFormatBound(e) {
    var DomainDropDown = $("#OutputFormatId").data("kendoDropDownList");
    DomainDropDown.value(1);
    DomainDropDown.enable(true);
}

function SetImmediateInScheduleDate() {
    var dateTimePicker = $("#ScheduleDateTimePicker").data("kendoDateTimePicker");
    dateTimePicker.enable(false);
    dateTimePicker.value("");
    $("input[name='ScheduleDate']").val(null);
    var ScheduleDateTimePicker = $("input[id='ScheduleDateTimePicker']");
    ScheduleDateTimePicker.parents().find('span.k-widget.k-datetimepicker.k-header').hide();
    $("input[id='ScheduleDateTimePicker']").hide();
}

function SetAndEnableScheduleDate() {
    var dateTimePicker = $("#ScheduleDateTimePicker").data("kendoDateTimePicker");
    dateTimePicker.enable(true);
    dateTimePicker.value(new Date());
    var selectedDate = dateTimePicker.value();
    $("input[name='ScheduleDate']").val(kendo.toString(selectedDate, "MM/dd/yyyy hh:mm tt"));
    var ScheduleDateTimePicker = $("input[id='ScheduleDateTimePicker']");
    ScheduleDateTimePicker.parents().find('span.k-widget.k-datetimepicker.k-header').show();
    $("input[id='ScheduleDateTimePicker']").show();
}

function OnScheduleDateTimeChange(e) {
    var dateTimePicker = $("#ScheduleDateTimePicker").data("kendoDateTimePicker");
    var selectedDate = dateTimePicker.value();
    $("input[name='ScheduleDate']").val(kendo.toString(selectedDate, "MM/dd/yyyy hh:mm tt"));
}

function getDomainSelected(e) {

    var domain = $("#DomainId").data("kendoDropDownList");
    var domainId = domain.value();
    var Report = $("#ReportId").data("kendoDropDownList");
    var reportId = Report.value();
    if (domainId === "") {
        domainId = 0;
    }
    return {
        DomainId: domainId,
        ReportId: reportId
    }
}

function ClearSumoSelectItem() {
    
    var taxAccountLength = $('select#SelectedTaxAccount')[0].length;
    for (var i = 0; i < taxAccountLength; i++) {
        $('select#SelectedTaxAccount')[0].remove(i);
    }
    var dateRangeLength = $('select#ListReportDating')[0].length;
    for (var i = 0; i < dateRangeLength; i++) {
        $('select#ListReportDating')[0].remove(i);
    }
    if ($("#SelectedTaxAccount")[0] != undefined) {
        if ($("#SelectedTaxAccount")[0].sumo != undefined) {
            $("#SelectedTaxAccount")[0].sumo.unload();
            $("#SelectedTaxAccount").removeClass('SumoUnder');
            $("#SelectedTaxAccount").val([]);
            $('#SelectedTaxAccount').SumoSelect({ placeholder: 'Select Tax Account', csvDispCount: 1 });
        }
        $("#SelectedTaxAccount").prop("disabled", "disabled");
    }

    if ($("#ListReportDating")[0] != undefined) {
        if ($("#ListReportDating")[0].sumo != undefined) {
            $("#ListReportDating")[0].sumo.unload();
            $("#ListReportDating").removeClass('SumoUnder');
            $("#ListReportDating").val('');
            $('#ListReportDating').SumoSelect({ placeholder: 'Select Date Range' });
        }
        $("#ListReportDating").prop("disabled", "disabled");
    }


    var BeginDate = $("#BeginDate").data("kendoDatePicker");
    BeginDate.value("");
    BeginDate.enable(true);
    var EndDate = $("#EndDate").data("kendoDatePicker");
    EndDate.value("");
    EndDate.enable(true);

    $('.FilterLct').show();
    $('.FilterUnit').show();
}

function ComputeBeginAndEndDate(e) {
    
    var selectedDateRangeValue = $('#ListReportDating').val();
    var BegDateSpn = $("#BeginDate").parents('td').find('span.error');
    var EndDateSpn = $("#EndDate").parents('td').find('span.error');
    if (selectedDateRangeValue) {
        $.ajaxExt({
            url: '/ReportLauncher/_GetBeginEndDate',
            type: 'POST',
            data: { SelectedReportingDate: selectedDateRangeValue, RunDate: null },
            success: function (data, msg) {
                var BeginDate = $("#BeginDate").data("kendoDatePicker");
                var EndDate = $("#EndDate").data("kendoDatePicker");
                
                if (data.Object != "") {
                    var DateDetail = data.Object.split(',');
                    if (DateDetail[0] == "" && DateDetail[1] == "") {
                        BeginDate.value("");
                        BeginDate.enable(true);
                        EndDate.value("");
                        EndDate.enable(true);

                    } else {
                        var BeginDateValue = GetDateInMonthYearFormat(DateDetail[0]);
                        var EndDateValue = GetDateInMonthYearFormat(DateDetail[1]);
                        BeginDate.value(BeginDateValue);
                        EndDate.value(EndDateValue);
                        if ($("#ListReportDating").val() == "0") {
                            BeginDate.enable(true);
                            EndDate.enable(true);
                        } else {
                            BeginDate.enable(false);
                            EndDate.enable(false);
                        }
                        
                    }
                } else {
                    BeginDate.value("");
                    BeginDate.enable(false);
                    EndDate.value("");
                    EndDate.enable(false);

                }
                BegDateSpn.text("");
                EndDateSpn.text("");
            }
        });
    }
}
function GetDateInMonthYearFormat(date) {
    var newDate = new Date(date);
    var monthString = "";
    var month = (newDate.getMonth() + 1), year = newDate.getFullYear();
    switch (month) {
        case 1:
            monthString = "January " + year;
            break;
        case 2:
            monthString = "February " + year;
            break;
        case 3:
            monthString = "March " + year;
            break;
        case 4:
            monthString = "April " + year;
            break;
        case 5:
            monthString = "May " + year;
            break;
        case 6:
            monthString = "June " + year;
            break;
        case 7:
            monthString = "July " + year;
            break;
        case 8:
            monthString = "August " + year;
            break;
        case 9:
            monthString = "September " + year;
            break;
        case 10:
            monthString = "October " + year;
            break;
        case 11:
            monthString = "November " + year;
            break;
        case 12:
            monthString = "December " + year;
            break;
    }

    return monthString;
        
}
function GetReportCode(ReportId) {
    var dfd = jQuery.Deferred();
    var moduleId = $("#ModuleId").val();
    $.ajaxExt({
        url: '/ReportLauncher/ReportData',
        type: 'POST',
        data: { ModuleId: moduleId, ReportID: ReportId },
        success: function (Data, msg) {
            dfd.resolve(Data.Object);
        },
        error: function (msg) {
            dfd.reject("");
        }

    });
    return dfd.promise();
}

function ReportSelect(e) {
    var Report = $("#ReportId").data("kendoDropDownList");
    var reportId = Report.value();
    var domain = $("#DomainId").data("kendoDropDownList");
    var domainId = domain.value();
    if (reportId != "")
        $("#ReportId").parents('div.col-md-8').find('span.error').text("");

    if (domainId === "") {
        domainId = 0;
    }
    if (domainId > 0 && reportId > 0) {

        GetReportCode(reportId)
            .then(function (reportCode) {
                if (reportCode === "KYWTDIST"
                    || reportCode == "NMWTDIST"
                    || reportCode === "NYWTDIST" 
                    || reportCode === "ORWTDIST" 
                    || reportCode === "IFTA") {
                    loadParameterDetailDiv("/ReportLauncher/_LoadReportParameters/", reportCode).then(function () {
                        loadTaxAccount(reportId, domainId).then(function () {
                            loadReportingDate().then(function () {

                            }).fail(function () {
                                $('#ParameterDetails').html('');
                                $('#ParamterHeading').hide();
                            });
                        }).fail(function () {
                            $('#ParameterDetails').html('');
                            $('#ParamterHeading').hide();
                        });

                    });
                } else if (reportCode === "TRIPERR"
                    || reportCode === "MPGREPORT"
                    || reportCode === "MILESUMMARY"
                    || reportCode === "STATEREPORT"
                    || reportCode === "STATESUMMARY"
                    || reportCode === "INTERSTATETRAVEL"
                    || reportCode === "NONREPORTING"
                    || reportCode === "GPSREPORTING"
                    || reportCode === "FUELSUMMARY"
                ) {
                    loadParameterDetailDiv("/ReportLauncher/_LoadReportParameters/", reportCode).then(function () {

                        loadReportingDate().then(function () {

                        }).fail(function () {
                            $('#ParameterDetails').html('');
                            $('#ParamterHeading').hide();
                        });

                    });
                }
                else {
                    $('#ParameterDetails').html('');
                    $('#ParamterHeading').hide();
                }
            });
    } else {
        $('#ParameterDetails').html('');
        $('#ParamterHeading').hide();
    }
}
function DomainChanged(e) {
    var domain = $("#DomainId").data("kendoDropDownList");
    var domainId = domain.value();
    var Report = $("#ReportId").data("kendoDropDownList");
    var reportId = Report.value();
    if (domainId === "") {
        domainId = 0;
    }

    if (domainId > 0 && reportId > 0) {

        GetReportCode(reportId)
            .then(function (reportCode) {
                if (reportCode === "KYWTDIST"
                    || reportCode == "NMWTDIST"
                    || reportCode === "NYWTDIST"
                    || reportCode === "ORWTDIST"
                    || reportCode === "IFTA") {
                    loadParameterDetailDiv("/ReportLauncher/_LoadReportParameters/").then(function () {
                        loadTaxAccount(reportId, domainId).then(function () {
                            loadReportingDate().then(function () {

                            }).fail(function () {
                                $('#ParameterDetails').html('');
                                $('#ParamterHeading').hide();
                            });
                        }).fail(function () {
                            $('#ParameterDetails').html('');
                            $('#ParamterHeading').hide();
                        });
                    });
                } else if (reportCode === "TRIPERR"
                    || reportCode === "MPGREPORT"
                    || reportCode === "MILESUMMARY"
                    || reportCode === "STATEREPORT"
                    || reportCode === "STATESUMMARY"
                    || reportCode === "INTERSTATETRAVEL"
                    || reportCode === "NONREPORTING"
                    || reportCode === "GPSREPORTING"
                    || reportCode === "FUELSUMMARY"
                ) {
                    loadParameterDetailDiv("/ReportLauncher/_LoadReportParameters/", reportCode).then(function () {

                        loadReportingDate().then(function () {

                        }).fail(function () {
                            $('#ParameterDetails').html('');
                            $('#ParamterHeading').hide();
                        });

                    });
                } else {
                    $('#ParameterDetails').html('');
                    $('#ParamterHeading').hide();
                }
            });

    } else {
        $('#ParameterDetails').html('');
        $('#ParamterHeading').hide();
    }
}

function loadReportingDate() {
    var dfd = jQuery.Deferred();
    $.ajaxExt({
        url: '/ReportLauncher/_GetReportingDateData',
        type: 'POST',
        data: { RunDate: null },
        success: function (reportingData, msg) {
            for (var j = 0; j < reportingData.Object.length; j++) {
                $('select#ListReportDating')[0].sumo.add(reportingData.Object[j].Value, reportingData.Object[j].Text, j);
            }
            if (reportingData.Object) {
                if (reportingData.Object.length > 0) {
                    ComputeBeginAndEndDate();
                }
            }
            $('#ParameterDetails #ListReportDating').prop("disabled", false);
            $('select#ListReportDating')[0].sumo.reload();
            dfd.resolve();
        },
        error: function (errorData) {
            notify('error', errorData);
            dfd.reject();
        }
    });
    return dfd.promise();
}

function loadTaxAccount(reportId, domainId) {
    var dfd = jQuery.Deferred();
    $.ajaxExt({
        url: '/ReportLauncher/_GetTaxAccounts',
        type: 'POST',
        data: { DomainId: domainId, ReportId: reportId },
        success: function (data, msg) {
            for (var i = 0; i < data.Object.length; i++) {
                $('select#SelectedTaxAccount')[0].sumo.add(data.Object[i].Value, data.Object[i].Text, i);
            }
            $('select#SelectedTaxAccount')[0].sumo.reload();
            $('#ParameterDetails #SelectedTaxAccount').prop("disabled", false);
            $('#ParameterDetails .sumo_SelectedTaxAccount').removeClass('disabled');
            dfd.resolve();
        },
        error: function (errorData) {
            notify('error', errorData);
            dfd.reject();
        }
    });
    return dfd.promise();
}

function ComputeTaxAccount(e) {
    var taxAccount = $('#SelectedTaxAccount')[0];
    var cationCount = taxAccount.sumo.CaptionCont[0];
    var selectedData = $('#SelectedTaxAccount').val();
    var SelectedTaxAccount = $("#SelectedTaxAccount").parents('td').find('span.error');
    if (selectedData) {
        if (selectedData.length > 1) {
            cationCount.firstChild.textContent = 'Multiple Tax Account Selected';
            $('.FilterLct').hide();
            $('.FilterUnit').hide();
        } else {
            var index = taxAccount.value;
            var text = $('#SelectedTaxAccount').find('Option[value=' + index + ']').text();
            cationCount.firstChild.textContent = text;
            $('.FilterLct').show();
            $('.FilterUnit').show();
        }
        SelectedTaxAccount.text("");
    } else {
        $('.FilterLct').show();
        $('.FilterUnit').show();
    }
}


function OnReportChange(e) {
    var domain = $("#DomainId").data("kendoDropDownList");
    var domainId = domain.value();
    var Report = $("#ReportId").data("kendoDropDownList");
    var reportId = Report.value();
    if (domainId === "") {
        domainId = 0;
    }
    if (domainId > 0 && reportId != "") {
        GetReportCode(reportId)
            .then(function (reportCode) {
                if (reportCode === "KYWTDIST"
                    || reportCode == "NMWTDIST"
                    || reportCode === "NYWTDIST"
                    || reportCode === "ORWTDIST"
                    || reportCode === "IFTA") {
                    loadParameterDetailDiv("/ReportLauncher/_LoadReportParameters/", reportCode).then(function () {
                        loadTaxAccount(reportId, domainId).then(function () {
                            loadReportingDate().then(function () {

                            }).fail(function () {
                                $('#ParameterDetails').html('');
                                $('#ParamterHeading').hide();
                            });
                        }).fail(function () {
                            $('#ParameterDetails').html('');
                            $('#ParamterHeading').hide();
                        });

                    });

                } else if (reportCode === "TRIPERR"
                    || reportCode === "MPGREPORT"
                    || reportCode === "MILESUMMARY"
                    || reportCode === "STATEREPORT"
                    || reportCode === "STATESUMMARY"
                    || reportCode === "INTERSTATETRAVEL"
                    || reportCode === "NONREPORTING"
                    || reportCode === "GPSREPORTING"
                    || reportCode === "FUELSUMMARY"
                ) {
                    loadParameterDetailDiv("/ReportLauncher/_LoadReportParameters/", reportCode).then(function () {
                        
                            loadReportingDate().then(function () {

                            }).fail(function () {
                                $('#ParameterDetails').html('');
                                $('#ParamterHeading').hide();
                            });

                    });
                }

                else {
                    $('#ParameterDetails').html('');
                    $('#ParamterHeading').hide();

                }
            });
    } else {
        $('#ParameterDetails').html('');
        $('#ParamterHeading').hide();
    }
}

function showThrobber(sender) {
    var position = { my: "left center", at: "right center", of: $(sender), offset: "5 0" }
    $("#MainThrobberImage").show();
    $('#Throbber-Overlay').show();
}

function removeThrobber() {
    $("#MainThrobberImage").hide();
    $('#Throbber-Overlay').hide();
}