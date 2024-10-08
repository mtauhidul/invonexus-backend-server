const express = require('express');
const Category = require('../models/category');

const categoryRouter = express.Router();

const getCategories = async (request, response) => {
  const categories = await Category.find({});
  response.json(categories.map((category) => category.toJSON()));
};

const getCategoryById = async (request, response) => {
  const category = await Category.findById(request.params.id);
  category ? response.json(category.toJSON()) : response.status(404).end();
};

const createCategory = async (request, response) => {
  const category = new Category(request.body);
  const savedCategory = await category.save();
  response.json(savedCategory.toJSON());
};

const deleteCategory = async (request, response) => {
  const res = await Category.findByIdAndRemove(request.params.id);
  res ? response.status(204).end() : response.status(404).end();
};

const updateCategory = async (request, response) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  );

  updatedCategory
    ? response.json(updatedCategory.toJSON())
    : response.status(404).json({ error: 'Category not found' });
};

categoryRouter.get('/', getCategories);
categoryRouter.put('/:id', updateCategory);
categoryRouter.get('/:id', getCategoryById);
categoryRouter.post('/', createCategory);
categoryRouter.delete('/:id', deleteCategory);

module.exports = categoryRouter;
