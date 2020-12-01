const debug = process.env.NODE_ENV !== "production";

module.exports = {
  // basePath: "/codenames",
  assetPrefix: debug ? "" : "/codenames/",
};
