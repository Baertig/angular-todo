import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./db/schema";

import { createApp } from "./app";

const port = Number(process.env.PORT) || 3000;

const db = drizzle({
  schema,
  connection: {
    connectionString: process.env.DATABASE_URL!,
    password: process.env.DATABASE_PASSWORD!,
  },
});

const app = createApp(db);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at http://localhost:${port}`);
});
