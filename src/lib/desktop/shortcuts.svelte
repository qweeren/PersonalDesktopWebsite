<script>
    import app from "../applib/apps.json"
    import Shortcut from "../applib/Shortcut.svelte";
</script>

{#each app as app}
    <Shortcut on:openapp appname={app.appname} appicon={app.appicon}/>
{/each}