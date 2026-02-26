<script lang="ts">
    import { gameState, Display } from "./state.svelte";
    import InfoDisplay from "./display/InfoDisplay.svelte";
    import MultipleChoice from "./display/MultipleChoice.svelte";
</script>

<main>
    <h1>Day Count: {gameState.daysSurvived}</h1>
    <h2>You have {gameState.health.toFixed(0)}% health</h2>
    {#if gameState.display.type === "info"}
        <InfoDisplay {...gameState.display}>Info display</InfoDisplay>
    {:else if gameState.display.type === "multiple_choice"}
        <MultipleChoice {...gameState.display}>Multiple choice</MultipleChoice>
    {/if}
    <ul>
        {#each gameState.inventory as item}
            <li>{item.name}</li>
        {/each}
    </ul>
</main>
