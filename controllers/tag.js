const express = require('express');
const Tag = require('../models/tag');

const tagRouter = express.Router();

const getTags = async (request, response) => {
  const tags = await Tag.find({});
  response.json(tags.map((tag) => tag.toJSON()));
};

const getTagById = async (request, response) => {
  const tag = await Tag.findById(request.params.id);
  tag ? response.json(tag.toJSON()) : response.status(404).end();
};

const createTag = async (request, response) => {
  const tag = new Tag(request.body);
  const savedTag = await tag.save();
  response.json(savedTag.toJSON());
};

const deleteTag = async (request, response) => {
  const res = await Tag.findByIdAndRemove(request.params.id);
  res ? response.status(204).end() : response.status(404).end();
};

const updateTag = async (request, response) => {
  const updatedTag = await Tag.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  );

  updatedTag
    ? response.json(updatedTag.toJSON())
    : response.status(404).json({ error: 'Tag not found' });
};

tagRouter.get('/', getTags);
tagRouter.get('/:id', getTagById);
tagRouter.post('/', createTag);
tagRouter.delete('/:id', deleteTag);
tagRouter.put('/:id', updateTag);

module.exports = tagRouter;
