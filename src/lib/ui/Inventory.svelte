<script>
    import { gameState } from "../state.svelte";
    import { isConsumable } from "../item.svelte";
    import Button from "./Button.svelte";
</script>

<div>
    <p>Inventory</p>
    <table>
        <thead>
            <tr>
                <th>Actions</th>
                <th>Item</th>
            </tr>
        </thead>
        <tbody>
            {#each gameState.inventory as item, index}
                <tr>
                    {#if isConsumable(item)}
                        <Button
                            onclick={() => {
                                item.consume();
                                gameState.inventory.splice(index, 1);
                            }}>Consume</Button
                        >
                    {/if}
                    <td>{item.name}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    p {
        font-size: 32px;
    }

    div {
        position: fixed;
        top: 2vh;
        left: 30px;
    }

    table {
        border-collapse: collapse;
    }

    td,
    th {
        border: 2px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #dddddd;
    }
</style>
