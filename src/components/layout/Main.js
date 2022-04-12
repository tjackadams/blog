import { graphql, Link, useStaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import { getImage } from "gatsby-plugin-image";
import { convertToBgImage } from "gbimage-bridge";
import React from "react";
import { Helmet } from "react-helmet";
import config from "../../../data/SiteConfig";
import SocialInfo from "../social/socialInfo";

const MainLayout = ({ children, subTitle }) => {
  const { graphBanner } = useStaticQuery(
    graphql`
      query HeaderQuery {
        graphBanner: file(relativePath: { eq: "assets/header.png" }) {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    `
  );

  const image = getImage(graphBanner);

  const banner = convertToBgImage(image);
  return (
    <>
      <Helmet bodyAttributes={{ class: "custom-background" }}></Helmet>

      <div className="container-fluid">
        <div className="wrapper" id="index-wrapper" style={{ padding: "0" }}>
          <BackgroundImage
            tag="div"
            className="row justify-content-md-center featuresection"
            {...banner}
            id="featuredone"
          >
            <div className="col-12">
              <div className="inner">
                <div className="site-nav-right">
                  <SocialInfo color="#FFFFFF" />
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div
                    className="col-sm-12 col-md-10 herocontent"
                    style={{ opacity: "100%" }}
                  >
                    <Link to="/">
                      <h1
                        className="herotitle text-md-left"
                        style={{ color: "#FFFFFF" }}
                      >
                        {config.siteTitle} <br />
                        {subTitle ? (
                          <small className="text-muted">{subTitle}</small>
                        ) : null}
                      </h1>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </BackgroundImage>
          <div className="row">
            <div className="col-12">
              <div className="container">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
