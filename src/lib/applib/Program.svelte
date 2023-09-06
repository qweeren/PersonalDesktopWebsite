<script>
    import { createEventDispatcher, onMount } from "svelte";
    let dispatch = createEventDispatcher();

    export let appname = "Unnamed App";
    export let appicon;
    export let appid;
    export let width = 640;
    export let height = 480;
    let oldwidth = width;
    let oldheight = height;
    let isFullscreen = false;
    let rerender = 0;

    function drag(node) {
        if (node.id !== 'program') {
            return; // Do not make children draggable
        }

        let moving = false;
        let left = (window.innerWidth - width) / 2;
        let top = (window.innerHeight - height) / 2;

        node.style.top = `${top}px`;
        node.style.left = `${left}px`;

        node.addEventListener('mousedown', () => {
            moving = true;
        });

        window.addEventListener('mousemove', (e) => {
            if (moving && !isFullscreen) {
                left += e.movementX;
                top += e.movementY;
                node.style.top = `${top}px`;
                node.style.left = `${left}px`;
            }
            if (isFullscreen) {
                node.style.top = "0px";
                node.style.left = "0px";
            }
        });

        window.addEventListener('mouseup', () => {
            moving = false;
        });
    }

    function close() {
        dispatch("close");
    };

    function fullscreen(){
        if (!isFullscreen) {
            width = window.innerWidth - 6;
            height = window.innerHeight - 55;
        }
        else{
            width = oldwidth
            height = oldheight
            document.getElementById("program").style.left = (window.innerWidth - width)/2 + "px";
            document.getElementById("program").style.top = (window.innerHeight - height)/2 + "px";
        }
        isFullscreen = !isFullscreen
    }

    function restart(){
        rerender++;
    }
</script>

<div id="program" use:drag style="width: {width}; height: {height}">
    <div id="bar">
        <div class="icon" style="background-image: url('{appicon}');"></div>
        <div class="appname">{appname}</div>
        <div class="buttons">
            <button class="restart" on:click={restart}>←</button>
            <button class="fullscreen" on:click={fullscreen}>□</button>
            <button class="close" on:click={close}>x</button>
        </div>
    </div>
    <div class="ui" style="width: {width}px; height: {height -32}px">
        {#key rerender}
        <slot></slot>
        {/key}
    </div>
</div>

<style>
    .icon{
        height: 24px;
        width: 24px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        margin-left: 4px;
        margin-bottom: 3px;
    }
    #program{
        position: absolute;
        background: linear-gradient(180deg, rgba(43,139,254,1) 0%,rgb(139, 189, 255) 2%,rgba(43,139,254,1) 4%, rgb(34, 106, 230) 23%, rgba(1,84,232,1) 62%, rgba(2,104,250,1) 77%); 
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        user-select: none ;
        border: 3px solid rgba(43,139,254,1);
    }
    #bar{
        width: 100%;
        height: 30px;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid rgb(139, 189, 255);
    }
    .buttons{
        margin-left: auto;
        margin-right: 3px;
    }
    button{
        height: 26px;
        width: 26px;
        background-color: rgba(43,139,254,1);
        border: 1px solid white;
        border-radius: 3px;
        box-shadow: inset 10px 10px 12px -4px rgba(255,255,255,0.42);
        margin-top: 3px;
    }
    button:hover{
        box-shadow: inset 10px 10px 12px -4px rgba(255,255,255,0.62);
    }
    button:active{
        box-shadow: inset 10px 10px 12px -4px rgba(0, 0, 0, 0.32);;
    }
    .close{
        background-color: rgb(227, 91, 58);
    }
    .ui{
        margin: 0;
        height: 100%;
        background-color: white;
    }
    .appname{
        margin-left: 10px;
        color: white;
        text-shadow: 1px 1px 1px black;
        height: 20px;
    }
</style>