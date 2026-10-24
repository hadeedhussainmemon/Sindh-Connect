const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://technosedigital_db_user:GjbqCx1qlrwhDwEs@projects.4wf30bz.mongodb.net/Sindh-Connect';

async function updateConfigHero() {
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;
  await db.collection('siteconfigs').updateOne(
    { key: 'main' },
    {
      $set: {
        headline: 'A land of history. A people of stories.',
        subheadline: 'An authoritative editorial archive documenting the civilizational memory, Sufi philosophies, indigenous craftsmanship, and contemporary leaders of Sindh.',
        heroImageUrl: 'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=1200&auto=format&fit=crop&q=80'
      }
    }
  );
  console.log('SiteConfig updated with headline and CDN verified hero URL.');
  await mongoose.disconnect();
}

updateConfigHero().catch(err => {
  console.error(err);
  process.exit(1);
});
