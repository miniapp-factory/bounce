"use client";

import { useState } from "react";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

type QuizResultProps = {
  scores: Record<string, number>;
};

export default function QuizResult({ scores }: QuizResultProps) {
  const [showShare, setShowShare] = useState(false);
  const maxScore = Math.max(...Object.values(scores));
  const animal = Object.entries(scores).find(([, s]) => s === maxScore)?.[0] ?? "cat";

  const imageMap: Record<string, string> = {
    cat: "/cat.png",
    dog: "/dog.png",
    fox: "/fox.png",
    hamster: "/hamster.png",
    horse: "/horse.png",
  };

  const handleRetake = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold">You are a {animal}!</h2>
      <img src={imageMap[animal]} alt={animal} width={512} height={512} className="rounded" />
      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded"
          onClick={handleRetake}
        >
          Retake Quiz
        </button>
        <button
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
          onClick={() => setShowShare(true)}
        >
          Share
        </button>
      </div>
      {showShare && (
        <Share text={`I am a ${animal}! ${url}`} />
      )}
    </div>
  );
}
