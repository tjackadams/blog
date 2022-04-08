class urlHelper {
  static addTrailingSlash(rawUrl) {
    const url = new URL(rawUrl);
    url.pathname += url.pathname.endsWith("/") ? "" : "/";
    return url.toString();
  }
}

export default urlHelper;
