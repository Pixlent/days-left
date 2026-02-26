<script lang="ts">
    import { gameState, Display } from "./state.svelte";
    import InfoDisplay from "./scenarios/InfoDisplay.svelte";
    import MultipleChoice from "./scenarios/MultipleChoice.svelte";
</script>

<main>
    <h1>Day Count: {gameState.daysSurvived}</h1>
    <h2>You have {gameState.health.toFixed(0)}% health</h2>
    {#if gameState.display === Display.INFO_DISPLAY}
        <InfoDisplay>Info display</InfoDisplay>
    {:else if gameState.display === Display.MULTIPLE_CHOICE}
        <MultipleChoice>Multiple choice</MultipleChoice>
    {/if}
    <ul>
        {#each gameState.inventory as item}
            <li>{item.name}</li>
        {/each}
    </ul>
</main>
