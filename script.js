let startBtn = document.querySelector(".startBtn");
let exitBtn = document.querySelector(".exit");
// let continueBtn = document.querySelector(".continue");
let pop = document.querySelector(".pop-up");
let home = document.querySelector(".home");
let quizContainer = document.querySelector(".quiz-container");
let main = document.querySelector("main");
// start button
startBtn.addEventListener("click",(e)=>{
    e.preventDefault()
pop.classList.add ("active");
main.classList.add("active");
});
// exit button
exitBtn.addEventListener("click",()=>{
    pop.classList.remove ("active");
    main.classList.remove("active");
});
