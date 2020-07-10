"use strict";

const btn = document.getElementById("startGame");
const screenAnswer = document.getElementById("answer");
const screenQuestion = document.getElementById("question");
const result = document.getElementById("result");
const timer = document.getElementById("timer");

const questionArry = ["red", "yellow", "blue", "black", "white", "hoge"];

let getkey = "";
let letterArry = [];
let plusScore = 0;
let minusScore = 0;
let totalScore = 0;
let clickTime = 0;
let timeLimit = 30000;
let date = new Date();

btn.addEventListener("click", () => {
  clickTime = Date.now();
  startGame();
  startTimer();

  window.addEventListener("keypress", (e) => {
    getkey = e.key;
    console.log(getkey);
    let score = 0;

    if (questionLetterArry.length !== 0) {
      //questionLetterArryの配列と、入力したキーが等しいかどうかを変数indexに代入する（結果は文字が読み込まれるか、ー1になる。）
      const index = questionLetterArry.findIndex((elem) => elem === e.key);

      /*indexの結果がー1でないとき、さらに、questionLetterArryの配列が入力したキーと一致したとき、
        questionLettterArryの先頭の配列の文字を削除し、scoreメソッドを読み込む*/
      if (index !== -1 && questionLetterArry[0] === getkey) {
        questionLetterArry.shift(index);
        letterArry.push(e.key);
        const join = letterArry.join("");
        screenAnswer.textContent = join;
      }
      /*indexの結果がー1の場合、さらに、questionLetterArryの配列が入力したキーと一致しなかったとき、
          minusscoreを+1する*/
      if (index === -1 && questionLetterArry[0] !== getkey) {
        minusScore = minusScore + 1;
        console.log(
          minusScore,
          index === -1 && questionLetterArry[0] !== getkey
        );
      }

      if (questionLetterArry.length === 0) {
        reStartGame();
      }
    }
  });
  timeOver();
});

let stopwatch;

function startTimer() {
  const now = Date.now();
  stopwatch = Math.floor((timeLimit - now + clickTime) / 1000) % 60;

  console.log(stopwatch);

  timer.textContent = `残り ${stopwatch}秒`;
  if (stopwatch === 0) {
    timer.remove();
  }
}

btn.addEventListener("click", () => {
  let interval = setInterval(() => {
    startTimer();
    if (stopwatch === 0) {
      clearInterval(interval);
    }
  }, 1000);
});

function timeOver() {
  setTimeout(() => {
    screenAnswer.remove();
    screenQuestion.textContent = "タイピング終了です。お疲れ様でした。";
    result.textContent = `クリア問題数　${totalScore}  ミスの回数 ${minusScore}`;
  }, timeLimit);
}

function startGame() {
  const random = Math.floor(Math.random() * 5);
  const question = questionArry[random];

  screenQuestion.textContent = question;
  calc(question);
  btn.remove();
}

function reStartGame() {
  totalScore++;
  screenAnswer.textContent = "";
  const random = Math.floor(Math.random() * 5);
  const question = questionArry[random];

  screenQuestion.textContent = question;

  questionLetterArry = [];
  letterArry = [];
  calc(question);
  timeOver();
}

let questionLetterArry = [];
function calc(question) {
  questionLetterArry = question.split("");
  console.log(questionLetterArry);
}
