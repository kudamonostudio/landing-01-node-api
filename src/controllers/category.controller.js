import Category from "../models/category.model.js";
import { deleteImage, uploadImage } from "../config/cloudinary.js";
import fs from "fs-extra";

export const getCategories = async (req, res) => {
  try {
    const category = await Category.find();
    res.json(category);
  } catch (error) {
    return res.status(500).json({ error: "Error getting category" });
  }
};

export const getOneCategory = async (req, res) => {
  const id = req.params.id;

  try {
    const category = await category.findById(id);
    if (!category) {
      return res.status(400).json({ message: "category doesn't exist" });
    }

    return res.json(category);
  } catch (error) {
    return res.status(500).json({ error: "Error getting category" });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.files?.image;

    const category = new Category({
      name,
    });

    if (image) {
      const uploadedImage = await uploadImage(image.tempFilePath, "category");
      await fs.unlink(image.tempFilePath);
      category.image = {
        public_id: uploadedImage.public_id,
        url: uploadedImage.secure_url,
      };
    }
    await category.save();

    res.json(category);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.files?.image) {
      let category = await Category.findById(id);
      const imageToSave = req.files?.image;
      const { public_id } = category.image;

      await deleteImage(public_id);

      const uploadedImage = await uploadImage(
        imageToSave.tempFilePath,
        "categories"
      );
      await fs.unlink(imageToSave.tempFilePath);

      category = req.body;
      category.image = {
        public_id: uploadedImage.public_id,
        url: uploadedImage.secure_url,
      };
      const updatedCategoryWithImage = await Category.findByIdAndUpdate(
        id,
        category,
        {
          new: true,
        }
      );
      return res.json(updatedCategoryWithImage);
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.json(updatedCategory);
  } catch (error) {
    return res.status(500).json({ error: "Error updating category" });
  }
};

export const deleteCategory = async (req, res) => {
  const id = req.params.id;

  try {
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(400).json({ message: "category doesn't exist" });
    }

    return res.json(category);
  } catch (error) {
    return res.status(500).json({ error: "Error getting category" });
  }
};
