window.clickButton = {
    clickElement: function (selector) {
        var btn = document.querySelector(selector);
        if (btn && btn.click) {
            btn.click();
        }
    }
}

    
