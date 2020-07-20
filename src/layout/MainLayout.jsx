import React from "react";
import { Helmet } from "react-helmet";
import { graphql, StaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import config from "../../data/SiteConfig";

import { Footer, SocialInfo } from "../components";

import "./site.css";

const MainLayout = ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          desktop: file(relativePath: { eq: "assets/header.png" }) {
            childImageSharp {
              fluid(quality: 90, maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      `}
      render={(data) => {
        const imageData = data.desktop.childImageSharp.fluid;

        return (
          <>
            <Helmet bodyAttributes={{ class: "custom-background" }} />
            <div className="container-fluid">
              <div
                className="wrapper"
                id="index-wrapper"
                style={{ padding: "0" }}
              >
                <BackgroundImage
                  tag="div"
                  className="row justify-content-md-center featuresection"
                  fluid={imageData}
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
            <Footer />
          </>
        );
      }}
    />
  );
};

export default MainLayout;
