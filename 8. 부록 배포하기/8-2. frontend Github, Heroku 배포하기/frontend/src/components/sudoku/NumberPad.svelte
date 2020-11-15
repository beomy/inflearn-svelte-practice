<script>
  import { createEventDispatcher } from 'svelte';
  import Number from '@/components/common/Number.svelte';

  const dispatch = createEventDispatcher ();

  function handleClick (number) {
    dispatch('click', number);
  }
</script>

<div class="wrapper">
  <div on:click={() => handleClick(1)}><Number value={1}/></div>
  <div on:click={() => handleClick(2)}><Number value={2}/></div>
  <div on:click={() => handleClick(3)}><Number value={3}/></div>
  <div on:click={() => handleClick(4)}><Number value={4}/></div>
  <div on:click={() => handleClick(5)}><Number value={5}/></div>
  <div on:click={() => handleClick(6)}><Number value={6}/></div>
  <div on:click={() => handleClick(7)}><Number value={7}/></div>
  <div on:click={() => handleClick(8)}><Number value={8}/></div>
  <div on:click={() => handleClick(9)}><Number value={9}/></div>
</div>

<style>
  .wrapper {
    display: flex;
    margin-top: 10px;
  }
  .wrapper > div {
    width: 100%;
    text-align: center;
    cursor: pointer;
  }
</style>