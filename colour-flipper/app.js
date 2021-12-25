const simpleColours = [
	'rgb(198, 226, 233)',
	'rgb(167, 190, 211)',
	'rgb(241, 255, 196)',
	'rgb(255, 202, 175)',
	'rgb(218, 184, 148)',
];

document.getElementById('generate-btn').addEventListener('click', () => {
	let numColours = simpleColours.length;
	let randNum = Math.floor(Math.random() * numColours);
	let randColour = simpleColours[randNum];
	while (randColour === document.body.style.background) {
		randNum = Math.floor(Math.random() * numColours);
		randColour = simpleColours[randNum];
	}
	document.body.style.background = randColour;
});
