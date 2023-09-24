interface Inputs {
  height: number,
  weight: number
}

const parseArguments = (args: string[]): Inputs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values are not numbers');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  if (isNaN(height) || isNaN(weight))
    throw new Error('Provided inputs are not numbers');
  
  const bmi: number = weight / ((height / 100) ** 2);
  
  if (bmi < 18.5)
    return 'under weight';
  else if (bmi >= 18.5 && bmi <= 24.9)
    return 'healthy weight';
  else
    return 'over weight';
}

try {
  const { height, weight } = parseArguments(process.argv)
  console.log(calculateBmi(height, weight));
} catch (error) {
  if (error instanceof Error) {
    let errorMessage = 'An unexpected error occurred: ' + error.message;
    console.log(errorMessage);
  } else {
    console.log('An unknown error occurred.');
  }
}
