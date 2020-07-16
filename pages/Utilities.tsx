import { Post } from "./blog/post/Post.types";

function getPosts(): Promise<Post[]> {
  const markdownFiles = require
    .context("../content/blogPosts", false, /\.md$/)
    .keys()
    .map((relativePath) => relativePath.substring(2));

  return Promise.all(
    markdownFiles.map(async (path) => {
      const markdown = (await import(`../content/blogPosts/${path}`)).default;

      return { ...markdown, slug: getSlug(path) };
    })
  );
}

function getSlug(name: string): string {
  return name.substring(0, name.length - 3);
}

export { getPosts };
