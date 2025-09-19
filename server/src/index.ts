import express, { Request, Response } from 'express';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the server!' });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at http://localhost:${port}`);
});
