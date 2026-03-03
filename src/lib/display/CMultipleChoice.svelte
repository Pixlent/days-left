<script>
    let { description, options } = $props();
</script>

<main>
    <p>{@html description}</p>
    {#each options as option}
        <button onclick={option.onSelect}>{@html option.text}</button>
    {/each}
</main>
