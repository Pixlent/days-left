<script lang="ts">
    import type {
        D20Display,
        D6Display,
        InfoDisplay,
        MultipleChoiceDisplay,
    } from "./display/display.svelte";
    import { gameState } from "./state.svelte";
    import CInfoDisplay from "./display/CInfoDisplay.svelte";
    import CMultipleChoice from "./display/CMultipleChoice.svelte";
    import CD20Display from "./display/CD20Display.svelte";
    import CD6Display from "./display/CD6Display.svelte";
</script>

<main>
    <h1>Day Count: {gameState.daysSurvived}</h1>
    <h2>You have {gameState.health.toFixed(0)} health</h2>
    {#if gameState.display.type === "info"}
        <CInfoDisplay {...gameState.display as InfoDisplay} />
    {:else if gameState.display.type === "multiple_choice"}
        <CMultipleChoice {...gameState.display as MultipleChoiceDisplay} />
    {:else if gameState.display.type === "d20"}
        <CD20Display {...gameState.display as D20Display} />
    {:else if gameState.display.type === "d6"}
        <CD6Display {...gameState.display as D6Display} />
    {/if}
    <ul>
        {#each gameState.inventory as item}
            <li>{item.name}</li>
        {/each}
    </ul>
</main>
