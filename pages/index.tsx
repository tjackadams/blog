import { FunctionComponent } from "react";
import { Layout } from "../components/Layout/Layout";
import { GetStaticProps } from "next";
import { Post } from "./blog/post/Post.types";
import PostSection from "../components/PostSection/PostSection";

const importBlogPosts = async () => {
  const markdownFiles = require
    .context("../content/blogPosts", false, /\.md$/)
    .keys()
    .map((relativePath) => relativePath.substring(2));

  return Promise.all(
    markdownFiles.map(async (path) => {
      const markdown = await import(`../content/blogPosts/${path}`);
      return { ...markdown, slug: path.substring(0, path.length - 3) };
    })
  );
};

interface IHomeProps {
  posts: Post[];
}

const Home: FunctionComponent<IHomeProps> = ({ posts }) => {
  return (
    <Layout title="tjackadams blog">
      {!!posts.length && (
        <PostSection
          posts={posts}
          showLoadMore={true}
          loadMoreTitle="Load More"
          perPageLimit={12}
        />
      )}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = await importBlogPosts();

  return {
    props: {
      posts,
    },
  };
};

export default Home;
