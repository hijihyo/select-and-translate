window.onload = () => {
    updateContent();
}

chrome.storage.onChanged.addListener(function (changes) {
    if ('translated' in changes) {
        updateContent();
    }
});

function updateContent () {
    let sourceElem = document.getElementById("source");
    let targetElem = document.getElementById("target");
    let originalElem = document.getElementById("original");
    let targetTextElem = document.getElementById("translated");

    chrome.storage.local.get(null, function (data) {
        for (let key in data) {
            switch (key) {
                case "source" : sourceElem.innerText = (data[key] ? data[key].toUpperCase() : "");
                                break;
                case "target" : targetElem.innerText = (data[key] ? data[key].toUpperCase() : "");
                                break;
                case "original" : originalElem.innerText = (data[key] ? data[key] : "");
                                  break;
                case "translated" : targetTextElem.innerText = (data[key] ? data[key] : "");
                                    break;
            }
        }
    });
}