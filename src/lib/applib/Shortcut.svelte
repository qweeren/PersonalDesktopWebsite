<script>
    export let appname = "Unnamed App";
    export let appicon = "https://icones.pro/wp-content/uploads/2021/06/icone-fichier-document-noir.png";
    export let appid;

    import { openApps } from "../store/store";

    function OpenApp() {
        openApps.set([...$openApps, [appname, appicon, appid]])
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<button class="shortcutbg" on:dblclick={OpenApp}>
    <div class="appicon" style="background-image: url({appicon})"></div>
    <div class="appname">{appname}</div>
</button>

<style>
    .shortcutbg{
        padding: 10px;
        border-radius: 5px;
        width: 80px;
        height: 95px;
        margin-bottom: 15px;
        margin-right: 15px;
        border: 1px solid transparent;
    }
    .shortcutbg:hover{
        background-color: rgba(188, 255, 255, 0.288);
        border: 1px solid white;
    }
    .shortcutbg:focus{
        border: 1px dashed white
    }
    .appicon{
        width: 60px;
        height: 60px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
    .appname{
        width: 100%;
        height: 40%;
        color: white;
        text-align: center;
        text-shadow: 1px 1px 1px black;
        word-wrap:normal;
    }
</style>