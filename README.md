# Hello and welcome to my Speed Typing game!

## Instructions: 
- Set your time at the top by pressing the buttons and when you're ready press the play button! You will be placed in the input box ready to start typing.

- This works using a random word API (https://random-word-api.herokuapp.com/home) which will iteratively add a new word when you have successfully typed the words before. Try and get to the highest level that you can.

## The code:

This code works with several functions: The most important one being the function that gets the words from the API and splits up all the words into individual spans on the page to be analysed by another function later.


```typescript
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
```

Once each character is divided into individual spans, I have created a function that changes the class of the span, depending on whehter the data matches. As you can see, if the character has not been typed, the class will not be updated and correct characters will be marked as correct or incorrectly as appropriate:

```typescript
  if (char == null) {
      character.classList.remove("correct");
      character.classList.remove("incorrect");
      correct = false;
      totalEntries += 1;
    } else if (char === character.innerText) {
      character.classList.add("correct");
      character.classList.remove("incorrect");
      totalEntries += 1;
    } else {
      character.classList.remove("correct");
      character.classList.add("incorrect");
      correct = false;
      totalEntries += 1;
```

## Bugs
- Issues with the WPM function displaying the correct WPM that the user has typed.
- Slight issue with the game starting, a key has to be inputted before the API is called.
- The firework dev removes the rest of the display but it appears when the animation is complete
