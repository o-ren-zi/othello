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

  function Changecolor() {
    const [turnColor, setTurnColor] = useState(1);

    const changecolor = () => {
      setTurnColor((prevturncolor) => (prevturncolor === 1 ? 2 : 1));
    };
    const currentClassName = `${styles.turnstyle}${turnColor === 1 ? 2 : 1}`;
    return <div className={currentClassName} onClick={changecolor} />;
  }
  

  const clickHander = (x: number, y: number) => {
    console.log(x, y);
    const newBoard = structuredClone(board);
    if (newBoard[y][x] === 0) {
      for (const direction of directions)
        if (
          board[y + direction[0]] !== undefined &&
          board[y + direction[0]][x + direction[1]] === 3 - turnColor
        )
          for (let i = 1; i < 8; i++) {
            if (
              y + direction[0] * i < 0 ||
              y + direction[0] * i >= 8 ||
              x + direction[1] * i < 0 ||
              x + direction[1] * i >= 8
            ) {
              break;
            }
            if (board[y + direction[0] * i][x + direction[1] * i] === 3 - turnColor) {
              continue;
            } else if (board[y + direction[0] * i][x + direction[1] * i] === turnColor) {
              newBoard[y][x] = turnColor;
              setBoard(newBoard);
              setTurnColor(3 - turnColor);

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
      <div className={styles.platestyle}>
        {Changecolor()}
        <div className={styles.turnstyle} />
      </div>
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
