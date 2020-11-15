<script>
  import Cell from '@/components/sudoku/Cell.svelte';
  export let answer = [];
  export let memo = [];
</script>

<div>
  <table>
    <tbody>
      {#each answer as row, y (y)}
        <tr>
          {#each row as item, x (x)}
            <td>
              <Cell
                value={item}
                memo={memo[y][x]}
              />
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>