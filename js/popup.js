const formInput = document.querySelector('.container form');

const [input] = formInput;


formInput.addEventListener('submit', (event) => {
	event.preventDefault();

	lookupMacAndress.getMAC(input.value).then((resolvedJson) => {

		input.value = 'Please wait';

		if (resolvedJson === undefined) {
			input.value = 'Not Found';
			return
		}
		input.value = resolvedJson;


	}).catch((error) => {
		alert("Request failed " + error.message);
		input.value = '';
	});

});