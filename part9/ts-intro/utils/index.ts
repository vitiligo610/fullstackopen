interface ExerciseValues {
  dailyExerciseHours: number[];
  target: number;
}

interface Rating {
  rating: number;
  ratingDescription: string;
}

export const isNumbersArray = (arr: any[]): boolean => {
  return arr.every((n) => {
    if (isNaN(n)) return false;
    return typeof n === 'number';
  });
};

export const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const dailyExerciseHours = args.slice(3).map((n) => Number(n));
  const target = Number(args[2]);

  if (!isNaN(target) && isNumbersArray(dailyExerciseHours)) {
    return {
      dailyExerciseHours,
      target
    };
  } else {
    throw new Error('Provided values are not numbers');
  }
};

export const getRating = (target: number, average: number): Rating => {
  let rating: number = 0;
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
