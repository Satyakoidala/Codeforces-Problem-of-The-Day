const solveButton = document.querySelector("button"),
problemStatement = document.querySelector(".problem-statement p");

    

       console.log("Getting new Problem...");


       const urlList = [
        `https://codeforces.com/problemset/problem/1506/D`,
        `https://codeforces.com/problemset/problem/1520/D`,


       ];



       const problemList = [
        "D. Epic Transformation",
        "D. Same Differences"

       ];

       
      var previousIndex;
      const index = Math.floor(Math.random() * problemList.length);
      let now = new Date();
      let hour = now.getHours();
      let minute = now.getMinutes();
      let seconds = now.getSeconds();
      var previousDate = 1;
      var currentDate = now.getDate();
      
      //if(hour == 12 && minute == 0 && seconds == 0)
      if(currentDate != previousDate)
      {
            if(index == previousIndex)
            {
                index = (index + 1) % problemList.length;
            }
            problemStatement.innerText = problemList[index];
            var CodeForcesUrl = urlList[index]
            previousIndex = index;
            previousDate = currentDate;
      }
    



       

function enterIntoTheProblem(){ 
window.open(CodeForcesUrl, "_blank");                   
console.log("Entering into CodeForces...");
}


solveButton.addEventListener("click", enterIntoTheProblem);

