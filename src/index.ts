import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { BloggersController, PostsController } from './controllers';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app
  .get('/', (req, res) => {
    res.send('hello')
  })
  .get('/hs_01/api/bloggers', BloggersController.getBloggers)
  .post('/hs_01/api/bloggers', BloggersController.createBlogger)
  .get('/hs_01/api/bloggers/:id', BloggersController.getBlogger)
  .put('/hs_01/api/bloggers/:id', BloggersController.updateBlogger)
  .delete('/hs_01/api/bloggers/:id', BloggersController.deleteBlogger)
  .get('/hs_01/api/posts', PostsController.getPosts)
  .post('/hs_01/api/posts', PostsController.createPost)
  .get('/hs_01/api/posts/:id', PostsController.getPost)
  .put('/hs_01/api/posts/:id', PostsController.updatePost)
  .delete('/hs_01/api/posts/:id', PostsController.deletePost);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});