<script>
    let { title, description, onContinue } = $props();
</script>

<main>
    <h2>{@html title}</h2>
    <p>{@html description}</p>
    <button onclick={onContinue}>Continue</button>
</main>
