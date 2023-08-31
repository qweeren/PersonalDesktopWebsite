<script>
    import Shortcuts from "./shortcuts.svelte";
    import Program from "../applib/Program.svelte";
    import { onMount } from "svelte";

    import Snake from "../apps/snake/snake.svelte";
    let showSnake=false;


    let desktop;
    let appref;
    let appname;
    let appicon


    function OpenApp(e){
        if (e.detail) {
            appname = e.detail[0];
            appicon = e.detail[1];
        }
        switch(appname){
            case "Snake":
                showSnake = true;
            default:
        }
    }

    let rectangle;
    let isResizing = false;
    let initialX;
    let initialY;
    let width;
    let height;

    function handleMouseDown(event) {
        if(event.target.className != this.className){

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

        width = Math.abs(currentX - initialX);
        height = Math.abs(currentY - initialY);

        rectangle.style.width = `${width}px`;
        rectangle.style.height = `${height}px`;

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
        <Shortcuts on:openapp={OpenApp}/>
    </div>
    <div class="appenv">
        {#if showSnake}
        <Program width={825} height={745} {appicon} {appname} bind:this={appref} on:close={function(){showSnake=false}}>
                <Snake/>
            </Program>
        {/if}
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
        background-color: rgba(65, 65, 255, 0.801);
        border-radius: 1px;
        border: 1px solid rgb(39, 39, 255);
    }
</style>