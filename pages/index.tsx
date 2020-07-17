import { FunctionComponent } from "react";
import { GetStaticProps } from "next";
import { Post } from "../src/types/Post.types";
import { getPosts } from "../src/Utilities";
import { Layout, PostSection } from "../src/components";

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
