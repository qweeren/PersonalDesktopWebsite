<script>

</script>

<div class="taskbar">
    <slot></slot>
</div>

<style>
    .taskbar{
        background: rgb(43,139,254);
        background: linear-gradient(180deg, rgba(43,139,254,1) 12%, rgba(1,84,232,1) 23%, rgba(1,84,232,1) 62%, rgba(2,104,250,1) 77%);
        width: 100vw;
        height: 50px;
        bottom: 0px;
        position: absolute;
    }
</style>
