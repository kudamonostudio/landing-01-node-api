import Product from "../models/product.model.js";
import { deleteImage, uploadImage } from "../config/cloudinary.js";
import fs from "fs-extra";

export const getProducts = async (req, res) => {
  const { limit, sort, category, brand } = req.query;

  let products;
  try {
    if (category || brand) {
      products = await Product.find({ category, brand })
        .limit(limit)
        .sort(sort);
    } else {
      products = await Product.find().limit(limit).sort(sort);
    }

    res.json(products);
  } catch (error) {
    return res.status(500).json({ error: "Error getting products" });
  }
};

export const getOneProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({ message: "Product doesn't exist" });
    }

    return res.json(product);
  } catch (error) {
    return res.status(500).json({ error: "Error getting product" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
    });

    if (req.files?.images) {
      const imagesArray = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];

      let uploadableImages = [];

      for (const image of imagesArray) {
        const uploadedImage = await uploadImage(image.tempFilePath, "products");
        await fs.unlink(image.tempFilePath);
        uploadableImages.push({
          public_id: uploadedImage.public_id,
          url: uploadedImage.secure_url,
        });
      }
      product.images = uploadableImages;
    }

    await product.save();

    res.json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let productToSave = req.body;

    if (req.files?.images) {
      const imagesArray = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];

      try {
        let product = await Product.findById(id);
        productToSave.images = product.images;

        for (const image of imagesArray) {
          const uploadedImage = await uploadImage(
            image.tempFilePath,
            "products"
          );
          productToSave.images.push({
            public_id: uploadedImage.public_id,
            url: uploadedImage.secure_url,
          });
          await fs.unlink(image.tempFilePath);
        }
        const updatedProduct = await Product.findByIdAndUpdate(
          id,
          productToSave,
          {
            new: true,
          }
        );

        return res.json(updatedProduct);
      } catch (error) {
        return res.status(500).json({ error: "Error updating product" });
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, productToSave, {
      new: true,
    });

    return res.json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ error: "Error updating product" });
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(400).json({ message: "Product doesn't exist" });
    }

    if (product.images.length) {
      for (const image of product.images) {
        await deleteImage(image.public_id);
      }
    }

    await Product.findByIdAndDelete(id);

    return res.json(product);
  } catch (error) {
    return res.status(500).json({ error: "Error getting product" });
  }
};

export const deleteProductImage = async (req, res) => {
  const productId = req.params.productId;
  const imageId = req.params.imageId;
  try {
    let product = await Product.findById(productId);

    const { images } = product;

    const image = images.find((img) => img._id.toString() === imageId);
    const { public_id } = image;
    await deleteImage(public_id);

    const productImages = images.filter(
      (img) => img._id.toString() !== imageId
    );

    product.images = productImages;

    const updatedProduct = await Product.findByIdAndUpdate(productId, product, {
      new: true,
    });

    return res.json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
