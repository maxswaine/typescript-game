import "../styles/main.scss";
import { Word } from "../data/types";

const gameInput = document.querySelector("#game-input") as HTMLInputElement;
const quoteContainer = document.querySelector(
  ".game-square__quote"
) as HTMLElement;
const timerSecondsDisplay = document.querySelector(
  ".timer__time--seconds"
) as HTMLElement;
const thirtySecondsButton = document.querySelector(
  ".timer__button--thirty"
) as HTMLButtonElement;
const sixtySecondsButton = document.querySelector(
  ".timer__button--sixty"
) as HTMLButtonElement;
const startButton = document.querySelector(
  ".timer__button--start"
) as HTMLButtonElement;
const restartButton = document.querySelector(
  ".timer__button--restart"
) as HTMLButtonElement;
const howToPlay = document.querySelector(".nav__link") as HTMLElement;
const restartText = document.querySelector(".nav__restart") as HTMLElement;
const wpmElement = document.querySelector(".game-square__wpm") as HTMLElement;

let quoteSpanArray: HTMLElement[] = [];
let countdownTime = 0;
let countdownInstance: any = null;
let level = 1;

if (
  !gameInput ||
  !quoteContainer ||
  !thirtySecondsButton ||
  !sixtySecondsButton ||
  !startButton ||
  !restartButton
) {
  throw new Error("Issue with elements.");
}

export const getRandomWord = async () => {
  try {
    const response = await fetch(
      `https://random-word-api.herokuapp.com/word?number=${level}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch random words");
    }

    const words = await response.json();
    quoteContainer.innerText = "";

    quoteSpanArray = words.flatMap((word: Word, index: number) => {
      const wordSpanArray = word.split("").map((character) => {
        const span = document.createElement("span");
        span.innerText = character;
        return span;
      });

      if (index !== words.length - 1) {
        const spaceSpan = document.createElement("span");
        spaceSpan.innerText = " ";
        wordSpanArray.push(spaceSpan);
      }

      quoteContainer.append(...wordSpanArray);
      return wordSpanArray;
    });

    gameInput.value = "";
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const updateTimerDisplay = (seconds: number) => {
  timerSecondsDisplay.innerText = seconds.toString();
};

const startCountdown = (seconds: number) => {
  if (countdownInstance) {
    clearInterval(countdownInstance);
  }

  countdownTime = seconds;
  updateTimerDisplay(countdownTime);

  countdownInstance = setInterval(() => {
    countdownTime--;
    if (countdownTime >= 0) {
      updateTimerDisplay(countdownTime);
    } else {
      clearInterval(countdownInstance);
      window.alert(`Game Over! You got to Level ${level}`);
    }
  }, 1000);
};

thirtySecondsButton.addEventListener("click", () => {
  countdownTime = 30;
  updateTimerDisplay(countdownTime);
});

sixtySecondsButton.addEventListener("click", () => {
  countdownTime = 60;
  updateTimerDisplay(countdownTime);
});

startButton.addEventListener("click", () => {
  if (countdownTime > 0) {
    startCountdown(countdownTime);
    gameInput.focus();
  }
  updateWPMCounter();
});

const startGame = () => {
  if (countdownTime > 0) {
    startCountdown(countdownTime);
    gameInput.focus();
  }
};

const checkMatchingValues = () => {
  const inputValue = gameInput.value.split("");
  let correct = true;

  quoteSpanArray.forEach((character, i) => {
    const char = inputValue[i];

    if (char == null) {
      character.classList.remove("correct");
      character.classList.remove("incorrect");
      correct = false;
    } else if (char === character.innerText) {
      character.classList.add("correct");
      character.classList.remove("incorrect");
    } else {
      character.classList.remove("correct");
      character.classList.add("incorrect");
      correct = false;
    }
  });

  if (correct || inputValue.length === quoteSpanArray.length) {
    getRandomWord();
    level += 1;
  }
};

const rules = () => {
  window.alert(
    "Welcome to the game! Choose your time, press the start button and type like the wind!"
  );
};

const restart = () => {
  level = 1;
  quoteContainer.innerText = "";
  gameInput.innerText = "";
  clearInterval(countdownInstance);
  timerSecondsDisplay.innerText = "0";
};

restartButton.addEventListener("click", restart);
restartText.addEventListener("click", restart);
gameInput.addEventListener("focus", startGame);
gameInput.addEventListener("input", checkMatchingValues);
howToPlay.addEventListener("click", rules);
