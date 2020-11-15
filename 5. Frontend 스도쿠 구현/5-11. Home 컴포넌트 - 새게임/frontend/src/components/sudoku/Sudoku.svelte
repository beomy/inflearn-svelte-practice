<script>
  import _ from 'lodash';
  import Cell from '@/components/sudoku/Cell.svelte';
  export let answer = [];
  export let memo = [];
  export let board = [];

  let selectedPoint = { x: 0, y: 0 };

  $: selectedValue = answer?.[selectedPoint.y]?.[selectedPoint.x];
  $: focusCellsRow = getFocusCellsRow(selectedPoint);
  $: focusCellsCol = getFocusCellsCol(selectedPoint);
  $: focusCellsSquare = getFocusCellsSquare(selectedPoint);
  $: focusCells = _.uniqWith([...focusCellsRow, ...focusCellsCol, ...focusCellsSquare], _.isEqual);

  function getFocusCellsRow (point) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(x => ({ x, y: point.y }));
  }
  function getFocusCellsCol (point) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(y => ({ x: point.x, y }));
  }
  function getFocusCellsSquare (point) {
    const refs = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
    // point = { x: 4, y: 7 } x는 2번째 그룹 y는 3번째 그룹
    const xRef = refs.find(x => point.x >= Math.min(...x) && point.x <= Math.max(...x));
    const yRef = refs.find(y => point.y >= Math.min(...y) && point.y <= Math.max(...y));
    const cells = [];
    for (const x of xRef) {
      for (const y of yRef) {
        cells.push({ x, y });
      }
    }
    return cells;
  }
  function isError (point) {
    const value = answer[point.y][point.x];
    if (!value) return false;

    const row = getFocusCellsRow(point);
    const col = getFocusCellsCol(point);
    const square = getFocusCellsSquare(point);
    const rowValues = row.map(p => answer[p.y][p.x]).filter(x => !!x);
    const colValues = col.map(p => answer[p.y][p.x]).filter(x => !!x);
    const squareValues = square.map(p => answer[p.y][p.x]).filter(x => !!x);

    return rowValues.filter(x => x === value).length > 1 ||
      colValues.filter(x => x === value).length > 1 ||
      squareValues.filter(x => x === value).length > 1
  }
</script>

<div class="wrapper">
  <table class="game-table">
    <tbody>
      {#each answer as row, y (y)}
        <tr>
          {#each row as item, x (x)}
            <td
              class:is-answer={board[y][x] === 0}
              class:selected={selectedPoint.x === x && selectedPoint.y === y}
              class:active={focusCells.find(p => p.x === x && p.y === y)}
              class:highlight={selectedValue && item === selectedValue}
              class:error={isError({ x, y })}
            >
              <Cell
                value={item}
                memo={memo[y][x]}
                on:click={() => selectedPoint = { x, y }}
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
  .game-table td.active {
    background-color: #e2e7ed;
  }
  .game-table td.highlight {
    background-color: #cbdbed;
  }
  .game-table td.error {
    background-color: #f7cfd6;
  }
  .game-table td.is-answer.error :global(svg path) {
    fill: #fb3d3f;
  }
  .game-table td.selected {
    background-color: #bbdefb;
  }
</style>