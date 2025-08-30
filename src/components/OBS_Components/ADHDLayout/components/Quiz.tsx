import { useCallback, useEffect, useRef, useState } from "react";

import { getDataPath, getImagePath } from "./imageAssets";
import styles from "./Quiz.module.scss";

interface QuizQuestion {
  text: string;
  choices: string[];
  answer: number;
}

// Функция для перемешивания массива (алгоритм Фишера-Йейтса)
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Функция для перемешивания вариантов ответов с сохранением правильного ответа
const shuffleChoices = (question: QuizQuestion): QuizQuestion => {
  const choices = [...question.choices];
  const correctAnswer = choices[question.answer];

  // Перемешиваем варианты ответов
  const shuffledChoices = shuffleArray(choices);

  // Находим новый индекс правильного ответа
  const newAnswerIndex = shuffledChoices.indexOf(correctAnswer);

  return {
    ...question,
    choices: shuffledChoices,
    answer: newAnswerIndex,
  };
};

export function Quiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Загружаем вопросы из owl.json через imageAssets и перемешиваем их
    const owlData = getDataPath("owl");
    if (Array.isArray(owlData)) {
      // Перемешиваем порядок вопросов и варианты ответов для каждого вопроса
      const shuffledQuestions = shuffleArray(owlData as QuizQuestion[]).map(
        shuffleChoices
      );
      setQuestions(shuffledQuestions);
      setIsActive(true);
    }
  }, []);

  const nextQuestion = useCallback(() => {
    setCurrentQuestionIndex(prevIndex => {
      const isLastQuestion = prevIndex >= questions.length - 1;

      if (isLastQuestion) {
        // Если это последний вопрос, перемешиваем массив и начинаем сначала
        setQuestions(prevQuestions =>
          shuffleArray([...prevQuestions]).map(shuffleChoices)
        );
        setTimeLeft(30);
        setSelectedAnswer(null);
        setShowResult(false);
        setIsActive(true);
        return 0;
      }

      const nextIndex = prevIndex + 1;
      setTimeLeft(30);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsActive(true);

      return nextIndex;
    });
  }, [questions.length]);

  const handleTimeUp = useCallback(() => {
    // Время вышло — показываем правильный ответ на 3 секунды
    setShowResult(true);
    setIsActive(false);
    setTimeout(() => {
      nextQuestion();
    }, 3000);
  }, [nextQuestion]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [handleTimeUp, isActive, timeLeft]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Уже выбран ответ

    setSelectedAnswer(answerIndex);
    setShowResult(true);
    setIsActive(false);

    // Переходим к следующему вопросу через 3 секунды
    setTimeout(() => {
      nextQuestion();
    }, 3000);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizContent}>
        {/* Шапка: сова + текст вопроса слева, таймер справа */}
        <div className={styles.quizHeader}>
          <div className={styles.headerLeft}>
            <img
              src={getImagePath("duolingo")}
              alt="Duolingo Owl"
              className={styles.owlImage}
            />
            <div className={styles.questionText}>{currentQuestion.text}</div>
          </div>
          <div className={styles.timerValue}>{timeLeft}</div>
        </div>

        {/* Варианты ответов 2x2 */}
        <div className={styles.choicesContainer}>
          {currentQuestion.choices.map((choice, index) => (
            <button
              key={index}
              className={`${styles.choiceButton} ${
                showResult
                  ? index === currentQuestion.answer
                    ? styles.correct
                    : selectedAnswer === index &&
                        selectedAnswer !== currentQuestion.answer
                      ? styles.incorrect
                      : ""
                  : ""
              }`}
              onClick={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null || !isActive}
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
