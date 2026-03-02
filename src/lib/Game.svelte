<script lang="ts">
    import type {
        DiceDisplay,
        InfoDisplay,
        MultipleChoiceDisplay,
    } from "./display/display.svelte";
    import { gameState } from "./state.svelte";
    import CInfoDisplay from "./display/CInfoDisplay.svelte";
    import CMultipleChoice from "./display/CMultipleChoice.svelte";
    import CDiceDisplay from "./display/CDiceDisplay.svelte";
</script>

<main>
    <h1>Day Count: {gameState.daysSurvived}</h1>
    <h2>You have {gameState.health.toFixed(0)}% health</h2>
    {#if gameState.display.type === "info"}
        <CInfoDisplay {...gameState.display as InfoDisplay} />
    {:else if gameState.display.type === "multiple_choice"}
        <CMultipleChoice {...gameState.display as MultipleChoiceDisplay} />
    {:else if gameState.display.type === "dice"}
        <CDiceDisplay {...gameState.display as DiceDisplay} />
    {/if}
    <ul>
        {#each gameState.inventory as item}
            <li>{item.name}</li>
        {/each}
    </ul>
</main>
