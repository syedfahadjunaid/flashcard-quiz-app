import React from 'react';
import Flashcard from './Flashcard';

export default function FlashcardList({ flashcards }) {
  const renderedFlashcards = flashcards.map((flashcard) => {
    return <Flashcard key={flashcard.id} flashcard={flashcard} />;
  });
  return (
    <div className="grid-col grid items-center gap-4">{renderedFlashcards}</div>
  );
}
