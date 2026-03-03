<script lang="ts">
    let { description, onRoll } = $props();

    let dice = $state(0);
    let rolled = $state(false);

    function roll() {
        dice = Math.round(Math.random() * 19 + 1);
        rolled = true;
    }

    function onContinue() {
        onRoll(dice as number);
    }

    const numbers = [
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "ten",
        "eleven",
        "twelve",
        "thirteen",
        "fourteen",
        "fifteen",
        "sixteen",
        "seventeen",
        "eighteen",
        "nineteen",
        "twenty",
    ];

    const ia = [
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "an",
        "a",
        "a",
        "an",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "an",
        "a",
        "a",
    ];
</script>

<main>
    {#if !rolled}
        <p>{@html description}</p>
        <button onclick={roll}>Roll</button>
    {:else}
        <p>You rolled {ia[dice]} {numbers[dice]}</p>
        <div>
            <img alt="A d20 die" src="/src/assets/die/d20.svg" />
            <p>{dice}</p>
        </div>
        <button onclick={onContinue}>Continue</button>
    {/if}
</main>
