let selectionEndTimeout = null;

window.onload = () => {
    document.onselectionchange = function () {
        if (selectionEndTimeout) {
            clearTimeout(selectionEndTimeout);
        }

        selectionEndTimeout = setTimeout(function () {
            let event = new Event('selection-end');
            window.dispatchEvent(event);
        }, 1000);
    };
    window.addEventListener('selection-end', function () {
        selectionEndTimeout = null;

        let selectedText = window.getSelection().toString();
        if (selectedText) {
            let data = {
                type : "selection",
                action : "change",
                data : selectedText
            };
            chrome.runtime.sendMessage(data, function () {
                console.log("Select&Translate : translated the selected text");
            });
        }
    });
};