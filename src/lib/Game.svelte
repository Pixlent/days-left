<script lang="ts">
    import type {
        D6Display,
        InfoDisplay,
        MultipleChoiceDisplay,
    } from "./display/display.svelte";
    import { die, gameState } from "./state.svelte";
    import CInfoDisplay from "./display/CInfoDisplay.svelte";
    import CMultipleChoice from "./display/CMultipleChoice.svelte";
    import CD6Display from "./display/CD6Display.svelte";
    import StatusBar from "./ui/StatusBar.svelte";
    import DayCount from "./ui/DayCount.svelte";
    import Inventory from "./ui/Inventory.svelte";

    $effect(() => {
        if (gameState.thirst < 0) {
            die();
        }
    });

    $effect(() => {
        if (gameState.hunger < 0) {
            die();
        }
    });
</script>

<main>
    <DayCount></DayCount>
    <StatusBar></StatusBar>
    <div class="content">
        {#if gameState.display.type === "info"}
            <CInfoDisplay {...gameState.display as InfoDisplay} />
        {:else if gameState.display.type === "multiple_choice"}
            <CMultipleChoice {...gameState.display as MultipleChoiceDisplay} />
        {:else if gameState.display.type === "d6"}
            <CD6Display {...gameState.display as D6Display} />
        {/if}
    </div>
    <Inventory></Inventory>
</main>

<style>
    .content {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }
</style>
