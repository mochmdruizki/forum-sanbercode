const jwt = require('jsonwebtoken');
const User = require('../models').User;

function auth(req, res, next) {
  var token = req.headers.token;
  if (token) {
    jwt.verify(token, 'secretKey', function(err, decoded) {
      if (err) {
        res.status(400).json({err});
      } else {
        User.findByPk(decoded.id)
          .then((user) => {
            if (user) {
              req.currentUser = decoded
              next();
            } else {
              res.status(400).json({message: 'User is not valid'});
            }
          })
          .catch(function(err) {
            res.status(400).json(err);
          })
      }
    })
    
  } else {
    res.status(400).json({error: 'Token must provided'});
  }
}

module.exports = auth;