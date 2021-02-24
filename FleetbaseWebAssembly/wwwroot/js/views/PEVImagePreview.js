var ImageTemplate = null;
var LoadingImagesTemplate = null;
var NoImageUploadedTemplate = null;
var PreviewImageTemplate = null;

var GradeTemplate = null;

var FadeInDelay = 125;
var FadeOutDelay = 125;

function InitGradeMaintenance(ContextId, pevUserName, pevEmployerName, pevDriverName) {
    LoadGradeTemplate();
    LoadGradeData(pevUserName, pevEmployerName, pevDriverName);
}

function LoadGradeTemplate() {
    var gradeTemplate = document.getElementById('LoadingPevGridTemplate').innerHTML;
    GradeTemplate = Handlebars.compile(gradeTemplate);
}
function LoadGradeData(pevUserName, pevEmployerName, pevDriverName) {
    var gradeTemplate;
    gradeTemplate = GradeTemplate(
        {
            PevUserName: pevUserName,
            PevEmployerName: pevEmployerName,
            PevDriverName: pevDriverName
        });

    var GradeDiv = $('div #GradeHtml');
    GradeDiv.append(gradeTemplate);
}

function InitImageTabContent(ContextId, PEVId, PevDocTypeId, ReferenceId) {
    LoadTemplatesForPevDetails();
    //AddDragEvents();
    LoadImagesTabContent(ContextId, PEVId, PevDocTypeId, ReferenceId);
}

function LoadTemplatesForPevDetails() {
    var imageTemplate = document.getElementById('ImageTemplate').innerHTML;
    ImageTemplate = Handlebars.compile(imageTemplate);

    var loadingImagesTemplate = document.getElementById('LoadingImagesTemplate').innerHTML;
    LoadingImagesTemplate = Handlebars.compile(loadingImagesTemplate);

    var noImageUploadedTemplate = document.getElementById('NoImageUploadedTemplate').innerHTML;
    NoImageUploadedTemplate = Handlebars.compile(noImageUploadedTemplate);

    var previewImageTemplate = document.getElementById('PreviewImageTemplate').innerHTML;
    PreviewImageTemplate = Handlebars.compile(previewImageTemplate);

}

function LoadImagesTabContent(contextId, PevId, PevDocTypeId, ReferenceId) {
    // Clear all current check items
    ClearAllCheckItemImages();
    // find all of the check item containers
    LoadTabImagesForCheckItems(contextId, PevId, PevDocTypeId, ReferenceId, true);
}

function LoadTabImagesForCheckItems(contextId, PevId, PevDocTypeId, ReferenceId, fadeAllIn) {
    // Show any non-filtered check item containers and add a loading image 
    $.each($("li[id='checkid'"), function (i, CheckItemListElement) {
        $(CheckItemListElement).fadeIn(FadeInDelay);
        var loadingImagesTemplate = LoadingImagesTemplate();
        $('ul#CheckItemImages').append(loadingImagesTemplate).fadeIn(FadeInDelay);
    });
    // load the check items
    var imagesJSON = {
        PevDocTypeId: PevDocTypeId,
        ReferenceId: ReferenceId
    };
    TabImagesLoadedJSON(imagesJSON, contextId, PevId);
    return false;
}


function TabImagesLoadedJSON(imagesJSON, contextId, PevId) {
    // parse the json
    var image = imagesJSON;

    // loop through each image
    // create the image containers
    AddCheckItemTabImage(contextId, PevId, image);


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


function AddCheckItemTabImage(contextId, pevId, image, fadeIn) {

    // Create the handlebars template
    var imageTemplate;
    var imageId = image.ReferenceId + "_" + image.PevDocTypeId;
    $(".loading").show();
    // load the check items 
    $.ajax({
        type: "POST",
        url: '/PEV/_LoadPEVImage',
        data: {
            PevId: pevId,
            DocTypeId: image.PevDocTypeId,
            ReferenceId: image.ReferenceId
        },
        success: function (data) {
            var unorderedList = $('ul #CheckItemImages');
            if (data.Status === 200) {
                unorderedList.append(data.Object);
                if (fadeIn === true) {
                    $('li#PevFileImage div.image-wrapper').fadeIn(FadeInDelay);
                } else {
                    $('li#PevFileImage div.image-wrapper').show();
                }

            } else {
                notify('error', data.Message);
            }
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
            $(".loading").hide();
        }
    });
}

//preview Image
function PreviewImage(contextId, PevId, imageId) {
    var url = "/PEV/ScanImageBase64" + "?abc=" + contextId.toString() + "&PevId=" + PevId.toString() + "&imageId=" + imageId.toString() + "&width=1024&firstPageOnly=false";
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
                OpenDefaultImagePopup("", $img.get(0));
                if (onLoad !== null)
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
            if (this !== ui.item.parent()[0]) {
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

        if ($(this).find('li:not(.ui-sortable-helper)').length === 0) {
            var noImageUploadedTemplate = NoImageUploadedTemplate();
            $(this).append(noImageUploadedTemplate);
        }

    });
}

function ResizeCheckItemFileUploadProgressPopup() {
    $("div#CheckitemUploadContainer").colorbox.resize();
}
