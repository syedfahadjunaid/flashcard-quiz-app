import { useCallback, useEffect, useState } from 'react';
import FlashcardList from './components/FlashcardList';
import axios from 'axios';

function App() {
  // const sample_cards = [
  //   {
  //     id: 1,
  //     question: 'question1',
  //     answer: 'answer1',
  //     options: ['option1', 'option2', 'option3', 'option4'],
  //   },
  //   {
  //     id: 2,
  //     question: 'question2',
  //     answer: 'answer2',
  //     options: ['option1', 'option2', 'option3', 'option4'],
  //   },
  // ];

  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(9);
  const [amount, setAmount] = useState(10);

  // const categoryEl = useRef();
  // const amountEl = useRef();

  const wordTrivia = useCallback(async () => {
    const response = await axios.get('https://opentdb.com/api.php', {
      params: {
        amount: amount,
        category: selectedCategory,
      },
    });

    const eachQuestion = response.data.results.map((questionItem, index) => {
      const answer = decodeString(questionItem.correct_answer);

      const options = [
        ...questionItem.incorrect_answers.map((a) => decodeString(a)),
        answer,
      ];

      return {
        id: `${index}-${Date.now()}`,
        question: decodeString(questionItem.question),
        options: options.sort(() => Math.random() - 0.5),
        answer: answer,
      };
    });
    // console.log(eachQuestion);
    setFlashcards(eachQuestion);
  }, [amount, selectedCategory]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setSelectedCategory(document.getElementById('selectedValue').value);
    // console.log(amount);
  };
  console.log(selectedCategory);

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  useEffect(() => {
    wordTrivia();

    return () => null;
  }, [wordTrivia]);

  const categorySelection = async () => {
    const response = await axios.get('https://opentdb.com/api_category.php');
    console.log(response.data.trivia_categories);

    setCategories(response.data.trivia_categories);
  };

  useEffect(() => {
    categorySelection();
  }, []);

  function decodeString(str) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
  }

  const renderedCategoriesName = categories.map((cat) => {
    return (
      <option
        className="rounded border-2 border-solid border-blue-400 hover:border-blue-800"
        key={cat.id}
        value={cat.id}
      >
        {cat.name}
      </option>
    );
  });

  const form_group = 'flex flex-col m-2';
  const form_group_label = 'text-beige-400 text-sm mb-1';

  return (
    <div>
      <h1 className="animate-pulse text-center text-2xl font-bold text-gray-600">
        FLASHCARD QUIZ - Junaid
      </h1>
      <div>
        <form
          className="items-center bg-blue-200 p-2 shadow-[0_0_5px_2px_rgba(0,0,0,0.3)]"
          onSubmit={handleSubmit}
        >
          <div className={form_group}>
            <label className={form_group_label}>Category</label>
            <select id="selectedValue" className="category">
              {renderedCategoriesName}
            </select>
          </div>
          <div className={form_group}>
            <label className={form_group_label}>Number Of Questions</label>
            <input
              type="number"
              className="rounded border-2 border-solid border-blue-400 hover:border-blue-800"
              min="1"
              step="1"
              value={amount}
              onChange={handleChange}
            ></input>
          </div>
          <div className={form_group}>
            <button
              className="h-[35px] w-[100px] rounded bg-blue-300 p-2 font-semibold text-white hover:bg-blue-600 hover:text-white"
              onClick={handleSubmit}
            >
              GENERATE
            </button>
          </div>
        </form>
        <div className="m-3 max-w-[900px]">
          <FlashcardList flashcards={flashcards} />
        </div>
      </div>
    </div>
  );
}

export default App;
