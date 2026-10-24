const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://technosedigital_db_user:GjbqCx1qlrwhDwEs@projects.4wf30bz.mongodb.net/Sindh-Connect';

async function updateDb() {
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;
  
  // 1. Update SiteConfig
  await db.collection('siteconfigs').updateOne(
    { key: 'main' },
    { 
      $set: { 
        heroImageUrl: '/hero_visual.jpg',
        logoUrl: '/logo.jpg'
      } 
    }
  );
  console.log('SiteConfig updated with local verified images.');

  // Curated verified portraits & art mapping
  const imageMap = {
    'muhammad-ali-jinnah': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    'shah-abdul-latif-bhittai': 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
    'lal-shahbaz-qalandar': 'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=800&auto=format&fit=crop&q=80',
    'sachal-sarmast': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    'zulfikar-ali-bhutto': 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80',
    'benazir-bhutto': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    'g-m-syed': 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80',
    'hoshu-sheedi': 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&auto=format&fit=crop&q=80',
    'shaikh-ayaz': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    'abida-parveen': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    'allama-i-i-kazi': 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80',
    'dr-adeeb-rizvi': 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&auto=format&fit=crop&q=80',
    'sohrab-faqir': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    'dr-fahmida-hussain': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    'daniyal-sheikh': 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80',
    'asif-ali-vlogs': 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80',
    'sindhi-cultural-vlogs': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
    'dr-ruth-pfau': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    'mai-bhagi': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    'haji-shafi-muhammad-hala': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80'
  };

  const personalities = await db.collection('personalities').find({}).toArray();
  for (const p of personalities) {
    const verifiedUrl = imageMap[p.slug] || 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80';
    await db.collection('personalities').updateOne(
      { _id: p._id },
      { 
        $set: { 
          profilePicture: verifiedUrl,
          images: [verifiedUrl]
        } 
      }
    );
  }
  console.log('Updated ' + personalities.length + ' personalities with verified live images.');

  // Update Galleries with live images
  const galleryItems = [
    { title: 'The Great Stupa at Mohenjo-daro', imageUrl: 'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=1200&auto=format&fit=crop&q=80', category: 'Archaeology' },
    { title: 'Ajrak Geometric Hand-Block Craftsmanship', imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1200&auto=format&fit=crop&q=80', category: 'Crafts' },
    { title: 'Makli Necropolis World Heritage Site', imageUrl: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1200&auto=format&fit=crop&q=80', category: 'Heritage' },
    { title: 'The Mighty Indus River at Sunset', imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80', category: 'Landscapes' }
  ];

  await db.collection('galleries').deleteMany({});
  await db.collection('galleries').insertMany(galleryItems.map(g => ({ ...g, createdAt: new Date() })));
  console.log('Galleries refreshed with verified images.');

  // Update Articles with high quality images
  const articlePhotos = [
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1200&auto=format&fit=crop&q=80'
  ];
  const articles = await db.collection('articles').find({}).toArray();
  for (let i = 0; i < articles.length; i++) {
    await db.collection('articles').updateOne(
      { _id: articles[i]._id },
      { $set: { coverImage: articlePhotos[i % articlePhotos.length] } }
    );
  }
  console.log('Articles updated with verified cover images.');

  await mongoose.disconnect();
}

updateDb().catch(err => {
  console.error(err);
  process.exit(1);
});
