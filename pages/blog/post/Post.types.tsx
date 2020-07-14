export type Post = {
  attributes: {
    thumbnail: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
  };
  slug: string;
  html: string;
};
