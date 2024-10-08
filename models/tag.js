const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  tagName: { type: String, required: true },
});

tagSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.tagId = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
