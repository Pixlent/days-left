<script lang="ts">
    let { onPlay }: { onPlay: () => void } = $props();
</script>

<button onclick={onPlay}>Launch</button>
