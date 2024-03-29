import { format, parseISO } from "date-fns";
import { graphql, Link } from "gatsby";
import { GatsbySeo } from "gatsby-plugin-next-seo";
import kebabcase from "lodash.kebabcase";
import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import config from "../../data/SiteConfig";
import Disqus from "../components/disqus/disqus";
import PostLayout from "../components/layout/post";
import ReadNext from "../components/readNext/readNext";
import SocialIconBar from "../components/socialIconBar/socialIconBar";

const PostPage = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const postNode = data.markdownRemark;
  const post = postNode.frontmatter;
  if (!post.id) {
    post.id = slug;
  }

  const [pageTitle, setPageTitle] = useState(config.siteTitle);

  useEffect(() => {
    function handleScroll() {
      if (
        document.body.scrollTop > 150 ||
        document.documentElement.scrollTop > 150
      ) {
        setPageTitle(post.title);
      } else {
        setPageTitle(config.siteTitle);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return function cleanupListener() {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [post]);

  const coverImage = post.cover.src.childrenImageSharp[0];

  return (
    <>
      <GatsbySeo
        title={post.title}
        description={post.description}
        openGraph={{
          title: post.title,
          description: post.description ? post.description : post.excerpt,
          url: new URL(slug, config.siteUrl).toString(),
          type: "article",
          article: {
            publishedTime: post.date,
            authors: [config.userName],
            tags: post.tags,
          },
          images: [
            {
              alt: post.cover.alt,
              url: post.cover.src.publicURL,
              width: coverImage.original.width,
              height: coverImage.original.height,
            },
          ],
        }}
      />

      <div className="social-icon-bar">
        <SocialIconBar title={post.title} />
      </div>

      <PostLayout pageTitle={pageTitle}>
        <article style={{ marginBottom: "20px" }}>
          <div className="row justify-content-center postcontent">
            <div className="entry-content col-12">
              <h1 className="entry-title">{post.title}</h1>
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <div style={{ margin: "20px 0", textAlign: "center" }}>
                    <img
                      src="https://secure.gravatar.com/avatar/1b6126e7eda7d78050b05080b32506b9?s=58&d=mm&r=g"
                      width="58"
                      height="58"
                      alt="Avatar"
                      className="avatar"
                    />
                    <p style={{ fontSize: "20px" }}>Thomas</p>
                  </div>
                </div>
              </div>
              <div style={{ clear: "both", paddingBottom: "10px" }} />
              <div className="entry-meta entry-meta-layout">
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    color: "#616161",
                  }}
                >
                  {format(parseISO(post.date), config.dateFormat)}
                  &nbsp;
                  <span className="entry-meta-reading-time">
                    <span className="bull">&bull;</span>
                    &nbsp;
                    {postNode.timeToRead} min read
                  </span>
                </p>
              </div>
              <div className="social-icon-bar-mobile row justify-content-center">
                <SocialIconBar title={post.title} />
              </div>
              <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
              <div className="row justify-content-center" />
              <div style={{ clear: "both", paddingBottom: "10px" }} />
              <div
                className="authorinfoarea"
                style={{
                  margin: "30px 0",
                  padding: "24px 0",
                  borderTop: "1px #A6A6A6 solid",
                }}
              >
                <div
                  className="post-authoravatar"
                  style={{ float: "left", marginRight: "20px" }}
                >
                  <img
                    src="https://secure.gravatar.com/avatar/1b6126e7eda7d78050b05080b32506b9?s=96&d=mm&r=g"
                    width={96}
                    height={96}
                    alt="Avatar"
                    className="avatar avatar-96 wp-user-avatar wp-user-avatar-96 photo avatar-default"
                  />
                </div>
                <h5 className="post-authorname">
                  <Link
                    to="/"
                    className="no-underline"
                    aria-label="Thomas Adams"
                  >
                    {config.userName}
                  </Link>
                </h5>
                <div>
                  <p>Software Developer</p>
                  <p>
                    <strong>Follow </strong>
                    <a
                      className="no-underline stayinformed"
                      aria-label="Thomas Adams GitHub profile"
                      target="_blank"
                      rel="noreferrer"
                      href="https://github.com/tjackadams"
                    >
                      <FaGithub />
                    </a>
                  </p>
                  <div style={{ clear: "both" }} />
                </div>
              </div>
            </div>
          </div>
          <footer className="row cattagsarea">
            <div className="col-12">
              <span className="tags-links">
                Tagged
                {post.tags &&
                  post.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/tags/${kebabcase(tag)}`}
                      rel="tag"
                      className="ms-2"
                    >
                      {tag}
                    </Link>
                  ))}
              </span>
            </div>
          </footer>
        </article>
        <ReadNext />
        <Disqus postNode={postNode} />
      </PostLayout>
    </>
  );
};

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        date
        description
        tags
        cover {
          alt
          title
          src {
            publicURL
            childrenImageSharp {
              original {
                width
                height
              }
            }
          }
        }
      }
      fields {
        slug
      }
    }
  }
`;

export default PostPage;
