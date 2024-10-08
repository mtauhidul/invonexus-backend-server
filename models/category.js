const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
});

categorySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.categoryId = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
