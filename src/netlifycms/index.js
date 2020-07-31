import CMS from "netlify-cms-app";

import "bootstrap/dist/css/bootstrap.css";
import "../layout/site.css";

CMS.init({
  config: {
    backend: {
      name: "git-gateway",
    },
  },
});
