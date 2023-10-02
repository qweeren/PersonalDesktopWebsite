<script>
   const app = [
        {
            "appname": "Bouncing Ball",
            "appicon": "https://cdn-icons-png.flaticon.com/512/496/496568.png",
            "appid": 8
        },
        {
            "appname": "Bouyancy",
            "appicon": "https://static.thenounproject.com/png/788815-200.png",
            "appid": 9
        },
        {
            "appname": "Fire",
            "appicon": "https://www.freeiconspng.com/uploads/fire-vector-icon-png-27.png",
            "appid": 10
        }
    ]
   import Shortcut from "../../applib/Shortcut.svelte";

</script>

<div class="folder">
    <div class="toolbar">
        <button class="toolbarbutton">File</button>
        <button class="toolbarbutton">Edit</button>
        <button class="toolbarbutton">View</button>
        <button class="toolbarbutton">Favorites</button>
        <button class="toolbarbutton">Tools</button>
        <button class="toolbarbutton">Help</button>
    </div>
    <div class="searchbar">
        <img class="foldersearch" src="/foldersearch.png" alt="search">
    </div>
    
    <div class="shortcuts">
        {#each app as app}
            <Shortcut on:openapp appname={app.appname} appicon={app.appicon} appid={app.appid}/>
        {/each}
    </div>
</div>

<style>
    *{
        margin: 0;
        padding: 0;
        user-select: none;
    }
    .folder{
        height: 100%;
    }
    .toolbar{
        background-color: #f1edd9;
        width: 100%;
        display: inline-flex;
        padding: 1px 0;
        border-bottom: 1px outset #dfdac8;
    }
    .toolbarbutton{
        margin-left: 1px;
        padding: 5px 10px;
        font-size: 12px;
    }
    .toolbarbutton:hover{
        outline: 1px solid #dfdac8;
    }
    .searchbar{
        background-color: #f1edd9;
        height: 60px;
        border-bottom: 1px inset #8b887d;
    }
    .foldersearch{
        height: inherit;
        border-right: 1px inset #d8d4c1;
    }
    .shortcuts{
        padding: 10px;
    }
</style>
