import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import { MainLayout } from "../layout";
import PostListing from "../components/PostListing/PostListing";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";

class Landing extends React.Component {
  render() {
    const postEdges = this.props.data.allMarkdownRemark.edges;
    return (
      <MainLayout>
        <Helmet title={config.siteTitle} />
        <SEO />
        <div className="row first-page">
          <div className="col-lg-9 col-md-8 col-sm-12 landing-site">
            <PostListing postEdges={postEdges} />
          </div>
        </div>
      </MainLayout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query LandingQuery {
    allMarkdownRemark(sort: { fields: [fields___date], order: DESC }) {
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

export default Landing;
