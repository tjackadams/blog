import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import { MainLayout } from "../layout";
import PostListing from "../components/PostListing/PostListing";
import config from "../../data/SiteConfig";

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

/* eslint no-undef: "off" */
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
                  fluid(maxWidth: 1200) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
