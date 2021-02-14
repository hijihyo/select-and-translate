let selectionEndTimeout = null;

window.onload = () => {
    document.onselectionchange = function () {
        if (selectionEndTimeout) {
            clearTimeout(selectionEndTimeout);
        }

        selectionEndTimeout = setTimeout(function () {
            $(window).trigger('selectionend');
        }, 1000);
    };
    $(window).bind('selectionend', function () {
        selectionEndTimeout = null;

        let selectedText = window.getSelection().toString();
        chrome.runtime.sendMessage(chrome.runtime.id,
            {
                type : "selection",
                action : "change",
                data : selectedText
            }
        );
    })
};