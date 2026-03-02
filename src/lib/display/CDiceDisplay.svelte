<script lang="ts">
    let { title, description, onRoll } = $props();

    let dice = $state(0);

    function roll() {
        dice = Math.round(Math.random() * 19 + 1);
        onRoll(dice as number);
    }
</script>

<main>
    <h2>{@html title}</h2>
    <p>{@html description}</p>
    <button onclick={roll}>Roll</button>
</main>
