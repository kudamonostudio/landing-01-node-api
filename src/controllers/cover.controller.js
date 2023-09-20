import Cover from "../models/cover.model.js";
import { deleteImage, uploadImage } from "../config/cloudinary.js";
import fs from "fs-extra";

export const getCovers = async (req, res) => {
  try {
    const cover = await Cover.find();
    res.json(cover);
  } catch (error) {
    return res.status(500).json({ error: "Error getting cover" });
  }
};

export const getOneCover = async (req, res) => {
  const id = req.params.id;

  try {
    const cover = await cover.findById(id);
    if (!cover) {
      return res.status(400).json({ message: "cover doesn't exist" });
    }

    return res.json(cover);
  } catch (error) {
    return res.status(500).json({ error: "Error getting cover" });
  }
};

export const createCover = async (req, res) => {
  try {
    const { url } = req.body;
    const image = req.files?.image;

    const cover = new Cover({
      url,
    });

    if (image) {
      const uploadedImage = await uploadImage(image.tempFilePath, "cover");
      await fs.unlink(image.tempFilePath);
      cover.image = {
        public_id: uploadedImage.public_id,
        url: uploadedImage.secure_url,
      };
    }
    await cover.save();

    res.json(cover);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateCover = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.files?.image) {
      let cover = await Cover.findById(id);
      const imageToSave = req.files?.image;
      const { public_id } = cover.image;

      await deleteImage(public_id);

      const uploadedImage = await uploadImage(
        imageToSave.tempFilePath,
        "categories"
      );
      await fs.unlink(imageToSave.tempFilePath);

      cover = req.body;
      cover.image = {
        public_id: uploadedImage.public_id,
        url: uploadedImage.secure_url,
      };
      const updatedCoverWithImage = await Cover.findByIdAndUpdate(id, cover, {
        new: true,
      });
      return res.json(updatedCoverWithImage);
    }

    const updatedCover = await Cover.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.json(updatedCover);
  } catch (error) {
    return res.status(500).json({ error: "Error updating cover" });
  }
};

export const deleteCover = async (req, res) => {
  const id = req.params.id;

  try {
    const cover = await Cover.findById(id);
    const { public_id } = cover.image;

    if (!cover) {
      return res.status(400).json({ message: "cover doesn't exist" });
    }

    await deleteImage(public_id);
    await Cover.findByIdAndDelete(id);
    console.log(public_id);
    return res.json(cover);
  } catch (error) {
    return res.status(500).json({ error: "Error getting cover" });
  }
};
