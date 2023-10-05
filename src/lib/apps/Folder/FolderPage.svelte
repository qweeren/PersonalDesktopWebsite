<script>
   const app = [
        {
            "appname": "Snake",
            "appicon": "https://cdn-icons-png.flaticon.com/512/528/528105.png",
            "appid": 6
        },
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
        },
        {
            "appname": "Mine sweeper",
            "appicon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAulBMVEW5ubn9/P11dXUAAAD/AAD///9wcHDEw8SwsLC3vb3OgoK9vb2HgoLBwcEgICCyrq5oaGi0wcGKiYm4tbXCqan9DAy/rq5/e3sbGxvNzM3TiorLh4fvSUmzw8PXgID0MjLgcXHDoqL5Hh7oXV3OkZHInp73JibyOTndcnLrTU3KmZnhZ2f2MDDYenrxQUHpVFT7GRmdgYHtAACUCgovAADVAACEAAAQAADFAABkAACsDg5WAAC8goKUkZFsU1QRAAADcklEQVR4nO3aaVfaQByF8SkzCFNsccSq1aJS6b7vq9//azURVJLMhMlSyP+e+7zWHH8nHC8TUPew6yu17T/h/9ZXe9jCBNiDFqZAaOE1EFm4AAILl0Bc4Q0QVngLRBXeAUGFK0BM4SoQUpgBIgqzQEBhDognzAPhhAUgmrAIBBN6gFhCHxBK6AUiCf1AIGEAiCMMAUuEfVmFgGFh//FAUkFgiXCgJDXcoZDCrkchhd2PQgq7H4UUdj8KNy20tu0rdkzoTk7bJnZKaCdPzH1goZ2eGYMsdAfnBllo7YUxyEI3e2qQhVZdGoMsdPNHBlmYToQBFlp3Zgyy0B28MMhC6y5MPiihmz0vAJGE1l4WfUjC6dznwxHmJgJOWJgINKE7PA8CEYS+iYASumeeiQASrp4iIIWZUwSg0E5erfOJFpZNBISweIrAElr3MsonVrhuIqQLA6cIHGHERIgWRk2EYGHkRMgVLj+LgBWuOUXIF1aYCJHCShMhUejmtXxihFUnQppw8XE1sNDOKk+EMKE6rP0SlSJU7nWVd6IShclUvAEXpp8rvQUXJrfxHbgwfXj/HlyYvPM+BRemj7g/gAvT4fgILkxuY7XhkCcMfCEBSpj8x6kwHCKFiTF+OIQKlZqeoAuTQ3HccMgVxg6HZGHciUO0MGo4hAsjhkO6cP2JQ75w3XAgCMuHA0JY+qgKRFgyHCjC8KMqHGFoOICEgeGAEia3sTgcWELfcKAJi8OBJ8wPB6AwuY2fPoMLR7v6C7xQf/2GLtT6O7xQ//iJLtT6F7xQ69/wQv3nL7pQ745avjqFFLYRhc2ikMI2orBZFFLYRhQ2i0IK24jCZlFIYRtR2CwKKWwjCptFIYVtRGGzKKSwjShs1oaFk6GvoxXhkfcnhlKEmbtVpQZ3dsPC/ZrCfQoppJBCCimkkEIKKawhfOBvcFVTeDUIXHFbwrF+6O+4pvA4cD093ppwU1FIIYUUUkghhRRSSCGFFFJIIYUUUtiJIh4yChdGRCGF3Y9CCrsfhRR2vlEdofJ/QbKjjSsL+5O9HVGFgCFhAgz+irD8QiCgX4gE9AqhgD4hFtAjBAMWhWjAghAOmBfiAXNCQGBWiAjMCCGBq0JM4IoQFHgnRAXeCmGBN0Jc4FIIDFwIkYHXQmhgKsQGJkJwYE+hA3sKHdj7BxnfEuyUEGxoAAAAAElFTkSuQmCC",
            "appid": 11
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
