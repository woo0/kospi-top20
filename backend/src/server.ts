import express from 'express';
import cors from 'cors';
import { stockRoutes } from './routes/stockRoutes';

const app = express();
const PORT = parseInt(process.env.PORT || '8000', 10);

app.use(cors());
app.use(express.json());

app.use('/api/stocks', stockRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`Network access: http://192.168.0.142:${PORT}`);
});

export default app;