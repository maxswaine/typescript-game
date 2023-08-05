import { Word } from "./data/types";
import { originalWords } from "./data/words";
import "./style.scss";

const gameContainer = document.querySelector(".game-square__grid");
const input = document.querySelector<HTMLInputElement>(".gameinput");

if (!gameContainer) {
  throw new Error("Issue with game container");
}

// Keyboard invader

// Need objects that have properties including the word and whether it is shot or not

// INPUT BAR
// Input bar at the bottom that allows the user to type the words.
// First key has to be pressed before the game starts
// Spacebar has to be pressed before the word is submitted
// Pressing spacebar clears the input after the word has been submitted
//

// WORDS TO TYPE
// The words that need to be typed are in an original array of objects
// Word Number: number, word: string, hasBeenTyped: Boolean
// The words on screen are copied from that array and then used separately so that they can be removed, whilst maintaining the original data
// The copied array is then being mapped to a new array that minuses the words that are typed in the input
// Potentially use a speed-typing API to get the words that need to be typed so its not the same array every time
// Div for each class is named on template
// Function that “removes” the word accesses the individual class and removes the display, rather than deleting. Keeping the space but removing the display so it looks like they’re disappearing 
// Obvs changes the Boolean 
// Function that is going through each array and when all the Boolean’s are positive it stops the game

const gameArray: Word[] = [...originalWords];

const createWordElement = (word: string) => {
  const container = document.createElement("div");
  container.classList.add("word__container");

  const content = document.createElement("div");
  content.classList.add("word__content");

  const image = document.createElement("img");
  image.classList.add("word__image");
  image.src = "/src/images/space-invaders-svgrepo-com.svg";

  const text = document.createElement("p");
  text.classList.add("word__text");
  text.textContent = word;

  content.appendChild(image);
  content.appendChild(text);
  container.appendChild(content);

  return container;
};

const printWords = (wordsToType: Word[]) => {
  const fragment = document.createDocumentFragment();
  wordsToType.forEach((word: Word) => {
    const wordElement = createWordElement(word.word);
    fragment.appendChild(wordElement);
  });
  gameContainer.appendChild(fragment);
};

printWords(gameArray);

// MOVING OBJECTS
// Effectively a card that exists or not depending on whether the word has been written.
// Invisible grid that each object moves through. When it gets to the first/last element in the column, it moves down a row
// if the last object is in the last column and last row then game over
// IF STATEMENT. IF ROW NUMBER = EVEN HAVE ONE UFO AND IF IT IS ODD HAVE ANOTHER

// Function ideas:
// function for filtering whether a word has been written:
// take the string from the input
// see if it matches any word in the object array
// remove html element from the word card

// Reset button at the bottom
