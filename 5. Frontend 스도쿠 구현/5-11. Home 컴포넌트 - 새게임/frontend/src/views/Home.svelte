<script>
	import { onMount } from 'svelte';
	import DefaultLayout from '@/layouts/DefaultLayout.svelte';
	import Difficulty from '@/components/sudoku/Difficulty.svelte';
	import Navigation from '@/components/sudoku/Navigation.svelte';
	import NumberPad from '@/components/sudoku/NumberPad.svelte';
	import Sudoku from '@/components/sudoku/Sudoku.svelte';
	import { getSudoku, createSudoku, remainHint } from '@/store/sudoku';

	let difficulty = 'easy';
	let sudoku = {
		answer: [],
		memo: [],
		board: [],
	};

	$: answer = sudoku.answer;
	$: memo = sudoku.memo;
	$: board = sudoku.board;

	onMount(async () => {
		const result = await getSudoku();
		sudoku = result || await getNewSudoku(difficulty);
		$remainHint = sudoku.remainHint;
		difficulty = sudoku.difficulty;
	});

	async function getNewSudoku (difficulty) {
		await createSudoku({ difficulty });
		const result = await getSudoku();
		return result;
	}

	async function handleNewGame () {
		sudoku = await getNewSudoku(difficulty)
		$remainHint = sudoku.remainHint;
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
		{board}
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
