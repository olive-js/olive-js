exports.get = {
  handler: {
    directory: {
      path: __dirname+'/../ui/dist',
      listing: true,
      defaultExtension: 'html'
    }
  }
};
