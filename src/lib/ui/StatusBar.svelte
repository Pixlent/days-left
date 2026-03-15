<script>
    import { gameState } from "../state.svelte";
    import CircularMeter from "./CircularMeter.svelte";
</script>

<div class="status-bar">
    <CircularMeter percent={gameState.health.toFixed(0)} color="#ff2a2a"
        ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            ><path
                fill="#ff2a2a"
                d="M2 9.137C2 14 6.02 16.591 8.962 18.911C10 19.729 11 20.5 12 20.5s2-.77 3.038-1.59C17.981 16.592 22 14 22 9.138S16.5.825 12 5.501C7.5.825 2 4.274 2 9.137"
            /></svg
        ></CircularMeter
    >
    <CircularMeter percent={gameState.thirst.toFixed(0)} color="#41bcff">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            ><path
                fill="#41bcff"
                d="M12 5c0 0 5 6 5 9c0 2.76 -2.24 5 -5 5c-2.76 0 -5 -2.24 -5 -5c0 -3 5 -9 5 -9Z"
            /><path
                fill="none"
                stroke="#41bcff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 5c0 0 5 6 5 9c0 2.76 -2.24 5 -5 5M12 5c0 0 -5 6 -5 9c0 2.76 2.24 5 5 5"
            /></svg
        >
    </CircularMeter>
    <CircularMeter percent={gameState.hunger.toFixed(0)} color="#ff8022">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            ><path
                fill="#ff8022"
                d="M20.16 12.73A6.27 6.27 0 0 0 19.09 3c-2.01-1.33-4.7-1.34-6.73-.03c-1.76 1.13-2.73 2.89-2.9 4.71c-.13 1.32-.63 2.55-1.55 3.47l-.03.03c-1.16 1.16-1.16 2.93-.07 4.01l.99.99a2.794 2.794 0 0 0 3.95 0c.97-.97 2.25-1.5 3.64-1.65c1.37-.15 2.71-.75 3.77-1.8m-13.9 7.13c.27.56.18 1.24-.29 1.7a1.49 1.49 0 0 1-2.55-.98a1.49 1.49 0 0 1-.98-2.55c.46-.46 1.15-.56 1.7-.29l2.48-2.43c.14.19.3.41.48.59l.99.99c.21.2.41.37.67.52z"
            /></svg
        >
    </CircularMeter>
</div>

<style>
    .status-bar {
        display: flex;
        flex-direction: row;
        gap: 10px;
        position: fixed;
        bottom: 10px;
    }
</style>
