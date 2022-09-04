const solveButton = document.querySelector("button")
const problemStatement = document.querySelector(".problem-statement");



console.log("Getting new Problem...");


const urlList = [
      `https://codeforces.com/problemset/problem/1506/D`,
      `https://codeforces.com/problemset/problem/1520/D`,


];



const problemList = [
      "D. Epic Transformation",
      "D. Same Differences"

];

var previousDate = new Date().getDate()
var index = Math.floor(Math.random() * problemList.length);
index = (index + 1) % problemList.length;
var CodeForcesUrl = urlList[index]
problemStatement.innerText = problemList[index];


function update() {
      var currentDate = new Date().getDate();

      //console.log( currentDate + "  " + previousDate + " " + index)
      if (currentDate != previousDate) {
            console.log("FDEe")
            index = (index + 1) % problemList.length;
            problemStatement.innerText = problemList[index];
            CodeForcesUrl = urlList[index]
            previousIndex = index;
            previousDate = currentDate;
      }
}
setInterval(update, 2000);

function enterIntoTheProblem() {
      window.open(CodeForcesUrl, "_blank");
      console.log("Entering into CodeForces...");
}


solveButton.addEventListener("click", enterIntoTheProblem);

