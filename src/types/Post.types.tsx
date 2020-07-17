export type Post = {
  attributes: {
    featured_image: {
      src: string;
      alt: string;
      title: string;
    };
    title: string;
    date: string;
    description: string;
    tags: string[];
  };
  slug: string;
  html: string;
};
