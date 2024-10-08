const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  statusName: { type: String, required: true },
});

statusSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.statusId = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Status = mongoose.model('Status', statusSchema);

module.exports = Status;
