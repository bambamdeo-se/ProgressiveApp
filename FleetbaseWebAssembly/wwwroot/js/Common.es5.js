//====== Enums & Constants =========

'use strict';

var ajaxRequestQueue = [];

var MessageType = {
    Success: 1,
    Error: 2,
    Warning: 3,
    None: 4
};

var ActionStatus = {
    Success: 200,
    Error: 400
};

//====== End Enums & Constants =====

$(document).ready(function () {
    $(document).on('click', '.msg-outer', function () {
        $(this).fadeOut();
    });
    $.ajaxSetup({ cache: false });
});

$.ShowThrobber = function (throbberPosition, throbberCenter) {
    if (throbberCenter == true) {
        $("#MainThrobberImage").show();
        $("#lightbox_overlay").show();
    } else {
        $("#MainThrobberImage").show().position(throbberPosition);
    }
};

$.RemoveThrobber = function () {
    $("#MainThrobberImage").hide();
    $("#lightbox_overlay").hide();
};

$.ShowMessage = function (messageSpan, message, messageType) {
    /*================= Sample Usage =========================
    $.ShowMessage($(selector), "This is a dummy message", MessageType.Success)
    ==========================================================*/
    if (message != null && message != undefined && message != '') {
        if (messageType == MessageType.Success) {
            $(messageSpan).html(message).removeClass('error').removeClass("info").addClass("success").parent().fadeIn();
            $(messageSpan).parent().removeClass('bgred');
            //$("html,body").animate({ scrollTop: "0" }, "slow");
        } else if (messageType == MessageType.Error) {
                $(messageSpan).html(message).addClass('error').removeClass("success").removeClass("info").parent().fadeIn();
                $(messageSpan).parent().addClass('bgred');
                //$("html,body").animate({ scrollTop: "0" }, "slow");
            } else if (messageType == MessageType.Warning) {
                    $(messageSpan).html(message).removeClass("success").addClass("info").parent().fadeIn();
                    $(messageSpan).parent().removeClass('bgred');
                    $("html,body").animate({ scrollTop: "0" }, "slow");
                } else $(messageSpan).html('').parent().hide();
    } else $(messageSpan).html('').parent().hide();
};

$.ajaxExt = function (parameters) {
    /*=====================================Sample Usage======================================================
    $.ajaxExt({
    type: "POST",                                                                                       //default is "POST"
    error: function () { },                                                                             //called when an unexpected error occurs
    data: {name: "value"}                                                                               //overwrites the form parameter
    messageControl:  $(selector),                                                                       //the control where the status message needs to be displayed
    throbberPosition: { my: "left center", at: "right center", of: sender, offset: "5 0" },             //the position at which the throbber needs to be displayed 
    url: url,                                                                                           //the url that needs to be hit
    success: function (data) {},                                                                        //called after the request has been executed without any unhandeled exception
    showThrobber: false                                                                                 //If the throbber need to be displayed
    showErrorMessage : true                                                                             //If the error message needs to be displayed
    containFiles: false                                                                                 //If the form contains files            
    formToPost: $('form'),                                                                               //The reference to the form to be posted
    abort: true,                                                                                        // Pass this parameter if you want to abort the ajax request on focus lost
    forPopup: true,                                                                                      // Pass this as true if want to open the result in a popup
    title: 'popupTitle',
    width:300,
    html:"htmlcontent" //The html content that need to be shown in the popup
    });
    ===============================================================================================*/
    function onError(a, b, c, parameters) {

        if (parameters.showErrorMessage != false) $.ShowMessage($(parameters.messageControl), "Unexpected Error", MessageType.Error);else if (parameters.error != undefined) parameters.error("Unexpected Error");

        if (parameters.showThrobber == true) $.RemoveThrobber();
    }

    function _beforeSubmit() {
        parameters.beforeSubmit();
    }

    function onSuccess(data, parameters) {
        // console.clear();  

        if (parameters.showThrobber == true) $.RemoveThrobber();

        try {
            if (data.Status == undefined) {
                if (parameters.showErrorMessage != false) $.ShowMessage($(parameters.messageControl), "Invalid data returned in the response", MessageType.Error);else if (parameters.error != undefined) parameters.error("Invalid data returned in the response");

                return false;
            }
        } catch (ex) {
            if (parameters.showErrorMessage != false) $.ShowMessage($(parameters.messageControl), "Invalid data returned in the response", MessageType.Error);else if (parameters.error != undefined) parameters.error("Invalid data returned in the response");
        }

        if (data.Status == ActionStatus.Error) {
            if (parameters.successServerError != undefined && parameters.successServerError != null) parameters.successServerError(data);
            if (parameters.showErrorMessage != false) $.ShowMessage($(parameters.messageControl), data.Message, MessageType.Error);
            //if (parameters.error != undefined) {
            //    parameters.error(data.Message);
            //}
            if (data.Results != undefined && data.Results[0] == 'LoginExipred') window.location.href = data.Results[1];
            // else if (data.Results != undefined && data.Results[0] == "HttpRequestValidationException")
            //alert(data.Message);
            //else
            //alert(data.Message)
            else if (parameters.error != undefined) parameters.error(data, data.Message);
        } else if (parameters.success) {
            if (parameters.forPopup == true) {
                $.OpenPopup(parameters, data.Results);
                $('.backgroundPopup').show();
            } else {
                $.ShowMessage($(parameters.messageControl), data.Message, MessageType.Success);
                parameters.success(data, data.Message);
            }
            setTimeout(function () {
                var h = $('.inner-popup').outerHeight();
                if (h > 0) $('.popupbox').css({ 'height': h + 'px' });
            }, 100);
        }
    }

    parameters.type = parameters.type == undefined ? "POST" : parameters.type;
    parameters.showErrorMessage = parameters.showErrorMessage == undefined ? false : parameters.showErrorMessage;
    parameters.showThrobber = parameters.showThrobber == undefined ? true : parameters.showThrobber;
    parameters.validate = parameters.validate == undefined ? false : parameters.validate;
    parameters.containFiles = parameters.containFiles == undefined ? false : parameters.containFiles;

    if (parameters.validate == true) {
        var isValidForm = $(parameters.formToValidate).valid();
        if (!isValidForm) return false;
    }

    if (parameters.showErrorMessage != false) $.ShowMessage($(parameters.messageControl), "", MessageType.None);
    if (parameters.showThrobber == true) {
        if (parameters.throbberPosition == undefined) parameters.throbberPosition = { my: "center center", at: "center center", of: $(window), offset: "5 0" };
        $.ShowThrobber(parameters.throbberPosition, parameters.throbberCenter);
    }
    if (parameters.forPopup == true && parameters.html != "" && parameters.html != undefined) {
        $(parameters.html).show();
    } else {
        if (parameters.containFiles == true) {
            // inside event callbacks 'this' is the DOM element so we first
            // wrap it in a jQuery object and then invoke ajaxSubmit
            $(parameters.formToPost).ajaxSubmit({
                target: parameters.messageControl, // target element(s) to be updated with server response
                beforeSubmit: function beforeSubmit() {
                    if (parameters.beforeSubmit != undefined && parameters.beforeSubmit != null) _beforeSubmit();$.ShowThrobber(parameters.throbberPosition, parameters.throbberCenter);
                }, // pre-submit callback
                success: function success(data) {
                    onSuccess(data, parameters);
                }, // post-submit callback
                // other available options:
                url: parameters.url, // override for form's 'action' attribute
                type: parameters.type, // 'get' or 'post', override for form's 'method' attribute
                dataType: 'json', // 'xml', 'script', or 'json' (expected server response type)
                clearForm: false, // clear all form fields after successful submit
                resetForm: false, // reset the form after successful submit
                cache: false
            });

            // !!! Important !!!
            // always return false to prevent standard browser submit and page navigation
            return false;
        } else {
            // Enable Div Overlay to prevent user clicks to interrupt ajax request.
            //$('#lightbox_overlay').show();
            $('body').removeClass('SetOverflow');
            var request = $.ajax({
                url: parameters.url,
                type: parameters.type,
                dataType: "json",
                cache: false,
                data: parameters.data,
                error: function error(a, b, c) {
                    $('#lightbox_overlay').hide();$('body').addClass('SetOverflow');onError(a, b, c, parameters);
                },
                success: function success(data) {
                    $('#lightbox_overlay').hide();$('body').addClass('SetOverflow');onSuccess(data, parameters);
                }
            });
            if (parameters.abort == true) ajaxRequestQueue.push(request);
        }
    }
};

$.OpenPopup = function (parameters, data) {
    var offsetX = parameters.offsetX == undefined ? "0" : parameters.offsetX;
    var offsetY = parameters.offsetY == undefined ? "0" : parameters.offsetY;
    $("#lightBox div.popUpContent h4[name=Title]").html(parameters.title);
    $("#lightBox").show().position({ my: "center center", at: "center center", of: $(window), offset: offsetX + " " + offsetY });
    $("#lightBox div.popUpContent div[name=ActualContent]").html(data[0]).css({ 'overflow-y': 'auto', 'overflow-x': 'hidden', 'width': parameters.width });
    $("#lightBox").show()
    //.css({ 'min-height': '400px' })
    .position({ my: "center center", at: "center center", of: $(window), offset: offsetX + " " + offsetY });
    $('.popUp .popUpContent .selectbox-section ul').css({ 'width': parameters.width - 4 + 'px' });
    var form = $("#lightBox form:first");
    $.ResetUnobtrusiveValidation(form);
};

$.CenterPopupWindow = function (parameters) {
    var offsetX = parameters.offsetX == undefined ? "0" : parameters.offsetX;
    var offsetY = parameters.offsetY == undefined ? "0" : parameters.offsetY;
    var maskHeight = $(window).height();
    var maskWidth = $(window).width();
    var dislogHeight = parameters.height;
    var dialogTop = (maskHeight - dislogHeight) / 2;
    var dialogLeft = (maskWidth - $('#lightBox').width()) / 2;
    //if (dialogTop > 300) dialogTop = dialogTop - 150;
    //dialogTop = 30;
    $.ScrollToTop();
    setTimeout(function () {
        $("#lightBox").css({ top: dialogTop, left: dialogLeft }).css("max-width", maskWidth - 50);
        $("#lightBox").fadeIn();
    }, 100);
    //$("#lightBox").show().position({ my: "center center", at: "center center", of: $(window), offset: offsetX + " " + offsetY });
};

$(document).on('click', '.popupbox .inner-popup .close-btn', function () {
    $.ClosePopupWindow();
});

$.ClosePopupWindow = function () {
    $('.backgroundPopup').fadeOut(300);
    $("#lightBox").fadeOut(300);
    $("#lightbox_overlay").fadeOut(300);
    $("#lightBox").remove();
    $("#lightbox_overlay").remove();
    $("#lightbox_overlay").hide();
    $('body').addClass('SetOverFlow');
};

$.ResetUnobtrusiveValidation = function (form) {
    form.removeData('validator');
    form.removeData('unobtrusiveValidation');
    $.validator.unobtrusive.parse(form);
};

if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return $.trim(this);
    };
}
$.ScrollToTop = function () {
    var offset = 20;
    var duration = 500;
    $('html, body').animate({ scrollTop: 0 }, duration);
    //$(window).scroll(function () {
    //    if ($(this).scrollTop() > offset) $('.back-to-top').fadeIn(duration);
    //    else $('.back-to-top').fadeOut(duration);
    //});

    //$('.back-to-top').click(function (event) {
    //    event.preventDefault();
    //    $('html, body').animate({ scrollTop: 0 }, duration);
    //    return false;
    //});
};

