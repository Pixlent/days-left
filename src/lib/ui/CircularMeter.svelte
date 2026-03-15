<script lang="ts">
    import type { Snippet } from "svelte";
    let {
        percent = "75",
        color = "#ff1111",
        children,
    }: { percent: string; color: string; children: Snippet } = $props();
    let svg: SVGSVGElement;

    $effect(() => {
        if (svg) {
            svg.style.setProperty("--progress", percent);
            svg.style.setProperty("--color", color);
        }
    });
</script>

<div class="total">
    <svg
        bind:this={svg}
        class="progress child"
        width="100"
        height="100"
        viewBox="0 0 200 200"
    >
        <circle class="bg" cx="100" cy="100" r="90" />
        <circle class="fg" cx="100" cy="100" r="90" />
    </svg>
    <div class="child slot">
        {@render children?.()}
    </div>
</div>

<style>
    .slot {
        transform: translateY(3px);
    }
    .child {
        grid-area: stack-layer;
    }
    .total {
        display: grid;
        place-items: center;
        grid-template-areas: "stack-layer";
        justify-content: center;
        align-items: center;
    }
    .progress {
        --size: 200px;
        --half: calc(var(--size) / 2);
        --stroke: 20px;
        --radius: calc((var(--size) - var(--stroke)) / 2);
        --circ: calc(var(--radius) * 2 * pi);
    }

    .progress circle {
        cx: var(--half);
        cy: var(--half);
        r: var(--radius);
        fill: none;
        stroke-width: var(--stroke);
        stroke-linecap: butt;
    }

    .progress .bg {
        stroke: #3d3d3d;
    }

    .progress .fg {
        transform: rotate(-90deg);
        transform-origin: var(--half) var(--half);
        stroke-dasharray: var(--dash) calc(var(--circ) - var(--dash));
        stroke: var(--color);
        transition: stroke-dasharray 0.5s ease;
    }

    .progress {
        --dash: calc(var(--progress) * var(--circ) / 100);
    }
</style>
