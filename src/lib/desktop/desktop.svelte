<script>
    import GoogleProgram from "../apps/Google/GoogleProgram.svelte";
    import Mapsprogram from "../apps/Maps/Mapsprogram.svelte";
    import Cvprogram from "../apps/cv/cvprogram.svelte";
    import Gamesprogram from "../apps/doom/gamesprogram.svelte";
  import Settingsprogram from "../apps/settings/settingsprogram.svelte";
    import SnakeProgram from "../apps/snake/SnakeProgram.svelte";
    import Shortcuts from "./shortcuts.svelte";
    import { onMount } from "svelte";

    let desktop;
    let desktopGrid;
  let rectangle;
  let isResizing = false;
  let initialX;
  let initialY;
  let selectionWidth;
  let selectionHeight;

  function handleMouseDown(event) {
    if (event.target === desktop || event.target === desktopGrid) {
      isResizing = true;
      initialX = event.clientX;
      initialY = event.clientY;

      rectangle.style.width = "0";
      rectangle.style.height = "0";
      rectangle.style.left = `${initialX}px`;
      rectangle.style.top = `${initialY}px`;
    }
  }

  function handleMouseMove(event) {
    if (!isResizing) return;

    const currentX = event.clientX;
    const currentY = event.clientY;

    selectionWidth = Math.abs(currentX - initialX);
    selectionHeight = Math.abs(currentY - initialY);

    rectangle.style.width = `${selectionWidth}px`;
    rectangle.style.height = `${selectionHeight}px`;

    if (currentX < initialX) {
      rectangle.style.left = `${currentX}px`;
    }

    if (currentY < initialY) {
      rectangle.style.top = `${currentY}px`;
    }
  }

  function handleMouseUp() {
    isResizing = false;
  }

  onMount(() => {
    desktop = document.getElementById("desktop");
    desktopGrid = document.getElementById("grid");
    rectangle = document.querySelector(".selection");
    desktop.addEventListener("mousedown", handleMouseDown);
    desktopGrid.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="desktop" id="desktop">
    <div class="selection" hidden={!isResizing}></div>
    <div class="desktop-grid" id="grid">
        <Shortcuts/>
    </div>
    <div class="appenv">
        <SnakeProgram/>
        <Cvprogram/>
        <GoogleProgram/>
        <Mapsprogram/>
        <Gamesprogram/>
        <Settingsprogram/>
    </div>
</div>

<style>
    .hidden{
        display: none;
    }
    .desktop{
        position: absolute;
        height: calc(100vh - 50px);
        width: 100vw;
    }
    .desktop-grid{
        position: absolute;
        display: inline-flex;
        flex-direction:column;
        flex-wrap: wrap;
        gap: 10px;
        height: 100%;
        width: fit-content;
        left: 10px;
        top: 10px;
    }
    .selection {
        position: absolute;
        background-color: #004bd736;
        border-radius: 1px;
        border: 1px solid #0078d7;
    }
</style>