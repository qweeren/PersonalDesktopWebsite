<script>
    import Program from "../../applib/Program.svelte";
    import BallPage from "./BallPage.svelte";
    import { openApps } from "../../store/store";

    let appref;
    let appname;
    let appicon;
    let appid;
    let rerender = 0;

    let HideProgram=true;
    let programWidth = 800;
    let programHeight = 600;

    openApps.subscribe((openAppsList) => {
        for (let i = 0; i < openAppsList.length; i++) {
            if(openAppsList[i][2] == 8 && HideProgram){
                HideProgram=false;
                appname = openAppsList[i][0];
                appicon = openAppsList[i][1];
                appid = openAppsList[i][2]
                rerender++;
            }
        }
    })

    function close(){
        HideProgram = true;
        openApps.update(apps => {
            return apps.filter(app => app[2] !== appid);
        });
    }
</script>

<div class="programcontainer" class:hidden={HideProgram}>
    <Program on:close={close} width={programWidth} height={programHeight} {appicon} appname={appname} {appid} bind:this={appref}>
        {#key rerender}
            <BallPage/>
        {/key}
    </Program>
</div>

<style>
    .hidden{
        display: none;
    }
</style>