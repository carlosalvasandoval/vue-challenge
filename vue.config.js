module.exports = {
  publicPath: '',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/main.scss";`
      }
    }
  }
};
