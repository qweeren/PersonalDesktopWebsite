<script>
    import Program from "../../applib/Program.svelte";
    import { openApps } from "../../store/store";
  import FirePage from "./FirePage.svelte";

    let appref;
    let appname;
    let appicon;
    let appid;
    let rerender = 0;

    let HideProgram=true;
    let programWidth = 815;
    let programHeight = 720;

    openApps.subscribe((openAppsList) => {
        for (let i = 0; i < openAppsList.length; i++) {
            if(openAppsList[i][2] == 10 && HideProgram){
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
            <FirePage/>
        {/key}
    </Program>
</div>

<style>
    .hidden{
        display: none;
    }
</style>