const express = require('express');
const Document = require('../models/document');

const documentRouter = express.Router();

const getDocuments = async (request, response) => {
  const documents = await Document.find({});
  response.json(documents.map((document) => document.toJSON()));
};

const getDocumentById = async (request, response) => {
  const document = await Document.findById(request.params.id);
  document ? response.json(document.toJSON()) : response.status(404).end();
};

const createDocument = async (request, response) => {
  const document = new Document(request.body);
  const savedDocument = await document.save();
  response.json(savedDocument.toJSON());
};

const deleteDocument = async (request, response) => {
  await Document.findByIdAndRemove(request.params.id);
  response.status(204).end();
};

const updateDocument = async (request, response) => {
  const updatedDocument = await Document.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  );
  response.json(updatedDocument.toJSON());
};

const queryDocuments = async (request, response) => {
  const supplierName = request.query.supplier_name;
  const supplier = await Document.findOne({ supplier_name: supplierName });

  if (supplier) {
    response.json(supplier.toJSON());
  } else {
    response.status(404).end();
  }
};

documentRouter.get('/', getDocuments);
documentRouter.post('/', createDocument);
documentRouter.get('/query', queryDocuments);
documentRouter.get('/:id', getDocumentById);
documentRouter.delete('/:id', deleteDocument);
documentRouter.put('/:id', updateDocument);

module.exports = documentRouter;

module.exports = documentRouter;
