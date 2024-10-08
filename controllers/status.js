const express = require('express');
const Status = require('../models/status');

const statusRouter = express.Router();

const getStatuses = async (request, response) => {
  const statuses = await Status.find({});
  response.json(statuses.map((status) => status.toJSON()));
};

const getStatusById = async (request, response) => {
  const status = await Status.findById(request.params.id);
  status ? response.json(status.toJSON()) : response.status(404).end();
};

const createStatus = async (request, response) => {
  const status = new Status(request.body);
  const savedStatus = await status.save();
  response.json(savedStatus.toJSON());
};

const deleteStatus = async (request, response) => {
  const res = await Status.findByIdAndRemove(request.params.id);
  res ? response.status(204).end() : response.status(404).end();
};

const updateStatus = async (request, response) => {
  const updatedStatus = await Status.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  );

  updatedStatus
    ? response.json(updatedStatus.toJSON())
    : response.status(404).json({ error: 'Status not found' });
};

statusRouter.get('/', getStatuses);
statusRouter.get('/:id', getStatusById);
statusRouter.post('/', createStatus);
statusRouter.delete('/:id', deleteStatus);
statusRouter.put('/:id', updateStatus);

module.exports = statusRouter;
