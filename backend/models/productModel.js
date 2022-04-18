const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Hãy nhập tên sản phẩm"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Hãy nhập giới thiệu của sản phẩm"],
    },
    sex: {
      type: String,
      required: [true, "Hãy nhập giới tính của sản phẩm dùng"],
    },
    price: {
      type: Number,
      required: [true, "Hãy nhập giá của sản phẩm"],
    },
    unitPrice: {
      type: String,
      required: [true, "Hãy nhập đơn vị tính của sản phẩm"],
    },
    active: {
      type: Boolean,
      default: true,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    Stock: {
      type: Number,
      required: [true, "Hãy nhập số lượng trong kho của sản phẩm"],
      // maxLength: [4, "Stock cannot exceed 4 characters"],
      default: 1,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    discount: {
      name: {
        type: String,
        trim: true,
      },
      description: {
        type: String,
      },
      percent: {
        type: Number,
        default: 0,
      },
      discountActive: {
        type: Boolean,
        default: false,
      },
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
