/*        cells/board logic
    --Store the snake moving cells into an array
    --Delete the previous cells by substracting between snake size and total food eaten
    --Update the head and food cells when its changed/eaten
*/

let curKey = 39, //Snake moves right at first
  previousKey = 0,
  randColumn = Math.floor(Math.random() * (39 - 0 + 1)) + 0,
  randRow = Math.floor(Math.random() * (24 - 0 + 1)) + 0,
  curFoodRow = randRow,
  curFoodColumn = randColumn,
  curRow = 4,
  curColumn = 4,
  dem = 0,
  currentSnakeSize = 1,
  snakeArray = [];
let scr = 0; //initialize score

// check accident into wall
let isAccidentWithWall = (cRw, cCl) => {
  if (cRw >= 25 || cCl >= 40 || cRw < 0 || cCl < 0) {
    setTimeout(()=>{
        gameOver();
     },300);
    return true;
  }
};

// check the food is eaten or not
let checkFoodEaten = (cRw, cCl) => {
  if (cRw === curFoodRow && cCl == curFoodColumn) {
    //the food is eaten
    currentSnakeSize++;
    scr += 1;
    let scoreElement = document.getElementById("score");
    scoreElement.innerHTML = `Score : ` + scr; //update the score
    let curFoodCell = document.getElementById(curFoodRow + "-" + curFoodColumn);
    curFoodCell.style.backgroundImage = "none";
    curFoodCell.style.transform = "scale(1)";
    let randFoodC = Math.floor(Math.random() * (39 - 0 + 1)) + 0, //genetate a random cell for food after previous one eaten
        randFoodR = Math.floor(Math.random() * (24 - 0 + 1)) + 0;
     curFoodRow = randFoodR,curFoodColumn = randFoodC;
    let newFoodCell = document.getElementById(randFoodR + "-" + randFoodC);
    newFoodCell.style.backgroundImage = "url('food.png')";
    newFoodCell.style.transform = "scale(1.3)";
  }
};

// clear previous cell visiting
let clearPreviousCells = () => {
  let previousCellsLength = snakeArray.length - currentSnakeSize;
  for (let i = 0; i < previousCellsLength; i++) {
    let clearCell = document.getElementById(snakeArray[i]);
    clearCell.style.backgroundColor = "transparent";
  }
  // delete the previous cells from beginning of the array
  for (let i = 0; i < previousCellsLength; i++) {
    snakeArray.shift();
  }
};

// update snake body and head into cells
let updateSnakeBody = () => {
  //set snake head to the last array index
  for (let i = 0; i < snakeArray.length; i++) {
    let snakeCell = document.getElementById(snakeArray[i]);
    snakeCell.style.backgroundColor = "#82E0AA";
    if (snakeCell.style.backgroundImage == `url("snakeHead.png")`) {
      snakeCell.style.backgroundImage = "none";
      snakeCell.style.transform = "scale(1)";
    }
  }
  //set snake head to the last array index
  let curSnakeHead = document.getElementById(snakeArray[snakeArray.length - 1]);
  curSnakeHead.style.backgroundImage = "url('snakeHead.png')";
  curSnakeHead.style.backgroundSize = "cover";
  curSnakeHead.style.transform = "scale(1.2)";
};

// check accident on own body
let isAccidentOnOwnBody = (cRow, cCol) => {
  let concatCell = cRow + "-" + cCol;
  if (snakeArray.includes(concatCell.toString())) {
    let accidentCell = document.getElementById(concatCell);
    accidentCell.style.backgroundColor = "red";
    setTimeout(()=>{
       gameOver();
    },300);
    return true;
  }
};
// game over
let gameOver=()=>{
    let showGameOver = document.getElementById('game-over');
    showGameOver.style.display="block";
}

let startGame = (cRw, cCl) => {
  // Check the accident on wall and own body
  if (isAccidentWithWall(cRw, cCl)) {
    return;
  }
  if (isAccidentOnOwnBody(cRw, cCl)) {
    return;
  }
  setTimeout(() => {
    try {
      //  check the food is eaten?
      clearPreviousCells();
      checkFoodEaten(cRw, cCl);
      snakeArray.push(cRw + "-" + cCl); //current snake head
      updateSnakeBody();
      //update key state for left-right-down-up move
      curKey === 39
        ? cCl++
        : curKey === 38
        ? cRw--
        : curKey === 40
        ? cRw++
        : cCl--;
      //current food cell fill with food
      let curFood = document.getElementById(curFoodRow + "-" + curFoodColumn);
      curFood.style.backgroundImage = "url('food.png')";
      curFood.style.transform = "scale(1.3)";
      startGame(cRw, cCl);
    } catch (err) {
      console.log(err);
      return;
    }
  }, 100);
};
startGame(curRow, curColumn);
// key press for left-right-down-up
document.onkeydown = (evt) => {
  if (evt.keyCode == 82) {
    location.reload();
  }
  previousKey = curKey;
  if (evt.keyCode === 39 && previousKey !== 37) curKey = evt.keyCode;
  if (evt.keyCode === 38 && previousKey !== 40) curKey = evt.keyCode;
  if (evt.keyCode === 40 && previousKey !== 38) curKey = evt.keyCode;
  if (evt.keyCode === 37 && previousKey !== 39) curKey = evt.keyCode;
  console.log(previousKey, curKey);
};
