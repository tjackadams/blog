import { AppProps } from "next/app";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { DefaultSeo } from "next-seo";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";

config.autoAddCss = false;
library.add(faGithub, faTwitter, faLinkedinIn);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title="Thomas Adams - Coder"
        description=""
        canonical="https://blog.itadams.co.uk"
        openGraph={{
          site_name: "Thomas Adams",
          type: "website",
          title: "Thomas Adams",
          description: "",
          url: "https://blog.itadams.co.uk",
          images: [
            {
              url: "",
              width: 1,
              height: 1,
              alt: "",
            },
          ],
        }}
        twitter={{
          cardType: "summary_large_image",
          site: "@tjackadams",
          handle: "@tjackadams",
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
