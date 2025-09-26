import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useState } from "react";

export default function Load_chessboard({ fen }) {

  

  const chessboardOptions = {
    position: fen
  };

  return (
    <div style={{width: '400px'}}>
      <Chessboard options={chessboardOptions} />
    </div>
  );

  // Eu tenho que aprender a utilizar esse react-chessboard, pois ainda não consigo usar ele com proficiência.
}