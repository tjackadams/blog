import CMS from "netlify-cms-app";

CMS.init({
  config: {
    backend: {
      name: "git-gateway",
    },
  },
});

CMS.registerPreviewStyle("../layout/site.css");
