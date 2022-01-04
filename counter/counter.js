let increaseButton = document.getElementById('increase-button');
let decreaseButton = document.getElementById('decrease-button');
let resetButton = document.getElementById('reset-button');
let counter = document.getElementById('count');

increaseButton.addEventListener('click', () => {
	counter.innerText++;
	handleColourChange();
	triggerCounterAnim();
});
decreaseButton.addEventListener('click', () => {
	counter.innerText--;
	handleColourChange();
	triggerCounterAnim();
});
resetButton.addEventListener('click', () => {
	counter.innerText = 0;
	handleColourChange();
});

function handleColourChange() {
	let count = counter.innerText;
	if (count > 0) {
		// green green
		counter.style.color = '#00a86b';
	} else if (count < 0) {
		// red text
		counter.style.color = '#cb4154';
	} else {
		// count === 0
		counter.style.color = 'black';
	}
}

function triggerCounterAnim() {
	counter.classList.add('jump');

	setTimeout(() => {
		counter.classList.remove('jump');
	}, 100);
}
