export interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  authorEmail: string;
  publishedAt: number;
  excerpt?: string;
  coverImage?: string;
}
