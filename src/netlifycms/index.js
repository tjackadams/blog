import CMS from "netlify-cms-app";

CMS.init({
  config: {
    backend: {
      name: "git-gateway",
    },
  },
});

CMS.registerPreviewStyle("../../node_modules/bootstrap/dist/css/bootstrap.css");
CMS.registerPreviewStyle("../layout/site.css");
