import { FunctionComponent } from "react";
import { SocialLinks } from "../SocialLinks/SocialLinks";

interface IPostLayoutProps {
  title: string;
}

export const PostLayout: FunctionComponent<IPostLayoutProps> = ({
  title,
  children,
}) => {
  return (
    <>
      <nav className="site-header sticky-top">
        <div className="outer site-nav-main">
          <div className="inner">
            <nav className="site-nav">
              <div className="site-nav-left-wrapper">
                <div className="site-nav-left">
                  <div className="site-nav-content">
                    <span className="nav-post-title">{title}</span>
                  </div>
                </div>
              </div>
              <div className="site-nav-right">
                <SocialLinks color="#262626" />
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
    </>
  );
};
