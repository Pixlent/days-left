<script lang="ts">
    import type { Snippet } from "svelte";
    import type { MouseEventHandler } from "svelte/elements";

    let {
        onclick,
        children,
    }: { onclick: MouseEventHandler<HTMLButtonElement>; children: Snippet } =
        $props();
</script>

<button class="button" {onclick}>
    {@render children?.()}
</button>

<style>
    .button {
        background-color: #000000;
        border: none;
        color: white;
        padding: 12px 24px;
        text-align: center;
        text-decoration: none;
        font-family: "Special Elite", system-ui;
        font-weight: 400;
        font-style: normal;
        display: inline-block;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    .button:hover {
        background-color: #333333;
    }
</style>
