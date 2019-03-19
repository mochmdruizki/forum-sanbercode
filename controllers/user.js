const User = require('../models').User;
var bcrypt = require('bcryptjs');

module.exports = {

  list(req, res) {
    return User
      .findAll({
        order : [
          ['id', 'DESC']
        ]
      })
      .then((users) => res.status(200).send(users))
      .catch((error) => res.status(400).send(error));
  },
  getById(req, res) {
    return User
      .findByPk(req.params.id, {})
      .then((user) => {
        if (!user) {
          return res.status(404).send({message: 'User not found'})
        }
        return res.status(200).send(user)
      })
      .catch((error) => res.status(400).send(error));
  },
  update(req, res) {
    // 
  },
  delete(req, res) {
    return User
      .findByPk(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({message: 'User not found'})
        }
        return user
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }

};