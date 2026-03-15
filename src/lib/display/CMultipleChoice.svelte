<script>
    import Button from "../ui/Button.svelte";

    let { description, options } = $props();
</script>

<div class="content">
    <p>{@html description}</p>
    <div class="buttons">
        {#each options as option}
            <Button onclick={option.onSelect}>{@html option.text}</Button>
        {/each}
    </div>
</div>

<style>
    @import "./componentStyles.css";
    .buttons {
        display: flex;
        flex-direction: row;
        gap: 5px;
    }
</style>
