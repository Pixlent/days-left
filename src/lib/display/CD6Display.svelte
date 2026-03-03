<script lang="ts">
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

<main>
    {#if !rolled}
        <p>{@html description}</p>
        <button onclick={roll}>Roll</button>
    {:else}
        <p>You rolled {dieResult}</p>
        <img alt="A d6 landing on {dieResult}" src={getDieImage()} />
        <button onclick={onContinue}>Continue</button>
    {/if}
</main>
