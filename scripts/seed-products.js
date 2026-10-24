const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://technosedigital_db_user:GjbqCx1qlrwhDwEs@projects.4wf30bz.mongodb.net/Sindh-Connect';

const initialProducts = [
  {
    title: "Authentic Hand-Blocked 16-Stage Indigo & Crimson Ajrak Shawl",
    slug: "authentic-hand-blocked-indigo-crimson-ajrak-shawl",
    category: "Ajrak Textiles",
    price: 6500,
    currency: "PKR",
    originCity: "Bhit Shah / Hala, Sindh",
    artisanName: "Ustad Ghulam Rasool Soomro",
    inStock: true,
    featured: true,
    primaryImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1000&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1000&auto=format&fit=crop&q=80"
    ],
    description: "Crafted through the ancient 16-stage natural block-printing technique using organic indigo, madder root red (manjith), and dried tamarind seeds. Washed directly in the mineral-rich waters of the Mehran river. A cultural emblem of honor, Sufi serenity, and timeless Sindhi hospitality.",
    whatsappNumber: "+923001234567"
  },
  {
    title: "Handcrafted Hala Blue & Turquoise Kashikari Ceramic Urn",
    slug: "handcrafted-hala-blue-turquoise-kashikari-ceramic-urn",
    category: "Hala Blue Pottery (Kashikari)",
    price: 4800,
    currency: "PKR",
    originCity: "Hala, Matiari District",
    artisanName: "Kashi Master Craftsmen Collective",
    inStock: true,
    featured: true,
    primaryImage: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1000&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1000&auto=format&fit=crop&q=80"
    ],
    description: "Centuries-old terracotta pottery adorned with hand-painted cobalt blue and turquoise glazes inspired by the Sufi shrines of Bhit Shah and Sehwan. Kiln-baked to perfection by master artisans preserving Sindh's ceramic lineage.",
    whatsappNumber: "+923001234567"
  },
  {
    title: "Traditional Thari Geometric Patchwork Ralli Quilt",
    slug: "traditional-thari-geometric-patchwork-ralli-quilt",
    category: "Ralli Quilts",
    price: 8200,
    currency: "PKR",
    originCity: "Mithi, Tharparkar",
    artisanName: "Mai Jamna & Thar Women Artisans Collective",
    inStock: true,
    featured: true,
    primaryImage: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1000&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1000&auto=format&fit=crop&q=80"
    ],
    description: "Exquisite hand-stitched Thari Ralli quilt featuring complex geometric appliqué and vibrant mirror embroidery. Each quilt takes up to three months of painstaking collective stitching by female artisans of the Thar desert.",
    whatsappNumber: "+923001234567"
  },
  {
    title: "Masterpiece Gold Zari Sindhi Topi with Shisha Mirrorwork",
    slug: "masterpiece-gold-zari-sindhi-topi-shisha-mirrorwork",
    category: "Sindhi Topi & Embroidery",
    price: 3200,
    currency: "PKR",
    originCity: "Shikarpur / Jacobabad",
    artisanName: "Shikarpur Artisan Guild",
    inStock: true,
    featured: true,
    primaryImage: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1000&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1000&auto=format&fit=crop&q=80"
    ],
    description: "Traditional arch-front cylindrical Sindhi cap intricately embroidered with genuine metallic gold zari threads, hand-cut glass mirrors, and jewel-tone silk stitching. Celebrated worldwide during Sindh Cultural Day.",
    whatsappNumber: "+923001234567"
  }
];

async function seedProducts() {
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;
  
  for (const prod of initialProducts) {
    await db.collection('products').updateOne(
      { slug: prod.slug },
      { $set: { ...prod, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
      { upsert: true }
    );
  }
  console.log('Traditional Sindhi Products seeded successfully into MongoDB!');
  await mongoose.disconnect();
}

seedProducts().catch(err => {
  console.error(err);
  process.exit(1);
});
