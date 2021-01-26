import React, { useState } from "react";
import "./App.css";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";
import Timer from "react-compound-timer/build";

const Chess = require("chess.js");

const App: React.FC = () => {
  const [chess] = useState<ChessInstance>(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  );

  const [fen, setFen] = useState(chess.fen());

  const handleMove = (move: ShortMove) => {
    if (chess.move(move)) {
      setTimeout(() => {
        const moves = chess.moves();

        if (moves.length > 0) {
          const computerMove = moves[Math.floor(Math.random() * moves.length)];
          chess.move(computerMove);
          setFen(chess.fen());
        }
      }, 300);

      setFen(chess.fen());
    }
  };

  return (
    <div className="flex-center">
      <h1>Chess Game</h1>
      <Chessboard
        width={400}
        position={fen}
        onDrop={(move) =>
        handleMove({
          from: move.sourceSquare,
          to: move.targetSquare,
          promotion: "q",
        })
      }
      />
      <Timer initialTime={0} startImmediately={false}>
        {({ start, resume, pause, stop, reset, timerState} : {start:any, resume:any, pause:any, stop:any, reset:any, timerState:any}) => (
          <>
          <div>
            <span><Timer.Minutes /> minutes</span>
            <span><Timer.Seconds /> seconds</span>
            <span><Timer.Milliseconds /> milliseconds</span>
            </div>
            <div>{timerState}</div>
            <br></br>
            <div>
              <button onClick={start}>Start</button>
              <button onClick={pause}>Pause</button>
              <button onClick={resume}>Resume</button>
              <button onClick={stop}>Stop</button>
              <button onClick={reset}>Reset</button>
            </div>
          </>
        )}
        </Timer>
    </div>
  );
};

export default App;
