import "../styles/main.scss";
import { Word } from "../data/types";
// DOM Elements
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
const wpm = document.querySelector(".game-square__wpm") as HTMLElement;

// State variables
let quoteSpanArray: HTMLElement[] = [];
let countdownTime = 0;
let countdownInstance: any = null;

let level = 1;

// Error checks for essential elements
if (!gameInput) {
  throw new Error("Issue with input box");
}
if (!quoteContainer) {
  throw new Error("Issue with input area");
}
if (!thirtySecondsButton || !sixtySecondsButton || !startButton) {
  throw new Error("Issue with buttons.");
}

// Fetch a random quote from the API
export const getRandomWord = async () => {
  try {
    const response = await fetch(
      `https://random-word-api.herokuapp.com/word?number=${level}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch random words");
    }

    const words = await response.json(); // Array of words
    quoteContainer.innerText = ""; // Clear previous content

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

      quoteContainer.append(...wordSpanArray); // Append word and space spans
      return wordSpanArray;
    });

    gameInput.value = "";
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

// Function to calculate words per minute (WPM)
const calculateWPM = (totalEntries: number, time: number) => {
  const wpm = totalEntries / 5 / time;
  return wpm;
};
const updateWPMCounter = () => {
  const result = checkMatchingValues();
  const totalEntries = result.totalEntries;
  const wpmValue = calculateWPM(totalEntries, countdownTime);

  wpm.innerText = `WPM: ${Math.round(wpmValue)}`;
};

// Function to update the timer display
const updateTimerDisplay = (seconds: number) => {
  timerSecondsDisplay.innerText = seconds.toString();
};

// Function to start the countdown
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
    }
  }, 1000);
};

// Event listeners
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
    gameInput.focus(); // Set focus on the input box
  }

  getRandomWord();
  updateWPMCounter(); // Call the update function when starting the game
});

// Initialize the game when input box is focused
const startGame = () => {
  if (countdownTime > 0) {
    startCountdown(countdownTime);
    gameInput.focus(); // Set focus on the input box
  }
  getRandomWord();
};

gameInput.addEventListener("focus", startGame);
gameInput.addEventListener("input", updateWPMCounter);

// Function to check matching values and return results
const checkMatchingValues = () => {
  const inputValue = gameInput.value.split("");
  const wpm: Wpm = {}
  let correct = true;
  let totalEntries = 0;
  let correctEntries = 0;
  quoteSpanArray.forEach((character, i) => {
    const char = inputValue[i];
    if (char == null) {
      character.classList.remove("correct");
      character.classList.remove("incorrect");
      correct = false;
      totalEntries += 1;
    } else if (char === character.innerText) {
      character.classList.add("correct");
      character.classList.remove("incorrect");
      totalEntries += 1;
      correctEntries += 1;
    } else {
      character.classList.remove("correct");
      character.classList.add("incorrect");
      correct = false;
      totalEntries += 1;
    }
  });
  if (correct || inputValue.length === quoteSpanArray.length) {
    getRandomWord();
    level += 1;
  }
};
