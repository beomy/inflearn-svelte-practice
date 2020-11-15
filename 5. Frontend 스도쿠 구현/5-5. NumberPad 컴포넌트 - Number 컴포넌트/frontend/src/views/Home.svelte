<script>
	import DefaultLayout from '@/layouts/DefaultLayout.svelte';
	import Difficulty from '@/components/sudoku/Difficulty.svelte';
	import Navigation from '@/components/sudoku/Navigation.svelte';

	let difficulty = 'easy';

	function handleNewGame () {
		alert(difficulty);
	}
	function handleRemove () {
		alert('remove');
	}
	function handleHint () {
		alert('hint');
	}
</script>

<DefaultLayout>
	<Difficulty bind:difficulty on:change={handleNewGame}/>
	<Navigation
		on:remove={handleRemove}
		on:hint={handleHint}
		on:newGame={handleNewGame}
	/>
</DefaultLayout>
