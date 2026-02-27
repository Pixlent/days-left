<script lang="ts">
    let { title, description, pool } = $props();

    let dice = $state(0);

    function roll() {
        dice = Math.round(Math.random() * 19 + 1);

        for (let entry of pool) {
            if (entry.min <= dice && entry.max >= dice) {
                entry.function();
            }
        }
    }
</script>

<main>
    <h2>{@html title}</h2>
    <p>{@html description}</p>
    <button onclick={roll}>Roll</button>
</main>
