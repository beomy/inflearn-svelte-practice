<script>
  import Number from '@/components/common/Number.svelte';
  export let value = 0;
  export let memo = [];
</script>

<div class="cell" on:click>
  {#if value}
    <div class="value"><Number {value}/></div>
  {:else}
    <div class="memo">
      <div class="memo-item" class:active={memo.includes(1)}><Number value={1}/></div>
      <div class="memo-item" class:active={memo.includes(2)}><Number value={2}/></div>
      <div class="memo-item" class:active={memo.includes(3)}><Number value={3}/></div>
      <div class="memo-item" class:active={memo.includes(4)}><Number value={4}/></div>
      <div class="memo-item" class:active={memo.includes(5)}><Number value={5}/></div>
      <div class="memo-item" class:active={memo.includes(6)}><Number value={6}/></div>
      <div class="memo-item" class:active={memo.includes(7)}><Number value={7}/></div>
      <div class="memo-item" class:active={memo.includes(8)}><Number value={8}/></div>
      <div class="memo-item" class:active={memo.includes(9)}><Number value={9}/></div>
    </div>
  {/if}
</div>

<style>
  .cell {
    width: 100%;
    height: 100%;
    font-size: 0;
  }
  .value, .memo {
    width: 100%;
    height: 100%;
    text-align: center;
    display: inline-block;
  }
  .value :global(svg), .memo-item :global(svg) {
    vertical-align: middle;
  }
  .value:after, .memo-item:after {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
  .memo-item {
    visibility: hidden;
    width: 33.3333%;
    height: 33.3333%;
    display: inline-block;
  }
  .memo-item :global(svg) {
    width: 60%;
    height: 60%;
  }
</style>