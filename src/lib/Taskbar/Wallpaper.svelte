<script>
    import Desktop from "../desktop/desktop.svelte";

    import { wallpaper } from '../../lib/store/store.js';

    let wallpaper_url;

    wallpaper.subscribe((value) => {
        wallpaper_url = value;
    })
</script>

<div class="wallpaper" style="background-image: url({wallpaper_url})">
    <Desktop/>
</div>

<style>
    .wallpaper{
        background-size: cover;
        background-position: top;
        position: absolute;
        width: 100vw;
        height: 100vh;
    }
</style>