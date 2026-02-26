<script>
    let { title, onContinue } = $props();
</script>

<main>
    <p>{title}</p>
    <button onclick={onContinue}>Continue</button>
</main>
