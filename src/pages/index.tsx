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

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
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
              break;
            } else {
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
