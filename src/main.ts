import "./styles/main.scss";
import { RandomWord, QuoteResponse } from "./data/types";

const gameInput = document.querySelector(".game-input") as HTMLInputElement;
const quoteContainer = document.querySelector(
  ".game-square__quote"
) as HTMLElement;
let quoteSpanArray: HTMLElement[] = [];

if (!gameInput) {
  throw new Error("Issue with input box");
}

if (!quoteContainer) {
  throw new Error("Issue with input area");
}

const getRandomWord = async () => {
  const response = await fetch(
    "https://random-word-api.vercel.app/api?words=10"
  );
  const word: RandomWord = await response.json();
  quoteContainer.innerText = "";
  quoteSpanArray = word.word.split("").map((character) => {
    const span = document.createElement("span");
    span.innerText = character;
    quoteContainer.appendChild(span);
    return span;
  });
  gameInput.value = "";
};

const getRandomQuote = async () => {
  const response = await fetch("https://api.quotable.io/random");
  const quoteResponse: QuoteResponse = await response.json();
  quoteContainer.innerText = "";
  quoteSpanArray = quoteResponse.content.split("").map((character) => {
    const span = document.createElement("span");
    span.innerText = character;
    quoteContainer.appendChild(span);
    return span;
  });
  gameInput.value = "";
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
  if (correct) {
    getRandomQuote();
  }
};

const startGame = () => {
  getRandomQuote();
};

gameInput.addEventListener("focus", startGame);
gameInput.addEventListener("input", checkMatchingValues);

