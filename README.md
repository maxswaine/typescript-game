Hello and welcome to my Speed Typing game!

Set your time at the top by pressing the buttons and when you're ready press the play button! You will be placed in the input box ready to start typing.

This works using a random word API (https://random-word-api.herokuapp.com/home) which will iteratively add a new word when you have successfully typed the words before. Try and get to the highest level that you can.

The code:

This code works with several functions: The most important one being the function that gets the words from the API and splits up all the words into individual spans on the page to be analysed by another function later.

<!-- quoteSpanArray = words.flatMap((word: Word, index: number) => {
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
    }); -->
