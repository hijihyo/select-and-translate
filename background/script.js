let response = null;

let source = "en";
let target = "ko";
let original = "";
let translated = "";

chrome.runtime.onInstalled.addListener(function () {
    const data = {
        source : source,
        target : target,
        original : original,
        translated : translated
    };
    chrome.storage.local.set(data , function () {
        console.log("[STORAGE] initialized :");
        console.log(data);
    });
});

chrome.storage.onChanged.addListener(function (changes) {
    for (let key in changes) {
        console.log("[STORAGE] changed :");
        switch (key) {
            case "source" : source = changes[key].newValue;
                            console.log({ source : source });
                            break;
            case "target" : target = changes[key].newValue;
                            console.log({ target : target });
                            break;
            case "original" : original = changes[key].newValue;
                              console.log({ original : original });
                              break;
            case "translated" : translated = changes[key].newValue;
                                console.log({ translated : translated });
                                break;
        }
    }
});

chrome.runtime.onMessage.addListener(function (msg, sender) {
    if ('type' in msg && msg.type == "selection") {
        if ('action' in msg && msg.action == "change") {
            const req = new XMLHttpRequest();
            const url = "https://openapi.naver.com/v1/papago/n2mt"

            console.log("[MESSAGE] arrived : " + msg.type + " > " + msg.action);

            original = msg.data;
            chrome.storage.local.set({ original : original });
            const params = `source=${source}&target=${target}&text=${original}`;

            req.open("POST", url, true);
            req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
            req.setRequestHeader("X-Naver-Client-Id", "x7v1LjFBDYMSLQ2oacfx");
            req.setRequestHeader("X-Naver-Client-Secret", "1jcdsi8_bR");
            req.send(params);
            
            req.onreadystatechange = function () {
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    console.log("[TRANSLATE] completed : " + source + " → " + target);

                    response = JSON.parse(this.response);
                    translated = response.message.result.translatedText;
                    
                    chrome.storage.local.set({ translated : translated });
                }
            };
        }
    }
})