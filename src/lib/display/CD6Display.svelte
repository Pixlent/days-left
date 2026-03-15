<script lang="ts">
    import Button from "../ui/Button.svelte";

    let { description, onRoll } = $props();
    let dieResult = $state(0);
    let rolled = $state(false);

    const imageModules = import.meta.glob("/src/assets/die/*.svg", {
        eager: true,
        import: "default",
    });

    const images: string[] = Object.values(imageModules) as string[];

    function getDieImage(): string {
        return images[dieResult - 1];
    }

    function roll() {
        dieResult = Math.floor(Math.random() * 6) + 1;
        rolled = true;
    }

    function onContinue() {
        onRoll(dieResult as number);
    }
</script>

<div class="content">
    {#if !rolled}
        <p class="content-box">{@html description}</p>
        <Button onclick={roll}>Roll</Button>
    {:else}
        <p>You rolled</p>
        <img
            alt="A d6 landing on {dieResult}"
            src={getDieImage()}
            fetchpriority="high"
        />
        <Button onclick={onContinue}>Continue</Button>
    {/if}
</div>

<style>
    @import "./componentStyles.css";
    img {
        width: 10vw;
        height: 10vh;
        margin: 15px;
    }
</style>
