<script>
	import DefaultLayout from '@/layouts/DefaultLayout.svelte';
	import Difficulty from '@/components/sudoku/Difficulty.svelte';
	import Navigation from '@/components/sudoku/Navigation.svelte';
	import NumberPad from '@/components/sudoku/NumberPad.svelte';

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
	function handleClickNumber ({ detail }) {
		alert(detail);
	}
</script>

<DefaultLayout>
	<Difficulty bind:difficulty on:change={handleNewGame}/>
	<Navigation
		on:remove={handleRemove}
		on:hint={handleHint}
		on:newGame={handleNewGame}
	/>
	<NumberPad
	  on:click={handleClickNumber}
	/>
</DefaultLayout>
