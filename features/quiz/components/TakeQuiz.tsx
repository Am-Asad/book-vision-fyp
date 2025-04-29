"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

// Sample quiz data
const quizData = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: "Mars",
  },
  {
    id: 3,
    question: "What is the largest mammal on Earth?",
    options: ["Elephant", "Giraffe", "Blue Whale", "Polar Bear"],
    correctAnswer: "Blue Whale",
  },
  {
    id: 4,
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
    correctAnswer: "Oxygen",
  },
  {
    id: 5,
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Michelangelo",
    ],
    correctAnswer: "Leonardo da Vinci",
  },
];

export default function QuizComponent() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    Array(quizData.length).fill("")
  );
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !quizCompleted) {
      finishQuiz();
    }
  }, [timeRemaining, quizCompleted]);

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answer;
    setSelectedAnswers(newAnswers);
  };

  const goToNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishQuiz();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const finishQuiz = () => {
    let totalScore = 0;
    quizData.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        totalScore++;
      }
    });
    setScore(totalScore);
    setQuizCompleted(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(Array(quizData.length).fill(""));
    setTimeRemaining(300);
    setQuizCompleted(false);
    setScore(0);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const progressPercentage = ((currentQuestion + 1) / quizData.length) * 100;

  return (
    <div className="w-full flex justify-center items-center min-h-[500px] p-4">
      <Card className="w-full max-w-2xl shadow-lg border-green-800/20 dark:border-green-500/20">
        {!quizCompleted ? (
          <>
            <CardHeader className="space-y-1">
              <div className="flex justify-between items-center">
                <Badge
                  variant="outline"
                  className="px-3 py-1 bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400 border-green-200 dark:border-green-800"
                >
                  Question {currentQuestion + 1} of {quizData.length}
                </Badge>
                <Badge
                  variant="outline"
                  className="px-3 py-1 flex items-center gap-1 bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400 border-green-200 dark:border-green-800"
                >
                  <Clock className="w-3.5 h-3.5" />
                  {formatTime(timeRemaining)}
                </Badge>
              </div>
              <Progress
                value={progressPercentage}
                className="h-2 bg-green-100 dark:bg-green-950/50"
                // indicatorClassName="bg-green-600 dark:bg-green-500"
              />
              <CardTitle className="text-2xl font-bold">
                {quizData[currentQuestion].question}
              </CardTitle>
              <CardDescription>
                Select the correct answer from the options below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedAnswers[currentQuestion]}
                onValueChange={handleAnswerSelect}
                className="space-y-3"
              >
                {quizData[currentQuestion].options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-2 rounded-lg border p-4 transition-colors ${
                      selectedAnswers[currentQuestion] === option
                        ? "border-green-500 bg-green-50 dark:bg-green-950/30 dark:border-green-600"
                        : "hover:bg-green-50/50 dark:hover:bg-green-950/20"
                    }`}
                  >
                    <RadioGroupItem
                      value={option}
                      id={`option-${index}`}
                      className="text-green-600 dark:text-green-500"
                    />
                    <Label
                      htmlFor={`option-${index}`}
                      className="w-full cursor-pointer font-medium"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4 dark:border-green-950/30">
              <Button
                onClick={goToPreviousQuestion}
                disabled={currentQuestion === 0}
                variant="outline"
                className="gap-1 border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-950/30"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </Button>
              <Button
                onClick={goToNextQuestion}
                disabled={!selectedAnswers[currentQuestion]}
                className="gap-1 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white"
              >
                {currentQuestion === quizData.length - 1 ? "Finish" : "Next"}{" "}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                Quiz Completed!
              </CardTitle>
              <CardDescription>
                You scored {score} out of {quizData.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full bg-green-100 dark:bg-green-950/30 flex items-center justify-center">
                  <span className="text-4xl font-bold text-green-600 dark:text-green-500">
                    {Math.round((score / quizData.length) * 100)}%
                  </span>
                </div>
                <CheckCircle2 className="absolute bottom-0 right-0 w-10 h-10 text-green-600 dark:text-green-500 bg-white dark:bg-background rounded-full" />
              </div>

              <div className="w-full max-w-xs space-y-2">
                {quizData.map((question, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        selectedAnswers[index] === question.correctAnswer
                          ? "bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-500"
                          : "bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-500"
                      }`}
                    >
                      {selectedAnswers[index] === question.correctAnswer
                        ? "✓"
                        : "✗"}
                    </div>
                    <span className="truncate">Question {index + 1}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t p-4 dark:border-green-950/30">
              <Button
                onClick={resetQuiz}
                className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white"
              >
                Restart Quiz
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}
