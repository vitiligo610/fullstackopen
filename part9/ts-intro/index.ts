import express from 'express';
import calculateBmi from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  // console.log(req.query)
  const queryParams = req.query;
  const height = Number(queryParams.height);
  const weight = Number(queryParams.weight);
  if (!height || !weight || isNaN(height) || isNaN(weight))
    return res.status(400).json({ error: 'malformatted parameters' });
  return res.status(200).json({ height, weight, bmi: calculateBmi(height, weight) });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
