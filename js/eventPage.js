const apiurl = 'https://godri.me/LookupMACAddress/mac.json';

const lookupMacAndress = {
    getMAC: async (MACAddress) => {
        if(lookupMacAndress.isValidInputValue(MACAddress)){
            return 'Invalid Format';
        }
        const response = await fetch(`${apiurl}`);
       
       const macClear = MACAddress.replace(/\D/g, "").substring(0, 6)
       
       const responseJson = await response.json();
   
       const match = responseJson.find(item => item.mac === macClear)
   
       return match.vendor;
    },
    isValidInputValue:(mac)=>{
        const ismac = lookupMacAndress.regexMACAdress(mac);
        if(ismac.length < 6){
            return true;
        }
        return false;
    },
    regexMACAdress:(mac) => {
        const macRegex = mac.replace(/[^0-9a-fA-F]/g, '')
        let MACNumbers = ""
        for (let i = 0; i < 6; i++) {
            MACNumbers += macRegex.charAt(i);
        }
        return MACNumbers.toUpperCase();
    }
    
}


const contextmenuItem = {
    "id": "Lookup-MAC-Address",
    "title": "Lookup MAC Address",
    "contexts": ["selection"]
};
chrome.contextMenus.create(contextmenuItem);

chrome.contextMenus.onClicked.addListener((info, tab) => {
    
            lookupMacAndress.getMAC(info.selectionText).then((resolvedJson) => {
            if(resolvedJson === undefined){
                alert('The search term did not return any results');
                return;
            }
            alert(resolvedJson);
        }).catch((error) => {
            "Request failed " + error.message;
         })
  });