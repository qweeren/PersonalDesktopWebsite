<script>
    import { settings, hideSettings } from './msstore.js';
  
    let rows;
    let cols;
    let safeZone;
    let cellSize;
    let mines;

  function getSettings(){
    rows = $settings.rows;
    cols = $settings.cols;
    safeZone = $settings.safeZone;
    cellSize = $settings.cellSize;
    mines = $settings.mines;
    console.log(rows,cols,safeZone,cellSize)
  }

  hideSettings.subscribe(() => {
    getSettings();
  })

    // Function to apply settings in the store
    function applySettings() {
      settings.update(() => ({
        rows,
        cols,
        safeZone,
        cellSize,
        mines,
      }));
    }
  
    function toggleSettings() {
      getSettings();
      hideSettings.set(!$hideSettings);
    }
  
    
  </script>

<style>
 .settings-container {
    position: absolute;
    display: inline-flex;
    flex-direction: column;
    top: 100px;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: #c0c0c0;
    border: 4px outset #e1e1e1;
    padding: 20px 40px;
 }
 .setting{
    margin-top: 15px;
    display: table;
 }
 input{
    float: right;
    margin: 0;
 }
 .hidden{
    display: none;
 }
 label{
    line-height: 27px;
 }
 .button{
    background-color: #c0c0c0;
    width: fit-content;
    height: 2rem;
    border: 4px outset #e1e1e1;
    color: black;
}
.button:active{
    border: 4px inset #e1e1e1;
    color: white;
}
 .button-container{
    display: inline-flex;
    width: 100%;
    height: 2rem;
 }
 .numberinput{
    width: 3rem;
 }
 .sliderinput{
    margin-left: 10px;
    background-color: #c0c0c0;
    border: 4px inset #e1e1e1;
    -webkit-appearance: none;
 }
 .sliderinput::-webkit-slider-thumb {
    width: 15px;
    height: 15px;
    -webkit-appearance: none;
    background: #c0c0c0;
    cursor: pointer;
    border: 4px outset #e1e1e1;
}
.explanation{
    border: 2px outset #e1e1e1;
    padding:4px;
}
.explanation:hover{
    color: gray;
    transition-duration: 1.2s;
}
</style>

<div class="settings-container" class:hidden={$hideSettings}>
    <div class="button-container" style="justify-content: end;">
        <button class="button" on:click={toggleSettings}>X</button>
    </div>

    <div class="setting">
        <label for="rows">Rows:</label>
        <input
          class="numberinput"
          type="number"
          id="rows"
          bind:value={rows}
        />
      </div>
      
      <div class="setting">
        <label for="cols">Columns:</label>
        <input
          class="numberinput"
          type="number"
          id="cols"
          bind:value={cols}
        />
      </div>

      <div class="setting">
        <label for="cols">Mines:</label>
        <input
          class="numberinput"
          type="number"
          id="cols"
          bind:value={mines}
        />
      </div>
      
      <div class="setting">
        <label for="safeZone">Safe Zone:</label>
        <input
          class="numberinput"
          type="number"
          id="safeZone"
          bind:value={safeZone}
        />
        <label class="explanation" for="explanation" title="The area that clears out on the first click">?</label>
      </div>
      
      <div class="setting">
        <label for="cellSize">Cell Size:</label>
        {cellSize}<input
          class="sliderinput"
          type="range"
          min="10"
          max="99"
          id="cellSize"
          bind:value={cellSize}
        />
      </div>

      <div class="button-container" style="margin-top: 10px; justify-content: center;">
        <button class="button" style="display: table;" on:click={applySettings}>Apply</button>
      </div>
</div>