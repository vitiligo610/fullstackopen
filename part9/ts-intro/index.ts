import express from 'express';
import { calculateBmi, parseBmiArguments } from './bmiCalculator';
import { calculateExercises, parseExercisesArguments } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const heightInput = req.query.height;
  const weightInput = req.query.weight;

  if (!heightInput || !weightInput) {
    return res.status(400).json({ error: 'missing or malformatted parameters' });
  }

  try {
    const { height, weight } = parseBmiArguments(Number(heightInput), Number(weightInput));
    const bmi = calculateBmi(height, weight);
    return res.status(200).json({ height, weight, bmi });
  } catch (error: unknown) {
    let errorMessage = '';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.status(400).json({ error: errorMessage });
  }
});

app.post('/exercises', (req, res) => {
  // console.log(req.body)
  const exerciseHoursInput = req.body.exercise_hours;
  const targetInput = req.body.target;

  if (!exerciseHoursInput || !targetInput) {
    return res.status(400).json({ error: 'missing parameters' });
  }

  try {
    const { dailyExerciseHours, target } = parseExercisesArguments(exerciseHoursInput, Number(targetInput));
    const result = calculateExercises(dailyExerciseHours, target);
    return res.status(200).json({ result });
  } catch (error: unknown) {
    let errorMessage = '';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.status(400).json({ error: errorMessage });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
