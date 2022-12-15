const apiurl = 'https://godri.me/LookupMACAddress/mac.json';
const newApi = 'https://godri.me/LookupMACAddress/?mac=';

function searchMac(mac) {
    // valida o endereço MAC informado
    if (!/^([a-f0-9]{1,2}([:-][a-f0-9]{1,2}){1,5}|[a-f0-9]{6})$/i.test(mac)) {
        return Promise.reject("O endereço MAC é inválido. Deve conter 6 ou 12 caracteres alfanuméricos separados por ':' ou '-'.");
    }


    // envia a requisição para a API de busca de MAC
    return fetch(`${newApi}${mac}`)
        .then(response => {
            // verifica se a resposta é um erro HTTP 404
            if (response.status === 404) {
                throw new Error("O registro com o MAC informado não foi encontrado.");
            }

            // verifica se a resposta é um erro HTTP de outro tipo
            if (response.status >= 400) {
                throw new Error("Ocorreu um erro ao processar a requisição.");
            }

            // converte a resposta em um objeto JSON
            return response.json();
        })
        .then(data => {
            // verifica se o objeto JSON tem o atributo "status"
            if (data.hasOwnProperty("status")) {
                // se o atributo "status" for "error", lança um erro
                if (data.status === "error") {
                    throw new Error(data.message);
                }
            }

            // se o objeto JSON não tem o atributo "status" ou o valor é "success", retorna os dados
            return data;
        }).catch(error => {
        // exibe a mensagem de erro
        alert(error.message);
    });;
}


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
