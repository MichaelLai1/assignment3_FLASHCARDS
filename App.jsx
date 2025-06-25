import React, { useState } from "react";
import flashcards from "./components/flashcards";
import Flashcard from "./components/Flashcard";
import "./App.css";

function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [guess, setGuess] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const currentCard = flashcards[currentCardIndex];

  const handleSubmitGuess = () => {
    const normalizedGuess = guess.trim().toLowerCase();
    const normalizedAnswer = currentCard.answer.toLowerCase();
    const correct = normalizedGuess === normalizedAnswer;

    setIsCorrect(correct);
    setSubmitted(true);
    setFlipped(true);
  };

  const handleNext = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      resetCardState();
    }
  };

  const handleBack = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      resetCardState();
    }
  };

  const resetCardState = () => {
    setGuess("");
    setSubmitted(false);
    setIsCorrect(null);
    setFlipped(false);
  };

  return (
    <div className="App">
      <h1>Human Bones Flashcards</h1>
      <p>Card {currentCardIndex + 1} of {flashcards.length}</p>

      <Flashcard
        card={currentCard}
        flipped={flipped}
        onFlip={() => submitted && setFlipped(!flipped)}
      />

      <div style={{ marginTop: "20px" }}>
        {!submitted ? (
          <>
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter your guess"
              style={{ padding: "10px", width: "250px" }}
            />
            <button onClick={handleSubmitGuess} style={{ marginLeft: "10px" }}>
              Submit
            </button>
          </>
        ) : (
          <p
            style={{
              color: isCorrect ? "green" : "red",
              fontWeight: "bold",
              fontSize: "1.2em",
            }}
          >
            {isCorrect ? "✅ Correct!" : `❌ Incorrect. It was "${currentCard.answer}".`}
          </p>
        )}
      </div>

      <div style={{ marginTop: "30px" }}>
        <button onClick={handleBack} disabled={currentCardIndex === 0}>
          ⬅ Back
        </button>
        <button
          onClick={handleNext}
          disabled={currentCardIndex === flashcards.length - 1}
          style={{ marginLeft: "10px" }}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}

export default App;
