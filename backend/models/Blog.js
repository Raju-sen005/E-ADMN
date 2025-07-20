const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: String,
  image: String, // image file ka URL
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
