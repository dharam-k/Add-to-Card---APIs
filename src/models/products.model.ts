import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
});

const Product = mongoose.model<IProduct>('Product', ProductSchema)
export default Product;
