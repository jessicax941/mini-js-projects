const reviews = [
	{
		name: 'Jane Doe',
		title: 'Marketing Manager',
		company: 'Juggle',
		review: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni hic excepturi laborum maxime architecto reprehenderit facere magnam est sit. Commodi debitis culpa soluta porro consequuntur repellat in voluptatibus amet iusto. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni hic excepturi laborum maxime architecto reprehenderit facere magnam est sit. Commodi debitis culpa soluta porro consequuntur repellat in voluptatibus amet iusto.',
	},
	{
		name: 'John Doe',
		title: 'Marketing Manager',
		company: 'dreams.io',
		review: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni hic excepturi laborum maxime architecto reprehenderit facere magnam est sit. Commodi debitis culpa soluta porro consequuntur repellat in voluptatibus amet iusto est sit. Commodi debitis culpa soluta porro consequuntur repellat in voluptatibus amet iusto.',
	},
	{
		name: 'Mary Doe',
		title: 'Marketing Manager',
		company: 'Not Nufflix',
		review: 'Lorum, dolor sit amet consectetur adipisicing elit. Magni hic excepturi laborum maxime architecto reprehenderit facere magnam est sit. Commodi debitis culpa soluta porro consequuntur repellat in voluptatibus amet iusto.',
	},
];

let reviewId = 0;
let nameEl = document.getElementById('name');
let titleEl = document.getElementById('title');
let companyEl = document.getElementById('company');
let reviewEl = document.getElementById('review');
let leftButton = document.getElementById('left-btn');
let rightButton = document.getElementById('right-btn');

leftButton.addEventListener('click', () => {
	reviewId--;
	if (reviewId < 0) {
		reviewId = reviews.length - 1;
	}
	displayReview();
});
rightButton.addEventListener('click', () => {
	reviewId++;
	reviewId = reviewId % reviews.length;
	displayReview();
});

displayReview();

function displayReview() {
	let review = reviews[reviewId];
	nameEl.innerText = review.name;
	titleEl.innerText = review.title;
	companyEl.innerText = review.company;
	reviewEl.innerText = review.review;
}

function handleArrowButtonClick() {}
