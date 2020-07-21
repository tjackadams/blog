import React, { useEffect, useState } from "react";
import { graphql, Link } from "gatsby";
import { FaGithub } from "react-icons/fa";
import { parseISO, format } from "date-fns";
import { Helmet } from "react-helmet";
import { PostLayout } from "../layout";
import config from "../../data/SiteConfig";
import { SEO } from "../components";

const PostTemplate = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const postNode = data.markdownRemark;
  const post = postNode.frontmatter;
  if (!post.id) {
    post.id = slug;
  }

  const [pageTitle, setPageTitle] = useState(config.siteTitle);

  useEffect(
    function setupListener() {
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
    },
    [post]
  );

  return (
    <PostLayout pageTitle={pageTitle}>
      <Helmet>
        <title>{`${post.title} | ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postPath={slug} postNode={postNode} postSEO />
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
            <div style={{ clear: "both", paddingBottom: "10px" }}></div>
            <div
              style={{ marginTop: "-24px", marginBottom: "28px" }}
              className="entry-meta"
            >
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
            <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
            <div className="row justify-content-center"></div>
            <div style={{ clear: "both", paddingBottom: "10px" }}></div>
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
                <Link to="/" className="no-underline" aria-label="Thomas Adams">
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
      </article>
    </PostLayout>
  );
};

/* eslint no-undef: "off" */
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
          }
        }
      }
      fields {
        slug
        date
      }
    }
  }
`;

export default PostTemplate;
