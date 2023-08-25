import connectMongo from "../../../../database/conn";
import Product from "../../../../model/product";

export default async function handler(req, res) {
  await connectMongo().catch(() => {
    res.status(405).json({ error: "database error" });
  });

  // GET REQUEST
  if (req.method === "GET") {
    try {
      // Find all products in the database
      const products = await Product.find();

      if (products.length === 0) {
        // Return a 404 error if no products are found
        res.status(404).json({ message: "Products not found" });
      } else {
        // Return the products as a JSON response
        res.status(200).json(products);
      }
    } catch (error) {
      // Return a 500 error if there's a server error
      res.status(500).json({ message: "Server error" });
    }
  }
  // POST REQUEST
  else if (req.method === "POST") {
    try {
      const { productName, productDescription, productPrice, productCategory, imageUrls } = req.body;

      const product = new Product({
        name: productName,
        description: productDescription,
        price: productPrice,
        category: productCategory,
        images: imageUrls,
      });
      const savedProduct = await product.save();

      res.status(200).json({
        message: "Product created successfully",
        data: savedProduct,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  // DELETE REQUEST
  else if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
        res.status(404).json({ message: "Product not found" });
      } else {
        res.status(200).json({
          message: "Product deleted successfully",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  // Invalid request method
  else {
    res.status(400).json({ message: "Invalid request method" });
  }
}
