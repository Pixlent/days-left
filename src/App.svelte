<script lang="ts">
    import { AppState } from "./lib/state.svelte";
    import Launcher from "./lib/Launcher.svelte";
    import Game from "./lib/Game.svelte";

    let currentState = AppState.LAUNCHER;

    function goToGame() {
        currentState = AppState.GAME;
    }

    function goToLauncher() {
        currentState = AppState.LAUNCHER;
    }
</script>

<main>
    {#if currentState === AppState.LAUNCHER}
        <Launcher onPlay={goToGame} />
    {:else if currentState === AppState.GAME}
        <Game />
    {/if}
</main>
