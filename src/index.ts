import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { bloggersRouter } from './routes/bloggers.router';
import { postsRouter } from './routes/posts.router';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app
  .get('/', (req, res) => {
    res.send('hello');
  });
app.use('/bloggers', bloggersRouter);
app.use('/posts', postsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});