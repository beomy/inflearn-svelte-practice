<script>
	import { onMount } from 'svelte';
	import _ from 'lodash';
	import DefaultLayout from '@/layouts/DefaultLayout.svelte';
	import Difficulty from '@/components/sudoku/Difficulty.svelte';
	import Navigation from '@/components/sudoku/Navigation.svelte';
	import NumberPad from '@/components/sudoku/NumberPad.svelte';
	import Sudoku from '@/components/sudoku/Sudoku.svelte';
	import { getSudoku, createSudoku, remainHint, message } from '@/store/sudoku';

	let difficulty = 'easy';
	let sudoku = {
		answer: [],
		memo: [],
		board: [],
	};

	$: answer = sudoku.answer;
	$: memo = sudoku.memo;
	$: board = sudoku.board;
	$: solution = sudoku.solution;
	$: if (answer.length !== 0 && _.isEqual(answer, solution)) {
		$message = '훌륭합니다.';
	}

	onMount(async () => {
		$message = '게임을 가져오는 중입니다.';
		const result = await getSudoku();
		sudoku = result || await getNewSudoku(difficulty);
		$remainHint = sudoku.remainHint;
		difficulty = sudoku.difficulty;
		$message = '';
	});

	async function getNewSudoku (difficulty) {
		await createSudoku({ difficulty });
		const result = await getSudoku();
		return result;
	}

	async function handleNewGame () {
		$message = '새로운 게임을 생성중입니다.';
		sudoku = await getNewSudoku(difficulty);
		$remainHint = sudoku.remainHint;
		$message = '';
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

<!-- <button on:click={() => sudoku.answer = sudoku.solution}>게임 완성</button> -->
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
