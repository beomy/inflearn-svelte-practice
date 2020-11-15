<script>
	import DefaultLayout from '@/layouts/DefaultLayout.svelte';
	import Difficulty from '@/components/sudoku/Difficulty.svelte';

	let difficulty = 'easy';

	function handleNewGame () {
		alert(difficulty);
	}
</script>

<DefaultLayout>
	<Difficulty bind:difficulty on:change={handleNewGame}/>
</DefaultLayout>
