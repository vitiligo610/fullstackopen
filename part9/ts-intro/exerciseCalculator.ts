import { getRating, parseArguments } from './utils';

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyExerciseHours: number[], target: number): Result => {
  const periodLength = dailyExerciseHours.length;
  let sum: number = 0;
  let trainingDays: number = 0;

  for (let i = 0; i < periodLength; i++) {
    sum += dailyExerciseHours[i];
    if (dailyExerciseHours[i] !== 0) trainingDays++;
  }
  const average: number = sum / periodLength;
  const success: boolean = average >= target ? true : false;
  const { rating, ratingDescription } = getRating(target, average);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const { dailyExerciseHours, target } = parseArguments(process.argv);
  console.log(calculateExercises(dailyExerciseHours, target));
} catch (error: unknown) {
  let errorMessage = 'An unexpected error occured: ';
  if (error instanceof Error) errorMessage += error.message;
  console.log(errorMessage);
}