chrome.runtime.onMessage.addListener(function (msg, callback) {
    if ('type' in msg && msg.type == "test") {
        if ('action' in msg && msg.action == "test")
            console.log("The test message arrived successfully");
    }
    if ('type' in msg && msg.type == "selection") {
        if ('action' in msg && msg.action == "change")
            console.log(msg.data);
    }
})