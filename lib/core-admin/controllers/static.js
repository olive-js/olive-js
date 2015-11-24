exports.get = {
  handler: {
    directory: {
      path: __dirname+'/../public/dist',
      listing: true,
      defaultExtension: 'html'
    }
  }
};
