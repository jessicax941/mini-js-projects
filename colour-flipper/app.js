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
fillColour();

let navButtonSelectedClass = 'nav-item-selected';
let simpleNavButton = document.getElementById('simple-gen');
let hexNavButton = document.getElementById('hex-gen');
simpleNavButton.classList.toggle(navButtonSelectedClass);

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
}

function fillColour() {
	let randColour = generateRandomColour(simpleColours);
	document.body.style.background = randColour;

	// display colour by hex and its colour name
	let hexColour = rgbToHex(randColour);
	let colourMatch = ntc.name(hexColour);
	let colourName = colourMatch[1];
	document.getElementById('colour-hex').innerHTML = hexColour;
	document.getElementById('colour-name').innerHTML = colourName;
}

function generateRandomColour(set) {
	let num = set.length;
	let randColour = document.body.style.background;
	while (randColour === document.body.style.background) {
		let randNum = Math.floor(Math.random() * num);
		randColour = set[randNum];
	}
	return randColour;
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
