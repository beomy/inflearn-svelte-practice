import _ from 'lodash';
import { multiply } from 'mathjs';

export function getSolution () {
  const s = _.chunk(_.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]), 3);
  const x1 = [[0, 0, 1], [1, 0, 0], [0, 1, 0]];
  const x2 = [[0, 1, 0], [0, 0, 1], [1, 0, 0]];
  const x1s = multiply(x1, s);
  const x2s = multiply(x2, s);
  const sx1 = multiply(s, x1);
  const sx2 = multiply(s, x2);
  const x1sx1 = multiply(x1s, x1);
  const x2sx1 = multiply(x2s, x1);
  const x1sx2 = multiply(x1s, x2);
  const x2sx2 = multiply(x2s, x2);
  return [
    [...s[0], ...x1s[0], ...x2s[0]],
    [...s[1], ...x1s[1], ...x2s[1]],
    [...s[2], ...x1s[2], ...x2s[2]],
    [...sx1[0], ...x1sx1[0], ...x2sx1[0]],
    [...sx1[1], ...x1sx1[1], ...x2sx1[1]],
    [...sx1[2], ...x1sx1[2], ...x2sx1[2]],
    [...sx2[0], ...x1sx2[0], ...x2sx2[0]],
    [...sx2[1], ...x1sx2[1], ...x2sx2[1]],
    [...sx2[2], ...x1sx2[2], ...x2sx2[2]],
  ]
}

export function solve (board) {
  const memo = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (!memo[i]) memo[i] = [];
      if (!memo[i][j]) memo[i][j] = [];
    }
  }
  const isSolve = setMemo(board, memo) || diffMemo(board, memo);
  return {
    board,
    memo,
    isSolve,
  };
}

export function getSudoku (difficulty) {
  // 완성된 스도쿠 생성
  const solution = getSolution();
  const board = _.cloneDeep(solution);
  const emptyPoints = [];
  const invalidPoints = [];

  // 반복문을 통해, 조건은 난이도에 맞는 스도쿠가 아닐 경우 반복문 동작
  while (!isValidDifficulty(difficulty, emptyPoints.length)) {
    // 임의의 한 셀을 가져오기
    const point = getDigPoint(board, [...emptyPoints, ...invalidPoints]);
    if (!point) break;

    // 그 셀의 위치를 빈 값으로 업데이트
    const oriValue = board[point.y][point.x];
    board[point.y][point.x] = 0;
    // 스도쿠가 풀리는 문제 확인
    const { isSolve } = solve(_.cloneDeep(board));
    if (!isSolve) {
      // 스도쿠 문제가 풀리지 않으면 스도쿠 문제를 복원
      board[point.y][point.x] = oriValue;
      invalidPoints.push(point);
    } else {
      // 스도쿠 문제가 풀리면 반복문을 실행
      emptyPoints.push(point);
    }
  }

  // 난이도에 맞는 스도쿠인지 체크
  // 난이도에 맞는 스도쿠라면 스도쿠 정보를 리턴
  // 난이도에 맞는 스도쿠가 아니면 getSudoku 함수를 제귀 실행
  return isValidDifficulty(difficulty, emptyPoints.length)
    ? {
      solution,
      board,
      difficulty
    }
    : getSudoku(difficulty);
}

function getDigPoint (board, except = []) {
  const possiblePoint = [];
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (!except.find(i => _.isEqual(i, { x, y }))) {
        possiblePoint.push({ x, y });
      }
    }
  }
  return possiblePoint[_.random(possiblePoint.length - 1)];
}

function isValidDifficulty (difficulty, emptyLenght) {
  const refDifficulty = {
    easy: 45,
    medium: 50,
    hard: 55,
  };
  if (difficulty === 'easy') {
    // easy 일 경우 맞춰야 할 셀의 갯수가 45 이상 50 미만
    return emptyLenght >= refDifficulty.easy && emptyLenght < refDifficulty.medium;
  } else if (difficulty === 'medium') {
    // medium 일 경우 맞춰야 할 셀의 갯수가 50 이상 55 미만
    return emptyLenght >= refDifficulty.medium && emptyLenght < refDifficulty.hard;
  } else {
    // hard 일 경우 맞춰야 할 셀의 갯수가 55 이상
    return emptyLenght >= refDifficulty.hard;
  }
}

function diffMemo (board, memo) {
  const emptyPointList = getEmptyPointList(board);
  let isSolve = true;
  for (const emptyPoint of emptyPointList) {
    const curMemo = memo[emptyPoint.y][emptyPoint.x];
    const focusRow = getFocusCellsRow(emptyPoint);
    const focusCol = getFocusCellsCol(emptyPoint);
    const focusSquare = getFocusCellsSquare(emptyPoint);
    for (const cells of [focusRow, focusCol, focusSquare]) {
      const memos = cells.map(p => memo[p.y][p.x]);
      const possibleMemos = _.difference(curMemo, ...memos);
      if (possibleMemos.length === 1) {
        board[emptyPoint.y][emptyPoint.x] = possibleMemos[0];
        memo[emptyPoint.y][emptyPoint.x] = [];
        return diffMemo(board, memo);
      } else {
        isSolve = false;
      }
    }
  }
  return isSolve;
}

function setMemo (board, memo) {
  const emptyPointList = getEmptyPointList(board);
  let isSolve = true;
  for (const emptyPoint of emptyPointList) {
    const focusRow = getFocusCellsRow(emptyPoint);
    const focusCol = getFocusCellsCol(emptyPoint);
    const focusSquare = getFocusCellsSquare(emptyPoint);

    const memoGroup = [];
    for (const cells of [focusRow, focusCol, focusSquare]) {
      const values = cells.map(p => board[p.y][p.x]);
      memoGroup.push(_.difference([1, 2, 3, 4, 5, 6, 7, 8, 9], values));
    }
    const memoList = _.intersection(...memoGroup);

    if (memoList.length === 1) {
      board[emptyPoint.y][emptyPoint.x] = memoList[0];
      memo[emptyPoint.y][emptyPoint.x] = [];
      return setMemo(board, memo);
    } else if (memoList.length > 1) {
      memo[emptyPoint.y][emptyPoint.x] = memoList;
      isSolve = false;
    }
  }
  return isSolve;
}

function getEmptyPointList (board) {
  const emptyPointList = [];
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (!board[y][x]) emptyPointList.push({ x, y });
    }
  }
  return emptyPointList;
}

function getFocusCellsRow (point) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(x => ({ x, y: point.y }));
}
function getFocusCellsCol (point) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(y => ({ x: point.x, y }));
}
function getFocusCellsSquare (point) {
  const refs = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
  // point = { x: 4, y: 7 } x는 2번째 그룹 y는 3번째 그룹
  const xRef = refs.find(x => point.x >= Math.min(...x) && point.x <= Math.max(...x));
  const yRef = refs.find(y => point.y >= Math.min(...y) && point.y <= Math.max(...y));
  const cells = [];
  for (const x of xRef) {
    for (const y of yRef) {
      cells.push({ x, y });
    }
  }
  return cells;
}