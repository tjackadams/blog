import { Link } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";
import Footer from "../footer/footer";
import SocialInfo from "../social/socialInfo";

const PostLayout = ({ pageTitle, children }) => {
  return (
    <>
      <Helmet bodyAttributes={{ class: "custom-background" }}></Helmet>
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
            <div className="row justify-content-center">
              <div className="col-12 col-md-10 content-area">
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
