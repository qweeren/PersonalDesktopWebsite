<script>
    import Shortcuts from "./shortcuts.svelte";
    import Program from "../applib/Program.svelte";
    import { onMount } from "svelte";
    import { openapps } from "../store/store";

    import Snake from "../apps/snake/snake.svelte";
    let showSnake=false;
    let snakeWidth = 825;
    let snakeHeight = 745;
    function snakesizechange(e){
        console.log(e);
        snakeWidth = e.detail[0]+25;
        snakeHeight = e.detail[1]+145;
    }

    let desktop;
    let appref;
    let appname;
    let appicon
    

    function OpenApp(e){
        if (e.detail) {
            appname = e.detail[0];
            appicon = e.detail[1];
            openapps.set([...$openapps, {appname, appicon}]);
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

    function close(appname){
        openapps.set($openapps.filter(appname))
        switch(appname){
            case "Snake":
                showSnake = false;
            default:
        }
    }
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
        <Program width={snakeWidth} height={snakeHeight} {appicon} {appname} bind:this={appref} on:close={close}>
            <Snake on:snakesizechange={snakesizechange}/>
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
        background-color: #004bd736;
        border-radius: 1px;
        border: 1px solid #0078d7;
    }
</style>