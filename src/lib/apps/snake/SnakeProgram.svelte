<script>
    import Program from "../../applib/Program.svelte";
    import SnakePage from "./SnakePage.svelte";

    let appref;
    let appname;
    let appicon;

    let showSnake=false;
    let snakeWidth = 825;
    let snakeHeight = 745;

    function snakesizechange(e){
        snakeWidth = e.detail[0]+25;
        snakeHeight = e.detail[1]+145;
    }
</script>

<div class="snakecontainer" class:hidden={showSnake}>
    <Program width={snakeWidth} height={snakeHeight} {appicon} {appname} bind:this={appref} on:close={close}>
        <SnakePage on:snakesizechange={snakesizechange}/>
    </Program>
</div>

<style>
    .hidden{
        display: none;
    }
</style>