import { FunctionComponent } from "react";
import { GetStaticProps } from "next";
import { Post } from "./Post.types";
import { getPosts } from "./Utilities";
import { Layout, PostSection } from "../components";

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
