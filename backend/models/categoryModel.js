const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Hãy nhập tên danh mục"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Hãy nhập giới thiệu cho danh mục"],
  },
});

module.exports = mongoose.model("Category", categorySchema);
