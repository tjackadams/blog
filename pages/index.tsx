import { FunctionComponent } from "react";
import { Layout } from "../components/Layout/Layout";
import { GetStaticProps } from "next";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { Post } from "./blog/post/Post.types";

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
  postsList: Post[];
}

const Home: FunctionComponent<IHomeProps> = ({ postsList }) => {
  return (
    <Layout title="tjackadams blog">
      <div className="row first-page x-hidden-focus">
        <div className="col-lg-9 col-md-8 col-sm-12 landing-site">
          {postsList.map((post) => {
            return (
              <article key={post.slug} className="landing-main">
                <div className="row post-card">
                  <div className="entry-image col-lg-4 col-md-12">
                    <div>
                      <img
                        className="lp-default-image"
                        src={post.attributes.thumbnail}
                      />
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-12 post-card-header">
                    <h5 className="entry-title">
                      <Link
                        href="/blog/post/[slug]"
                        as={`/blog/post/${post.slug}`}
                      >
                        <a rel="bookmark">{post.attributes.title}</a>
                      </Link>
                    </h5>
                    <div className="entry-meta desktop-view x-hidden-focus">
                      <span className="entry-avatar">
                        <span className="entry-author-link">
                          <a
                            href="/"
                            title="Posts by Thomas Adams"
                            rel="author"
                            className=" x-hidden-focus"
                          >
                            Thomas Adams
                          </a>
                        </span>
                      </span>
                      <span className="entry-post-date x-hidden-focus">
                        {format(
                          parseISO(post.attributes.date),
                          "MMMM dd, yyyy"
                        )}
                      </span>
                    </div>
                    <p className="land-desc">{post.attributes.description}</p>
                  </div>
                </div>
                <hr className="tag_separator" />
                <div className="row col-lg-12 cat-section flex-row-reverse">
                  <div className="col-lg-8 post-cards-tags-categories">
                    <div className="post-categories-tags">
                      {post.attributes.tags &&
                        post.attributes.tags.map((tag) => (
                          <a
                            key={tag}
                            href=""
                            className="btn-sm cat-comment-tags post-tags"
                          >
                            {tag}
                          </a>
                        ))}
                    </div>
                  </div>
                  <div className="col-lg-4 category-name"></div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const postsList = await importBlogPosts();

  return {
    props: {
      postsList,
    },
  };
};

export default Home;
