import { FunctionComponent } from "react";
import classNames from "classnames";
import { SocialLinks } from "../SocialLinks/SocialLinks";
import { Footer } from "..";

import styles from "./Layout.module.css";

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
          className={classNames(
            "row",
            "justify-content-md-center",
            styles.featuresection
          )}
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
