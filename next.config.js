const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");

module.exports = withPlugins(
  [[optimizedImages, { optimizeImagesInDev: true }]],
  {
    webpack: (configuration) => {
      configuration.module.rules.push({
        test: /\.md$/,
        use: "frontmatter-markdown-loader",
      });
      return configuration;
    },
  }
);
