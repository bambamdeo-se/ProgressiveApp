var ImageTemplate = null;
var LoadingImagesTemplate = null;
var NoImageUploadedTemplate = null;
var PreviewImageTemplate = null;
var UploadingImageTemplate = null;

var FadeInDelay = 125;
var FadeOutDelay = 125;

function InitImageMaintenance(ContextId, TripId) {
    LoadTemplates();
    AddDragEvents();
    LoadImages(ContextId, TripId);
}

function LoadTemplates() {
    var imageTemplate = document.getElementById('ImageTemplate').innerHTML;
    ImageTemplate = Handlebars.compile(imageTemplate);

    var loadingImagesTemplate = document.getElementById('LoadingImagesTemplate').innerHTML;
    LoadingImagesTemplate = Handlebars.compile(loadingImagesTemplate);

    var noImageUploadedTemplate = document.getElementById('NoImageUploadedTemplate').innerHTML;
    NoImageUploadedTemplate = Handlebars.compile(noImageUploadedTemplate);

    var previewImageTemplate = document.getElementById('PreviewImageTemplate').innerHTML;
    PreviewImageTemplate = Handlebars.compile(previewImageTemplate);

    var uploadingImageTemplate = document.getElementById('UploadingImageTemplate').innerHTML;
    UploadingImageTemplate = Handlebars.compile(uploadingImageTemplate);
}

function LoadImages(contextId, TripId) {
    // Clear all current check items
    ClearAllCheckItemImages();
    // find all of the check item containers
    LoadImagesForCheckItems(contextId, TripId, true);
}

function LoadImagesForCheckItems(contextId, TripId, fadeAllIn) {
    // Show any non-filtered check item containers and add a loading image 
    $.each($("li[id='checkid'"), function (i, CheckItemListElement) {
        $(CheckItemListElement).fadeIn(FadeInDelay);
        var loadingImagesTemplate = LoadingImagesTemplate();
        $('ul#CheckItemImages').append(loadingImagesTemplate).fadeIn(FadeInDelay);
    });
    // load the check items 
    $.ajax({
        type: "POST",
        url: '/Trip/GetImages',
        data: {
            TripId: TripId,
        },
        datatype: "html",
        success: function (imagesJSON) {
            ImagesLoadedJSON(imagesJSON, contextId, TripId);
        }
    });
    return false;
}

function ClearAllCheckItemImages() {
    // hide all of the ULs

    $("li.checkitem_imagelist").each(function () {
        $(this).fadeOut(FadeOutDelay);
    });
    // update all of the page numbers relative to the current page
    $("ul.image_list li").each(function () {
        $(this).fadeOut(FadeOutDelay).remove();
    });
}

function ImageUploadSuccess(e) {

    if (e.response == null || e.response.length == null || e.response.length < 1) {
        alert("An error occurred during upload:  No files were returned.  Please reload the page.");
        return;
    }

    // Get data from the check items
    var images = JSON.parse(e.response);
    var contextId = images[0].Contextid;
    var tripId = images[0].TripId;

    ClearAllImagesForCheckId();
    // reload from the images
    ImagesForCheckItemLoaded(contextId, tripId, images);
    // remove the 'upload complete' items after a period
    var uploadControl = $("#files").data().kendoUpload;
    var allLiElementsToBeRemoved = uploadControl.wrapper.find('.k-file');
    $(allLiElementsToBeRemoved).fadeOut(FadeOutDelay);
    setTimeout(function () {
        uploadControl._removeFileEntry(allLiElementsToBeRemoved);
        CloseCheckItemFileUploadProgressPopup();
    }, 500);

}

function AddCheckItemImage(contextId, tripId, image, fadeIn) {

    // format the date
    var modifiedDate = new Date(image.ModifiedDate);
    var modifiedDateString = modifiedDate.toLocaleDateString("en-US");
    var imageId = image.ImageId;
    var contextId = contextId;
    var modifiedUserName = image.ModifiedUserFirstName;

    // Create the handlebars template
    var imageTemplate;
    imageTemplate = ImageTemplate(
        {
            ContextId: contextId,
            ImageId: imageId,
            TripId: tripId,
            ModifiedDate: modifiedDateString,
            ModifiedUserName: modifiedUserName
        });

    var unorderedList = $('ul #CheckItemImages');
    unorderedList.append(imageTemplate);
    if (fadeIn == true) {
        $('li#Image_' + imageId.toString() + ' div.image-wrapper').fadeIn(FadeInDelay);
    } else {
        $('li#Image_' + imageId.toString() + ' div.image-wrapper').show();
    }

}


function ImagesLoadedJSON(imagesJSON, contextId, TripId) {
    // parse the json
    var images = JSON.parse(imagesJSON);

    // loop through each image
    // create the image containers
    $.each(images, function (i, image) {
        AddCheckItemImage(contextId, TripId, image)
    });

    // hide the 'loading image' message
    $("li[id^='LoadingImages']").remove();
    // find any check items without images and display the no image template
    $(".checkitem_imagelist").each(function (i, checkItemList) {

        // get the image list
        var checkItemImageList = $(checkItemList).find('ul.image_list');
        // see if it has any images
        var checkItemImageCount = $(checkItemImageList).find('li').length;

        if (checkItemImageCount < 1) {
            var noImagesTemplate = NoImageUploadedTemplate();
            $(checkItemImageList).append(noImagesTemplate).fadeIn(FadeInDelay);
        }
    });
}

//delete image
function DisableImageListByCheckId() {
    $("li#checkid").addClass("disabled").removeClass("enabled");
}

function EnableImageListByCheckId() {
    $("li#checkid").removeClass("disabled").addClass("enabled");
}

function ClearAllImagesForCheckId() {
    // update all of the page numbers relative to the current page
    var listElements = $("#CheckItemImages li").each(function () {
        $(this).fadeOut(FadeOutDelay).remove();
    });
    // delete any existing 'no images uploaded' messages
    $("#NoImagePanel").each(function () {
        $(this).fadeOut(FadeOutDelay).remove();
    });
}

function ImagesForCheckItemLoaded(contextId, tripId, images, fadeAllIn) {
    var numImages = images.length;
    var unorderedList = $('ul #CheckItemImages');
    // hide the 'loading image' message
    $("#LoadingImages").hide();
    if (numImages > 0) {

        // create the image containers
        $.each(images, function (i, image) {
            AddCheckItemImage(contextId, tripId, image, fadeAllIn)
        });

    }
    else {
        var noImagesTemplate = NoImageUploadedTemplate();
        unorderedList.append(noImagesTemplate).fadeIn(FadeInDelay);
    }

    // Show the image list
    $("li#checkid").fadeIn(FadeInDelay);

}


function ImagesForCheckItemLoadedJSON(contextId, tripId, imagesJSON, fadeAllIn) {
    var images = JSON.parse(imagesJSON);
    ImagesForCheckItemLoaded(contextId, tripId, images, fadeAllIn);
}

function ImageDeleted(contextId, tripId, imageId, imagesJSON) {
    //Remove the image
    $("li#Image_" + imageId.toString()).fadeOut(FadeOutDelay, function () {
        ClearAllImagesForCheckId();
        // reload from the images
        ImagesForCheckItemLoadedJSON(contextId, tripId, imagesJSON);
    });

}


function DeleteImage(contextId, tripId, imageId) {
    if (confirm('Are you sure you want to delete this image permanently?')) {
        DisableImageListByCheckId();
        $.ajax({
            type: "POST",
            url: '/Trip/DeleteImage',
            data: {
                abc: contextId,
                tripId: tripId,
                imageId: imageId,
            },
            datatype: "html",
            success: function (imagesJSON) {
                ImageDeleted(contextId, tripId, imageId, imagesJSON);
            },
            error: function (jq, status, message) {
                // Add a red boarder around the image?
                $("li#Image_" + imageId.toString()).addClass("error").attr("title", "This image could not be deleted, plese reload the page.");
                ClearAllImagesForCheckId();
                LoadImagesForCheckItems(contextId, tripId, false);
            },
            complete: function () {
                EnableImageListByCheckId();
            }
        });
        return false;
    }
}

//preview Image
function PreviewImage(contextId, TripId, imageId) {
    var url = "/Trip/ScanImageBase64" + "?abc=" + contextId.toString() + "&tripId=" + TripId.toString() + "&imageId=" + imageId.toString() + "&width=1024&firstPageOnly=false";
    // Open colorbox and show a loader spinner
    OpenLoadingImagePopup(url);

}

//popup load

function OpenLoadingImagePopup(imgSrc, onLoad) {
    // Create the loading spinner popup
    
    var $popup = OpenDefaultPopup('<img src="/Images/loader_image.gif"/>', "<div class='loader'></div>");
    var $img = $("<img>");
    $.ajax(
        {
            type: "POST",
            url: imgSrc,
            data: {},
            datatype: "json",
            success: function (data) {
                var src = "data:" + data.ContentType + ";base64," + data.ImageData;
                $img.attr("src", src);
                OpenDefaultImagePopup("", $img.get(0))
                if (onLoad != null)
                    onLoad();
            }
        });


}

function OpenDefaultImagePopup(titleHtml, image) {
    $defaultPopup = $("#DefaultPopup");
    if (IsNullOrWhitespace(titleHtml)) {
        $defaultPopup.find("div.panel-title").hide();
    }
    else {
        $defaultPopup.find("div.panel-title").html(titleHtml).show();
    }
    $defaultPopup.find("div.panel-body").html(image);
    $.colorbox({
        photo: true, inline: true, href: "#DefaultPopup", reposition: true, scrolling: false, closeButton: false,
        onComplete: function () {
            var imgWidth = $defaultPopup.find("div.panel-body img").outerWidth() + 12;
            $(this).colorbox.resize({ innerWidth: imgWidth });

        }
    });
    return $defaultPopup;
}

function OpenDefaultPopup(titleHtml, bodyHtml) {
    $defaultPopup = $("#DefaultPopup");
    if (IsNullOrWhitespace(titleHtml)) {
        $defaultPopup.find("div.panel-title").hide();
    }
    else {
        $defaultPopup.find("div.panel-title").html(titleHtml).show();
    }
    if (IsNullOrWhitespace(bodyHtml)) {
        $defaultPopup.find("div.panel-body").hide();
    }
    else {
        $defaultPopup.find("div.panel-body").html(bodyHtml).show();
    }
    $.colorbox({ inline: true, href: "#DefaultPopup", reposition: true, maxWidth: "100%", scrolling: false, closeButton: false });
    return $defaultPopup;
}

function ColorboxConfirmPopup(options) {

    if (!options) options = {};
    if (!options.yesText) options.yesText = "Yes";
    if (!options.noText) options.noText = "No";
    if (!options.titleHtml) options.titleHtml = "Confirm";
    if (!options.bodyHtml) options.bodyHtml = "Are you sure?";
    if (!options.href) options.href = "#DefaultConfirmPopup";

    var accepted = false;
    $confirmPopup = $(options.href);

    if (IsNullOrWhitespace(options.titleHtml)) {
        $confirmPopup.find("div.panel-heading").hide();
    }
    else {
        $confirmPopup.find("div.panel-heading").html(options.titleHtml).show();
    }
    if (IsNullOrWhitespace(options.bodyHtml)) {
        $confirmPopup.find("div.panel-body").hide();
    }
    else {
        $confirmPopup.find("div.panel-body").html(options.bodyHtml).show();
    }

    $confirmPopup.find('#ConfirmPopupYesText').text(options.yesText);
    $confirmPopup.find('#ConfirmPopupNoText').text(options.noText);


    //trigger the accept event
    $confirmPopup.find('a#ConfirmPopupAccept').off('click').on('click', function (e) {
        accepted = true;
        CloseColorboxPopup();
    });


    //trigger the cancel event
    $confirmPopup.find('a#ConfirmPopupCancel').off('click').on('click', function (e) {
        CloseColorboxPopup();
    });

    $.colorbox({
        inline: true, href: options.href, reposition: true, maxWidth: "100%", scrolling: false, closeButton: false
        , onClosed:
        function (e) {
            if (accepted) {
                if (options.accept) {
                    options.accept(e);
                }
                else if (options.cancel) {
                    options.cancel(e);
                }

            }
        }
    });

}

function CloseColorboxPopup() {
    $.colorbox.close();
}

// Test for null or whitespace

function IsNullOrWhitespace(str) {
    return str === null || (/^\s*$/).test(str);
}

function CloseCheckItemFileUploadProgressPopup() {
    $("div#CheckitemUploadContainer").colorbox.close();
}

function CheckItemImagesSelected(e) {
    // See if we support the file extension
    // Check for file extensions that are not supported
    var message = "The following files are in a format that is not supported: ";
    var extensionsMissing = false;
    var someExtensionsFound = false;
    var extensionIndex;

    for (var fileIndex = 0; fileIndex < e.files.length; fileIndex++) {
        var file = e.files[fileIndex];
        var extensionFound = false;
        for (extensionIndex = 0; extensionIndex < e.sender.options.validation.allowedExtensions.length; extensionIndex++) {
            var extension = e.sender.options.validation.allowedExtensions[extensionIndex];
            if (extension.toLowerCase() == file.extension.toLowerCase()) {
                extensionFound = true;
                break;
            }
        }
        if (extensionFound == false) {
            if (extensionsMissing == false)
                extensionsMissing = true;
            else
                message = message + ", ";
            message = message + file.name;
        }
        else
            someExtensionsFound = true;
    }
    if (extensionsMissing == true) {
        var supportedExtensionMessage = "The following file types are supported: ";
        for (extensionIndex = 0; extensionIndex < e.sender.options.validation.allowedExtensions.length; extensionIndex++) {
            if (extensionIndex > 0)
                supportedExtensionMessage = supportedExtensionMessage + ", ";
            supportedExtensionMessage = supportedExtensionMessage + e.sender.options.validation.allowedExtensions[extensionIndex].substr(1);
        }
        ShowColorboxErrorPopup(message + ".  " + supportedExtensionMessage + ".", 500);
        // Todo:  clear all files from the upload box

        return someExtensionsFound;
    }
    // Test to see if the selection was made via drop.  If so, we don't want to open the 
    // popup since we have some fancy animations.
    var fileUploadDropZone = $("div#CheckitemUploadContainer em.file-dropped");
    if (fileUploadDropZone.length) {
        fileUploadDropZone.removeClass("file-dropped");

    }
    else
        ShowCheckItemFileUploadProgressPopup();
}

function OpenUploadDialog() {
    // Click the upload files button
    $("input#files").click();
}

function ShowCheckItemFileUploadProgressPopup() {
    $.colorbox({ href: "div#CheckitemUploadContainer", inline: true, reposition: true, width: "800px", minHeight: "200px" });
}

function ShowColorboxErrorPopup(message, httpCode) {
    $('div#divAjaxErrorPopup span#ErrorMessage').text(message);
    $('div#divAjaxErrorPopup span#ErrorCode').text(httpCode);
    $.colorbox({ href: "div#divAjaxErrorPopup", inline: true, reposition: true, scrolling: false, closeButton: false });
}

//Add Drag event
function AddDragEvents() {
    // Configure drag and drop
    $(document).on("dragenter dragstart dragend dragleave dragover drag drop", function (e) {
        e.stopPropagation();
        e.preventDefault();
        e.originalEvent.dataTransfer.effectAllowed = 'none';
        e.originalEvent.dataTransfer.dropEffect = 'none';
    });
    // Configure external file drop events
    $('li .file-drop-zone').on("dragover", function (e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).addClass("file-drag");
        e.originalEvent.dataTransfer.effectAllowed = 'copy';
        e.originalEvent.dataTransfer.dropEffect = 'copy';
    });
    $('li .file-drop-zone').on("dragleave", function (e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).removeClass("file-drag");
    });
    $('li .file-drop-zone').on("drop", function (e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).removeClass("file-drag");
        var event = jQuery.Event("drop");
        event.originalEvent = e.originalEvent;
        // Get the file upload control
        //var checkId = $(e.currentTarget).attr('data-checkid')
        var fileUploadDropZone = $("div#CheckitemUploadContainer em");
        // Add a class to let us know this item was dropped.
        fileUploadDropZone.addClass("file-dropped");
        fileUploadDropZone.trigger(event);
    });

    /* Configure internal image drag and drop*/
    $('ul.image_list').sortable({
        cancel: '',
        items: 'li.sortable',
        connectWith: "",
        cursor: 'move',
        revert: true,
        containment: '#ImageMaintenanceImageList',
        placeholder: 'sortable-placeholder',
        start: function (event, ui) {
            ui.placeholder.html($(ui.item).removeClass('.sortable').html());
        },
        over: function (event, ui) {
            AddRemoveNoImageLoadedPlaceholders();
        },
        out: function (event, ui) {
            AddRemoveNoImageLoadedPlaceholders();
        },
        update: function (event, ui) {
            if (this != ui.item.parent()[0]) {
                return;
            }

            AddRemoveNoImageLoadedPlaceholders();
            // get the drop target container (ul)
            //var dropUnorderedList = ui.item.context.parentElement;
            // Get the drop target check item
            //var dropCheckId = $(dropUnorderedList).attr("data-contextid");
            // get the image parameters
            var contextId = ui.item.attr('data-contextid');
            var tripId = ui.item.attr('data-tripid');
            var imageId = ui.item.attr('data-imageid');

            // reorder the item
            ReorderImage(contextId, tripId, imageId, ui.item.index() + 1);

        }

    });
    $('ul.image_list').disableSelection();

}

function AddRemoveNoImageLoadedPlaceholders() {

    $('ul.image_list').each(function () {

        $(this).find('li.no-image-uploaded').remove();

        if ($(this).find('li:not(.ui-sortable-helper)').length == 0) {
            var noImageUploadedTemplate = NoImageUploadedTemplate();
            $(this).append(noImageUploadedTemplate);
        }

    });
}


function ReorderImage(contextId, tripId, imageId, pageId) {
    DisableImageListByCheckId();
    // Get the current page number
    var currentPageNumber = $("Image_" + imageId).attr("data-page-number");
    $.ajax({
        type: "POST",
        url: "/Trip/ReorderImage",
        data: {
            abc: contextId,
            tripId: tripId,
            imageId: imageId,
            pageId: pageId,
        },
        datatype: "html",
        success: function (imagesJSON) {
            ImageReordered(contextId, tripId, imagesJSON, currentPageNumber, pageId);
        },
        error: function (jq, status, message) {
            // Add a red boarder around the image?
            $("li#Image_" + imageId.toString()).addClass("error").attr("title", "This image could not be reordered, plese reload the page.");
            ClearAllImagesForCheckId(checkId);
            LoadImagesForCheckItems(companyId, driverId, checkId, false);
        },
        complete: function () {
            EnableImageListByCheckId();
        }
    });
    return false;
}
function ImageReordered(contextId, tripId, imagesJSON, currentPageNumber, pageId) {
    ClearAllImagesForCheckId();
    // reload from the images
    ImagesForCheckItemLoadedJSON(contextId, tripId, imagesJSON);
}

function ResizeCheckItemFileUploadProgressPopup() {
    $("div#CheckitemUploadContainer").colorbox.resize();
}

function CheckItemImageUploading(e) {
    e.data = { actionTripId: $("#_NewTrip input[id='TripIdForTripDetail']").val() };
    ResizeCheckItemFileUploadProgressPopup();
    //Todo:  Was this a drag and drop of was this upload triggered from the dialog?
    DisableImageListByCheckId();
    var uploadNumber = Math.floor(Math.random() * 99999999);
    var uploadingImageTemplate = UploadingImageTemplate(
        {
            UploadNumber: uploadNumber,
        });
    var $unorderedList = $('ul #CheckItemImages');
    $unorderedList.prepend(uploadingImageTemplate);
    // remove the no image panel (if it exists)
    $unorderedList.find('li#NoImagePanel').remove();
    $('li#UploadingImage_' + uploadNumber.toString()).fadeIn(FadeInDelay);

    var xhr = e.XMLHttpRequest;
    if (xhr) {
        xhr.addEventListener("readystatechange", function onUploadReady(e) {
            if (xhr.readyState == 1 /* OPENED */) {
                xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                xhr.removeEventListener("readystatechange", onUploadReady);
            }
        });
    }

}

function CheckItemImageUploadError(e)
{

    //HandleAjaxError(e.XMLHttpRequest.responseText);

    // update all of the page numbers relative to the current page
    var listElements = $("#CheckItemImages li[id^='UploadingImage_']").each(function () {
        $(this).remove();
    });
    // re-enable the item control
    EnableImageListByCheckId();
}