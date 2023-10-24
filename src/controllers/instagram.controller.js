import Instagram from "../models/instagram.model.js";
import { deleteImage, uploadImage } from "../config/cloudinary.js";
import fs from "fs-extra";

export const getInstagrams = async (req, res) => {
  try {
    const instagram = await Instagram.find();
    res.json(instagram);
  } catch (error) {
    return res.status(500).json({ error: "Error getting instagram" });
  }
};

export const createInstagram = async (req, res) => {
  try {
    const { url } = req.body;
    const image = req.files?.image;

    const instagram = new Instagram({
      url,
    });

    if (image) {
      const uploadedImage = await uploadImage(image.tempFilePath, "instagram");
      await fs.unlink(image.tempFilePath);
      instagram.image = {
        public_id: uploadedImage.public_id,
        url: uploadedImage.secure_url,
      };
    }
    await instagram.save();

    res.json(instagram);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const deleteInstagram = async (req, res) => {
  const id = req.params.id;

  try {
    const instagram = await Instagram.findById(id);
    const { public_id } = instagram.image;

    if (!instagram) {
      return res.status(400).json({ message: "instagram doesn't exist" });
    }

    await deleteImage(public_id);
    await Instagram.findByIdAndDelete(id);
    return res.json(instagram);
  } catch (error) {
    return res.status(500).json({ error: "Error getting instagram" });
  }
};
