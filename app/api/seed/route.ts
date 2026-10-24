import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User, { UserRole } from "@/models/User";
import Personality from "@/models/Personality";
import Business from "@/models/Business";
import Article from "@/models/Article";
import SiteConfig from "@/models/SiteConfig";
import Event from "@/models/Event";
import Gallery from "@/models/Gallery";

export async function GET(req: Request) {
  try {
    // SECURITY GUARD: Prevent unauthorized wiping in production environments
    const { searchParams } = new URL(req.url);
    const secretKey = searchParams.get("key");
    const allowedSecret = process.env.SEED_SECRET || "sindh-connect-seed-2026";

    if (process.env.NODE_ENV === "production" && secretKey !== allowedSecret) {
      return NextResponse.json({ error: "Unauthorized access to database seeding." }, { status: 403 });
    }

    await dbConnect();

    // 1. Clean existing collections
    await User.deleteMany({});
    await Personality.deleteMany({});
    await Business.deleteMany({});
    await Article.deleteMany({});
    await SiteConfig.deleteMany({});
    await Event.deleteMany({});
    await Gallery.deleteMany({});

    // 2. Seed Users
    const adminUser = await User.create({
      name: "Sindh Connect Editorial",
      email: "admin@sindhconnect.com",
      password: "password123",
      role: UserRole.ADMIN,
    });

    const contributorUser = await User.create({
      name: "Cultural Contributor",
      email: "contributor@sindhconnect.com",
      password: "password123",
      role: UserRole.CONTRIBUTOR,
    });

    // 3. Seed site configuration
    await SiteConfig.create({
      key: "main",
      headline: "Sindh Connect – Honoring the Heritage, Leaders & Creators of the Indus",
      subheadline: "A prestigious archive celebrating 5,000 years of civilization, Sufi wisdom, visionary leaders, digital pioneers, and uplifting stories across Sindh.",
      logoUrl: "/logo.jpg",
      faviconUrl: "/favicon.ico",
      heroImageUrl: "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=1200",
      
      aboutIntro: "Sindh Connect is dedicated to archiving, celebrating, and amplifying the heritage, culture, and positive transformation of Sindh. From the timeless brick streets of Mohenjo-daro to the Sufi shrines of Bhit Shah, Sehwan, and Jhok, Sindh has been a cradle of peace, pluralism, and intellectual richness for millennia.\n\nOur platform shines a bright light on the extraordinary individuals who embody the spirit of Sindh: iconic digital creators shaping modern media, devoted statesmen and public servants, educators bridging communities, entrepreneurs building sustainable economies, and artists keeping our indigenous crafts alive.\n\nWe counter despondency by spotlighting the real, uplifting stories from Sukkur, Larkana, Hyderabad, Thar, and Karachi. Sindh Connect is more than a registry; it is an open home for celebrating our shared pride, honoring our heroes, and inspiring youth to build a progressive future.",
      
      vision: "To establish Sindh Connect as the most authoritative and inspirational digital portal celebrating Sindhi heritage, highlighting contemporary champions, and connecting the global Sindhi diaspora with grassroots positive initiatives.",
      
      mission: "To discover, document, and honor exceptional personalities across Sindh; safeguard indigenous history and arts; and share constructive stories that drive progress, unity, and hope.",
      
      coreValues: [
        { name: "Sufi Wisdom & Peace (امن ۽ رواداري)", description: "Rooted in the timeless tolerance and universal humanity taught by Shah Latif, Lal Shahbaz, and Sachal Sarmast." },
        { name: "Cultural Preservation (ثقافتي ورثو)", description: "Safeguarding Ajrak, Kashikari, Ralli, Sindhi language, and archaeological monuments." },
        { name: "Integrity & Merit", description: "Uncompromising honesty and fairness in documenting leaders and community icons." },
        { name: "Digital Innovation", description: "Empowering young creators, tech founders, and digital storytellers across Sindh." },
        { name: "Grassroots Empowerment", description: "Celebrating the unheralded teachers, social workers, and farmers uplifting our rural and urban centers." }
      ],
      
      objectives: "Documenting heritage sites; recognizing notable creators and statesmen; building youth mentorship links; cataloging positive economic and social breakthroughs throughout Sindh.",
      
      selectionCriteria: "Documented integrity, cultural or societal contribution to Sindh, creative excellence, demonstrated positive impact, and dedication to uplifting the people.",
      
      categories: "Heritage & Sufism\nTop Digital Creators & Media\nPoliticians & Statesmen\nLiterature & Sindhi Poetry\nSocial Impact & Community Welfare\nTech, Startups & Business\nArts, Crafts & Ajrak Artisans\nSports & Youth Excellence",
      
      whyUs: "Sindh gave the subcontinent its name and civilizational foundation, yet its contemporary victories often remain overlooked. Sindh Connect bridges this gap by offering a world-class platform dedicated exclusively to our legacy and modern innovators.",
      
      founderMessage: "Welcome to Sindh Connect. Every artisan weaving an Ajrak in Hala, every digital creator storytelling from Khairpur, every leader striving for our public hospitals, and every young coder in Karachi deserves a stage. Join us as we document our past and shape our future.",
      
      impact: "Connecting grassroots artisans with international appreciation, providing educational archives for students, and giving voice to the inspiring heroes of Sindh.",
      
      joinUs: "Whether you are a writer, historian, student, content creator, or cultural advocate, Sindh Connect is yours. Submit articles, nominate heroes, and help us tell the true story of Sindh."
    });

    // 4. Seed Top 20 All-Time Icons & Personalities of Sindh
    const personalities = await Personality.create([
      {
        name: "Quaid-e-Azam Muhammad Ali Jinnah",
        slug: "muhammad-ali-jinnah",
        category: "Politicians & Leaders",
        biography: "Born at Wazir Mansion in Karachi, Sindh, Muhammad Ali Jinnah was a barrister, revered statesman, and the founding father (Baba-e-Qaum) of Pakistan. His unmatched legal acumen, principled integrity, and steadfast leadership changed the destiny of the subcontinent.",
        birthDate: new Date("1876-12-25"),
        deathDate: new Date("1948-09-11"),
        achievements: [
          "Founder and First Governor-General of Pakistan",
          "Distinguished Barrister of Lincoln's Inn and constitutional scholar",
          "Champion of minority rights and fundamental civil liberties"
        ],
        images: ["https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800"],
        featured: true,
        company: "Government of Pakistan",
        awards: ["Baba-e-Qaum (Father of the Nation)", "Quaid-e-Azam"],
        timeline: [
          { year: "1876", event: "Born at Wazir Mansion, Kharadar, Karachi, Sindh" },
          { year: "1913", event: "Joined the All-India Muslim League" },
          { year: "1947", event: "Founded Pakistan and took oath in Karachi" }
        ],
        sponsored: false
      },
      {
        name: "Shah Abdul Latif Bhittai",
        slug: "shah-abdul-latif-bhittai",
        category: "Heritage & Sufism",
        biography: "Shah Abdul Latif Bhittai (1689–1752) is reverently known as the supreme poet-philosopher of the Sindhi language. His compilation 'Shah Jo Risalo' is a spiritual masterpiece that weaves universal humanitarian values, divine love, and female empowerment through the iconic 'Seven Queens' (Satt Soormiyun).",
        birthDate: new Date("1689-11-18"),
        deathDate: new Date("1752-01-01"),
        achievements: [
          "Author of the monumental compilation 'Shah Jo Risalo'",
          "Pioneered the Tamboora musical tradition for devotional chanting",
          "Spiritual unifier whose poetry unites all faiths in Sindh"
        ],
        images: ["https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800"],
        featured: true,
        company: "Sindhi Classical Literature",
        awards: ["Crown of Sindhi Poetry", "Sufi Saint of Bhit Shah"],
        timeline: [
          { year: "1689", event: "Born in Hala Haveli, Sindh" },
          { year: "1742", event: "Established the historic retreat of Bhit Shah" },
          { year: "1752", event: "Departed this earthly life; his annual Urs remains Sindh's largest cultural gathering" }
        ],
        sponsored: false
      },
      {
        name: "Lal Shahbaz Qalandar",
        slug: "lal-shahbaz-qalandar",
        category: "Heritage & Sufism",
        biography: "Syed Muhammad Usman Marwandi, affectionately venerated worldwide as Lal Shahbaz Qalandar, was an illustrious 12th-century Sufi saint, philosopher, and poet based in Sehwan Sharif, Sindh. He preached divine ecstasy, peace, and universal brotherhood, making Sehwan an eternal beacon of spiritual harmony.",
        birthDate: new Date("1177-01-01"),
        deathDate: new Date("1274-01-01"),
        achievements: [
          "Beacon of peace and non-sectarian interfaith brotherhood across Sindh",
          "Founder of the mystic spiritual tradition of Sehwan Sharif",
          "Inspiration behind the globally immortal song 'Dama Dam Mast Qalandar'"
        ],
        images: ["https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800"],
        featured: true,
        company: "Sehwan Sharif",
        awards: ["Jhulelal", "Hazrat Lal Shahbaz Qalandar"],
        timeline: [
          { year: "1177", event: "Born in Maiwand, settled in Sehwan, Sindh" },
          { year: "1274", event: "Passed away in Sehwan Sharif, Sindh" }
        ],
        sponsored: false
      },
      {
        name: "Sachal Sarmast",
        slug: "sachal-sarmast",
        category: "Heritage & Sufism",
        biography: "Abdul Wahab Farooqi, affectionately known as 'Sachal Sarmast' (The Truthful Ecstatic), was an 18th-century revolutionary mystic poet from Daraza Sharif near Ranipur, Sindh. Renowned as 'Shaa'ir-e-Haft Zaban' (Poet of Seven Languages), his verses passionately championed freedom of truth and compassion.",
        birthDate: new Date("1739-01-01"),
        deathDate: new Date("1829-01-01"),
        achievements: [
          "Composed masterworks in Sindhi, Siraiki, Persian, Urdu, Arabic, Punjabi, and Balochi",
          "Celebrated as the 'Attar of Sindh' for his fearless poetic conviction",
          "Spiritual beacon of Khairpur and Upper Sindh"
        ],
        images: ["https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800"],
        featured: true,
        company: "Daraza Sharif Shrine",
        awards: ["Shaa'ir-e-Haft Zaban", "Sarmast (The Ecstatic)"],
        timeline: [
          { year: "1739", event: "Born in Daraza, Khairpur State, Sindh" },
          { year: "1829", event: "Departed in Daraza Sharif" }
        ],
        sponsored: false
      },
      {
        name: "Zulfikar Ali Bhutto",
        slug: "zulfikar-ali-bhutto",
        category: "Politicians & Leaders",
        biography: "Born in Larkana, Sindh, Zulfikar Ali Bhutto was a charismatic statesman, founder of the Pakistan Peoples Party, and the prime architect behind Pakistan's consensus 1973 Constitution. Educated at UC Berkeley and Oxford, he was an iconic orator who gave political voice to the disenfranchised.",
        birthDate: new Date("1928-01-05"),
        deathDate: new Date("1979-04-04"),
        achievements: [
          "Architect of the unanimous 1973 Constitution of Pakistan",
          "Established Port Qasim, Pakistan Steel Mills, and heavy infrastructure in Sindh",
          "Founder of the Pakistan Peoples Party (PPP)"
        ],
        images: ["https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800"],
        featured: true,
        company: "Government of Pakistan",
        awards: ["Quaid-e-Awam (Leader of the People)"],
        timeline: [
          { year: "1928", event: "Born in Larkana, Sindh" },
          { year: "1967", event: "Founded the Pakistan Peoples Party" },
          { year: "1973", event: "Enacted the 1973 Constitution of Pakistan" }
        ],
        sponsored: false
      },
      {
        name: "Benazir Bhutto",
        slug: "benazir-bhutto",
        category: "Politicians & Leaders",
        biography: "Benazir Bhutto was an internationally recognized stateswoman who made history as the first woman elected to head a democratic government in a Muslim-majority country. Serving twice as Prime Minister, she spearheaded women's empowerment, healthcare worker programs, and human rights.",
        birthDate: new Date("1953-06-21"),
        deathDate: new Date("2007-12-27"),
        achievements: [
          "First female prime minister elected in the Muslim world",
          "Introduced the Lady Health Worker Programme across rural Sindh & Pakistan",
          "President of the Oxford Union (1977)"
        ],
        images: ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800"],
        featured: true,
        company: "Government of Pakistan",
        awards: ["United Nations Prize in the Field of Human Rights", "Shaheed-e-Jamhooriat"],
        timeline: [
          { year: "1953", event: "Born in Karachi, Sindh" },
          { year: "1988", event: "Sworn in as Prime Minister of Pakistan" },
          { year: "2007", event: "Martyred in Rawalpindi after addressing millions" }
        ],
        sponsored: false
      },
      {
        name: "G. M. Syed (Ghulam Murtaza Syed)",
        slug: "g-m-syed",
        category: "Politicians & Leaders",
        biography: "Born in Sann, Sindh, G.M. Syed was an eminent political thinker, scholar, and politician. He was instrumental in passing the 1943 Sindh Assembly Resolution in favor of Pakistan and later became the foremost voice and ideologue of modern Sindhi nationalism, authoring over 60 books on Sindhi history, politics, and culture.",
        birthDate: new Date("1904-01-17"),
        deathDate: new Date("1995-04-25"),
        achievements: [
          "Spearheaded the historic 1943 Sindh Assembly resolution in favor of Pakistan",
          "Prolific author of more than 60 books on Sindhi literature and culture",
          "Founder of the modern Sindhi national movement"
        ],
        images: ["https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800"],
        featured: true,
        company: "Sindh Political & Cultural Archives",
        awards: ["Saaeen G.M. Syed", "Scholar of Sann"],
        timeline: [
          { year: "1904", event: "Born in Sann, Jamshoro District, Sindh" },
          { year: "1943", event: "Moved the historic 1943 Pakistan resolution in Sindh Assembly" },
          { year: "1995", event: "Passed away in Karachi; rested in Sann" }
        ],
        sponsored: false
      },
      {
        name: "Hoshu Sheedi (Hosh Muhammad Sheedi)",
        slug: "hoshu-sheedi",
        category: "Heritage & Military Heroes",
        biography: "Hosh Muhammad Sheedi (1801–1843) is an immortal national hero and military commander of the Talpur Army of Sindh. Facing the British Empire's forces at the Battle of Dubbo near Hyderabad in 1843, he gave his life shouting the immortal battle cry: 'Marvesoon Par Sindh Na Desoon' (We will die, but we will not surrender Sindh!).",
        birthDate: new Date("1801-01-01"),
        deathDate: new Date("1843-03-24"),
        achievements: [
          "Supreme Commander at the historic Battle of Dubbo (1843)",
          "Coined the legendary pledge 'Marvesoon Par Sindh Na Desoon'",
          "Symbol of unwavering resistance against British colonial expansion"
        ],
        images: ["https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800"],
        featured: true,
        company: "Talpur Forces of Sindh",
        awards: ["General of Sindh", "Martyr of the Battle of Dubbo"],
        timeline: [
          { year: "1801", event: "Born in Sindh" },
          { year: "1843", event: "Led the vanguard at Dubbo and achieved eternal martyrdom" }
        ],
        sponsored: false
      },
      {
        name: "Shaikh Ayaz",
        slug: "shaikh-ayaz",
        category: "Literature & Sindhi Poetry",
        biography: "Shaikh Ayaz (1923–1997) is universally recognized as the pioneer of modern Sindhi literature. A practicing lawyer and Vice Chancellor of the University of Sindh, his progressive poetry transformed 20th-century Sindhi intellectual thought. He also translated 'Shah Jo Risalo' into Urdu verse.",
        birthDate: new Date("1923-03-02"),
        deathDate: new Date("1997-12-28"),
        achievements: [
          "Pioneered modern Sindhi poetry, fiction, and revolutionary prose",
          "Vice Chancellor of Sindh University Jamshoro (1976–1980)",
          "Author of over 50 books in Sindhi and Urdu"
        ],
        images: ["https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800"],
        featured: true,
        company: "University of Sindh",
        awards: ["Sitara-e-Imtiaz", "Pride of Performance"],
        timeline: [
          { year: "1923", event: "Born in Shikarpur, Sindh" },
          { year: "1976", event: "Appointed Vice Chancellor of Sindh University" },
          { year: "1997", event: "Passed away in Karachi, buried alongside Shah Bhittai in Bhit Shah" }
        ],
        sponsored: false
      },
      {
        name: "Abida Parveen",
        slug: "abida-parveen",
        category: "Arts & Culture",
        biography: "Hailing from Larkana, Sindh, Abida Parveen is celebrated worldwide as the undisputed 'Queen of Sufi Music' (Begum of Sufi Qawwali). Her soul-stirring vocal range and passionate renditions of Sindhi Sufi poetry have mesmerized international concert halls from London and New York to Paris and Tokyo.",
        birthDate: new Date("1954-02-20"),
        achievements: [
          "Global ambassador of Sindhi Sufi music and kalam",
          "Recipient of Pakistan's highest civilian artistic decorations",
          "Pioneered female solo Sufi devotional performances worldwide"
        ],
        images: ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800"],
        featured: true,
        company: "Sufi Music World",
        awards: ["Nishan-e-Imtiaz", "Hilal-e-Imtiaz", "Pride of Performance"],
        timeline: [
          { year: "1954", event: "Born in Ali Gohar Abad, Larkana, Sindh" },
          { year: "1977", event: "Introduced officially as a singer on Radio Pakistan" },
          { year: "2021", event: "Conferred the prestigious Nishan-e-Imtiaz" }
        ],
        sponsored: false
      },
      {
        name: "Allama I. I. Kazi",
        slug: "allama-i-i-kazi",
        category: "Education & Philosophy",
        biography: "Allama Imdad Ali Imam Ali Kazi (1886–1968) was an intellectual titan, scholar, philosopher, and founding Vice-Chancellor who established the permanent modern campus of the University of Sindh at Jamshoro. Together with his German wife Elsa Kazi, he produced seminal works on 'Shah Jo Risalo' and educational philosophy.",
        birthDate: new Date("1886-04-18"),
        deathDate: new Date("1968-04-13"),
        achievements: [
          "Father of modern higher education in Sindh and builder of Jamshoro Campus",
          "Founder-Vice Chancellor of the University of Sindh",
          "Philosophical scholar who authored ground-breaking comparative analyses on Shah Latif"
        ],
        images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"],
        featured: true,
        company: "University of Sindh, Jamshoro",
        awards: ["Bani-e-Sindh University", "Allama (The Great Scholar)"],
        timeline: [
          { year: "1886", event: "Born in Hyderabad, Sindh" },
          { year: "1951", event: "Selected as Vice-Chancellor of Sindh University" },
          { year: "1968", event: "Passed away in Hyderabad, rested on Sindh University grounds" }
        ],
        sponsored: false
      },
      {
        name: "Dr. Adeebul Hasan Rizvi",
        slug: "dr-adeebul-hasan-rizvi",
        category: "Social Reform & Healthcare",
        biography: "Dr. Adeebul Hasan Rizvi is a globally celebrated humanitarian and transplant surgeon who founded the Sindh Institute of Urology and Transplantation (SIUT) in Karachi. Under his vision, SIUT has delivered billions in free, state-of-the-art organ transplants, dialyses, and oncology care to every citizen without discrimination.",
        achievements: [
          "Founder of SIUT, running the largest free organ transplant facility in South Asia",
          "Recipient of the Ramon Magsaysay Award for humanitarian healthcare",
          "Championed ethical transplantation laws and dignity for patients"
        ],
        images: ["https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=800"],
        featured: true,
        company: "SIUT Sindh",
        awards: ["Nishan-e-Imtiaz", "Ramon Magsaysay Award", "Hilal-e-Imtiaz"],
        timeline: [
          { year: "1972", event: "Started an 8-bed urology unit at Civil Hospital Karachi" },
          { year: "1991", event: "Chartered SIUT as an autonomous center of medical excellence" },
          { year: "2003", event: "Conferred the International Ramon Magsaysay Award" }
        ],
        sponsored: false
      },
      {
        name: "Pir Pagaro (Siboldar Sibghatullah Shah Rashdi)",
        slug: "pir-pagaro-sibghatullah-rashdi",
        category: "Heritage & Military Heroes",
        biography: "Pir Sibghatullah Shah Rashdi II (Pir Pagaro VI, 1909–1943) was the spiritual leader of the Hurs of Sindh who led the fearless armed Hur Insurgency against British colonial rule. Refusing to bend to martial law, his courage earned him the title 'Suriya Badshah' (The Courageous King) before his martyrdom by the British in Hyderabad.",
        birthDate: new Date("1909-01-01"),
        deathDate: new Date("1943-03-20"),
        achievements: [
          "Supreme leader of the Hur resistance against the British Empire in Sindh",
          "Awarded the title 'Suriya Badshah' by the people of Sindh",
          "Endured martyrdom rather than compromise the independence of his homeland"
        ],
        images: ["https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800"],
        featured: true,
        company: "Hur Movement of Sindh",
        awards: ["Suriya Badshah (The Courageous King)"],
        timeline: [
          { year: "1909", event: "Born in Pir Jo Goth, Khairpur, Sindh" },
          { year: "1940", event: "Launched the armed Hur resistance against British forces" },
          { year: "1943", event: "Martyred in Hyderabad Central Jail" }
        ],
        sponsored: false
      },
      {
        name: "Dr. Nabi Bux Baloch",
        slug: "dr-nabi-bux-baloch",
        category: "Literature & Sindhi Poetry",
        biography: "Dr. N.A. Baloch (1917–2011) was a legendary scholar, folklorist, historian, and lexicographer. He spent four decades traversing every village and desert dune of Sindh to compile the monumental 42-volume encyclopedic collection of Sindhi folklore, oral history, and the comprehensive Sindhi-to-Sindhi Dictionary.",
        birthDate: new Date("1917-12-16"),
        deathDate: new Date("2011-04-06"),
        achievements: [
          "Compiled the landmark 42-volume Sindhi Folklore series",
          "Authored the authoritative Comprehensive Sindhi Dictionary",
          "Vice-Chancellor of Sindh University and International Islamic University"
        ],
        images: ["https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800"],
        featured: true,
        company: "Sindhi Language Authority",
        awards: ["Hilal-e-Imtiaz", "Sitara-e-Imtiaz", "Pride of Performance"],
        timeline: [
          { year: "1917", event: "Born in Sanghar District, Sindh" },
          { year: "1949", event: "Completed Ph.D. at Columbia University, New York" },
          { year: "2011", event: "Passed away in Hyderabad leaving an incomparable scholarly library" }
        ],
        sponsored: false
      },
      {
        name: "Mai Bhagi",
        slug: "mai-bhagi",
        category: "Arts & Culture",
        biography: "Mai Bhagi (1920–1986), born in Mithi, Tharparkar, was the legendary folk queen of the Thar Desert. Her distinct resonant voice introduced Thari and Sindhi desert folk music to global audiences with her iconic anthem 'Khareen Neem Khari Re' recorded by Radio Pakistan Hyderabad.",
        birthDate: new Date("1920-01-01"),
        deathDate: new Date("1986-07-07"),
        achievements: [
          "Immortalized the folk culture and musical soul of the Thar Desert",
          "Represented Pakistan across the United States, Europe, and Asia",
          "Conferred the President's Pride of Performance Award"
        ],
        images: ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800"],
        featured: true,
        company: "Thari Folk Music Tradition",
        awards: ["Pride of Performance", "Shah Abdul Latif Bhittai Award"],
        timeline: [
          { year: "1920", event: "Born in Mithi, Tharparkar, Sindh" },
          { year: "1960", event: "Rose to national fame on Radio Pakistan Hyderabad" },
          { year: "1986", event: "Passed away in Thar, celebrated as a folk legend" }
        ],
        sponsored: false
      },
      {
        name: "Irfan Junejo",
        slug: "irfan-junejo",
        category: "Top Digital Creators & Media",
        biography: "Hailing from Karachi, Sindh, Irfan Junejo is one of Pakistan's most prominent digital creators, visual storytellers, and vloggers. With millions of followers across YouTube and social platforms, he pioneered high-production cinematic storytelling and has mentored thousands of aspiring creators.",
        achievements: [
          "Pioneered cinematic vlog storytelling in Pakistan with over 1.6M YouTube subscribers",
          "Featured creator at international digital summits in Asia and Europe",
          "Leading youth role model for creative entrepreneurship and digital media"
        ],
        images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"],
        featured: true,
        company: "Digital Content Studio",
        awards: ["YouTube Gold Creator Award", "Digital Creator of the Year"],
        timeline: [
          { year: "2017", event: "Started cinematic vlogging documenting urban life in Karachi" },
          { year: "2019", event: "Crossed 1,000,000 subscribers on YouTube" },
          { year: "2024", event: "Launched major cinematic short films and documentary formats" }
        ],
        sponsored: false
      },
      {
        name: "Fahmida Riaz",
        slug: "fahmida-riaz",
        category: "Literature & Sindhi Poetry",
        biography: "Fahmida Riaz (1946–2018) was a pioneering progressive poet, feminist icon, and human rights activist who lived in Hyderabad and Karachi, Sindh. Her powerful, courageous literary voice broke traditional barriers, championing free expression and social justice across South Asia.",
        birthDate: new Date("1946-07-28"),
        deathDate: new Date("2018-11-21"),
        achievements: [
          "Author of over 15 celebrated collections of poetry, fiction, and translation",
          "Managing Director of National Book Foundation",
          "Fearless campaigner for human rights, democracy, and gender equality"
        ],
        images: ["https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800"],
        featured: true,
        company: "South Asian Progressive Writers",
        awards: ["Sitara-e-Imtiaz", "Kamal-e-Fun Award"],
        timeline: [
          { year: "1946", event: "Born in Meerut, grew up and educated in Hyderabad, Sindh" },
          { year: "1973", event: "Published her groundbreaking poetry collection 'Badan Dareeda'" },
          { year: "2018", event: "Passed away, celebrated as an icon of literary courage" }
        ],
        sponsored: false
      },
      {
        name: "Sarmad Khoosat",
        slug: "sarmad-khoosat",
        category: "Top Digital Creators & Media",
        biography: "Born in Karachi, Sindh, Sarmad Sultan Khoosat is an acclaimed filmmaker, director, and actor. He directed iconic television masterworks such as 'Humsafar' and critically acclaimed award-winning feature films like 'Manto' and 'Kamli', revitalizing Pakistani dramatic cinema on the international festival circuit.",
        achievements: [
          "Director of 'Humsafar', the highest-rated drama serial in Pakistani history",
          "Winner of international film festival awards for 'Kamli' and 'Zindagi Tamasha'",
          "Awarded Pride of Performance by the Government of Pakistan"
        ],
        images: ["https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800"],
        featured: true,
        company: "Khoosat Films",
        awards: ["Pride of Performance", "Lux Style Award for Best Director"],
        timeline: [
          { year: "1979", event: "Born in Karachi, Sindh" },
          { year: "2011", event: "Directed television milestone 'Humsafar'" },
          { year: "2022", event: "Released internationally lauded feature film 'Kamli'" }
        ],
        sponsored: false
      },
      {
        name: "Shazia Khushk",
        slug: "shazia-khushk",
        category: "Arts & Culture",
        biography: "Hailing from Jamshoro, Sindh, Shazia Khushk is a beloved Sindhi folk singer whose energetic voice brought Sindhi folk songs into mainstream international popularity. Her rendition of 'Dane Pe Dana' and 'Lal Meri Pat Rakhiyo' became beloved cultural anthems across the globe.",
        birthDate: new Date("1970-09-16"),
        achievements: [
          "Popularized Sindhi and Balochi folk melodies in over 45 countries",
          "Recorded hundreds of classic Sindhi and Urdu folk songs",
          "Appointed Goodwill Ambassador for cultural exchange"
        ],
        images: ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800"],
        featured: true,
        company: "Sindhi Cultural Delegation",
        awards: ["President's Pride of Performance Nominee", "Sindh Cultural Trophy"],
        timeline: [
          { year: "1970", event: "Born in Jamshoro, Sindh" },
          { year: "1992", event: "Debut on Radio Pakistan and PTV" },
          { year: "2000", event: "Headlined international cultural tours across the world" }
        ],
        sponsored: false
      },
      {
        name: "Shah Inayat Shaheed (Sufi Shah Inayat)",
        slug: "shah-inayat-shaheed",
        category: "Heritage & Sufism",
        biography: "Shah Inayat Shaheed (1655–1718) of Jhok Sharif, Sindh, was a revolutionary Sufi saint, social reformer, and hero of peasant rights. Revered as the world's first socialist mystic, he established a collective agricultural commune under the motto 'Jo Khere So Khaaye' (He who tills the land has the right to eat its grain).",
        birthDate: new Date("1655-01-01"),
        deathDate: new Date("1718-01-07"),
        achievements: [
          "Pioneered collective farming and peasant rights in 17th-century Sindh",
          "Championed the legendary economic principle 'Jo Khere So Khaaye'",
          "Endured martyrdom in defence of social justice and oppressed farmers"
        ],
        images: ["https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800"],
        featured: true,
        company: "Jhok Sharif Shrine",
        awards: ["Shaheed-e-Insaaf", "Sufi of the Peasants"],
        timeline: [
          { year: "1655", event: "Born in Miranpur (Jhok Sharif), Sindh" },
          { year: "1710", event: "Instituted the collective agricultural commune" },
          { year: "1718", event: "Martyred defending peasant rights against feudal rulers" }
        ],
        sponsored: false
      }
    ]);

    // 5. Seed Real Positive Stories from Sindh
    await Article.create([
      {
        title: "The Hala Ceramic Renaissance: How Kashikari Artisans are Entering Global Markets",
        subtitle: "Traditional glazed cobalt tiles of Hala find prestige in contemporary architectural projects worldwide.",
        slug: "hala-kashikari-renaissance",
        category: "Heritage & Craft",
        tags: ["Hala", "Kashikari", "Craft", "Pottery", "Sindh"],
        content: "<p>For centuries, the kilns of Hala in central Sindh have produced distinctive cobalt-blue and turquoise glazed tiles known as Kashikari. Today, a new generation of young Sindhi artisans is combining generational knowledge with modern e-commerce, exporting handcrafted urns, decorative tiles, and tableware to interior designers across London, Dubai, and New York.</p>",
        authorId: adminUser._id,
        readTime: "5 min",
        featured: true,
        relatedPersonalities: [personalities[1]._id],
        province: "Sindh",
        city: "Hala"
      },
      {
        title: "Thar's Green Energy Revolution: Empowering Women Engineers & Drivers",
        subtitle: "How community development projects in Tharparkar are providing education and high-skill technical employment.",
        slug: "thar-green-transformation",
        category: "Positive Sindh",
        tags: ["Thar", "Women Empowerment", "Energy", "Education"],
        content: "<p>In the heart of the Thar Desert, transformative development programs have created opportunities once unimaginable: hundreds of local Thari women have trained as professional heavy-vehicle drivers, environmental technicians, and solar engineers. Alongside solar-powered water filtration plants, Thar is witnessing a proud socio-economic rebirth.</p>",
        authorId: contributorUser._id,
        readTime: "6 min",
        featured: true,
        province: "Sindh",
        city: "Mithi, Tharparkar"
      },
      {
        title: "From Khairpur to Global Tech: The Young Coders Powering Sindh's Freelance Boom",
        subtitle: "Tech hubs in Sukkur, Khairpur, and Hyderabad are driving export growth and training thousands in AI and software.",
        slug: "sindh-youth-tech-boom",
        category: "Tech & Youth",
        tags: ["Sukkur", "Tech", "Freelancing", "Youth", "Sindh"],
        content: "<p>Young innovators from Sukkur IBA and Mehran University of Engineering and Technology (MUET) are founding AI startups and remote engineering agencies. Sindh's digital youth are now generating millions in remote software exports while launching community bootcamps for girls in interior Sindh.</p>",
        authorId: contributorUser._id,
        readTime: "7 min",
        featured: true,
        province: "Sindh",
        city: "Sukkur"
      }
    ]);

    // 6. Seed Real Cultural Events in Sindh
    const events = await Event.create([
      {
        title: "Sindh Cultural Day 2026 (Ekta Day)",
        date: new Date("2026-12-06"),
        description: "The grand annual celebration of Sindhi culture, Ajrak, Sindhi Topi, and traditional musical concerts held across Karachi, Hyderabad, Sukkur, and all districts.",
        location: "Karachi Arts Council & All Sindh Districts",
        status: "upcoming"
      },
      {
        title: "Annual Urs Mubarak of Shah Abdul Latif Bhittai",
        date: new Date("2026-09-18"),
        description: "A 3-day spiritual congregation featuring legendary Sufi raagi singers, the Shah Jo Risalo conference, and traditional Sugharan gatherings.",
        location: "Bhit Shah, Matiari, Sindh",
        status: "upcoming"
      },
      {
        title: "Lahooti Melo & Indus River Festival",
        date: new Date("2026-11-15"),
        description: "Celebrating indigenous folk music, environmental river protection, and indigenous artists along the banks of the Indus.",
        location: "Hyderabad, Sindh",
        status: "upcoming"
      }
    ]);

    // 7. Seed Real Sindh Heritage Gallery
    const gallery = await Gallery.create([
      {
        title: "The Great Stupa & Assembly Hall at Mohenjo-daro",
        category: "Indus Valley Civilization",
        imageUrl: "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=800"
      },
      {
        title: "Ajrak Block Printing Craft at Bhit Shah",
        category: "Traditional Crafts",
        imageUrl: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800"
      },
      {
        title: "Ranikot Fort – The Great Wall of Sindh",
        category: "Historical Forts",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800"
      },
      {
        title: "Intricate Stone Carvings of Makli Necropolis",
        category: "UNESCO World Heritage",
        imageUrl: "https://images.unsplash.com/photo-1548625361-16a707198bb6?w=800"
      }
    ]);

    return NextResponse.json({
      success: true,
      message: "Sindh Connect database successfully seeded with Top 20 All-Time Sindh Personalities, authentic creators, positive stories, and heritage archives!",
      usersCreated: 2,
      personalitiesCreated: personalities.length,
      articlesCreated: 3,
      eventsCreated: events.length,
      galleryCreated: gallery.length,
      configSeeded: true
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}
