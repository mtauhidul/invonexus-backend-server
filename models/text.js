const mongoose = require('mongoose');

const textSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const Text = mongoose.model('Text', textSchema);

module.exports = Text;
