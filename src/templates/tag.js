import { graphql } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";
import config from "../../data/SiteConfig";
import MainLayout from "../components/layout/main";
import PostListing from "../components/postListing/postListing";
import "./site.css";

const TagTemplate = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const postEdges = data.allMarkdownRemark.edges;
  return (
    <MainLayout>
      <div className="tag-container">
        <Helmet title={`Posts tagged as "${tag}" | ${config.siteTitle}`} />
        <div className="row first-page">
          <div className="col-lg-9 col-md-8 col-sm-12 landing-site">
            <PostListing postEdges={postEdges} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TagTemplate;

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            date
            description
            cover {
              alt
              title
              src {
                childImageSharp {
                  gatsbyImageData(layout: FULL_WIDTH)
                }
              }
            }
          }
        }
      }
    }
  }
`;
