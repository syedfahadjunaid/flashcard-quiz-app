import React, { useState } from 'react';

export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false);

  const classes =
    'flex justify-center items-center relative rounded shadow-[0_0_5px_2px_rgba(0,0,0,0.3)] bg-gray-200 h-[250px] hover:bg-blue-200 cursor-pointer';

  return (
    <div
      className={flip ? `${classes}` : `${classes}`}
      onClick={() => setFlip(!flip)}
    >
      {!flip ? (
        <div className="absolute left-0 mb-2 p-4 text-sm font-bold text-blue-600">
          {flashcard.question}
          <div className="mt-2">
            {flashcard.options.map((option, index) => {
              return (
                <div
                  key={index}
                  className="mt-1 text-sm font-bold text-rose-500"
                >
                  {option}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="absolute p-4 text-4xl font-bold text-green-800">
          {flashcard.answer}
        </div>
      )}
    </div>
  );
}
