import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

import diagnosisRouter from './routes/diagnosis';
import patientRouter from './routes/patient';

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});