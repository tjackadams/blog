import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";
import { SocialLinks } from "../SocialLinks/SocialLinks";
import { Footer } from "..";

interface ILayoutProps {
  title: string;
}

export const Layout: FunctionComponent<ILayoutProps> = ({
  title,
  children,
}) => (
  <>
    <div className="container-fluid">
      <div className="wrapper" id="index-wrapper" style={{ padding: "0" }}>
        <div
          className="row justify-content-md-center featuresection"
          style={{
            backgroundImage: `url("/static/img/header.png")`,
            opacity: ".98",
          }}
        >
          <div className="inner">
            <div className="site-nav-right">
              <SocialLinks color="#FFFFFF" />
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div
                className="col-sm-12 col-md-10 herocontent x-hidden-focus"
                style={{ opacity: "100%" }}
              >
                <h1
                  className="herotitle text-md-left x-hidden-focus"
                  style={{ color: "#FFFFFF" }}
                >
                  {title}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container">{children}</div>
      </div>
    </div>
    <Footer />
  </>
);
