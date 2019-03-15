const User = require('../models').User;
var bcrypt = require('bcryptjs');

module.exports = {
  register(req, res) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    return User
      .findAll({
        where: {email: req.body.email}
      })
      .then((users) => {
        if (users.length > 0) {
          return res.status(404).send({message: 'Email already taken'})
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
}