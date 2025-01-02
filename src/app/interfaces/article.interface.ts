export interface IArticle {
  _id: string;
  mainHeading: string;
  intro: string;
  sections: {
    subHeading: string;
    content: string;
  }[];
  author: string;
  tags: string[];
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}
