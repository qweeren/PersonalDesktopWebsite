<script>
    import Desktop from "../desktop/desktop.svelte";
    import wallpaperStore from "../store/localstorage";

    let wallpaper_url;

    wallpaperStore.subscribe(data => {
        wallpaper_url = data;
    })
</script>

<div class="wallpaper" style="background-image: url({wallpaper_url})">
    <Desktop/>
</div>

<style>
    .wallpaper{
        background-size: cover;
        background-position: center;
        position: absolute;
        width: 100vw;
        height: 100vh;
    }
</style>