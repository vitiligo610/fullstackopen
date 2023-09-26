interface ExerciseInputs {
  dailyExerciseHours: number[];
  target: number;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Rating {
  rating: number;
  ratingDescription: string;
}

export const parseExercisesArguments = (dailyExerciseHoursInput: number[], target: number): ExerciseInputs => {
  const dailyExerciseHours = dailyExerciseHoursInput.map(d => Number(d))

  if (isNaN(target) || dailyExerciseHours.some(isNaN)) {
    throw new Error('Provided inputs are not numbers');
  }

  return {
    dailyExerciseHours,
    target
  };
};

export const calculateExercises = (dailyExerciseHours: number[], target: number): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((d) => d > 0).length;
  const average = dailyExerciseHours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target ? true : false;
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

const getRating = (target: number, average: number): Rating => {
  let rating = 0;
  let ratingDescription = '';

  const percentage = (average / target) * 100;

  if (percentage === 0) {
    rating = 0;
    ratingDescription = 'not great at all. need to work harder';
  }

  if (percentage > 0 && percentage <= 33) {
    rating = 1;
    ratingDescription = "you've started but there's alot of room for improvement";
  }

  if (percentage > 33 && percentage <= 75) {
    rating = 2;
    ratingDescription = "you're doing well but don't stop here";
  }

  if (percentage > 75 && percentage <= 100) {
    rating = 3;
    ratingDescription = "fantastic! you're nailing it";
  }

  return {
    rating,
    ratingDescription
  };
};
