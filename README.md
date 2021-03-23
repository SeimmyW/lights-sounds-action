# Pre-work - _Memory Game_

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program.

Submitted by: **Seim Wolderufael**

Time spent: **16** hours spent in total

Link to project: (https://alike-strengthened-viscountess.glitch.me/)

## Required Functionality

The following **required** functionality is complete:

- [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
- [x] "Start" button toggles between "Start" and "Stop" when clicked.
- [x] Game buttons each light up and play a sound when clicked.
- [x] Computer plays back sequence of clues including sound and visual cue for each button
- [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess.
- [x] User wins the game after guessing a complete pattern
- [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

- [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
- [x] Buttons use a pitch (frequency) other than the ones in the tutorial
- [x] More than 4 functional game buttons
- [x] Playback speeds up on each turn
- [x] Computer picks a different pattern each time the game is played
- [x] Player only loses after 3 mistakes (instead of on the first mistake)
- [x] Game button appearance change goes beyond color (e.g. add an image)
- [x] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
- [x] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [x] Added tune that plays and loops before the game starts
- [x] Added unique fonts to the headings
- [x] Added background image
- [x] Added mistake tone the plays when you click the wrong button
- [x] Made buttons into a grid centered on the page
- [x] Added favicon

## Video Walkthrough

Completed pre-work with requirements:

![](https://i.imgur.com/ggIfdNA.gif)

Completed pre-work with additional features:

![](https://i.imgur.com/tgL88d8.gif)

## Reflection Questions

1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here.

   https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/math/random - Used to make random patterns
   
   https://www.w3schools.com/ - Used references for CSS, Javascript, and HTML code
   
   https://www.rapidtables.com/web/css/css-color.html#cyan - CSS colors
   
   https://stackoverflow.com/questions/38960101/why-is-element-not-being-shown-before-alert - Used to fix chances element not changing before alert was called
   
   Sprites, Art, and Audio belong to SEGA and Sonic Team

2) What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words)
   
   One huge challenge was making the CSS grid for the objects and centering them on the page. Through the use of CSS reference sites
   such as w3schools.com I was able to find reliable definitions for code I would later piece together to have the site stylized nicely. By
   using the left margins of the page, creating a space left of the grid that pushes it right, I was able to center the grid by pushing it
   from the left halfway across the game, and then subtracted that value by half of the length of the grid through calc() in CSS so that the 
   space between the grid and the left and right sides of the page were equal. Making the timer work right was also a challenge, as I had to make 
   sure the timer started exactly when it should start, decrease by the exact amount I want it to decrease by, and make sure it doesn't continue 
   when the user ends the game early. To do the first part, I had made a setTimeout() function in the Javascript code, setting the length of time to
   a changing value ensuring the timer only starts after all the buttons have been pressed and let go, including the amount of time it takes between 
   pressing each button in the clue sequence. Through checking these values, the timer always starts right after the clue sequence is complete.
   A challenge I have not been able to get around is autoplaying the menu theme on the startup of the window page. Apparently some browsers (like Chrome) 
   can sometimes block audio playing on window startup, so you may notice the project may not play the menu theme when you initially test the project, 
   even with the javascript window.onload function. I've simply placed the function where it should be, and I have the menu theme be the only musical 
   audio track that plays whenever the game is not being played, so if you miss it initally then it will come back after you play a round of the memory game!
   

3) What questions about web development do you have after completing your submission? (recommended 100 - 300 words)
   
   One question is how do developers account for various different browsers when making their websites? While most people on the desktop only use one of four 
   (Chrome, Safari, Firefox, Edge), these browsers do behave differently, so much so that I have heard of certain browsers not running certain functions or lines of code,
   which I have personally experienced with my frustrations at getting an audio file to play when the window loads. Another thing I would like to ask is how do
   developers transmit data between what a user enters and what a site recieves without having to worry about someone from the client side getting access to server
   information? This question is particularly interesting to me as with tools like inspect element being available on the client side and even the largest companies 
   experiencing vunerabilities and occasionally hackers stealing account and credit card data from these massive sites, one very important aspect of the internet
   nowadays is protecting data from those who shouldn't have access to it.
   
   

4) If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words)
   
   I would add more input elements into HTML and code it with Javascript so that the user could enter how long he would want the pattern to be, and how much time 
   he would want to enter the button. I would have functions associated with the input field to use simple math equations to determine what the minimum value of 
   time should be for a certain pattern. I would also have preset HTML button elements "Easy" "Medium" and "Hard" that would choose adequate pattern length and time
   values based on the difficulty chosen by the user. Another thing I would spend time doing is finding a workaround for Chrome occassionally blocking the audio
   loading when the window opens. Since it is only this specific browser that does it, perhaps I could use a different function or technique that prevents Chrome and
   other browsers from preventing the menu theme from playing.

## License

    Copyright Seim Wolderufael

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
