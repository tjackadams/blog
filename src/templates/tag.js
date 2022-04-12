import { graphql } from "gatsby";
import { GatsbySeo } from "gatsby-plugin-next-seo";
import React from "react";
import MainLayout from "../components/layout/main";
import PostListing from "../components/postListing/postListing";

const TagTemplate = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const postEdges = data.allMarkdownRemark.edges;
  const title = `Posts tagged as "${tag}"`;
  return (
    <>
      <GatsbySeo title={title} />
      <MainLayout subTitle={title}>
        <div className="row justify-content-center first-page">
          <div className="col-12 col-md-10 landing-site">
            <PostListing postEdges={postEdges} />
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default TagTemplate;

export const pageQuery = graphql`
  query TagQuery($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
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
