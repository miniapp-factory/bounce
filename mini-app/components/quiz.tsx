"use client";

import { useState, useEffect } from "react";
import { shuffle } from "@/lib/utils";
import QuizResult from "./quiz-result";

type Question = {
  text: string;
  options: { text: string; animal: string }[];
};

const questions: Question[] = [
  {
    text: "What is your favorite type of food?",
    options: [
      { text: "Fish", animal: "cat" },
      { text: "Meat", animal: "dog" },
      { text: "Berries", animal: "fox" },
      { text: "Seeds", animal: "hamster" },
      { text: "Grass", animal: "horse" },
    ],
  },
  {
    text: "How do you prefer to spend your free time?",
    options: [
      { text: "Sleeping", animal: "cat" },
      { text: "Playing fetch", animal: "dog" },
      { text: "Hunting", animal: "fox" },
      { text: "Running in a wheel", animal: "hamster" },
      { text: "Grazing", animal: "horse" },
    ],
  },
  {
    text: "What is your favorite environment?",
    options: [
      { text: "Indoor", animal: "cat" },
      { text: "Outdoor", animal: "dog" },
      { text: "Forest", animal: "fox" },
      { text: "Cage", animal: "hamster" },
      { text: "Pasture", animal: "horse" },
    ],
  },
  {
    text: "How do you react to strangers?",
    options: [
      { text: "Curious but cautious", animal: "cat" },
      { text: "Friendly and eager", animal: "dog" },
      { text: "Alert and wary", animal: "fox" },
      { text: "Shy and hidden", animal: "hamster" },
      { text: "Calm and accepting", animal: "horse" },
    ],
  },
  {
    text: "What is your preferred mode of transport?",
    options: [
      { text: "Climbing", animal: "cat" },
      { text: "Running", animal: "dog" },
      { text: "Sneaking", animal: "fox" },
      { text: "Rolling", animal: "hamster" },
      { text: "Galloping", animal: "horse" },
    ],
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    cat: 0,
    dog: 0,
    fox: 0,
    hamster: 0,
    horse: 0,
  });
  const [shuffled, setShuffled] = useState<Question[]>([]);

  useEffect(() => {
    setShuffled(questions.map((q) => ({ ...q, options: shuffle(q.options) })));
  }, []);

  const handleAnswer = (animal: string) => {
    setScores((prev) => ({ ...prev, [animal]: prev[animal] + 1 }));
    if (current + 1 < shuffled.length) {
      setCurrent(current + 1);
    }
  };

  if (shuffled.length === 0) return null;

  if (current >= shuffled.length) {
    return <QuizResult scores={scores} />;
  }

  const q = shuffled[current];

  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">{q.text}</h2>
      <div className="flex flex-col gap-2">
        {q.options.map((opt) => (
          <button
            key={opt.text}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
            onClick={() => handleAnswer(opt.animal)}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
