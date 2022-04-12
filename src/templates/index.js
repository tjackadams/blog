import classNames from "classnames";
import { graphql, Link } from "gatsby";
import { GatsbySeo } from "gatsby-plugin-next-seo";
import React from "react";
import { Helmet } from "react-helmet";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import config from "../../data/SiteConfig";
import MainLayout from "../components/layout/main";
import PostListing from "../components/postListing/postListing";

const IndexPage = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <>
      <GatsbySeo
        openGraph={{
          images: [
            {
              url: new URL(config.siteLogo, config.siteUrl),
              width: 1024,
              height: 683,
              alt: config.siteTitle,
            },
          ],
        }}
      />
      <MainLayout>
        <Helmet>
          <meta
            name="google-site-verification"
            content="-dh3TAutR78VWqsTlt9useg3t40RPD4G-zYlU2DjIAU"
          />
        </Helmet>
        <div className="row first-page">
          <div className="col-lg-12 col-md-12 col-sm-12 landing-site">
            {!!posts.length && <PostListing postEdges={posts} />}
            {renderPaging(pageContext)}
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default IndexPage;

const renderPaging = (pageContext) => {
  const { currentPageNum, pageCount } = pageContext;
  const prevPage = currentPageNum - 1 === 1 ? "/" : `/${currentPageNum - 1}/`;
  const nextPage = `/${currentPageNum + 1}/`;
  const isFirstPage = currentPageNum === 1;
  const isLastPage = currentPageNum === pageCount;

  return (
    <nav aria-label="Post Navigation">
      <ul className="pagination2">
        {!isFirstPage && (
          <li className="page-item2">
            <Link className="prev2 page-link2" to={prevPage}>
              <FaChevronLeft color="#0067b8" />
              <span className="screen-reader-text-pagination">
                Previous Page
              </span>
            </Link>
          </li>
        )}
        {[...Array(pageCount)].map((_val, index) => {
          const pageNum = index + 1;
          const isCurrent = pageNum === currentPageNum;

          return (
            <li
              key={`listing-page-${pageNum}`}
              className={classNames("page-item2", { active: isCurrent })}
            >
              {isCurrent ? (
                <span aria-current="page" className="page-link2 current">
                  <span className="screen-reader-text-pagination">Page</span>{" "}
                  {pageNum}
                </span>
              ) : (
                <Link
                  className="page-link2"
                  to={pageNum === 1 ? "/" : `/${pageNum}/`}
                >
                  <span className="screen-reader-text-pagination">Page</span>{" "}
                  {pageNum}
                </Link>
              )}
            </li>
          );
        })}
        {!isLastPage && (
          <li className="page-item2">
            <Link className="next2 page-link2" to={nextPage}>
              <FaChevronRight color="#0067b8" />
              <span className="screen-reader-text-pagination">Next Page</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export const query = graphql`
  query HomePageQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
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
