const debug = process.env.NODE_ENV !== "production";

module.exports = {
  basePath: debug ? "" : "/codenames",
  assetPrefix: debug ? "" : "/codenames/",
  env: {
    prefix: debug ? "" : "/codenames",
  },
};
