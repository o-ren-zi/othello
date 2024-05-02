import { useState } from 'react';
import styles from './index.module.css';
const directions = [
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
];
// function newvalue(x: number, y: number) {
//   return x >= 0 && x < 8 && y >= 0 && y < 8;
// }
const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [memoly, setmemoly] = useState(0);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0],
    [0, 0, 0, 1, 2, 2, 0, 0],
    [0, 0, 0, 2, 1, 1, 2, 2],
    [0, 0, 0, 0, 0, 0, 1, 2],
    [0, 0, 0, 0, 0, 0, 2, 2],
    [0, 0, 0, 0, 0, 0, 1, 1],
  ]);
  // function samecolor(x: number, y: number) {
  //   return (board[y][x] = turnColor);
  // }

  // function othercolor(x: number, y: number) {
  //   return (board[y][x] = 3 - turnColor);
  // }

  // function zerocolor(x: number, y: number) {
  //   return (board[y][x] = 0);
  // }

  // const dx = directions[0];
  // const dy = directions[1];

  const clickHander = (x: number, y: number) => {
    console.log(x, y);
    const newBoard = structuredClone(board);

    for (const direction of directions)
      if (newBoard[y][x] === 0) {
        if (
          board[y + direction[0]] !== undefined &&
          board[y + direction[0]][x + direction[1]] === 3 - turnColor
        )
          for (let i = 1; i < 8; i++) {
            if (board[y + direction[0] * i][x + direction[1] * i] === 3 - turnColor) {
              continue;
            } else if (board[y + direction[0] * i][x + direction[1] * i] === turnColor) {
              newBoard[y][x] = turnColor;
              setBoard(newBoard);
              setTurnColor(3 - turnColor);
              

              setmemoly(i);
              for (let a = 1; a < i; a++) {
                newBoard[y + direction[0] * a][x + direction[1] * a] = turnColor;
                setBoard(newBoard);
                setTurnColor(3 - turnColor);
              }

              break;
            } else {
              console.log(x, y);
              break;
            }

            // newBoard[y][x] = turnColor;
            // setTurnColor(3 - turnColor);
          }
      }

    turnColor === 1 ? setTurnColor(2) : setTurnColor(1);

    setBoard(newBoard);
  };
  return (
    <div className={styles.container}>
      <div className={styles.boardstyle}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cellStyle} key={`${x}-${y}`} onClick={() => clickHander(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stonestyle}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
