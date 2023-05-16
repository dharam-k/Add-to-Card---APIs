import Product from "../models/products.model";
import User from "../models/users.model";

interface Product {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
}

interface User {
    name: string;
    email: string;
    password: string;
  }

class ProductService {
  public static async getAllProducts(): Promise<Product[]> {
    return Product.find();
  }

  public static async getProductById(
    productId: string
  ): Promise<Product | null> {
    return Product.findById(productId);
  }

  public static async createProduct(
    name: string,
    description: string,
    price: number,
    quantity: number,
    category: string
  ): Promise<Product> {
    const newProduct = new Product({
      name,
      description,
      price,
      quantity,
      category,
    });

    return newProduct.save();
  }

  public static async updateProduct(
    productId: string,
    name: string,
    description: string,
    price: number,
    quantity: number,
    category: string
  ): Promise<Product | null> {
    return Product.findByIdAndUpdate(
      productId,

      {
        name,
        description,
        price,
        quantity,
        category,
      },
      { new: true }
    );
  }

  public static async deleteProduct(
    productId: string
  ): Promise<Product | null> {
    return Product.findByIdAndDelete(productId);
  }

  public static async addToCart(userId: string, productId: string, quantity: number): Promise<User | null> {
    // Find the user and the product
    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return null;
    }

    // Check if the product already exists in the user's cart
    const existingCartItem = user.cart.find((item) => item.product.toString() === productId);
    if (existingCartItem) {
      // If the product already exists, update the quantity
      existingCartItem.quantity += quantity;
    } else {
      // If the product doesn't exist, add it to the cart
      user.cart.push({ product: productId, quantity });
    }

    // Save the updated user document
    return user.save();
  }
}

export default ProductService;
