<script>
  import Number from '@/components/common/Number.svelte';
  export let value = 0;
  export let memo = [];
</script>

<div>
  {#if value}
    <div><Number {value}/></div>
  {:else}
    <div>
      <div class:active={memo.includes(1)}><Number value={1}/></div>
      <div class:active={memo.includes(2)}><Number value={2}/></div>
      <div class:active={memo.includes(3)}><Number value={3}/></div>
      <div class:active={memo.includes(4)}><Number value={4}/></div>
      <div class:active={memo.includes(5)}><Number value={5}/></div>
      <div class:active={memo.includes(6)}><Number value={6}/></div>
      <div class:active={memo.includes(7)}><Number value={7}/></div>
      <div class:active={memo.includes(8)}><Number value={8}/></div>
      <div class:active={memo.includes(9)}><Number value={9}/></div>
    </div>
  {/if}
</div>