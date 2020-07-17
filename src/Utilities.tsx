import { Post } from "./types/Post.types";

async function getPosts() {
  const markdownFiles = require
    .context("../content/blogPosts", false, /\.md$/)
    .keys()
    .map((relativePath) => relativePath.substring(2));

  var files = await Promise.all(
    markdownFiles.map(async (path) => {
      const markdown = (await import(`../content/blogPosts/${path}`)).default;

      return { ...markdown, slug: getSlug(path) } as Post;
    })
  );

  return files
    .slice()
    .sort((a: Post, b: Post) =>
      Math.abs(
        new Date(b.attributes.date).getTime() -
          new Date(a.attributes.date).getTime()
      )
    );
}

function getSlug(name: string): string {
  return name.substring(0, name.length - 3);
}

export { getPosts };
