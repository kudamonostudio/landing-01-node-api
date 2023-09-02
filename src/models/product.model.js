import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true },
  description: { type: String, trim: true },
  price: { type: Number, required: true }
}, {timestamps: true});

export default mongoose.model('Product', productSchema)