import { IBlogger, IPost } from './types';


export const bloggers: IBlogger[] = [
  { id: 1, name: 'Ivan', youtubeUrl: 'someUrl' },
  { id: 2, name: 'Petr', youtubeUrl: 'someUrl' },
  { id: 3, name: 'Sasha', youtubeUrl: 'someUrl' },
  { id: 4, name: 'Egor', youtubeUrl: 'someUrl' },
  { id: 5, name: 'Sergey', youtubeUrl: 'someUrl' },
];

export const posts: IPost[] = [
  {
    id: 1,
    title: 'some title',
    shortDescription: 'some description',
    content: 'some content',
    bloggerId: 1,
  },
];