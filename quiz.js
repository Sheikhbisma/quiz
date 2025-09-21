let quizBox = document.querySelector(".quiz-box");
let cont = document.querySelector(".quiz-container")
let currentQues = 0;
let quizData = [];
let nextBtn = document.querySelector(".nextBtn");
let footer = document.querySelector(".quiz-footer");
let quesnum = 1;
let score = 0;
nextBtn.addEventListener("click", () => {
    if (currentQues < quizData.length - 1) {
        currentQues++;
        showQues(quizData[currentQues]);
        quesnum++;
        quesCounter(quesnum)
    } else {
        // Show animation before result
        cont.innerHTML = `<div class="result-animation" style="display:flex;justify-content:center;align-items:center;height:100vh;">
            <div style="color:#c40094;font-size:2rem;">Calculating Result<span id="dots"></span></div>
        </div>`;
        let dots = document.getElementById("dots");
        let dotCount = 0;
        let dotInterval = setInterval(() => {
            dotCount = (dotCount + 1) % 4;
            dots.textContent = '.'.repeat(dotCount);
        }, 400);

        setTimeout(() => {
            clearInterval(dotInterval);
            result();
        }, 2000); // 2 seconds delay
    }
    
});
async function loadQues() {
    let res = await fetch("quiz.json");
    data = await res.json();
    quizData = data
    console.log(quizData);
    showQues(quizData[0]);
    quesCounter(1);
    addScore();
    // nextBtn.disabled = true;
    // view.disabled = true;
}
function showQues(show) {
    // show.preventDefault();
    console.log(show);
    let questionText = document.querySelector(".quiz-question");

    questionText.innerHTML = `${show.question}`
    let optionList = document.querySelector(".option-list");
    optionList.innerHTML = `<li class="option">${show.options[0]}</li>
    <li class="option">${show.options[1]}</li>
    <li class="option">${show.options[2]}</li>
    <li class="option">${show.options[3]}</li>`
    let answers = document.querySelectorAll(".option");
checkAns(answers,show)
    
                  nextBtn.classList.remove("active");
                  nextBtn.disabled = true;

};
function checkAns(answers,show){
answers.forEach((option) => {
        //   console.log(option)
        option.addEventListener("click", () => {
            let selected = option.innerText.trim();

            if (selected === show.correct) {
                console.log("✅ correct");
                option.classList.add("correct");
               
                score++;
                addScore();
                
            } else {
                console.log("❌ wrong");
                option.classList.add("wrong");

            };
            
            answers.forEach((opt) => {
                opt.classList.add("disabled");
                if (opt.innerText === show.correct) {
                    opt.style.border = "2px solid green";
                     

                };
                
            });
                  nextBtn.classList.add("active");
               nextBtn.disabled = false;
           
        });
    });
}
function quesCounter(index) {
    let counter = document.querySelector(".counter")
    counter.innerHTML = `${index} out of ${quizData.length} question`
}
function addScore(){
    let scoreHeader = document.querySelector(".score")
    scoreHeader.innerHTML = `Score : ${score} / ${quizData.length}`
};
function result(){
    let percentage = (score/quizData.length)*100;
    cont.innerHTML = `<div class="result-container">
        <div class="score-line">
            <span>Your Score Is ${score} out of ${quizData.length}</span>
        </div>
        <div class="percentage">
            <span class="percent">${percentage}%</span>
        </div>
        <button class="homebtn">Go To Home</button>
    </div>`;
    // Add event listener for homebtn
    let homeBtn = document.querySelector(".homebtn");
    if(homeBtn){
        homeBtn.addEventListener("click", function(){
            // Optional: add animation before redirect
            cont.innerHTML = `<div style='color:#c40094;font-size:2rem;display:flex;justify-content:center;align-items:center;height:100vh;'>Returning Home...</div>`;
           
                window.location.href = "index.html";
            
        });
    }
}


loadQues();
