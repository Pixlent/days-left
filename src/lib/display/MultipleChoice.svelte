<script>
    let { title, description, options } = $props();
</script>

<main>
    <h2>{@html title}</h2>
    <p>{@html description}</p>
    {#each options as option}
        <button onclick={option.onSelect}>{@html option.text}</button>
    {/each}
</main>
