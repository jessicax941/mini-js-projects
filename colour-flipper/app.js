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
	'rgb(140, 39, 30)',
	'rgb(91, 80, 122)',
];

// startup
let navButtonSelectedClass = 'nav-item-selected';
let simpleNavButton = document.getElementById('simple-gen');
let hexNavButton = document.getElementById('hex-gen');
simpleNavButton.classList.toggle(navButtonSelectedClass);
let genType = 'simple'; // simple or hex
let generateButton = document.getElementById('generate-btn');

fillColour();

// handle button clicks
simpleNavButton.addEventListener('click', () => handleNavButtonClick('simple'));
hexNavButton.addEventListener('click', () => handleNavButtonClick('hex'));
generateButton.addEventListener('click', fillColour);

// type is either 'simple' or 'hex'
function handleNavButtonClick(type) {
	if (type !== 'simple' && type !== 'hex') {
		console.warn('type is not valid: ' + type);
		return;
	}

	genType = type;

	if (type === 'simple') {
		if (!simpleNavButton.classList.contains(navButtonSelectedClass)) {
			fillColour();
			simpleNavButton.classList.add(navButtonSelectedClass);
		}

		if (hexNavButton.classList.contains(navButtonSelectedClass)) {
			hexNavButton.classList.remove(navButtonSelectedClass);
		}
	} else {
		// type is hex
		if (!hexNavButton.classList.contains(navButtonSelectedClass)) {
			fillColour();
			hexNavButton.classList.add(navButtonSelectedClass);
		}

		if (simpleNavButton.classList.contains(navButtonSelectedClass)) {
			simpleNavButton.classList.remove(navButtonSelectedClass);
		}
	}
}

function fillColour() {
	let rgbColour;

	if (genType === 'simple') {
		rgbColour = getRandomPresetColour(simpleColours);
	} else {
		// type is hex
		rgbColour = generateRandomColour();
	}
	let hexColour = rgbToHex(rgbColour);
	document.body.style.background = rgbColour;

	// display colour by hex and its colour name
	let colourMatch = ntc.name(hexColour);
	let colourName = colourMatch[1];
	document.getElementById('colour-hex').innerHTML = hexColour;
	document.getElementById('colour-name').innerHTML = colourName;

	// toggle light or dark mode based on rgb colour
	let isLightMode = isLightColour(rgbColour);
	let mainSelection = document.querySelector('main');
	if (isLightMode) {
		if (!mainSelection.classList.contains('light-mode')) {
			mainSelection.classList.add('light-mode');
		}

		if (mainSelection.classList.contains('dark-mode')) {
			mainSelection.classList.remove('dark-mode');
		}
	} else {
		if (!mainSelection.classList.contains('dark-mode')) {
			mainSelection.classList.add('dark-mode');
		}

		if (mainSelection.classList.contains('light-mode')) {
			mainSelection.classList.remove('light-mode');
		}
	}
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

// generate random rgb colour
function generateRandomColour() {
	let rgb = [];
	for (let i = 0; i < 3; i++) {
		rgb[i] = Math.floor(Math.random() * 256);
	}
	return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

// convert rgb string 'rgb(r, g, b) to hex string '#xxxxxx'
function rgbToHex(rgb) {
	let components = getRgbComponents(rgb);

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

// gets rgb components as a number array [r, g, b]
function getRgbComponents(rgb) {
	rgb = rgb.substring(4, rgb.length - 1);
	let components = rgb.split(', ');

	// convert rgb to numbers
	for (let i = 0; i < components.length; i++) {
		let comp = components[i];
		components[i] = parseInt(comp, 10);
	}

	return components;
}

// returns true if light colour, false if dark colour
function isLightColour(rgb) {
	// taken from https://awik.io/determine-color-bright-dark-using-javascript/
	let components = getRgbComponents(rgb);
	let r = components[0];
	let g = components[1];
	let b = components[2];

	let hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
	return hsp > 127.5;
}
