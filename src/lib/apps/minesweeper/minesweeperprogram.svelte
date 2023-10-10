<script>
    import Program from "../../applib/Program.svelte";
    import { openApps } from "../../store/store";
    import Minesweeperpage from "./minesweeperpage.svelte";

    let appref;
    let appname;
    let appicon;
    let appid;

    let HideProgram=true;
    let programWidth = 324;
    let programHeight = 408;

    openApps.subscribe((openAppsList) => {
        for (let i = 0; i < openAppsList.length; i++) {
            if(openAppsList[i][2] == 11 && HideProgram){
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
    <Program on:close={close} width={programWidth} scrollable={false} height={programHeight} {appicon} {appname} {appid} bind:this={appref}>
        <div class="page">
            <Minesweeperpage/>
        </div>
    </Program>
</div>

<style>
    .page{
        height: 618px;
        background-color: #c0c0c0;
    }
    .hidden{
        display: none;
    }
</style>