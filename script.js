const solveButton = document.querySelector("button")
const problemStatement = document.querySelector(".problem-statement");



console.log("Trying to get a new Problem...");

// global variable to store the problem URL.
var problemURL;


/**
 * If the current date is different than the date stored in localStorage, then update localStorage with
 * the current date and return true. Otherwise, return false
 * @returns a boolean value.
 */
function hasOneDayPassed() {
	var date = new Date().toLocaleDateString();

	if (localStorage.previousDate == date)
		return false;

	localStorage.previousDate = date;
	return true;
}

// Updates the visitor counter
async function updateVisitorCounter() {
	try {
		const isExistingVisitor = !!localStorage.getItem("isExistingVisitor");

		if (isExistingVisitor) {
			const visitsResponse = await fetch("https://api.countapi.xyz/get/codeforces-probem-of-the-day.netlify.app/992ab16e-4a82-4d30-a834-a62af433f862");
			const visits = await visitsResponse.json();
			document.querySelector('#visitors > span.number').innerText = visits.value;
		} else {
			const visitsResponse = await fetch("https://api.countapi.xyz/hit/codeforces-probem-of-the-day.netlify.app/992ab16e-4a82-4d30-a834-a62af433f862");
			const visits = await visitsResponse.json();
			document.querySelector('#visitors > span.number').innerText = visits.value;
			localStorage.setItem("isExistingVisitor", uuid())
		}
	} catch (error) {
		console.error("Something went wrong. Trying to fetch last known number of visits again...");
		const visitsResponse = await fetch("https://api.countapi.xyz/get/codeforces-probem-of-the-day.netlify.app/992ab16e-4a82-4d30-a834-a62af433f862");
		const visits = await visitsResponse.json();
		document.querySelector('#visitors > span.number').innerHTML = visits.value;
	}
}

// Snippet from https://stackoverflow.com/a/2117523/10165585
// Returns a UUID string
function uuid() {
	return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
		(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	);
}


async function updateProblem() {
	// checking if old problem data is existing, if exists display it.
	if (localStorage.selectedProblem) {
		// parsing object data from localstorage
		const selectedProblem = JSON.parse(localStorage.selectedProblem);

		// re-taking the same steps to represent problem object
		const htmlText = `${selectedProblem.contestId}. ${selectedProblem.index}. ${selectedProblem.name}`;
		problemStatement.innerText = htmlText;
		problemURL = `https://codeforces.com/problemset/problem/${selectedProblem.contestId}/${selectedProblem.index}`;
	}

	// checking one day condition, if this check passes the new problem is fetched.
	if (!hasOneDayPassed()) return false;

	// using codeforces api to fetch problems
	const response = await fetch('https://codeforces.com/api/problemset.problems');
	const data = await response.json();

	// obtaining problem for the day from the list of problems
	const problemList = data.result.problems;
	const index = Math.floor(Math.random() * problemList.length);
	const selectedProblem = problemList[index];

	// using localStorage to store the selected problem
	localStorage.selectedProblem = JSON.stringify(selectedProblem);

	// codeforces link is created and stored
	problemURL = `https://codeforces.com/problemset/problem/${selectedProblem.contestId}/${selectedProblem.index}`;

	// creating htmlText and updating the problem statement on the page
	const htmlText = `${selectedProblem.contestId}. ${selectedProblem.index}. ${selectedProblem.name}`;
	problemStatement.innerText = htmlText;

	// console the problem details on every new problem fetch
	console.log(selectedProblem);
}

// on every page load, it tries to update the problem
window.addEventListener('DOMContentLoaded', updateProblem);

// On every page load, it tries to update the visitor counter
window.addEventListener('DOMContentLoaded', updateVisitorCounter);

// keep checking every minute, and trying to load a new problem
setInterval(updateProblem, 60000);

function enterIntoTheProblem() {
	window.open(problemURL, "_blank");
}

solveButton.addEventListener("click", enterIntoTheProblem);

