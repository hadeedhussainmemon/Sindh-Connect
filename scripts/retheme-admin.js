const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/admin/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace dark emerald backgrounds with warm ivory / parchment cards
content = content.replace(/bg-emerald-990\/60/g, 'bg-parchment border-maroon/20 text-charcoal');
content = content.replace(/bg-emerald-990/g, 'bg-parchment border-maroon/20 text-charcoal');
content = content.replace(/bg-emerald-950\/15/g, 'bg-ivory border-maroon/20');
content = content.replace(/bg-emerald-950\/20/g, 'bg-ivory border-maroon/20');
content = content.replace(/bg-emerald-950\/10/g, 'bg-ivory border-maroon/20');
content = content.replace(/bg-emerald-950\/40/g, 'bg-parchment border-maroon/20');
content = content.replace(/bg-emerald-950\/5/g, 'bg-ivory/60 border-maroon/15');
content = content.replace(/bg-emerald-950/g, 'bg-maroon text-parchment');

// Replace border colors
content = content.replace(/border-emerald-500\/10/g, 'border-maroon/15');
content = content.replace(/border-emerald-500\/20/g, 'border-maroon/25');
content = content.replace(/border-emerald-500\/30/g, 'border-maroon/30');

// Replace amber & teal button accents with Ajrak maroon & sand
content = content.replace(/bg-amber-400 hover:bg-amber-300 text-emerald-950/g, 'bg-maroon hover:bg-maroon-hover text-parchment');
content = content.replace(/bg-amber-400 hover:bg-amber-300/g, 'bg-maroon hover:bg-maroon-hover text-parchment');
content = content.replace(/bg-amber-400/g, 'bg-maroon text-parchment');
content = content.replace(/text-amber-400/g, 'text-maroon');
content = content.replace(/bg-teal-500 hover:bg-teal-400 text-emerald-950/g, 'bg-indigo hover:bg-indigo-deep text-parchment');
content = content.replace(/bg-purple-500 hover:bg-purple-400 text-white/g, 'bg-maroon hover:bg-maroon-hover text-parchment');

// Replace text colors
content = content.replace(/text-emerald-100\/50/g, 'text-charcoal/60');
content = content.replace(/text-emerald-100\/70/g, 'text-charcoal/70');
content = content.replace(/text-emerald-300/g, 'text-maroon font-bold');
content = content.replace(/text-neutral-300/g, 'text-charcoal/80');
content = content.replace(/text-neutral-400/g, 'text-charcoal/60');
content = content.replace(/text-neutral-500/g, 'text-charcoal/50');
content = content.replace(/text-white/g, 'text-indigo');

// Replace headings and badges
content = content.replace(/Administrative CMS Portal/g, 'Sindh Connect Editorial CMS');
content = content.replace(/Manage database objects, dynamic configuration and search optimization\./g, 'Curate living historical luminaries, review community nominations, and manage authentic handicrafts.');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully redesigned admin page with Ajrak theme tokens!');
