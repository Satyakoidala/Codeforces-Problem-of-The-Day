const solveButton = document.querySelector("button")
const problemStatement = document.querySelector(".problem-statement");



console.log("Getting new Problem...");


const urlList = [
      `https://codeforces.com/problemset/problem/1506/D`,
      `https://codeforces.com/problemset/problem/1520/D`,
      //1200

      'https://codeforces.com/problemset/problem/1497/C1',
      'https://codeforces.com/problemset/problem/1536/B',
      'https://codeforces.com/problemset/problem/1514/B',
      'https://codeforces.com/problemset/problem/1472/D',
      'https://codeforces.com/problemset/problem/1559/C',
      'https://codeforces.com/problemset/problem/1553/C',
      'https://codeforces.com/problemset/problem/1613/C',
      'https://codeforces.com/problemset/problem/1619/C',

      


];



const problemList = [
      "D. Epic Transformation",
      "D. Same Differences",
      //1200
      "C1. k-LCM (easy version)",
      "B. Prinzessin der Verurteilung",
      "B. AND 0, Sum Big",
      "D. Even-Odd Game",
      "C. Mocha and Hiking",
      "C. Penalty",
      "C. Poisoned Dagger",
      "C. Wrong Addition",



];

var previousDate = new Date().getDate()
var index = Math.floor(Math.random() * problemList.length);
//index = (index + 1) % problemList.length;
var CodeForcesUrl = urlList[index]
problemStatement.innerText = problemList[index];


function update() {
      var currentDate = new Date().getDate();
      console.log("Entering into CodeForces...");
      console.log(currentDate, previousDate);

      //console.log( currentDate + "  " + previousDate + " " + index)
      if (currentDate != previousDate) {
            console.log("FDEe")
            index = (index + 1) % problemList.length;
            problemStatement.innerText = problemList[index];
            CodeForcesUrl = urlList[index]
            //previousIndex = index;
            previousDate = currentDate;
      }
}
setInterval(update, 2000);

function enterIntoTheProblem() {
      window.open(CodeForcesUrl, "_blank");
      
}


solveButton.addEventListener("click", enterIntoTheProblem);

