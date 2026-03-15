<script>
    import Button from "../ui/Button.svelte";

    let { description, onContinue } = $props();
</script>

<div class="content">
    <p>{@html description}</p>
    <Button onclick={onContinue}>Continue</Button>
</div>

<style>
    @import "./componentStyles.css";
</style>
