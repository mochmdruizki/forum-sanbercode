// const Question = require('../models').Question;
const User = require('../models').User;

module.exports = {

  list(req, res) {
    return User
      .findAll({})
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
  add(req, res) {
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
            password: req.body.password
          })
          .then((user) => res.status(201).send(user))
          .catch((error) => res.status(400).send(error))
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
  },
  login(req, res) {

  }

};