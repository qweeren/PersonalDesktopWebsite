<script>
    import Program from "../../applib/Program.svelte";
    import SnakePage from "./SnakePage.svelte";
    import { openApps } from "../../store/store";

    let appref;
    let appname;
    let appicon;
    let appid;

    let HideSnake=true;
    let snakeWidth = 825;
    let snakeHeight = 745;

    function snakesizechange(e){
        snakeWidth = e.detail[0]+25;
        snakeHeight = e.detail[1]+145;
    }

    openApps.subscribe((openAppsList) => {
        for (let i = 0; i < openAppsList.length; i++) {
            if(openAppsList[i][2] == 1 && HideSnake){
                console.log(openAppsList);
                HideSnake=false;
                appname = openAppsList[i][0];
                appicon = openAppsList[i][1];
                appid = openAppsList[i][2]
            }
        }
    })

    function close(){
        HideSnake = true;
        openApps.update(apps => {
            return apps.filter(app => app[2] !== appid);
        });
    }
</script>

<div class="snakecontainer" class:hidden={HideSnake}>
    <Program on:close={close} width={snakeWidth} height={snakeHeight} {appicon} {appname} {appid} bind:this={appref}>
        <SnakePage on:snakesizechange={snakesizechange}/>
    </Program>
</div>

<style>
    .hidden{
        display: none;
    }
</style>