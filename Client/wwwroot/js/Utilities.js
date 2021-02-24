function initializeInactivityTimer(dotnetHelper) {

    var theUserIdleTimer = null;
    var iTimeoutLength = 60*60*1000;

    document.onkeypress = resetUserIdleTimer;
    document.onmousedown = resetUserIdleTimer;
    document.ontouchstart = resetUserIdleTimer;
    document.onclick = resetUserIdleTimer;
    document.onkeypress = resetUserIdleTimer;
    document.onmousemove = resetUserIdleTimer; 
   
  
    function logout() {
        let timeleft = 10;
        dotnetHelper.invokeMethodAsync("TimerPopup");
        let schedular = setInterval(function () {
            if (timeleft <= 0) {
                dotnetHelper.invokeMethodAsync("Logout");
            } else {
                if (document.getElementById("timeremaining"))
                    document.getElementById("timeremaining").textContent = timeleft;
                else {
                    clearInterval(schedular);
                    return false;
                }
                console.log(timeleft + " seconds remaining");
            }
            timeleft -= 1;
        }, 1000);
    }

    function resetUserIdleTimer() {
        if (theUserIdleTimer)
            window.clearTimeout(theUserIdleTimer);
        theUserIdleTimer = setTimeout(logout, iTimeoutLength)
    }

}





