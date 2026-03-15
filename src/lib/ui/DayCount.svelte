<script>
    import { gameState } from "../state.svelte";
</script>

<p class="day-count">Day Count: {gameState.daysSurvived}</p>

<style>
    .day-count {
        position: fixed;
        right: 30px;
        font-size: 32px;
    }
</style>
