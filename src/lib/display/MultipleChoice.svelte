<script>
    let { title, options } = $props();
</script>

<main>
    <p>{title}</p>
    {#each options as option}
        <button onclick={option.onSelect}>{option.text}</button>
    {/each}
</main>
