export interface IBlogger {
  id: number;
  name: string | null;
  youtubeUrl: string | null;
}

export interface IPost {
  id: number;
  title: string | null;
  shortDescription: string | null;
  content: string | null;
  bloggerId: number;
}

export interface IPostDto {
  id: number;
  title: string | null;
  shortDescription: string | null;
  content: string | null;
  bloggerId: number;
  bloggerName: string | null;
}

export interface IProblemDetails {
  type: string | null;
  title: string | null;
  status: number | null;
  detail: string | null;
  instance: string | null;
}