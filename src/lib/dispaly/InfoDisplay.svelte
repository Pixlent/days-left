<script>
    import { nextTurn } from "../state.svelte";
</script>

<main>
    <slot></slot>
    <button onclick={nextTurn}>Continue</button>
</main>
