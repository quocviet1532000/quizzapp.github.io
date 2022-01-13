const start_btn = document.querySelector('.start_btn button')
const info_box = document.querySelector('.info_box')
const exit_btn = info_box.querySelector('.button .quit')
const continue_btn = document.querySelector('.button .restart')
const questionBox = document.querySelector('.question_box')
const timeCount = document.querySelector('.question_time .question_time-second')
const timeLine = document.querySelector('header .time_line')
const timeOff = document.querySelector('.question_time-text')


const option_list = document.querySelector('.question_list');


start_btn.onclick = function() {
    info_box.classList.add('activeInfo')
}

exit_btn.onclick = function() {
    info_box.classList.remove('activeInfo')
}

continue_btn.onclick = function() {
    info_box.classList.remove('activeInfo')
    questionBox.classList.add('activeQuestion')
    showQuestions(0);
    questionCounter(1);
    startTimer(15);
    startTimerLine(0)
}

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 15;     
let widthValue = 0;
let userScore = 0;

const next_btn = questionBox.querySelector('.next_btn');
const result_box = document.querySelector('.result_box');
const quit_quiz = document.querySelector('.result_box .quit')
// const restart_quiz = document.querySelector('.result_box .restart')

// restart_quiz.onclick = () => {
//     questionBox.classList.add('activeQuestion')
//     result_box.classList.remove('activeResult')
//     let que_count = 0;
//     let que_numb = 1;
//     let timeValue = 15;     
//     let widthValue = 0;
//     let userScore = 0;
//     showQuestions(que_count);
//     questionCounter(que_numb);
//     clearInterval(counter)
//     startTimer(timeValue)
//     clearInterval(counterLine)
//     startTimerLine(widthValue)
//     next_btn.style.display = "none"
//     timeOff.textContent = 'Time Left'

//     let correctAnswer = questions[que_count].answer;
//     let allOptions = option_list.children.length;
//     let time = 15;

//     if(time == 0) {

//         next_btn.style.display = "block"      
//         for(let i = 0; i < allOptions; i++ ) {
//             if(option_list.children[i].textContent == correctAnswer) {
//                 option_list.children[i].setAttribute('class', 'option correct')
//                 option_list.children[i].insertAdjacentHTML('beforeend',tickIcon)
//             }
//         }
//         for(let i = 0; i < allOptions; i++ ) {
//             option_list.children[i].classList.add('disabled')
//         }
//     }
    

// }

quit_quiz.onclick = () => {
    window.location.reload()
}

next_btn.onclick = () => {
   if(que_count < questions.length - 1) {
    que_count++;
    que_numb++;
    showQuestions(que_count);
    questionCounter(que_numb);
    clearInterval(counter)
    startTimer(timeValue)
    clearInterval(counterLine)
    startTimerLine(widthValue)
    next_btn.style.display = "none"
    timeOff.textContent = 'Time Left'

   } else {
        clearInterval(counter)
        clearInterval(counterLine)
        showResultBox()
   }
}

function showQuestions(index) {
    const que_text = document.querySelector('.question_text');
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option">'+ questions[index].options[0] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].options[1] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].options[2] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].options[3] +'<span></span></div>';

    que_text.innerHTML = que_tag;   
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll('.option');
    for(let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick','optionSelected(this)')
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';


function optionSelected(answer) {
    clearInterval(counter)
    clearInterval(counterLine)
    let userAnswer = answer.textContent;
    let correctAnswer = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if(userAnswer == correctAnswer) {
        userScore += 1;
        answer.classList.add('correct')
        answer.insertAdjacentHTML('beforeend',tickIcon)
    } else {
        answer.classList.add('incorrect')
        answer.insertAdjacentHTML('beforeend',crossIcon)

        for(let i = 0; i < allOptions; i++ ) {
            if(option_list.children[i].textContent == correctAnswer) {
                option_list.children[i].setAttribute('class', 'option correct')
                option_list.children[i].insertAdjacentHTML('beforeend',tickIcon)
            }
        }
    }

    for(let i = 0; i < allOptions; i++ ) {
        option_list.children[i].classList.add('disabled')
    }

    next_btn.style.display = "block"
}


function showResultBox() {
    info_box.classList.remove('activeInfo')
    questionBox.classList.remove('activeQuestion')
    result_box.classList.add('activeResult')

    const scoreText = result_box.querySelector('.score_text')
    if(userScore > 3) {
        let scoreTag = '<span>and Congrats! <lord-icon src="https://cdn.lordicon.com/lupuorrc.json"trigger="loop"colors="primary:#e83a30,secondary:#eee966"axis-y="30"style="width:50px;height:50px"></lord-icon> , You got <p>'+userScore+'</p> out of <p>'+questions.length+'</p></span>';
        scoreText.innerHTML = scoreTag
    } else if(userScore >= 2) {
        let scoreTag = '<span>and Nice<lord-icon src="https://cdn.lordicon.com/rcopausw.json"trigger="loop"colors="primary:#000,secondary:#e83a30"axis-y="36"style="width:50px;height:50px"></lord-icon>, You got only<p>'+userScore+'</p> out of <p>'+questions.length+'</p></span>';
        scoreText.innerHTML = scoreTag
    } else {
        let scoreTag = '<span>and Sorry <lord-icon src="https://cdn.lordicon.com/hrqwmuhr.json"trigger="loop"colors="primary:#000,secondary:#e83a30" axis-y="38" style="width:50px;height:50px"></lord-icon>, You got only<p>'+userScore+'</p> out of <p>'+questions.length+'</p></span>';
        scoreText.innerHTML = scoreTag
    }
}

function startTimer(time) {
    counter = setInterval(timer,1000) ;
    function timer() {
        timeCount.textContent = time + 's';
        time--;
        if(time < 0) {
            clearInterval(counter);
            timeCount.textContent = '0' + 's';
            timeOff.textContent = 'Time Off'

            let correctAnswer = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for(let i = 0; i < allOptions; i++ ) {
                if(option_list.children[i].textContent == correctAnswer) {
                    option_list.children[i].setAttribute('class', 'option correct')
                    option_list.children[i].insertAdjacentHTML('beforeend',tickIcon)
                }
            }

            for(let i = 0; i < allOptions; i++ ) {
                option_list.children[i].classList.add('disabled')
            }
        
            next_btn.style.display = "block"
        }
    }
}


function startTimerLine(time) {
    counterLine = setInterval(timer,29) ;
    function timer() {
        time += 1;
        timeLine.style.with = time + 'px';
        if(time > 549) {
            clearInterval(counterLine);
        }
    }
}


function questionCounter(index) {
const bottom_question_counter = questionBox.querySelector('.question_total')
let totalQuestionCountTag = '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>Questions</span>'

bottom_question_counter.innerHTML = totalQuestionCountTag
}