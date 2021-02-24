
function stringGen(len) {
    var text = " ";
    var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < len; i++)
        text += charset.charAt(Math.floor(Math.random() * charset.length));
    return text;
}

function impersonateUser(userId) {

    // added security use controller to set cookie
    $.post("/User/ImpersonateUser", {
        UserId: userId
    }
    , function (data) {
        if (data.Success) {
            window.location.replace("/Security/Logout");
        } else {
            handleError(data.ErrorText);
        }
    });
}

function stopImpersonation() {
    Cookies.remove("ImpersonateUserId", { path: "/" });
    var url = "/Security/Logout?Impercination=Remove";
    window.location.replace(url)
    //window.location.replace("/Security/Logout?userid=1290");
}

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function delimitFromMap(data, dataField) {
    var result = "";
    $.map(data.toJSON(), function (dataItem, index) {
        result += result != "" ? "|" : "";
        result += dataItem[dataField];
    });
    return result;
}

function delimitFromObject(obj, dataField) {
    var result = "";
    $.each(obj, function (index, value) {
        result += result != "" ? "|" : "";
        result += this[dataField];
    });
    return result;
}

function delimitFromDom(selector) {
    var result = "";
    $(selector).each(function () {
        result += result == "" ? "" : "|";
        result += $(this).val();
    });
    return result;
}

function htmlEncode(value) {
    return $('<div/>').text(value).html();
}

function htmlDecode(value) {
    return $('<div/>').html(value).text();
}

function encode(value) {
    return value.replace(/"/g, '\\"').replace(/'/g, "\\'");
}

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};

function setDDL(selector, value) {
    $(selector).data("kendoDropDownList").value(value == null ? 0 : value);
}

function isIcheckChecked(selector) {
    return $(selector).parent('[class*="icheckbox"]').hasClass("checked");
}

function getSelectedKendoItem(selector, kendoType) {
    var control = $(selector).data(kendoType);
    var selected = control.select();
    if (selected) {
        return control.dataItem(selected);
    } else {
        return null;
    }
}

function controlCRUDButtons(label, bool) {
    $("#add" + label + "Button").data("kendoButton").enable(bool);
    $("#update" + label + "Button").data("kendoButton").enable(bool);
    $("#delete" + label + "Button").data("kendoButton").enable(bool);
}

function setICheck() {
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox',
        radioClass: 'iradio',
    });
}

function selectRadioButtonByValue(name, value) {
    //$("input[name=" + name + "][value=" + value + "]").prop('checked', true);
    $("input[name=" + name + "][value=" + value + "]").iCheck("check");
}

function expandTreeNodesByType(tree, nodes, type) {
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].Type == type) {
            var node = tree.findByText(nodes[i].Name);
            tree.expand(node);
        }

        if (nodes[i].hasChildren) {
            expandTreeNodesByType(tree, nodes[i].children.view(), type);
        }
    }
}

function forceGridSelect(e, grid) {
    $("#" + grid + " .k-grid-content").find("tr").removeClass("k-state-selected");
    $(e.currentTarget).closest("tr").addClass("k-state-selected");
}

function forceUniformHeight(selector) {
    var heights = $(selector).map(function () {
        return $(this).height();
    }).get();

    var maxHeight = Math.max.apply(null, heights);

    $(selector).css("height", maxHeight + "px");
}

function removeFromDataSource(datasource, idToRemove) {
    var d = datasource.data();
    for (i = d.length - 1; i >= 0; i--) {
        if (idToRemove === d[i].Id) {
            datasource.remove(d[i]);
        }
    }
}

function removeAllFromDataSource(datasource) {
    datasource.data([]);
}

function clearKendoControl(selector, type) {
    var obj = $(selector).data(type);
    removeAllFromDataSource(obj.dataSource);
}

function loadToTree(url, Id, tree, typeFilter, callback) {
    var t = $("#" + tree).data('kendoTreeView')
        , ds = t.dataSource;

    $.get(url, {
        id: Id
    }
     , function (data) {

         // removed all checked data access
         $("input[name='checkedItems']:checkbox").removeAttr("checked");

         // set checked items
         var obj = $.parseJSON(JSON.stringify(data))
             , checkbox
             , icon
             , type
             , count = 0;

         $.each(obj, function (index, value) {
             if (this != undefined) {

                 if (typeFilter && typeFilter != "") {
                     checkbox = $("input:checkbox[value=" + this.Id + "]")
                         .parent()
                         .next()
                         .find("img[src$='/Images/" + typeFilter + ".png']")
                         .parent()
                         .prev()
                         .find("input:checkbox[value=" + this.Id + "]");
                 } else {
                     checkbox = $("input:checkbox[value=" + this.Id + "]");
                 }

                 if (!this.Type) {
                     checkbox.prop("checked", true);
                     count++;
                 } else {
                     icon = checkbox.parent().next().find(".k-image").attr("src");
                     if (icon != undefined) {
                         type = icon.replace("/Images/", "").replace(".png", "");
                         if (type == this.Type) {
                             checkbox.prop("checked", true);
                             count++;
                         }
                     }
                 }
             }
         })

         if (callback && typeof (callback) === "function") {
             callback(count);
         }
     });
}

function expandAllTreeNodes(e) {
    var tree = e.sender;
    tree.expand(".k-item");
}

function preventDefault(e) {
    e.preventDefault();
}

function notify(type, msg, pb, to, eto) { // types = success, info, warning, error

    var progressBar = pb == undefined ? true : pb;
    var timeOut = to == undefined ? "7000" : to;
    var extendedTimeOut = eto == undefined ? "1000" : eto;

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "progressBar": progressBar,
        "positionClass": "toast-top-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "400",
        "hideDuration": "1000",
        "timeOut": timeOut,
        "extendedTimeOut": extendedTimeOut,
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr[type](msg, type);
}

function error_handler(e) {
    if (e.errors) {
        $.each(e.errors, function (key, value) {
            if ('errors' in value) {
                $.each(value.errors, function () {
                    parseExMessage(this);
                });
            }
        });
    }
}

function handleError(errMsg) {
    var message = "Errors:\n";
    parseExMessage(errMsg);
}

function parseExMessage(errMsg) {
    var message = "";
    if (errMsg.indexOf('|') != -1) {
        var parts = errMsg.split('|');
        $.post("/Shell/GetError/", {
            Id: parts[0]
        }
        , function (data) {
            message += parts[1] + "<div><a class=\"toggleErrMsg\">-See details <i class=\"fa fa-chevron-down small\"></i></a></div>";
            message += "<div id=\"errorDetails" + data.Id + "\" class=\"p-t-xs collapse\">";
            message += "<p>ID:<br/>" + data.Id + "<p>";
            message += "<p>Procedure:<br/>" + data.Procedure + "<p>";
            message += "<p>Error Number:<br/>" + data.ErrorNumber + "<p>";
            message += "<p>Line Number:<br/>" + data.LineNumber + "<p>";
            message += "<p>Message:<br/>" + data.ErrMessage + "<p>";
            message += "<p>User Name:<br/>" + data.UserName + "<p>";
            message += "<p>DateStamp:<br/>" + kendo.parseDate(data.DateStamp) + "<p>";
            message += "</div>";
            notify("error", message, false, 0, 0);
            $("a.toggleErrMsg").click(function (e) {
                $("#errorDetails" + data.Id).collapse("toggle");
                e.stopPropagation();
            })
            $("#errorDetails" + data.Id).click(function (e) {
                e.stopPropagation();
            })
            $(".collapse").on("hide.bs.collapse", function () {
                $(".toggleErrMsg").html("-See details <i class=\"fa fa-chevron-down small\"></i>");
            });
            $(".collapse").on("show.bs.collapse", function () {
                $(".toggleErrMsg").html("-See details <i class=\"fa fa-chevron-up small\"></i>");
            });
        });
    } else {
        message += errMsg + "\n";
        notify("error", message, false, 0, 0);
    }
}

// Vin Checker

var zxcNAry = new Array(['A', 1], ['B', 2], ['C', 3], ['D', 4], ['E', 5], ['F', 6], ['G', 7], ['H', 8], ['J', 1], ['K', 2], ['L', 3], ['M', 4], ['N', 5], ['P', 7], ['R', 9], ['S', 2], ['T', 3], ['U', 4], ['V', 5], ['W', 6], ['X', 7], ['Y', 8], ['Z', 9]);
var zxcWAry = new Array(8, 7, 6, 5, 4, 3, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2)

function validVIN(vin) {

    var zxcipv = vin.toUpperCase();
    var zxct = true;

    if (zxcipv.match(/I|O|Q/)) {
        return false;
    }

    if (zxcipv.length != 17) {
        return false;
    }

    var zxcip1 = zxcipv.substring(0, 8);
    var zxcip2 = zxcipv.substring(9, 17);
    var zxcip3 = zxcip1 + zxcip2;
    var zxcip4 = '';

    for (var zxc0 = 0; zxc0 < zxcip3.length; zxc0++) {
        zxct = zxcip3.charAt(zxc0);
        for (zxc1 = 0; zxc1 < zxcNAry.length; zxc1++) {
            if (zxct == zxcNAry[zxc1][0]) {
                zxct = zxcNAry[zxc1][1];
            }
        }
        zxcip4 += zxct;
    }

    zxct = 0;

    for (zxc2 = 0; zxc2 < zxcWAry.length; zxc2++) {
        zxct += zxcip4.charAt(zxc2) * zxcWAry[zxc2];
    }

    zxct = zxct % 11;

    if (zxct == 10) { zxct = 'X'; }

    if (zxct != zxcipv.charAt(8)) {
        return false;
    }
    else {
        return true;
    }
}


/*!
 * jQuery Plugin: Are-You-Sure (Dirty Form Detection)
 * https://github.com/codedance/jquery.AreYouSure/
 *
 * Copyright (c) 2012-2014, Chris Dance and PaperCut Software http://www.papercut.com/
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Author:  chris.dance@papercut.com
 * Version: 1.9.0
 * Date:    13th August 2014
 */
(function ($) {

    $.fn.areYouSure = function (options) {

        var settings = $.extend(
          {
              'message': 'You have unsaved changes!',
              'dirtyClass': 'dirty',
              'change': null,
              'silent': false,
              'addRemoveFieldsMarksDirty': false,
              'fieldEvents': 'change keyup propertychange input',
              'fieldSelector': ":input:not(input[type=submit]):not(input[type=button])"
          }, options);

        var getValue = function ($field) {
            if ($field.hasClass('ays-ignore')
                || $field.hasClass('aysIgnore')
                || $field.attr('data-ays-ignore')
                || $field.attr('name') === undefined) {
                return null;
            }

            if ($field.is(':disabled')) {
                return 'ays-disabled';
            }

            var val;
            var type = $field.attr('type');
            if ($field.is('select')) {
                type = 'select';
            }

            switch (type) {
                case 'checkbox':
                case 'radio':
                    val = $field.is(':checked');
                    break;
                case 'select':
                    val = '';
                    $field.find('option').each(function (o) {
                        var $option = $(this);
                        if ($option.is(':selected')) {
                            val += $option.val();
                        }
                    });
                    break;
                default:
                    val = $field.val();
            }

            return val;
        };

        var storeOrigValue = function ($field) {
            $field.data('ays-orig', getValue($field));
        };

        var checkForm = function (evt) {

            var isFieldDirty = function ($field) {
                var origValue = $field.data('ays-orig');
                if (undefined === origValue) {
                    return false;
                }
                return (getValue($field) != origValue);
            };

            var $form = ($(this).is('form'))
                          ? $(this)
                          : $(this).parents('form');

            // Test on the target first as it's the most likely to be dirty
            if (isFieldDirty($(evt.target))) {
                setDirtyStatus($form, true);
                return;
            }

            $fields = $form.find(settings.fieldSelector);

            if (settings.addRemoveFieldsMarksDirty) {
                // Check if field count has changed
                var origCount = $form.data("ays-orig-field-count");
                if (origCount != $fields.length) {
                    setDirtyStatus($form, true);
                    return;
                }
            }

            // Brute force - check each field
            var isDirty = false;
            $fields.each(function () {
                $field = $(this);
                if (isFieldDirty($field)) {
                    isDirty = true;
                    return false; // break
                }
            });

            setDirtyStatus($form, isDirty);
        };

        var initForm = function ($form) {
            var fields = $form.find(settings.fieldSelector);
            $(fields).each(function () { storeOrigValue($(this)); });
            $(fields).unbind(settings.fieldEvents, checkForm);
            $(fields).bind(settings.fieldEvents, checkForm);
            $form.data("ays-orig-field-count", $(fields).length);
            setDirtyStatus($form, false);
        };

        var setDirtyStatus = function ($form, isDirty) {
            var changed = isDirty != $form.hasClass(settings.dirtyClass);
            $form.toggleClass(settings.dirtyClass, isDirty);

            // Fire change event if required
            if (changed) {
                if (settings.change) settings.change.call($form, $form);

                if (isDirty) $form.trigger('dirty.areYouSure', [$form]);
                if (!isDirty) $form.trigger('clean.areYouSure', [$form]);
                $form.trigger('change.areYouSure', [$form]);
            }
        };

        var rescan = function () {
            var $form = $(this);
            var fields = $form.find(settings.fieldSelector);
            $(fields).each(function () {
                var $field = $(this);
                if (!$field.data('ays-orig')) {
                    storeOrigValue($field);
                    $field.bind(settings.fieldEvents, checkForm);
                }
            });
            // Check for changes while we're here
            $form.trigger('checkform.areYouSure');
        };

        var reinitialize = function () {
            initForm($(this));
        }

        if (!settings.silent && !window.aysUnloadSet) {
            window.aysUnloadSet = true;
            $(window).bind('beforeunload', function () {
                $dirtyForms = $("form").filter('.' + settings.dirtyClass);
                if ($dirtyForms.length == 0) {
                    return;
                }
                // Prevent multiple prompts - seen on Chrome and IE
                if (navigator.userAgent.toLowerCase().match(/msie|chrome/)) {
                    if (window.aysHasPrompted) {
                        return;
                    }
                    window.aysHasPrompted = true;
                    window.setTimeout(function () { window.aysHasPrompted = false; }, 900);
                }
                return settings.message;
            });
        }

        return this.each(function (elem) {
            if (!$(this).is('form')) {
                return;
            }
            var $form = $(this);

            $form.submit(function () {
                $form.removeClass(settings.dirtyClass);
            });
            $form.bind('reset', function () { setDirtyStatus($form, false); });
            // Add a custom events
            $form.bind('rescan.areYouSure', rescan);
            $form.bind('reinitialize.areYouSure', reinitialize);
            $form.bind('checkform.areYouSure', checkForm);
            initForm($form);
        });
    };
})(jQuery);