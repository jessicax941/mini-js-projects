/*
	used colour name converter library from https://chir.ag/projects/ntc/
*/
const simpleColours = [
	'rgb(22, 160, 133)',
	'rgb(52, 152, 219)',
	'rgb(155, 89, 182)',
	'rgb(149, 165, 166)',
	'rgb(236, 240, 241)',
	'rgb(211, 84, 0)',
	'rgb(241, 196, 15)',
	'rgb(253, 121, 168)',
	'rgb(250, 177, 160)',
	'rgb(116, 185, 255)',
	'rgb(129, 236, 236)',
	'rgb(162, 155, 254)',
];

// startup
let navButtonSelectedClass = 'nav-item-selected';
let simpleNavButton = document.getElementById('simple-gen');
let hexNavButton = document.getElementById('hex-gen');
simpleNavButton.classList.toggle(navButtonSelectedClass);
let genType = 'simple'; // simple or hex

fillColour();

// handle button clicks
simpleNavButton.addEventListener('click', () => handleNavButtonClick('simple'));
hexNavButton.addEventListener('click', () => handleNavButtonClick('hex'));
document.getElementById('generate-btn').addEventListener('click', fillColour);

// type is either 'simple' or 'hex'
function handleNavButtonClick(type) {
	if (type !== 'simple' && type !== 'hex') {
		console.warn('type is not valid: ' + type);
		return;
	}

	if (type === 'simple') {
		if (!simpleNavButton.classList.contains(navButtonSelectedClass)) {
			simpleNavButton.classList.add(navButtonSelectedClass);
		}

		if (hexNavButton.classList.contains(navButtonSelectedClass)) {
			hexNavButton.classList.remove(navButtonSelectedClass);
		}
	} else {
		// type is hex
		if (!hexNavButton.classList.contains(navButtonSelectedClass)) {
			hexNavButton.classList.add(navButtonSelectedClass);
		}

		if (simpleNavButton.classList.contains(navButtonSelectedClass)) {
			simpleNavButton.classList.remove(navButtonSelectedClass);
		}
	}

	genType = type;
}

function fillColour() {
	let rgbColour;
	let hexColour;

	if (genType === 'simple') {
		rgbColour = getRandomPresetColour(simpleColours);
		hexColour = rgbToHex(rgbColour);
	} else {
		// type is hex
		hexColour = generateRandomColour();
		console.log(hexColour);
	}
	document.body.style.background = rgbColour ? rgbColour : hexColour;

	// display colour by hex and its colour name
	let colourMatch = ntc.name(hexColour);
	let colourName = colourMatch[1];
	document.getElementById('colour-hex').innerHTML = hexColour;
	document.getElementById('colour-name').innerHTML = colourName;
}

function getRandomPresetColour(set) {
	let num = set.length;
	let randColour = document.body.style.background;
	while (randColour === document.body.style.background) {
		let randNum = Math.floor(Math.random() * num);
		randColour = set[randNum];
	}
	return randColour;
}

function generateRandomColour() {
	let hex = '#';
	for (let i = 0; i < 6; i++) {
		let randNum = Math.floor(Math.random() * 16);
		let randHex = randNum.toString(16); // convert to hexadecimal
		hex += randHex;
	}
	return hex.toUpperCase();
}

// convert rgb string 'rgb(r, g, b) to hex string '#xxxxxx'
function rgbToHex(rgb) {
	rgb = rgb.substring(4, rgb.length - 1);
	let components = rgb.split(', ');

	// convert rgb to numbers
	for (let i = 0; i < components.length; i++) {
		let comp = components[i];
		components[i] = parseInt(comp, 10);
	}

	// convert the numbers to hexadecimal strings and combine them
	let hex = components.reduce((prev, curr) => {
		curr = curr.toString(16);
		if (curr.length === 1) {
			curr = '0' + curr; // add zero padding
		}
		return prev + curr;
	}, '');

	return '#' + hex.toUpperCase();
}
