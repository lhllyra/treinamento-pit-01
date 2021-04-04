/* eslint-disable class-methods-use-this */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

const customMessage = 'An unexpected error occurred';
const saltRounds = 10;

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const handleErrors = async (res, error) => {
  if (process.env.NODE_ENV === 'dev') {
    return res.status(400).send({ message: error.message });
  }
  return res.status(400).send({ message: customMessage });
};

class User {
  async index(req, res) {
    const users = await UserModel.find();
    res.send({ data: users });
  }

  async store(req, res) {
    const { body } = req;

    if (body.password) {
      body.password = await hashPassword(body.password);
    }

    const user = await UserModel.create(body);
    res.send({ data: user });
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);
      res.send({ data: user });
    } catch (error) {
      handleErrors(res, error);
    }
  }

  async remove(req, res) {
    const { id } = req.params;
    try {
      const user = await UserModel.findById(id);

      if (!user) {
        return res.send({ message: 'User doest not exist.' });
      }

      await user.remove();
      return res.send({ message: 'User Removed' });
    } catch (error) {
      return handleErrors(res, error);
    }
  }

  async edit(req, res) {
    try {
      const { body, params: { id } } = req;

      if (body.password) {
        body.password = await hashPassword(body.password);
      }

      const user = await UserModel.findByIdAndUpdate(id, body, { new: true });
      res.send({ data: user });
    } catch (error) {
      handleErrors(res, error);
    }
  }

  async auth(req, res) {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email }).lean();
      if (!user) {
        throw new Error('User does not exist');
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        throw new Error('Invalid Password!');
      }
      const token = jwt.sign(user, process.env.JWT_SECRET);

      res.send({ token });
    } catch (error) {
      handleErrors(res, error);
    }
  }
}

module.exports = new User();
