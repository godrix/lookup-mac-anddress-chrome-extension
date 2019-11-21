const apiurl = 'https://bitbug-tech.umbler.net/api/look-mac-anddress';

const lookupMacAndress = {
    getMAC: async (MACAddress) => {
        if(lookupMacAndress.isValidInputValue(MACAddress)){
            return 'Invalid Format';
        }
        const response = await fetch(`${apiurl}/?mac=${MACAddress}`);
        const {vendor} = await response.json();
        
        return vendor;
    },
    isValidInputValue:(mac)=>{
        let ismac = lookupMacAndress.regexMACAdress(mac)
        if(ismac.length < 6){
            return true
        }
        return false
    },
    regexMACAdress:(mac) => {
        let macRegex = mac.replace(/[^0-9a-fA-F]/g, '')
        let MACNumbers = ""
        for (let i = 0; i < 6; i++) {
            MACNumbers += macRegex.charAt(i)
        }
        return MACNumbers.toUpperCase()
    }
    
}


const contextmenuItem = {
    "id": "Lookup-MAC-Address",
    "title": "Lookup MAC Address",
    "contexts": ["selection"]
};
chrome.contextMenus.create(contextmenuItem)


chrome.contextMenus.onClicked.addListener(function(clickData) {
    if (clickData.menuItemId == "Lookup-MAC-Address" && clickData.selectionText) {
        lookupMacAndress.getMAC(clickData.selectionText).then((resolvedJson) => {
            if(resolvedJson === '{"errors":{"detail":"Not Found"}}'){
                resolvedJson = 'Not Found';
            }
                new Notification("Lookup Mac Address", {
                    icon: 'icon128.png',
                    body: resolvedJson
                });
            
        }).catch((error) => {
            "Request failed " + error.message
        })
    }
});
