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
import { QuizData } from "../utils/types";
import { useDispatch } from "react-redux";
import { setQuizData, setUploadedFileUrl } from "../utils/quizSlice";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type TakeQuizProps = {
  data: QuizData;
};

const TakeQuiz = ({ data }: TakeQuizProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    Array(data.questions.length).fill("")
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
    if (currentQuestion < data?.questions?.length - 1) {
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
    data?.questions?.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        totalScore++;
      }
    });
    setScore(totalScore);
    setQuizCompleted(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(Array(data?.questions?.length).fill(""));
    setTimeRemaining(300);
    setQuizCompleted(false);
    setScore(0);
  };

  const handleNewQuiz = () => {
    dispatch(setQuizData({ questions: [] }));
    dispatch(setUploadedFileUrl(""));
    router.push("/quiz");
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const progressPercentage =
    ((currentQuestion + 1) / data?.questions?.length) * 100;
  const scorePercentage = Math.round((score / data?.questions?.length) * 100);

  return (
    <div className="w-full max-w-xl flex justify-center items-center  p-4">
      <Card className="w-full shadow-lg border-green-800/20 dark:border-green-500/20">
        {!quizCompleted ? (
          <>
            <CardHeader className="space-y-1">
              <div className="flex justify-between items-center">
                <Badge
                  variant="outline"
                  className="px-3 py-1 bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400 border-green-200 dark:border-green-800"
                >
                  Question {currentQuestion + 1} of {data?.questions?.length}
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
              />
              <CardTitle className="text-2xl font-bold">
                {data?.questions[currentQuestion].description}
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
                {data?.questions[currentQuestion].options.map(
                  (option, index) => (
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
                  )
                )}
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
                {currentQuestion === data?.questions?.length - 1
                  ? "Finish"
                  : "Next"}{" "}
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
                You scored {score} out of {data?.questions?.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <div className="relative mb-6">
                <div
                  className={cn(
                    "w-32 h-32 rounded-full flex items-center justify-center",
                    scorePercentage >= 50
                      ? "bg-green-500 dark:bg-green-500"
                      : "bg-red-500 dark:bg-red-500"
                  )}
                >
                  <span
                    className={cn(
                      "text-4xl font-bold",
                      scorePercentage >= 50
                        ? "text-green-50 dark:text-green-50"
                        : "text-red-50 dark:text-red-50"
                    )}
                  >
                    {scorePercentage}%
                  </span>
                </div>
                <CheckCircle2
                  className={cn(
                    "absolute bottom-0 right-0 w-10 h-10 rounded-full",
                    scorePercentage >= 50
                      ? "text-green-200 bg-green-500 dark:text-green-200 dark:bg-green-500"
                      : "text-red-200 bg-red-500 dark:text-red-200 dark:bg-red-500"
                  )}
                />
              </div>

              <div className="w-full space-y-2">
                {data?.questions?.map((question, index) => (
                  <div className="flex flex-col gap-2" key={index}>
                    <div className="flex items-center gap-2 text-md">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          selectedAnswers[index] === question.answer
                            ? "bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-500"
                            : "bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-500"
                        }`}
                      >
                        {selectedAnswers[index] === question.answer ? "✓" : "✗"}
                      </div>
                      <span>
                        Question {index + 1}: {question.description}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Answer: {question.answer}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex items-center gap-4 justify-center border-t p-4 dark:border-green-950/30">
              <Button
                onClick={resetQuiz}
                className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white"
              >
                Restart Quiz
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white"
                onClick={handleNewQuiz}
              >
                New Quiz
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
};

export default TakeQuiz;
