import { MongoClient } from 'mongodb';
import dotenv from "dotenv"
import { IBlogger, IPost } from './types';

dotenv.config()

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/?maxPoolSize=20&w=majority';

export const client = new MongoClient(mongoUri);
export const bloggers = client.db('hw1').collection<IBlogger>('bloggers');
export const posts = client.db('hw1').collection<IPost>('posts');

export const runDb = async () => {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db('products').command({ ping: 1 });
    console.log('Connected successfully to mongo server');

  } catch {
    console.log('Failed connects to mongo server');
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
