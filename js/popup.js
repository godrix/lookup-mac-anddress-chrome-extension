const formInput = document.querySelector('.container form');

const [input] = formInput;


formInput.addEventListener('submit', (event)=>{
	event.preventDefault();
	
	lookupMacAndress.getMAC(input.value).then((resolvedJson) => {
		
		if(resolvedJson === '{"errors":{"detail":"Not Found"}}'){
			resolvedJson = 'Not Found';
		}
		input.value = resolvedJson;
	
		
	}).catch((error) => {
		alert("Request failed " + error.message)
	});
	
});