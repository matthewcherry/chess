import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { createUseStyles } from "react-jss";
import BlackBishop from "../../resources/images/black-bishop.svg";
import BlackKing from "../../resources/images/black-king.svg";
import BlackKnight from "../../resources/images/black-knight.svg";
import BlackPawn from "../../resources/images/black-pawn.svg";
import BlackQueen from "../../resources/images/black-queen.svg";
import BlackRook from "../../resources/images/black-rook.svg";
import WhiteBishop from "../../resources/images/white-bishop.svg";
import WhiteKing from "../../resources/images/white-king.svg";
import WhiteKnight from "../../resources/images/white-knight.svg";
import WhitePawn from "../../resources/images/white-pawn.svg";
import WhiteQueen from "../../resources/images/white-queen.svg";
import WhiteRook from "../../resources/images/white-rook.svg";
import {
  Piece as PieceData,
  PieceColour,
  PieceType,
  Position,
} from "../../typings";

const useStyles = createUseStyles(() => ({
  image: {
    height: "67%",
    zIndex: 1,
  },
}));

const getImageToUse = (type: PieceType, colour: PieceColour): string => {
  if (colour === "white") {
    switch (type) {
      case "pawn":
        return WhitePawn;
      case "knight":
        return WhiteKnight;
      case "bishop":
        return WhiteBishop;
      case "rook":
        return WhiteRook;
      case "queen":
        return WhiteQueen;
      case "king":
        return WhiteKing;
      default:
        throw Error(`Invalid piece type (${type}) or colour (${colour}).`);
    }
  } else {
    switch (type) {
      case "pawn":
        return BlackPawn;
      case "knight":
        return BlackKnight;
      case "bishop":
        return BlackBishop;
      case "rook":
        return BlackRook;
      case "queen":
        return BlackQueen;
      case "king":
        return BlackKing;
      default:
        throw Error(`Invalid piece type (${type}) or colour (${colour}).`);
    }
  }
};

interface PieceProps {
  piece: PieceData;
  activeColour: PieceColour;
  setDroppableSquares: (newSquares: Position[]) => void;
}

export default function Piece(props: PieceProps): JSX.Element {
  const { piece, activeColour, setDroppableSquares } = props;
  const classes = useStyles();

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: piece.type,
      item: piece,
      canDrag: piece.colour === activeColour,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [piece, activeColour]
  );

  const [image, setImage] = useState<string>(
    getImageToUse(piece.type, piece.colour)
  );

  useEffect(() => {
    setImage(getImageToUse(piece.type, piece.colour));
  }, [piece]);

  useEffect(() => {
    if (isDragging) {
      setDroppableSquares(piece.attacks);
    } else {
      setDroppableSquares([]);
    }
  }, [isDragging]);

  return (
    <img src={image} alt={piece.id} className={classes.image} ref={drag} />
  );
}
