<script>
  const difficultyList = ['easy', 'medium', 'hard'];
  export let difficulty = 'easy';
</script>

<div>
  <select bind:value={difficulty} on:blur on:change>
    {#each difficultyList as item (item)}
      <option value={item}>{item}</option>
    {/each}
  </select>
</div>