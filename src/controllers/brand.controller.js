import Brand from "../models/brand.model.js";
import { deleteImage, uploadImage } from "../config/cloudinary.js";
import fs from "fs-extra";

export const getBrands = async (req, res) => {
  const { limit } = req.query;
  try {
    const brand = await Brand.find().limit(limit);
    res.json(brand);
  } catch (error) {
    return res.status(500).json({ error: "Error getting brand" });
  }
};

export const getOneBrand = async (req, res) => {
  const id = req.params.id;

  try {
    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(400).json({ message: "brand doesn't exist" });
    }

    return res.json(brand);
  } catch (error) {
    return res.status(500).json({ error: "Error getting brand" });
  }
};

export const createBrand = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.files?.image;

    const brand = new Brand({
      name,
      description,
    });

    if (image) {
      const uploadedImage = await uploadImage(image.tempFilePath, "brands");
      await fs.unlink(image.tempFilePath);
      brand.image = {
        public_id: uploadedImage.public_id,
        url: uploadedImage.secure_url,
      };
    }
    await brand.save();

    res.json(brand);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.files?.image) {
      let brand = await Brand.findById(id);
      const imageToSave = req.files?.image;
      const { public_id } = brand.image;

      await deleteImage(public_id);

      const uploadedImage = await uploadImage(
        imageToSave.tempFilePath,
        "brands"
      );
      await fs.unlink(imageToSave.tempFilePath);

      brand = req.body;
      brand.image = {
        public_id: uploadedImage.public_id,
        url: uploadedImage.secure_url,
      };
      const updatedBrandWithImage = await Brand.findByIdAndUpdate(
        id,
        brand,
        {
          new: true,
        }
      );
      return res.json(updatedBrandWithImage);
    }

    const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.json(updatedBrand);
  } catch (error) {
    return res.status(500).json({ error: "Error updating brand" });
  }
};

export const deleteBrand = async (req, res) => {
  const id = req.params.id;

  try {
    const brand = await Brand.findById(id);

    if (!brand) {
      return res.status(400).json({ message: "brand doesn't exist" });
    }

    if (brand.image.length) {
      await deleteImage(brand.image.public_id);
    }

    await Brand.findByIdAndDelete(id);

    return res.json(brand);
  } catch (error) {
    return res.status(500).json(error);
  }
};
