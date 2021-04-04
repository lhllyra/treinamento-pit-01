/* eslint-disable class-methods-use-this */
const TodoModel = require('../models/todo.model');

const handleErrors = async (res, error) => {
  if (process.env.NODE_ENV === 'dev') {
    return res.status(400).send({ message: error.message });
  }
  return res.status(400).send({ message: 'An unexpected error occurred' });
};

class Todo {
  async index(req, res) {
    const { _id: userId } = req.headers.loggedUser;
    const todo = await TodoModel.find({ userId });
    res.send({ data: todo });
  }

  async store(req, res) {
    const { body } = req;
    const { _id: userId } = req.headers.loggedUser;

    const todo = await TodoModel.create({ ...body, userId });

    res.send({ data: todo });
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const todo = await TodoModel.findById(id);
      res.send({ todo });
    } catch (error) {
      handleErrors(res, error);
    }
  }

  async remove(req, res) {
    const { id } = req.params;
    try {
      const todo = await TodoModel.findById(id);

      if (!todo) {
        return res.send({ message: 'Todo doest not exist.' });
      }

      await todo.remove();
      return res.send({ message: 'Todo Removed' });
    } catch (error) {
      return handleErrors(res, error);
    }
  }

  async edit(req, res) {
    try {
      const { body, params: { id } } = req;

      const todo = await TodoModel.findByIdAndUpdate(id, body, { new: true });
      res.send({ data: todo });
    } catch (error) {
      handleErrors(res, error);
    }
  }
}

module.exports = new Todo();
