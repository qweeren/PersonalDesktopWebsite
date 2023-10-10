<script>
  import { onDestroy } from "svelte";
  import Settings from "./minesweeperSettings.svelte";
  import { longpress } from "../../actions";
  import { hideSettings, settings } from "./msstore.js";

  // Constants
  let rows;
  let cols;
  let safeZone;
  let cellSize;
  let mines;

  // Subscribe to the settings store
  let settingsData;
  const unsubscribe = settings.subscribe((value) => {
    settingsData = value;

    // Update the variables when settings change
    rows = settingsData.rows;
    cols = settingsData.cols;
    safeZone = settingsData.safeZone;
    cellSize = settingsData.cellSize;
    mines = settingsData.mines;
  });

  onDestroy(() => {
    unsubscribe();
  });
  
  // Variables
  let grid = [];
  let minesLeft = mines;
  let emoji = "smile";
  let isPlaying = true;
  let clicked = 0;

  function toggleSettings(){
    hideSettings.set(!$hideSettings);
  }
  
  function griddown(){
    emoji = "surprised";
  };
  
  function gridup(){
    emoji = "smile";
  };
  
  function emojidown(){
    emoji = "pressed";
  };
  
  function emojiup(){
    emoji = "smile";
  };

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
    emoji = "smile";
    initializeGrid();
    generateMines();
    clicked = 0;
  }
  
  // Revealing a cell
  function reveal(x, y) {
    if (grid[x][y].isFlagged || !isPlaying || x < 0 || x >= rows || y < 0 || y >= cols || grid[x][y].isRevealed) {
      return;
    }
  
    if(clicked == 0){
      let removedmines=0;
      for (let dx = -safeZone/2; dx <= safeZone/2; dx++) {
        for (let dy = -safeZone/2; dy <= safeZone/2; dy++) {
          const newX = x + dx;
          const newY = y + dy;
          if (newX >= 0 && newX < rows && newY >= 0 && newY < cols) {
            if(grid[newX][newY].isMine){
              removedmines++
            }
            grid[newX][newY].isMine = false;
            grid[newX][newY].isRevealed = false;
            grid[newX][newY].isFlagged = false;
            clicked++;
          }
        }
      }
      minesLeft -= removedmines;
    }
    
    grid[x][y].isRevealed = true;

    if (grid[x][y].isMine) {
      if (isPlaying) {
        isPlaying = false;
        revealAllBombs();
        emoji = "lost"; // Losing
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
      emoji = "won"; // Winning
      isPlaying = false;
    }
  }
  
  function putFlag(event, x, y){
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
  }

  // Handle cell click
  function handleClick(event, x, y) {
    if(event.shiftKey || event.ctrlKey || event.button == 2){
      putFlag(event, x, y);
      return;
    }

    if (!isPlaying) {
      return;
    }
    
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
          await new Promise((resolve) => setTimeout(resolve, 1000/mines));
        }
      }
    }
  }
  
  // Call initialization functions
  initializeGrid();
  generateMines();
  
  function preventRightClick(event) {
    event.preventDefault();
  }
</script>
  
  <div class="game">
    <div class="navbar">
      <div class="mineDisplay">
        {minesLeft}
      </div>
      <button id="emoji" on:click={resetGame} on:mousedown={emojidown} on:mouseup={emojiup}>
        <img style="width:inherit; position: relative; left:-6px; top:-1px;" src="/minesweeper/emojis/{emoji}.png">
      </button>
      <button  id="settings" on:click={toggleSettings}>
        <svg xmlns="http://www.w3.org/2000/svg" style="fill:inherit" height="1em" viewBox="0 0 512 512"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg>
      </button>
    </div>
    <div class="grid-container">
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="grid" style="
      grid-template-columns: repeat({cols}, {cellSize}px);
      grid-template-rows: repat({rows}, {cellSize}px);
      "
      on:mousedown={griddown}
      on:mouseup={gridup}
      >
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
            on:mouseup={(e) => handleClick(e, rowIndex, colIndex)}
            use:longpress on:longpress="{e => putFlag(e, rowIndex, colIndex)}"
            style="width: {cellSize}px;
                   font-size: {cellSize/3}px;
                   "
          >
              {#if cell.isRevealed}
                {#if cell.isFlagged && cell}
                  <img src="/minesweeper/check.png" style="height: inherit; width: inherit; image-rendering: pixelated;" alt="">
                {:else}
                  {#if countAdjacentMines(rowIndex, colIndex) > 0}
                    {#if !cell.isMine}
                      <span class="number-text number-{countAdjacentMines(rowIndex, colIndex)}">
                        {countAdjacentMines(rowIndex, colIndex)}
                      </span>
                    {:else}
                      &nbsp;
                    {/if}
                  {/if}
                {/if}
              {/if}
            </div>
          {/each}
        {/each}
      </div>
    </div>
  </div>

  <Settings/>
  <svelte:window on:contextmenu={preventRightClick}/>
  
  <style>
    .grid-container{
      width: 100%;
      height: 100%;
      display: flex;
      overflow: hidden;
      margin-top: 10px;
    }
    .grid {
      border: 4px inset #e1e1e1;
      display: grid;
      margin: auto;
      position: relative;
      user-zoom: zoom;
    }
    .mineDisplay{
      background-color: black;
      border: 4px outset #e1e1e1;
      color: red;
      margin-left: 10px;
      padding: 0px 15px;
      font-family: 'Seven Segment', sans-serif;
      font-size: 1.5rem;
    }
    .game{
      width: calc(100vw-20px);
      padding: 10px;
      background-color: #c0c0c0;
    }
    :root{
      background-color: #c0c0c0;
    }
  
    #emoji {
      width: 3rem;
      height: 3rem;
      background-size: cover;
      background-image: url('./assets/smile.png');
      background-position: center;
      border: none;
    }

    #settings{
      width: 3rem;
      height: 3rem;
      background-size: cover;
      background-image: url('./assets/cell.png');
      background-position: center;
      border: none;
      fill: black;
    }
    #settings:active{
      background-image: url('./assets/emptycell.png');
      fill: white;
    }
  
    .navbar {
      padding: 5px;
      border: 4px inset #e1e1e1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
    }
    

    .cell {
      background-color: #c0c0c0;
      aspect-ratio: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      user-select: none;
      background-size: contain;
      image-rendering: pixelated;
      background-position: center;
      background-image: url("./assets/cell.png");
    }
    .cell.mine {
      color: white;
    }
  
    .cell.flag {
      background-image: url("./assets/flag.png");
    }
    
    .cell.revealed{
      background-image: url("./assets/emptycell.png");
    }
    
    .cell.revealed.mine{
      background-image: url("./assets/bomb.png");
    }
    .cell.revealed.flag{
      background-image: url("./assets/flag.png");
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