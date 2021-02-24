function clearToAddressErrors() {
    $("#ToContactName").parent().find('span.error').text("");
    $("#ToAddress1").parent().find('span.error').text("");
    $("#ToZIP").parent().find('span.error').text("");
    $("#ToStateCode").parent().parent().find('span.error').text("");
    $("#ToCity").parent().find('span.error').text("");
    $("#ToPhoneNo").parent().find('span.error').text("");
}

function getShipperId() {
    return {
        ShipperPartyId: $("#Shippercode").val()
    };
}

function clearBillingMessages() {
    $("#BillingPostalCode").parent().find('span.error').text("");
    $("#BillingPostalCode").val("");
    $("#BillingCountryCode").parent().parent().find('span.error').text("");
    $("#BillingCountryCode").data("kendoDropDownList").value("");
    $("#TrackingNbr").parent().find('span.error').text("");
    $("#AccountId").parent().parent().find('span.error').text("");
    $("#AccountNo").parent().find('span.error').text("");
}

function applyPreviousToAddress() {
    $("#ToAddress1").val($("#prevToAdd1").val());
    $("#ToAddress2").val($("#prevToAdd2").val());
    $("#ToZIP").val($("#prevToZipCode").val());
    $("#ToCity").val($("#prevTocity").val());
}
function applyNewAddress() {
    $("#ToAddress1").val($("#updatedToAdd1").val());
    $("#ToAddress2").val($("#updatedToAdd2").val());
    $("#ToZIP").val($("#updatedToZipCode").val());
    $("#ToCity").val($("#updatedTocity").val());
}

function ReadSourceAndPackage() {
    $("#ServiceTypeId").data("kendoDropDownList").dataSource.read();
    $("#PackageTypeId").data("kendoDropDownList").dataSource.read();
}

function getFromAddress() {
    var FromAddress = {
        'FromContactName': $("#FromContactName").val(),
        'FromTenantId': $('#FromTenantId').data('kendoComboBox').value(),
        'CompanyName': $('#FromTenantId').data('kendoComboBox').text(),
        'FromAddress1': $("#FromAddress1").val(),
        'FromAddress2': $("#FromAddress2").val(),
        'FromZIP': $("#FromZIP").val(),
        'FromStateCode': $("#FromStateCode").val(),
        'FromCity': $("#FromCity").val(),
        'FromPhoneNo': $('#FromPhoneNo').val(),
        'FromExt': $("#FromExt").val(),
        'FromEmailAddress': $('#FromEmailAddress').val()
    };
    return FromAddress;
}

function validateFromAddress() {
    var Haserror = false;
    if ($("#FromContactName").val() === "") {
        $("#FromContactName").parent().find('span.error').text("Please enter the Contact Name.");
        Haserror = true;
    } else {
        $("#FromContactName").parent().find('span.error').text("")
    }

    if ($("#FromAddress1").val() === "") {
        $("#FromAddress1").parent().find('span.error').text("The Address 1 line must be at least 3 and no more than 35 characters long.");
        Haserror = true;
    } else {
        $("#FromAddress1").parent().find('span.error').text("")
    }

    if ($("#FromZIP").val() === "") {
        $("#FromZIP").parent().find('span.error').text("Please enter the ZIP/Postal code.");
        Haserror = true;
    } else {
        $("#FromZIP").parent().find('span.error').text("")
    }

    if ($("#FromStateCode").data("kendoDropDownList").value() === "") {
        $("#FromStateCode").parent().parent().find('span.error').text("Please enter the State/Province.");
        Haserror = true;
    } else {
        $("#FromStateCode").parent().parent().find('span.error').text("")
    }

    if ($("#FromCity").val() === "") {
        $("#FromCity").parent().find('span.error').text("Please enter the City.");
        Haserror = true;
    } else {
        $("#FromCity").parent().find('span.error').text("")
    }

    if ($("#FromPhoneNo").val() === "") {
        $("#FromPhoneNo").parent().find('span.error').text("Please enter the Phone Number.");
        Haserror = true;
    } else {
        $("#FromPhoneNo").parent().find('span.error').text("")
    }

    if ($("#FromPhoneNo").val() === "") {
        $("#FromPhoneNo").parent().find('span.error').text("Please enter the Phone Number.");
        Haserror = true;
    } else {
        $("#FromPhoneNo").parent().find('span.error').text("")
    }

    return Haserror;
}

function getToAddress() {
    var ToAddress = {
        'ToContactId': $("#ToContactName").data('kendoComboBox').value(),
        'ToContactName': $("#ToContactName").data('kendoComboBox').text(),
        'ToCompanyName': $("#ToTenantId").data('kendoComboBox').text(),
        'ToTenantId': $("#ToTenantId").data('kendoComboBox').value(),
        'ToAddress1': $("#ToAddress1").val(),
        'ToAddress2': $("#ToAddress2").val(),
        'ToZIP': $("#ToZIP").val(),
        'ToStateCode': $("#ToStateCode").val(),
        'ToCity': $("#ToCity").val(),
        'ToPhoneNo': $('#ToPhoneNo').val(),
        'ToExt': $("#ToExt").val(),
        'SaveNewRecipient': $("#SaveNewRecipient").prop('checked'),
        'ResidentialAddress': $("#ResidentialAddress").prop('checked'),
        'ToEmailAddress': $('#ToEmailAddress').val()
    };
    return ToAddress;
}

function validateToAddress() {
    var Haserror = false;

    if ($("#ToContactName").val() === "") {
        $("#ToContactName").parent().find('span.error').text("Please enter the Contact Name.");
        Haserror = true;
    } else {
        $("#ToContactName").parent().find('span.error').text("");
    }

    if ($("#ToAddress1").val() === "") {
        $("#ToAddress1").parent().find('span.error').text("The Address 1 line must be at least 3 and no more than 35 characters long.");
        Haserror = true;
    } else {
        $("#ToAddress1").parent().find('span.error').text("")
    }

    if ($("#ToZIP").val() === "") {
        $("#ToZIP").parent().find('span.error').text("Please enter the ZIP/Postal code.");
        Haserror = true;
    } else {
        $("#ToZIP").parent().find('span.error').text("")
    }

    if ($("#ToStateCode").data("kendoDropDownList").value() === "") {
        $("#ToStateCode").parent().parent().find('span.error').text("Please enter the State/Province.");
        Haserror = true;
    } else {
        $("#ToStateCode").parent().parent().find('span.error').text("")
    }

    if ($("#ToCity").val() === "") {
        $("#ToCity").parent().find('span.error').text("Please enter the City.");
        Haserror = true;
    } else {
        $("#ToCity").parent().find('span.error').text("")
    }

    if ($("#ToPhoneNo").val() === "") {
        $("#ToPhoneNo").parent().find('span.error').text("Please enter the Phone Number.");
        Haserror = true;
    } else {
        $("#ToPhoneNo").parent().find('span.error').text("")
    }

    return Haserror;
}

function getBillingDetails() {
    var BCC = $("#BillingCountryCode").prop('disabled') == true ? "" : $("#BillingCountryCode").data("kendoDropDownList").value();
    var BPC = $("#BillingPostalCode").prop('disabled') == true ? "" : $("#BillingPostalCode").val();

    var BillingDetail = {
        'AccountId': $("#AccountId").val(),
        'AccountNo': $("#AccountNo").val(),
        'PaymentCode': $('#PaymentCode').val(),
        'reference1': $("#reference1").val(),
        'reference2': $("#reference2").val(),
        'reference3': $("#reference3").val(),
        'reference4': $("#reference4").val(),
        'BillingCountryCode': $("#BillingCountryCode").data("kendoDropDownList").value(),
        'BillingPostalCode': $("#BillingPostalCode").val(),
        'TrackingNbr': $("#TrackingNbr").val()

    };
    return BillingDetail;
}

function validateBillingDetails() {
    var Haserror = false;
    if ($("#AccountId").data("kendoDropDownList").text() === "") {
        $("#AccountId").parent().parent().find('span.error').text("Please Select Bill transportation.");
        Haserror = true;
    } else {
        $("#AccountId").parent().parent().find('span.error').text("")
    }
    if ($("#AccountNo").val() === "") {
        $("#AccountNo").parent().find('span.error').text("Please enter the Account Number.");
        Haserror = true;
    } else {
        $("#AccountNo").parent().find('span.error').text("");
    }

    if (!$("#RecordShipment").prop("checked")) {
        if (!$("#BillingCountryCode").prop('disabled')) {
            if (!$("#BillingCountryCode").data("kendoDropDownList").value()) {
                $("#BillingCountryCode").parent().parent().find('span.error').text("Please Select Bill Country.");
                Haserror = true;
            } else {
                $("#BillingCountryCode").parent().parent().find('span.error').text("");
            }
        } else {
            $("#BillingCountryCode").parent().parent().find('span.error').text("");
        }

        if (!$("#BillingPostalCode").prop('disabled')) {
            if (!$("#BillingPostalCode").val()) {
                $("#BillingPostalCode").parent().find('span.error').text("Please Enter postal code.");
                Haserror = true;
            } else {
                $("#BillingPostalCode").parent().find('span.error').text("");
            }
        } else {
            $("#BillingPostalCode").parent().find('span.error').text("");
        }
    } else {
        if (!$("#TrackingNbr").val()) {
            $("#TrackingNbr").parent().find('span.error').text("Please enter tracking number");
            Haserror = true;
        } else {
            $("#TrackingNbr").parent().find('span.error').text("");
        }
    }


    return Haserror;
}

function getPackagingDetails() {
    var PackagingDetail = {
        'ShipDate': $("#ShipDate").val(),
        'NumberOfPackage': $("#NumberOfPackage").val(),
        'Weight': $("#Weight").val(),
        'DeclaredValue': $("#DeclaredValue").val(),
        'ServiceTypeId': $("#ServiceTypeId").val(),
        'PackageTypeId': $("#PackageTypeId").val(),
        'Returnlbl': $("#Returnlbl").prop("checked")
    };
    return PackagingDetail;
}

function validatePackageDetails() {
    var Haserror = false;
    if ($("#ShipDate").val() === "") {
        $("#ShipDate").parent().find('span.error').text("Please Select Shipping Date.");
        Haserror = true;
    } else {
        $("#ShipDate").parent().find('span.error').text("")
    }
    if ($("#NumberOfPackage").val() === "") {
        $("#NumberOfPackage").parent().parent().parent().find('span.error').text("Please enter the a No of packages .");
        Haserror = true;
    } else if ($("#NumberOfPackage").val() <= 0) {
        $("#NumberOfPackage").parent().parent().parent().find('span.error').text(" No of packages should be greater than zero");
        Haserror = true;
    } else {
        $("#NumberOfPackage").parent().find('span.error').text("")
    }

    if ($("#Weight").val() === "") {
        $("#Weight").parent().parent().parent().find('span.error').text("Please enter valid Weight.");
        Haserror = true;
    } else if ($("#Weight").val() <= 0) {
        $("#Weight").parent().parent().parent().find('span.error').text(" Weight should be greater than zero");
        Haserror = true;
    } else {
        $("#Weight").parent().find('span.error').text("")
    }

    if ($("#Shippercode").val()) {
        if ($("#Shippercode").val() != 3) {
            if ($("#ServiceTypeId").data("kendoDropDownList").value() === "") {
                $("#ServiceTypeId").parent().parent().find('span.error').text("Please select your Service Type.");
                Haserror = true;
            } else {
                $("#ServiceTypeId").parent().parent().find('span.error').text("")
            }
            if ($("#PackageTypeId").data("kendoDropDownList").value() === "") {
                $("#PackageTypeId").parent().parent().find('span.error').text("Please select your Package Type.");
                Haserror = true;
            } else {
                $("#PackageTypeId").parent().parent().find('span.error').text("")
            }
        }
    }
    return Haserror;
}