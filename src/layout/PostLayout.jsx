import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "gatsby";
import { Footer, SocialInfo } from "../components";

import "./site.css";

const PostLayout = ({ pageTitle, children }) => {
  return (
    <>
      <Helmet bodyAttributes={{ class: "custom-background" }}>
        <html lang="en-gb" />
      </Helmet>
      <nav className="site-header sticky-top">
        <div className="outer site-nav-main">
          <div className="inner">
            <nav className="site-nav">
              <div className="site-nav-left-wrapper">
                <div className="site-nav-left">
                  <div className="site-nav-content">
                    <div className="nav-post-title-wrapper">
                      <span className="nav-post-title">
                        <Link to="/" title="Home">
                          {pageTitle}
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="site-nav-right">
                <SocialInfo color="#262626" />
              </div>
            </nav>
          </div>
        </div>
      </nav>
      <div>
        <div className="wrapper">
          <div className="container" tabIndex={-1}>
            <div className="row">
              <div className="col-md content-area">
                <main className="site-main">{children}</main>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default PostLayout;
