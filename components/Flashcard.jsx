import React from "react";
import "./Flashcard.css";

export default function Flashcard({ card, flipped, onFlip }) {
  return (
    <div className="flashcard" onClick={onFlip}>
      {flipped ? card.answer : card.question}
    </div>
  );
}
