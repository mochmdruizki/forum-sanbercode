const User = require('../models').User;
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports = {
  register(req, res) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    return User
      .findOne({
        where: {email: req.body.email}
      })
      .then((user) => {
        if (user) {
          return res.status(400).send({message: 'Email already taken'})
        }
        return User
          .create({
            name: req.body.name,
            email: req.body.email,
            password: hash
          })
          .then((user) => res.status(201).send(user))
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error));
  },
  login(req, res) {
    return User
      .findOne({
        where: {email: req.body.email}
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({message: 'Invalid email'})
        } else {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            var data = { id: user.id, email: user.email };
            var token = jwt.sign(data, 'secretKey');
            res.status(200).json({token: token});
          } else {
            res.status(400).json({error: 'Invalid password'});
            
          }
        }
      })
      .catch((error) => res.status(400).send(error));
  }

}