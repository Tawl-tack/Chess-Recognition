import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useState } from "react";

export default function Load_chessboard() {

  return (
    <div>
      <Chessboard position={result.fen} />
      
    </div>
  );

  // Eu tenho que aprender a utilizar esse react-chessboard, pois ainda não consigo usar ele com proficiência.
}