import "./styles/main.scss";
import { RandomWord, QuoteResponse } from "./data/types";

const gameInput = document.querySelector(".game-input") as HTMLInputElement;
const quoteContainer = document.querySelector(
  ".game-square__quote"
) as HTMLElement;
const quoteSpanArray = document.querySelectorAll("span");

if (!gameInput) {
  throw new Error("Issue with input box");
}

if (!quoteContainer) {
  throw new Error("Issue with input area");
}

const getRandomWord = async () => {
  const response = await fetch(
    `https://random-word-api.herokuapp.com/word?number=${i}`
  );
  const word: RandomWord = await response.json();
  quoteContainer.innerText = word.word;
  gameInput.value = "";
};

const checkMatchingValues = () => {
  const inputValue = gameInput.value.split("");
  quoteSpanArray.forEach((character, i) => {
    const char = inputValue[i];
    if (char == null) {
      character.classList.remove("correct");
      character.classList.remove("incorrect");
    } else if (char === character.innerText) {
      character.classList.add("correct");
      character.classList.remove("incorrect");
    } else {
      character.classList.remove("correct");
      character.classList.add("incorrect");
    }
  });
};

getRandomQuote();

// var Timer = require("timer-machine");
// var myTimer = new Timer();

gameInput.addEventListener("input", checkMatchingValues);
