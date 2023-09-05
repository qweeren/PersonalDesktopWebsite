<script>
    import Program from "../../applib/Program.svelte";
    import { openApps } from "../../store/store";
  import Gamespage from "./gamespage.svelte";
  import gamespage from "./gamespage.svelte";

    let appref;
    let appname;
    let appicon;
    let appid;

    let HideProgram=true;
    let programWidth = 900;
    let programHeight = 600;

    openApps.subscribe((openAppsList) => {
        for (let i = 0; i < openAppsList.length; i++) {
            if(openAppsList[i][2] == 5 && HideProgram){
                HideProgram=false;
                appname = openAppsList[i][0];
                appicon = openAppsList[i][1];
                appid = openAppsList[i][2]
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
    <Program on:close={close} width={programWidth} height={programHeight} {appicon} {appname} {appid} bind:this={appref}>
        <Gamespage/>
    </Program>
</div>

<style>
    .hidden{
        display: none;
    }
</style>