<script>
	import { onMount } from 'svelte';
	import DefaultLayout from '@/layouts/DefaultLayout.svelte';
	import Difficulty from '@/components/sudoku/Difficulty.svelte';
	import Navigation from '@/components/sudoku/Navigation.svelte';
	import NumberPad from '@/components/sudoku/NumberPad.svelte';
	import Sudoku from '@/components/sudoku/Sudoku.svelte';
	import { getSudoku, createSudoku } from '@/store/sudoku';

	let difficulty = 'easy';
	let sudoku = {
		answer: [],
		memo: [],
	};

	$: answer = sudoku.answer;
	$: memo = sudoku.memo;

	onMount(async () => {
		const result = await getSudoku();
		sudoku = result || await getNewSudoku(difficulty);
		console.log(sudoku);
	});

	async function getNewSudoku (difficulty) {
		await createSudoku({ difficulty });
		const result = await getSudoku();
		return result;
	}

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
	<Sudoku
	  {answer}
		{memo}
	/>
	<Navigation
		on:remove={handleRemove}
		on:hint={handleHint}
		on:newGame={handleNewGame}
	/>
	<NumberPad
	  on:click={handleClickNumber}
	/>
</DefaultLayout>
