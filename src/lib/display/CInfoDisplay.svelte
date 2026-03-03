<script>
    let { description, onContinue } = $props();
</script>

<main>
    <p>{@html description}</p>
    <button onclick={onContinue}>Continue</button>
</main>
