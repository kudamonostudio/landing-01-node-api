import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true },
    image: {
      public_id: String,
      url: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
