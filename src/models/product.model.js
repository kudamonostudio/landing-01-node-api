import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    stock: { type: Number, required: true },
    brand: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
