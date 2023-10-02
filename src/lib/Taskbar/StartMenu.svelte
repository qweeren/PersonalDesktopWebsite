<script>
    export let isHidden;
    import { openApps } from "../store/store";

    function settings() {
        openApps.set([...$openApps, ["Settings", "/settings.png", 1]])
    }

    function turnoff(){
        window.close();
    }
</script>

<div class="startmenu" class:hidden={isHidden === true}>
    <div class="user-content">
        <div class="pfp"></div>
        <div class="nick">qweren</div>
    </div>
    <div class="center-flex">
        <div class="buttons-flex">
            <div class="settings" on:click={settings}>
                <div class="settingsico"></div>
                <div class="settingstext">Settings</div>
            </div>
        </div>
        <div class="placeholder"></div>
    </div>
    <div class="shutbuttons">
        <div class="shutflex">
            <div class="logoff shutbutton"></div>
            <div class="shuttext"><b>L</b>og Off</div>
            <div class="shutdown shutbutton" on:click={turnoff}></div>
            <div class="shuttext">T<b>u</b>rn Off Computer</div>
        </div>
    </div>
</div>

<style>
   
    .startmenu{
        display: block;
        height: 550px;
        width: 350px;
        position: absolute;
        background: linear-gradient(180deg, rgba(43,139,254,1) 0%,rgb(139, 189, 255) 2%,rgba(43,139,254,1) 4%, rgb(34, 106, 230) 23%, rgba(1,84,232,1) 62%, rgba(2,104,250,1) 77%); 
        bottom: 50px;
        left: 0;
        -webkit-box-shadow: inset -50px 3px 27px -46px rgba(34,106,230,1);
        -moz-box-shadow: inset -50px 3px 27px -46px rgba(34,106,230,1);
        box-shadow: inset -50px 3px 27px -46px rgba(34,106,230,1),
                     8px 7px 8px -5px rgba(0,0,0,0.49);
        border-radius: 12px;
        z-index: 2;
    }
    .hidden{
        display: none;
    }
    /**@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
    .user-content{
        width: 100%;
        height: 80px;
        display: flex;
    }
    .pfp{
        
        width: 60px;
        height: 60px;
        transform: translateY(9px);
        margin-left: 11px;
        margin-right: 0;
        border-radius: 3px;
        border: 2px solid white;
        background-image: url("https://cdn.discordapp.com/avatars/310396769156595712/caddb113357b3b27a0cd1a1d2834d79e?size=1024");
        background-size: cover;
        box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.2);
    }
    .nick{
        font-size: 25px;
        color: white;
        width: fit-content;
        margin: auto 0;
        margin-left: 15px;
        text-shadow: 0px 0px 2px #000;
    }
    /**@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
    .center-flex{
        background-color: white;
        box-shadow: inset 0px 42px 11px -40px rgba(0,0,0,0.5);
        width: 344px;
        height: 415px;
        margin-left: 3px;
        display: flex;
        justify-content: right;
        flex-direction: row;
    }
    .settings{
        font-size: 20px;
        width: 100%;
        height: 60px;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        cursor: pointer;
    }
    .settingstext{
        align-self: center;
    }
    .settingsico{
        background-image: url(../../assets/settings.png);
        background-size: cover;
        height: 40px;
        width: 40px;
        margin: 10px;
    }
    .buttons-flex{
        width: 167px;
        display: flex;
        flex-direction: column;
    }
    .placeholder{
        width: 177px;
        height:100%;
        background-image: url(../../assets/buttonsplaceholder.png);
        background-size: cover;
    }
    /**@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
    .shutbuttons{
        background: linear-gradient(180deg, rgba(43,139,254,1) 0%,rgb(139, 189, 255) 2%,rgba(43,139,254,1) 4%, rgb(34, 106, 230) 23%, rgba(1,84,232,1) 62%, rgba(2,104,250,1) 77%);  
        width: 100%;
        height: 55px;
    }
    .shutflex{
        width: 100%;
        position: relative;
        top: 10px;
        height: 35px;
        display: flex;
        align-items:center;
        justify-content: right;
        flex-direction: row;
    }
    .shutbutton{
        background-size: contain;
        cursor: pointer;
        height: 100%;
        border-radius: 5px;
        border: 1px solid white;
        width: 35px;
    }
    .shutdown{
        background-image: url(../../assets/shutdown.png);
    }
    .logoff{
       background-image: url(../../assets/logoff.png); 
    }
    .shuttext{
        color: white;
        font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 12px;
        font-weight: 1;
        padding: 5px;
        padding-right: 10px;
    }
    b{
        text-decoration: underline;
    }
</style>