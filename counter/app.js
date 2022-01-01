let increaseButton = document.getElementById('increase-button');
let decreaseButton = document.getElementById('decrease-button');
let counter = document.getElementById('count');

increaseButton.addEventListener('click', () => {
	counter.innerText++;
	handleColourChange();
});
decreaseButton.addEventListener('click', () => {
	counter.innerText--;
	handleColourChange();
});

function handleColourChange() {
	let count = counter.innerText;
	if (count > 0) {
		counter.style.color = '#00a86b';
	} else if (count < 0) {
		counter.style.color = '#cb4154';
	} else {
		// count === 0
		counter.style.color = 'black';
	}
}
