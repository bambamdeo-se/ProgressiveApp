$(document).ready(function () {
    $('input[name="VendorId_input"]').attr('readonly', 'readonly');
});
function onUploadError(e) {
    error_handler(e);
}
function onRemove(e) {
    var multicolumncomboboxData = $("#VendorId").data("kendoMultiColumnComboBox");
    var InvoiceNbr = $('#InvoiceNbr').val();
	var FundingRequestTypeId = '@ComonConfigValues.InvoiceFundingRequestId';
	var fundingRequestId = $('#FundingRequestId').val();
    e.data = {
        fileName: getFileInfo(e),
        Attachments: $("#AttachedDocList").val(),
        uid: e.files[0].uid,
        VendorId: multicolumncomboboxData.value(),
        FundingRequestId: fundingRequestId,
		FundingRequestTypeId: FundingRequestTypeId,
		WorkOrderId : 0
    };
}

function getFileInfo(e) {
    return $.map(e.files, function (file) {
        var info = file.name;
        return info;
    }).join(", ");
}
function onSuccess(e) {
    var obj = $.parseJSON(e.XMLHttpRequest.responseText);
    if (obj.Success) {
        if (obj.Response == "cancel") {
            $("#AttachedDocList").val("");
            $("#AttachedDocList").val(obj.Attachments);
        }
        else {
            var docs = $("#AttachedDocList").val();
            if (!docs.trim())
                $("#AttachedDocList").val(obj.Attachments);
            else {
                docs += "," + obj.Attachments;
                $("#AttachedDocList").val(docs);
            }
        }
    }
}
function onSelectVendor(e) {
    var dataItem = e.dataItem;
    var PreviousVendor = $("#PreviousVendor").val();
    var upload = $("#uploadAttachment").data("kendoUpload");
    var totalFiles = upload.getFiles().length;
    var multicolumncombobox = $("#VendorId").data("kendoMultiColumnComboBox");
    if (PreviousVendor) {
        var previousSelectedIndex = -1;
        $.each(multicolumncombobox.dataSource.data(), function (index, item) {
            if (item.VendorId == PreviousVendor) {
                previousSelectedIndex = index;
            }
        });
        if (dataItem) {
            if (dataItem.VendorId != PreviousVendor && totalFiles > 0) {
                notify('error', 'Please delete uploaded file before changing Vendor.');
                multicolumncombobox.select(previousSelectedIndex);
                multicolumncombobox.trigger('change');
            }
        } else {
            notify('error', 'Please delete uploaded file before changing Vendor.');
            multicolumncombobox.select(previousSelectedIndex);
            multicolumncombobox.trigger('change');
        }
    }
    //e.preventDefault();
}

function onVendorDataBound(e) {
    var multicolumncombobox = $("#VendorId").data("kendoMultiColumnComboBox");
    var selectedIndex = multicolumncombobox.selectedIndex;
    if (selectedIndex > -1) {
        var dataItem = multicolumncombobox.dataSource.data()[selectedIndex];
        if (dataItem) {
            var vendorAddr = dataItem.CompleteAddress;
            $('#spnVendorAddr').text(vendorAddr);
        }
        else
            $('#spnVendorAddr').text('-');
    }
}
function checkRequiredFiled(field) {
    var reqField = $("#RequiredDate").data('kendoDatePicker');
    if (field === 'ASAP') {
        reqField.value(null);
        reqField.enable(false);
    } else {
        reqField.enable(true);
    }
}