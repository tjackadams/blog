import { format, parseISO } from "date-fns";
import { graphql, Link, StaticQuery } from "gatsby";
import React from "react";
import config from "../../../data/SiteConfig";

const ReadNext = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark(
            limit: 2
            sort: { order: DESC, fields: frontmatter___date }
          ) {
            edges {
              node {
                frontmatter {
                  title
                  description
                  date
                  cover {
                    alt
                    title
                    src {
                      childImageSharp {
                        fluid(maxWidth: 1200) {
                          ...GatsbyImageSharpFluid_withWebp
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
          }
        }
      `}
      render={(data) => {
        return (
          <div className="related-postssection">
            <h5>Read Next</h5>
            <div className="row related-articles">
              {data.allMarkdownRemark.edges.map(({ node }) => (
                <article key={node.fields.slug} className="col-md-6">
                  <div className="post-card">
                    <Link to={node.fields.slug} className="article-title">
                      {node.frontmatter.title}
                    </Link>
                    <div className="post-desc">
                      {node.frontmatter.description}
                    </div>
                    <div className="author-details">
                      <Link to="/">
                        <span className="avatar-img">
                          <img
                            src="https://secure.gravatar.com/avatar/1b6126e7eda7d78050b05080b32506b9?s=100&d=mm&r=g"
                            width={100}
                            height={100}
                            alt="Avatar"
                            className="avatar avatar-100 wp-user-avatar wp-user-avatar-100 photo avatar-default"
                          />
                        </span>
                        <span className="author-name">Thomas Adams</span>
                        <span className="post-date">
                          {format(
                            parseISO(node.frontmatter.date),
                            config.dateFormat
                          )}
                        </span>
                      </Link>
                    </div>
                    <div className="post-comments"></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        );
      }}
    />
  );
};

export default ReadNext;
