const express = require('express');
const axios = require('axios');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const mindeeApiKey = process.env.MINDEE_API_KEY;

const upload = multer({ storage: multer.memoryStorage() });

const textRouter = express.Router();

const uploadFileToCloudinary = async (file) => {
  const options = {
    use_filename: true,
    unique_filename: true,
    overwrite: true,
    invalidate: true,
    resource_type: 'auto',
    folder: 'invoice',
  };

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(options, (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      })
      .end(file.buffer);
  });
};

const parseInvoice = async (file) => {
  let data = new FormData();
  data.append('document', fs.createReadStream(file));
  const config = {
    method: 'POST',
    url: 'https://api.mindee.net/v1/products/mindee/invoices/v4/predict',
    headers: {
      Authorization: mindeeApiKey,
      ...data.getHeaders(),
    },
    data,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const handlePostRequest = async (request, response, next) => {
  const { file } = request;
  const filePath = path.join(__dirname, 'temp.pdf');

  try {
    const fileUrl = await uploadFileToCloudinary(file);
    fs.writeFileSync(filePath, file.buffer);
    const invoiceData = await parseInvoice(filePath);
    response.json({ invoiceData, fileUrl });
  } catch (error) {
    console.error(error);
    return next(new Error('Internal Server Error'));
  } finally {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

textRouter.post('/', upload.single('file'), handlePostRequest);

module.exports = textRouter;
