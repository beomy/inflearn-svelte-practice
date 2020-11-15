<script>
	import { onMount } from 'svelte';
	import _ from 'lodash';
	import DefaultLayout from '@/layouts/DefaultLayout.svelte';
	import Difficulty from '@/components/sudoku/Difficulty.svelte';
	import Navigation from '@/components/sudoku/Navigation.svelte';
	import NumberPad from '@/components/sudoku/NumberPad.svelte';
	import Sudoku from '@/components/sudoku/Sudoku.svelte';
	import { getSudoku, createSudoku, updateSudoku, remainHint, message, memoFlag } from '@/store/sudoku';

	let difficulty = 'easy';
	let sudoku = {
		answer: [],
		memo: [],
		board: [],
	};
	let selectedPoint = { x: 0, y: 0 };

	$: isEditable = !(board?.[selectedPoint.y]?.[selectedPoint.x]);
	$: answer = sudoku.answer;
	$: memo = sudoku.memo;
	$: board = sudoku.board;
	$: solution = sudoku.solution;
	$: if (answer.length !== 0) {
		updateSudoku({ answer });
	}
	$: if ($remainHint !== 3) {
		updateSudoku({ remainHint: $remainHint });
	}
	$: if (memo.length !== 0) {
		updateSudoku({ memo });
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
		if (!isEditable) return;
		sudoku.memo[selectedPoint.y][selectedPoint.x] = [];
		sudoku.answer[selectedPoint.y][selectedPoint.x] = 0;
	}
	function handleHint () {
		if (!isEditable || $remainHint <= 0) return;
		$remainHint--;
		sudoku.answer[selectedPoint.y][selectedPoint.x] = solution[selectedPoint.y][selectedPoint.x];
	}
	function handleClickNumber ({ detail }) {
		if (!isEditable) return;
		if ($memoFlag) {
			const memoList = memo[selectedPoint.y][selectedPoint.x];
			const index = memoList.indexOf(detail);
			if (index >= 0) {
				memoList.splice(index, 1);
			} else {
				memoList.push(detail);
			}
			sudoku.memo[selectedPoint.y][selectedPoint.x] = memoList;
		} else {
			sudoku.answer[selectedPoint.y][selectedPoint.x] = detail;
		}
	}
</script>

<!-- <button on:click={() => sudoku.answer = sudoku.solution}>게임 완성</button> -->
<DefaultLayout>
	<Difficulty bind:difficulty on:change={handleNewGame}/>
	<Sudoku
	  bind:selectedPoint
	  {answer}
		{memo}
		{board}
		on:complete={() => $message = '훌륭합니다.'}
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
