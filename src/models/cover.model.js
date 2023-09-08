import mongoose from "mongoose";

const coverSchema = mongoose.Schema(
  {
    url: { type: String, required: true, trim: true },
    image: {
      public_id: String,
      url: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Cover", coverSchema);