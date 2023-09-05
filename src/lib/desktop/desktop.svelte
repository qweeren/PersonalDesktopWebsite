<script>
  import GoogleProgram from "../apps/Google/GoogleProgram.svelte";
  import Mapsprogram from "../apps/Maps/Mapsprogram.svelte";
import Cvpage from "../apps/cv/cvpage.svelte";
  import Cvprogram from "../apps/cv/cvprogram.svelte";
    import SnakePage from "../apps/snake/SnakePage.svelte";
import SnakeProgram from "../apps/snake/SnakeProgram.svelte";
    import Shortcuts from "./shortcuts.svelte";
    import { onMount } from "svelte";

    let desktop;

    let rectangle;
    let isResizing = false;
    let initialX;
    let initialY;
    let selectionwidth;
    let selectionheight;

    function handleMouseDown(event) {
        if(event.target.className != this.className){

        isResizing = true;
        initialX = event.clientX;
        initialY = event.clientY;

        rectangle.style.selectionwidth = "0";
        rectangle.style.selectionheight = "0";
        rectangle.style.left = `${initialX}px`;
        rectangle.style.top = `${initialY}px`;
        }
    }

    function handleMouseMove(event) {
        if (!isResizing) return;

        const currentX = event.clientX;
        const currentY = event.clientY;

        selectionwidth = Math.abs(currentX - initialX);
        selectionheight = Math.abs(currentY - initialY);

        rectangle.style.selectionwidth = `${selectionwidth}px`;
        rectangle.style.selectionheight = `${selectionheight}px`;

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
        desktop = document.getElementById("desktop")
        rectangle = document.querySelector(".selection");
        desktop.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="desktop" id="desktop">
    <div class="selection" hidden={!isResizing}></div>
    <div class="desktop-grid">
        <Shortcuts/>
    </div>
    <div class="appenv">
        <SnakeProgram/>
        <Cvprogram/>
        <GoogleProgram/>
        <Mapsprogram/>
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
        display: flex;
        flex-direction:column;
        left: 10px;
        right: 10px;
        top: 10px;
        bottom: 10px;
    }
    .selection {
        position: absolute;
        background-color: #004bd736;
        border-radius: 1px;
        border: 1px solid #0078d7;
    }
</style>