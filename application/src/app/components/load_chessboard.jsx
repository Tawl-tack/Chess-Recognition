import { Chessboard, ChessboardProvider, SparePiece, defaultPieces } from "react-chessboard";
import { Chess } from "chess.js";
import { useState, useRef, useEffect } from "react";

export default function Load_chessboard({ fen }) {

  // Use useRef to not re-render the page when the chessGame position changes.
  const chessGameRef = useRef(new Chess(fen, {
    skipValidation: true
  }));

  const chessGame = chessGameRef.current;


  // Creates a variable to the chessPosition, in order to change it by the time; Creates another one to take the width of a square to maintain the spare part redimentionable.
  const [chessPosition, setChessPosition] = useState(chessGame.fen());
  const [squareWidth, setSquareWidth] = useState(null);

  // When the chessboard trigger on the screen, it will take the width of a square and send it to squareWidth
  useEffect(() => {
    const square = document.querySelector(`[data-column="a"] [data-row="1"]`)?.getBoundingClientRect();
    setSquareWidth(square?.width ?? null);
  }, []);


  // When someone drops a piece, it will take the atual position, the target position and will update the fen to contemplate it.
  function onPieceDrop({
    sourceSquare,
    targetSquare,
    piece
  }) {
    const color = piece.pieceType[0];
    const type = piece.pieceType[1].toLowerCase();

    if (!targetSquare) {
      chessGame.remove(sourceSquare);
      setChessPosition(chessGame.fen());

      return true;
    }

    if (!piece.isSparePiece) {
      chessGame.remove(sourceSquare);
    }

    chessGame.put({
      color: color,
      type: type
    }, targetSquare);

    setChessPosition(chessGame.fen());
    return true;
  }

  // Create the spare area
  const blackPieceTypes = [];
  const whitePieceTypes = [];

  for (const pieceType of Object.keys(defaultPieces)) {
    if (pieceType[0] === 'b') {
      blackPieceTypes.push(pieceType);
    } else {
      whitePieceTypes.push(pieceType);
    }
  }

  const chessboardOptions = {
    position: chessPosition,
    onPieceDrop,
    id: 'square-pieces'
  };

  const handleRestart = () => {
    chessGameRef.current = new Chess(fen, { skipValidation: true });

    setChessPosition(chessGameRef.current.fen());
  }

  return (
    <div>
      <div className=" bg-[#3E3E57] hover:scale-101 transform transition-all duration-300 p-3 w-100 object-cover rounded-md opacity-0 animate-fadeIn">
        <ChessboardProvider options={chessboardOptions}>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
            {blackPieceTypes.map(pieceType => (
              <div key={pieceType} style={{ width: squareWidth, height: squareWidth }}>
                <SparePiece pieceType={pieceType} />
              </div>
            ))}
          </div>

          <Chessboard />

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
            {whitePieceTypes.map(pieceType => (
              <div key={pieceType} style={{ width: squareWidth, height: squareWidth }}>
                <SparePiece pieceType={pieceType} />
              </div>
            ))}
          </div>
      <button onClick={handleRestart} className=" hover:scale-102 shadow-md
            hover:shadow-[#191927] transition-all duration-300
            cursor-pointer text-[#191927] font-semibold bg-[#8e72ee]
             rounded-md px-5 my-2">Restart</button>

          <div>
            <span className="text-white text-xs">FEN: {chessPosition}</span>
          </div>
        </ChessboardProvider>
      </div>



    </div>

  );

  // Eu tenho que aprender a utilizar esse react-chessboard, pois ainda não consigo usar ele com proficiência.
}