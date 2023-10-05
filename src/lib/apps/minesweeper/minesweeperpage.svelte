<script>
// Constants
const rows = 8;
const cols = 8;
const mines = 10;

// Variables
let grid = [];
let minesLeft = mines;
let flagMode = false;
let emoji = "🙂";
let isPlaying = true;
let flagModeText ="🔎";

// Event Listeners
document.addEventListener("mousedown", () => {
  emoji = "😳";
});

document.addEventListener("mouseup", () => {
  emoji = "🙂";
});

// Initialize grid
function initializeGrid() {
  grid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
    }))
  );
}

// Generate mines
function generateMines() {
  let minesPlaced = 0;
  minesLeft = mines;
  while (minesPlaced < mines) {
    const x = Math.floor(Math.random() * rows);
    const y = Math.floor(Math.random() * cols);
    if (!grid[x][y].isMine) {
      grid[x][y].isMine = true;
      minesPlaced++;
    }
  }
}

// Reset game
function resetGame() {
  isPlaying = true;
  emoji = "🙂";
  initializeGrid();
  generateMines();
}

// Revealing a cell
function reveal(x, y) {
  if (grid[x][y].isFlagged || !isPlaying || x < 0 || x >= rows || y < 0 || y >= cols || grid[x][y].isRevealed) {
    return;
  }

  grid[x][y].isRevealed = true;

  if (grid[x][y].isMine) {
    if (isPlaying) {
      isPlaying = false;
      revealAllBombs();
      emoji = "😔"; // Losing
    }
    return;
  }

  const adjacentMines = countAdjacentMines(x, y);

  if (adjacentMines === 0) {
    // Auto-reveal adjacent cells
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue;
        const newX = x + dx;
        const newY = y + dy;
        if (newX >= 0 && newX < rows && newY >= 0 && newY < cols) {
          reveal(newX, newY);
        }
      }
    }
  }

  // Check if the game is won
  let revealedCount = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j].isRevealed) {
        revealedCount++;
      }
    }
  }
  if (revealedCount === rows * cols - mines) {
    emoji = "😎"; // Winning
    isPlaying = false;
  }
}


// Toggle flag mode
function toggleFlagMode() {
  flagMode = !flagMode
  if(flagMode){
    flagModeText = "🚩";
  }
  else{
    flagModeText = "🔎";
  }
}

// Handle cell click
function handleClick(event, x, y) {
  if (!isPlaying) {
    return;
  }

  if (flagMode) {
    // Toggle flag
    if (!grid[x][y].isRevealed) {
      grid[x][y].isFlagged = !grid[x][y].isFlagged;
      // Update minesLeft based on flagged/unflagged cells
      if (grid[x][y].isFlagged) {
        minesLeft--;
      } else {
        minesLeft++;
      }
    }
  } else {
    if (!grid[x][y].isRevealed) {
      // Reveal cell
      reveal(x, y);
    } else if (grid[x][y].isRevealed && countAdjacentMines(x, y) > 0) {
      // If the cell is revealed and has a number, check flags around it
      let flagsAround = 0;

      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue;
          const newX = x + dx;
          const newY = y + dy;
          if (
            newX >= 0 &&
            newX < rows &&
            newY >= 0 &&
            newY < cols &&
            grid[newX][newY].isFlagged
          ) {
            flagsAround++;
          }
        }
      }

      if (flagsAround === countAdjacentMines(x, y)) {
        // Auto-reveal adjacent cells if flags match the number
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) continue;
            const newX = x + dx;
            const newY = y + dy;
            if (
              newX >= 0 &&
              newX < rows &&
              newY >= 0 &&
              newY < cols &&
              !grid[newX][newY].isFlagged
            ) {
              reveal(newX, newY);
            }
          }
        }
      }
    }
  }
}

// Count adjacent mines
function countAdjacentMines(x, y) {
  let count = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) continue;
      const newX = x + dx;
      const newY = y + dy;
      if (
        newX >= 0 &&
        newX < rows &&
        newY >= 0 &&
        newY < cols &&
        grid[newX][newY].isMine
      ) {
        count++;
      }
    }
  }
  return count;
}

// Reveal all bombs
async function revealAllBombs() {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (grid[x][y].isMine) {
        if(isPlaying) return;
        grid[x][y].isRevealed = true;
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    }
  }
}

// Call initialization functions
initializeGrid();
generateMines();
</script>

<div class="game">
  <div class="navbar">
    <div class="mineDisplay">
      {minesLeft}
    </div>
    <button class="cell" id="emoji" on:click={resetGame}>{emoji}</button>
    <button class="cell" id="flagButton" on:click={toggleFlagMode}>{flagModeText}</button>
  </div>
  <div class="grid-container">
    <div class="grid">
      {#each grid as row, rowIndex}
        {#each row as cell, colIndex}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          class:mine={cell.isMine}
          class:flag={cell.isFlagged}
          class:revealed={cell.isRevealed}
          class:number={cell.isRevealed && countAdjacentMines(rowIndex, colIndex) > 0}
          class="cell"
          on:click={(e) => handleClick(e, rowIndex, colIndex)}
        >
            {#if cell.isRevealed}
            {#if cell.isFlagged}
              ✔️
            {:else}
              {#if countAdjacentMines(rowIndex, colIndex) > 0}
                {#if !cell.isMine}
                  <span class="number-text number-{countAdjacentMines(rowIndex, colIndex)}">
                    {countAdjacentMines(rowIndex, colIndex)}
                  </span>
                  {/if}
              {:else}
                &nbsp;
              {/if}
            {/if}
          {/if}
          </div>
        {/each}
      {/each}
    </div>
  </div>
</div>

<style>
  .mineDisplay{
    background-color: black;
    border: 4px outset #e1e1e1;
    color: red;
    padding: 0px 15px;
    font-family: 'Seven Segment', sans-serif;
    font-size: 23px;
  }
  .game{
    padding: 10px;
    background-color: #c0c0c0;
  }

  #emoji {
    padding: 5px 15px;
  }
  #flagButton{
    padding: 5px 15px;
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin-bottom: 10px;
  }
  
  .grid {
    display: inline-flex;
    width: 304px;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .cell {
    background-color: #c0c0c0;
    width: 30px;
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
    font-size: 18px;
    border: 4px outset #e1e1e1;
  }
  .cell.mine {
    color: white;
  }

  .cell.flag {
    background-image: url("https://w7.pngwing.com/pngs/337/559/png-transparent-minesweeper-computer-icons-bing-maps-video-game-mines-miscellaneous-game-angle.png");
    background-size: contain;
    border: none;
    width: 38px;
    height: 38px;
    image-rendering: pixelated;
    background-position: center;
  }
  
  .cell.revealed{
    width: 30px;
    height: 30px;
    border: 4px inset #e1e1e1;
  }
  
  .cell.revealed.mine{
    background-color: #f00;
    background-image: url("https://esraa-alaarag.github.io/Minesweeper/images/bomb.png");
    background-size: contain;
    background-position: center;
  }
  .cell.revealed.flag{
    background-image: url("https://w7.pngwing.com/pngs/337/559/png-transparent-minesweeper-computer-icons-bing-maps-video-game-mines-miscellaneous-game-angle.png");
    border: none;
    width: 38px;
    height: 38px;
  }



.number-text {
  background-size: cover;
  background-repeat: no-repeat;
  font-weight: bold;
  font-size: 18px;
}

.number-1{
  color: #0100fa;
}

.number-2{
  color: #008001;
}

.number-3{
  color: #fd0100;
}

.number-4{
  color: #01007f;
}

.number-5{
  color: #7b0402;
}

.number-6{
  color: #00807f;
}

.number-7{
  color: #000000;
}

.number-8{
  color: #808080;
}
</style>