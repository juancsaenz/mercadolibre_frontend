const authorMiddleware = (req, res, next) => {
    res.author = {
      name: 'Camilo',
      lastname: 'Saenz'
    };
    next();
  };
  
  module.exports = authorMiddleware;