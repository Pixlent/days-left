<script lang="ts">
    import Button from "./ui/Button.svelte";

    let { onPlay }: { onPlay: () => void } = $props();
</script>

<div>
    <img src="/days_left_logo.svg" alt="Logo for the game" />
    <Button onclick={onPlay}>Launch</Button>
</div>

<style>
    div {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 20px;
        min-height: 80vh;
    }
</style>
