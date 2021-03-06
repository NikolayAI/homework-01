import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { bloggersRouter } from './routes/bloggers.router';
import { postsRouter } from './routes/posts.router';
import { runDb } from './repositories/db';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/bloggers', bloggersRouter);
app.use('/posts', postsRouter);

const startApp = async () => {
  await runDb();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startApp();