import { graphql, useStaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import { getImage } from "gatsby-plugin-image";
import { convertToBgImage } from "gbimage-bridge";
import React from "react";
import config from "../../../data/SiteConfig";
import SocialInfo from "../social/socialInfo";

const MainLayout = ({ children }) => {
  const { graphBanner } = useStaticQuery(
    graphql`
      query {
        banner: file(relativePath: { eq: "assets/header.png" }) {
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
    <div className="container-fluid">
      <div className="wrapper" id="index-wrapper" style={{ padding: "0" }}>
        <BackgroundImage
          tag="div"
          className="row justify-content-md-center featuresection"
          {...banner}
          id="featuredone"
        >
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
                <h1
                  className="herotitle text-md-left"
                  style={{ color: "#FFFFFF" }}
                >
                  {config.siteTitle}
                </h1>
              </div>
            </div>
          </div>
        </BackgroundImage>
        <div className="container">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
