const mongoose = require('mongoose');

const lineItemSchema = new mongoose.Schema({
  description: String,
  quantity: Number,
  unit_price: Number,
});

const documentSchema = new mongoose.Schema({
  customer_address: String,
  customer_company_registrations: [String],
  customer_name: String,
  date: String,
  document_type: String,
  due_date: String,
  invoice_number: String,
  line_items: [lineItemSchema],
  locale: {
    currency: String,
    language: String,
  },
  reference_numbers: [String],
  supplier_address: String,
  supplier_company_registrations: [String],
  supplier_name: String,
  supplier_payment_details: [String],
  taxes: [Number],
  total_amount: Number,
  total_net: Number,
  category: String,
  status: String,
  tag: String,
  document_url: String,
});

documentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
