import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IProduct extends Document {
  title: string;
  slug: string;
  category: string; // e.g., 'Ajrak Textiles', 'Hala Blue Pottery (Kashikari)', 'Ralli Quilts', 'Sindhi Topi & Embroidery', 'Traditional Leather & Handicrafts'
  price: number;
  currency: string;
  description: string;
  images: string[];
  primaryImage: string;
  originCity: string; // e.g. 'Hala', 'Nasarpur', 'Thatta', 'Thar'
  artisanName?: string;
  inStock: boolean;
  featured: boolean;
  whatsappNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    currency: { type: String, default: "PKR" },
    description: { type: String, required: true },
    images: { type: [String], default: [] },
    primaryImage: { type: String, required: true },
    originCity: { type: String, default: "Hala, Sindh" },
    artisanName: { type: String, default: "Master Artisan Collective" },
    inStock: { type: Boolean, default: true },
    featured: { type: Boolean, default: true },
    whatsappNumber: { type: String, default: "+923000000000" }
  },
  { timestamps: true }
);

export default models.Product || model<IProduct>("Product", ProductSchema);
