import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
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
    const { name, description, price } = req.body;

    const product = new Product({
      name,
      description,
      price,
    });

    await product.save();

    res.json(product);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Product name is already exists" });
    } else {
      return error;
    }
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {new: true});

  return res.json(updatedProduct)
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(400).json({ message: "Product doesn't exist" });
    }

    return res.json(product);
  } catch (error) {
    return res.status(500).json({ error: "Error getting product" });
  }
};
