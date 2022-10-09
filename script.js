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

// keep checking every minute, and trying to load a new problem
setInterval(updateProblem, 60000);

function enterIntoTheProblem() {
	window.open(problemURL, "_blank");
}

solveButton.addEventListener("click", enterIntoTheProblem);

