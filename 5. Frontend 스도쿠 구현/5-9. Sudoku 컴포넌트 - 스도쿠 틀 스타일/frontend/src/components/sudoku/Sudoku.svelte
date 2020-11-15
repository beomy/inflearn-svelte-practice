<script>
  import Cell from '@/components/sudoku/Cell.svelte';
  export let answer = [];
  export let memo = [];
</script>

<div class="wrapper">
  <table class="game-table">
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

<style>
  .wrapper {
    width: 600px;
    height: 600px;
    position: relative;
  }
  .game-table {
    display: block;
    width: 100%;
    height: 100%;
    border: 2px solid #344861;
    box-sizing: border-box;
  }
  .game-table:after {
    content: '';
    width: 33.3333%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 33.3333%;
    border-left: 2px solid #344861;
    border-right: 2px solid #344861;
    box-sizing: border-box;
    pointer-events: none;
  }
  .game-table tbody:after {
    content: '';
    width: 100%;
    height: 33.3333%;
    position: absolute;
    left: 0;
    top: 33.3333%;
    border-top: 2px solid #344861;
    border-bottom: 2px solid #344861;
    box-sizing: border-box;
    pointer-events: none;
  }
  .game-table tbody {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
  .game-table tr {
    height: 11.1111%;
    display: flex;
  }
  .game-table td {
    width: 100%;
    border-right: 1px solid #bec6d4;
    border-bottom: 1px solid #bec6d4;
    box-sizing: border-box;
    cursor: pointer;
  }
</style>