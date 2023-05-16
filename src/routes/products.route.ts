import express from "express";
import ProductController from "../controllers/products.controller";
import verifyToken from "../auth/verifyToken.auth";

const router = express.Router();

// Get all products
router.get("/", ProductController.getAllProducts);

// Get a product by ID
router.get("/:id", ProductController.getProductById);

// Create a new product
router.post("/", verifyToken, ProductController.createProduct);

// Update a product
router.put("/:id", verifyToken, ProductController.updateProduct);

// Delete a product
router.delete("/:id", verifyToken,  ProductController.deleteProduct);

export default router;
