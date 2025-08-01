//
//
// Handle Flash messages automatically going away.
//
//
// Make sure you put this in application.js:
//
//     import AppFlash from '@commoncore/app_flash.js';
//     AppFlash.setup();
//

function disableFlashMsg() {
    const flashContent = document.getElementById("flash_content");
    if (flashContent) {
        flashContent.style.display = "none";
    }
}

function setup(){
    const flashContent = document.getElementById("flash_content");
    if (flashContent) {
        // Automatically disable flash message after 10 seconds
        setTimeout(disableFlashMsg, 10000);

        // Attach a click event listener to the entire document
        document.addEventListener("click", function() {
            disableFlashMsg();
        });
    }
}

export default {
    setup
};
