exports.get = {
  handler: {
    directory: {
      path: __dirname+'/../gr-site/build',
      listing: true,
      defaultExtension: 'html'
    }
  }
};
