import express, { Request, Response } from 'express';
import { setupToDoController } from './todo/todo-controller';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json()); // <-- enables parsing application/json bodies

setupToDoController(app);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at http://localhost:${port}`);
});
