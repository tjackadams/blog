import { FunctionComponent } from "react";
import { Layout } from "../components/Layout/Layout";
import { GetStaticProps } from "next";
import { Post } from "./blog/post/Post.types";
import PostSection from "../components/PostSection/PostSection";
import { getPosts } from "./Utilities";

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
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
};

export default Home;
