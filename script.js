//Global constants
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence
const initChances = 3; // how many chances the player gets
const initTime = 15.00; // how much time player has

//Global variables
var pattern = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // pattern that will be filled with random numbers
var progress = 0;            //how many clue sequences player has completed so far
var gamePlaying = false;     // whether or not game is playing
//var tonePlaying = false; whether or not tone is playing, old code, commented for reference
var volume = 0.5;            //must be between 0.0 and 1.0
var guessCounter = 0;        // how far player has gotten through correctly guessing current clue sequence
var clueHoldTime = 1000;     //how long to hold each clue's light/sound
var numButtons = 9;          //how many buttons exist, used for maximum value that can be randomly generated
var chances;                 // how many chances player has left
var sound;                   // current button sound file being played
var menuTheme = document.getElementById("menuMusic"); // variable holding html element of menu audio
var badGuessSound = document.getElementById("guessWrong"); // variable holding html element of error audio
var timeLeft;                // how much time player has left
var startTimeHold;           //how long player should hold the timer so it activates right after clue sequence
var timer;                   //holds the timer
var shouldTimerGo = true;    //should timer activate when being called after clue sequence finishes

//plays the menu music
function playMenuMusic(){
  menuTheme.play();
}

//stops and resets the player music
function stopMenuMusic(){
  menuTheme.pause();
  menuTheme.currentTime = 0;
}

//starts the timer
function startTimer(){
  timeLeft = initTime;
	timer = setInterval(gameTimer, 10);
}

function gameTimer() {
  //subtracts by 10 milliseconds every 10 milliseconds
  //rounds up to 2 decimal points
  timeLeft = (timeLeft - .01).toFixed(2);
  //updates time to show on the html element
  document.getElementById("timeleft").innerHTML = "TIME LEFT: " + timeLeft;
  //if player runs out of time, stop timer at 0 (or slightly less than 0)
  //and give him a game over
  if(timeLeft <= 0 && shouldTimerGo == true){
  	stopTimer();
    timeLeft = initTime;
    console.log("Ran out of time!");
    //ensures timer actually shows 0.00
    setTimeout(loseGame, 100);
  }
}

//stops the timer
function stopTimer() {
	clearInterval(timer);
}

//generates a random pattern
function getPattern(){
  var min = 1;
  var max = numButtons;
  for(let i = 0; i < pattern.length; i++){
    pattern[i] = Math.floor(Math.random() * (max - min + 1) + min);
    console.log("pattern[" + i + "] is " + pattern[i]);
  }
  
  
}
function startGame(){
  //initialize game variables
  stopMenuMusic();
  shouldTimerGo = true;
  progress = 0;
  chances = initChances;
  gamePlaying = true;
  clueHoldTime = 1000;
  timeLeft = initTime;
  //show time and chance element when game begins
  document.getElementById("timeleft").classList.remove("hidden");
  document.getElementById("chancesleft").classList.remove("hidden");
  document.getElementById("timeleft").innerHTML = "TIME: " + timeLeft;
  document.getElementById("chancesleft").innerHTML = "CHANCES: " + chances + "/" + initChances;
  //swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  //get the random pattern and begin playing clue sequence
  getPattern();
  playClueSequence();
}

function stopGame(){
  //in a scenario where code is waiting to start timer
  //after clue sequence but player quits before then,
  //or when player quits mid turn, timer will not
  //continue
  shouldTimerGo = false;
  //stops timer
  clearInterval(timer);
  //stops playing clues
  gamePlaying = false;
  //hides time, chances, and stop buttons elements,
  //brings start back
  document.getElementById("timeleft").classList.add("hidden");
  document.getElementById("chancesleft").classList.add("hidden");
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  //plays menu music again
  playMenuMusic();
}

//lights up button
function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit");
}

//darkens button
function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit");
}

//plays a single button for clue sequence
function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    //playTone(btn,clueHoldTime); old audio code, commented for reference
    playAudio(btn, clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}

//plays an entire clue sequence
function playClueSequence(){
  document.getElementById("timeleft").innerHTML = "TIME LEFT: CLUE SEQUENCE"; //doesn't show time since it is not player's turn
  guessCounter = 0; //sets correct guesses at zero since we have a new/extended sequence
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue,delay,pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime; //any additonal buttons played need additional delay time since they play sequentially
    delay += cluePauseTime;
  }
  clueHoldTime = clueHoldTime - 85; // reduces clue sequnece length, making it quicker each turn
  startTimeHold = (clueHoldTime + 85) * (progress + 2) + cluePauseTime * (progress); // measures length of time of clue sequence
  setTimeout(clueTimer, startTimeHold); //doesn't start timer until entire clue sequence finishes
}

//starts the timer for the player to copy clue sequence
function clueTimer(){
  if(shouldTimerGo == true){
    startTimer();
  }
}

//when player loses
function loseGame(){
  stopGame();
  alert("Game Over! You lost.");
}

//when player wins
function winGame(){
  stopGame();
  alert("Congratulations, you won!");
}

//when player clicks a button, html button element makes this function run
function guess(btn){
  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }
  if(btn == pattern[guessCounter]){
    //Guess was correct!
    if(guessCounter == progress){
      if(guessCounter == pattern.length - 1){
        //if the guess was correct, the sequence has
        //been repeated, and is the final pattern,
        //then the player won the game
        winGame();
      }
      else{
        //if the guess was correct, and the sequence
        //has been repeated but it is not the final
        //pattern, play the next sequence
        stopTimer();
        progress++;
        playClueSequence();
      }
    }
    else{
      //so far so good...check next guess
      guessCounter++;
    }
  }
  else{
    //Guess was incorrect, update chance element
    chances--;
    document.getElementById("chancesleft").innerHTML = "CHANCES: " + chances + "/" + initChances;
    badGuessSound.play();
    if(chances == 0){
    //If no more chances, then GAME OVER: LOSE!
    setTimeout(loseGame, 100); 
    }
  }
}

//play the audio from the buttons
function playAudio(btn, len){
  sound = document.getElementById("audio"+btn);
  sound.play();
  setTimeout(function(){
    sound.pause();
    sound.currentTime = 0;
  }, len)
}

//start audio when button held down by player, html button element makes this function run
function startAudio(btn){
  sound = document.getElementById("audio"+btn);
  sound.play();
}

//stop and reset audio when button not held down by player, html button element makes this function run
function stopAudio(btn){
  sound.pause();
  sound.currentTime = 0;
}

//start menu theme when window loads (sometimes doesn't work on Chrome)
window.onload = function(){
  menuTheme.play();
}

/*old code for tone producing
// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2,
  5: 500,
  6: 300,
  7: 250,
  8: 200,
  9: 150
}
function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  if(!tonePlaying){
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
}
function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)
*/