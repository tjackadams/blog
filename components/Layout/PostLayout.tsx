import { FunctionComponent } from "react";
import { SocialLinks } from "../SocialLinks/SocialLinks";

export const PostLayout: FunctionComponent = ({ children }) => {
  return (
    <>
      <header className="site-header">
        <div className="outer site-nav-main">
          <div className="inner">
            <nav className="site-nav">
              <div className="site-nav-left-wrapper"></div>
              <div className="site-nav-right">
                <SocialLinks color="#262626" />
              </div>
            </nav>
          </div>
        </div>
      </header>
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
