const id = "1"

chrome.action.onClicked.addListener( async ( ) => {
    // get all  registered content script details
    const activeScripts = await chrome.scripting.getRegisteredContentScripts()

    if(activeScripts.find((x) => x.id === id) ){
        chrome.scripting.unregisterContentScripts({
            ids: [id],
        })

    }else{
        chrome.scripting.registerContentScripts([
            {
                id,
                matches: ["<all_urls>"],
                js: ["p5.js", "sketch.js"]
            }
        ])
    }
})
