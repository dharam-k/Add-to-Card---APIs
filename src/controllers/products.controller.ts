import { Request, Response } from "express";
import ProductService from "../services/products.service";

class ProductController {
  public static async getAllProducts(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public static async getProductById(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const productId = req.params.id;
      const product = await ProductService.getProductById(productId);

      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public static async createProduct(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { name, description, price, quantity, category } = req.body;
      const newProduct = await ProductService.createProduct(
        name,
        description,
        price,
        quantity,
        category
      );
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public static async updateProduct(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const productId = req.params.id;
      const { name, description, price, quantity, category } = req.body;
      const updatedProduct = await ProductService.updateProduct(
        productId,
        name,
        description,
        price,
        quantity,
        category
      );

      if (!updatedProduct) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public static async deleteProduct(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const productId = req.params.id;
      const deletedProduct = await ProductService.deleteProduct(productId);

      if (!deletedProduct) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      res.status(200).json(deletedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public static async addToCart(req: Request, res: Response): Promise<void> {
    try {
      const { productId } = req.params;
      const { quantity } = req.body;
      const userId = req.body.user.userId;

      const product = await ProductService.getProductById(productId);
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      // Add the product to the user's cart
      const updatedUser = await ProductService.addToCart(userId, productId, quantity);

      res.status(200).json({ message: 'Product added to cart', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

}

export default ProductController;
