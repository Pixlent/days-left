<script lang="ts">
    import { gameState } from "./state.svelte";
    import { Sword, Potato } from "./item.svelte";

    function heal() {
        gameState.health *= 1.1;
    }

    function damage() {
        gameState.health *= 0.9;
    }

    function reset_health() {
        gameState.health = 100;
    }

    function get_weapon() {
        gameState.inventory.push(new Sword());
    }

    function drop_item() {
        gameState.inventory.shift();
    }

    function get_food() {
        gameState.inventory.push(new Potato());
    }

    function next_turn() {
        gameState.turn += 1;
        if (Math.random() > 0.7) {
            gameState.days_survived += 1;
        }
    }
</script>

<main>
    <h1>Day Count: {gameState.days_survived}</h1>
    <h2>You have {gameState.health.toFixed(0)}% health</h2>
    <button onclick={next_turn}>Increment day count</button>
    <button onclick={heal}>Heal</button>
    <button onclick={damage}>Damage</button>
    <button onclick={reset_health}>Reset health</button>
    <button onclick={get_weapon}>Get weapon</button>
    <button onclick={get_food}>Get food</button>
    <button onclick={drop_item}>Drop item</button>
    <ul>
        {#each gameState.inventory as item}
            <li>{item.name}</li>
        {/each}
    </ul>
</main>
