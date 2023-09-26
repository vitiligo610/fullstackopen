export interface BmiInputs {
  height: number,
  weight: number
}

export const parseBmiArguments = (height: number, weight: number): BmiInputs => {
  if (!isNaN(height) && !isNaN(weight)) {
    return {
      height,
      weight
    };
  } else {
    throw new Error('Provided values are not numbers');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Provided inputs are not numbers');
  }
  
  const bmi: number = weight / ((height / 100) ** 2);
  
  if (bmi < 15) {
    return 'Very severely underweight';
  } else if (bmi > 15 && bmi < 16) {
    return 'Severely underweight';
  } else if (bmi > 16 && bmi < 18.5) {
    return 'Underweight';
  } else if (bmi > 18.5 && bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (bmi > 25 && bmi < 30) {
    return 'Overweight';
  } else if (bmi > 30 && bmi < 35) {
    return 'Obese Class I (Moderately obese)';
  } else if (bmi > 35 && bmi < 40) {
    return 'Obese Class II (Severely obese)';
  } else {
    return 'Obese Class III (Very severely obese)	';
  }
  
};