/* Stacey Porter Antiques: product catalogue (from the S. Porter Antiques Chairish shop) */
const IMG = (id, slug) =>
  `https://chairish-prod.freetls.fastly.net/image/product/sized/${id}/${slug}?aspect=fit&width=900&height=900`;

const SHOP = {
  name: "Stacey Porter Antiques",
  phone: "312-403-4943",
  phoneHref: "tel:+13124034943",
  email: "staceyporterantiques@gmail.com",
  location: "Williams Bay, Wisconsin",
  chairish: "https://www.chairish.com/shop/p3g3qz",
  banner: "https://chairish-prod.freetls.fastly.net/image/account/sized/5c674013-3750-4b2f-a50a-2e83ea6306e8?aspect=max&width=1300&height=660",
};

const CATEGORIES = [
  { key: "furniture", label: "Furniture", icon: "fa-chair" },
  { key: "lighting", label: "Lighting", icon: "fa-lightbulb" },
  { key: "art", label: "Art & Prints", icon: "fa-image" },
  { key: "decor", label: "Decor & Accents", icon: "fa-gem" },
  { key: "tabletop", label: "Tabletop", icon: "fa-mug-hot" },
];

const PRODUCTS = [
  {
    id: "regency-armchair", cat: "furniture", era: "1970s", price: 2400,
    title: "Regency Style Black Lacquer & Gilt Chinoiserie Armchair",
    dims: '25.5"W × 32.5"D × 39"H · seat 19.5"H',
    desc: "An ebonized Regency style armchair in crackled black lacquer with hand painted gilt decoration. The crest rail shows classical warriors and horsemen, while the splats carry swans, trees and pavilions. Finished with a handwoven seagrass seat and a custom yellow loose cushion. Very good vintage condition.",
    url: "https://www.chairish.com/product/37969859/regency-style-black-lacquer-gilt-chinoiserie-neoclassical-armchair-with-hand-painted-classical-figu",
    imgs: [
      IMG("f95dc904-23fa-4a8a-8de4-d19011e9e245", "regency-style-black-lacquer-and-gilt-chinoiserie-neoclassical-armchair-with-hand-painted-classical-figures-seagrass-seat-and-yellow-cushion-5272"),
      IMG("54cb0309-b9b9-473a-a6eb-fe3b8a5d31aa", "regency-style-black-lacquer-and-gilt-chinoiserie-neoclassical-armchair-with-hand-painted-classical-figures-seagrass-seat-and-yellow-cushion-7544"),
      IMG("24433495-4f37-48e4-99fd-1c1c335fdbb1", "regency-style-black-lacquer-and-gilt-chinoiserie-neoclassical-armchair-with-hand-painted-classical-figures-seagrass-seat-and-yellow-cushion-8217"),
      IMG("3762bd9b-78b6-4c58-8d4a-5f2885adddb9", "regency-style-black-lacquer-and-gilt-chinoiserie-neoclassical-armchair-with-hand-painted-classical-figures-seagrass-seat-and-yellow-cushion-2863"),
      IMG("38ee5702-dc87-4fd3-a46a-ba96e9aa08a9", "regency-style-black-lacquer-and-gilt-chinoiserie-neoclassical-armchair-with-hand-painted-classical-figures-seagrass-seat-and-yellow-cushion-5118"),
    ],
  },
  {
    id: "louis-xv-mantel", cat: "decor", era: "Late 19th c.", price: 2600,
    title: "Antique French Louis XV Style Cast Iron Fireplace Mantel",
    dims: '40"W × 13.25"D × 38"H',
    desc: "A French cast iron fireplace surround in the Louis XV Rococo style, with a weathered cream faux limestone finish. It has a serpentine mantel shelf, an oval cartouche and a shell and floral crest above the firebox. Built in four sections and stable; an electric fireplace insert is included. Professional resecuring is recommended for permanent installation.",
    url: "https://www.chairish.com/product/35373715/antique-french-louis-xv-style-cast-iron-fireplace-mantel-with-rocaille-cartouche-painted-faux-stone",
    imgs: [
      IMG("669020dc-d857-4061-aab7-7f8c5b35f842", "antique-french-louis-xv-style-cast-iron-fireplace-mantel-with-rocaille-cartouche-painted-faux-stone-finish-0167"),
      IMG("3106996f-ad50-40a6-a241-a286f515d9a4", "antique-french-louis-xv-style-cast-iron-fireplace-mantel-with-rocaille-cartouche-painted-faux-stone-finish-7530"),
      IMG("923a6ea3-6c80-4a8e-a1ef-96a793506a12", "antique-french-louis-xv-style-cast-iron-fireplace-mantel-with-rocaille-cartouche-painted-faux-stone-finish-6122"),
      IMG("36314900-f0ff-4196-8ef3-e75d0284fb32", "antique-french-louis-xv-style-cast-iron-fireplace-mantel-with-rocaille-cartouche-painted-faux-stone-finish-7434"),
    ],
  },
  {
    id: "queen-anne-chair", cat: "furniture", era: "c. 1710", price: 4620,
    title: "Early 18th Century Queen Anne Walnut Side Chair",
    dims: '23"W × 21"D × 39"H',
    desc: "A British walnut Queen Anne side chair made around 1710, with a slim vase shaped splat, a heart shaped crest, pad footed cabriole legs and a herringbone upholstered drop seat. A rare early piece with beautiful age to the wood.",
    url: "https://www.chairish.com/product/1152589/early-18th-century-queen-anne-walnut-side-chair",
    imgs: [
      IMG("0a2ed755-a0b2-4559-87c8-69a49656fffc", "early-18th-century-queen-anne-walnut-side-chair-1391"),
      IMG("2cca9983-31d7-4445-9f39-a5b9d370e1a1", "early-18th-century-queen-anne-walnut-side-chair-1155"),
    ],
  },
  {
    id: "balloon-back-chairs", cat: "furniture", era: "1930s", price: 875, was: 2400,
    title: "Pair of French Louis XV Style Balloon Back Chairs",
    dims: '21"W × 22.5"D × 38.75"H (each)',
    desc: "A pair of French Louis XV style balloon back side chairs with silk embroidered dragonfly upholstery in raspberry pink and a walnut finish. Fully restored with new webbing, foam and fabric, ready for a dining room or bedroom.",
    url: "https://www.chairish.com/product/27125650/early-20th-c-french-design-accent-chairs-a-pair",
    imgs: [
      IMG("13ec984e-1088-4555-922e-8490679f309f", "pair-of-french-louis-xv-style-balloon-back-chairs-dragonfly-upholstery-walnut-finish-a-pair-7182"),
      IMG("608282e3-72f0-4cee-bd93-f6ae7a41e074", "pair-of-french-louis-xv-style-balloon-back-chairs-dragonfly-upholstery-walnut-finish-a-pair-7148"),
    ],
  },
  {
    id: "edward-curtis-arikara", cat: "art", era: "c. 1908", price: 4400, was: 7000,
    title: "Framed Edward Curtis “Arikara Girl” Photogravure",
    dims: '27"W × 1"D × 31"H',
    desc: "A framed, sepia toned photogravure of Edward Curtis's portrait Arikara Girl, made around 1908, from the Christopher Cordozo collection. A museum quality piece of American photographic history.",
    url: "https://www.chairish.com/product/4360518/framed-edward-curtis-arikara-girl-c-1908-christopher-cordozo",
    imgs: [
      IMG("6abe8c86-c374-44b7-a3dc-85067df7054a", "framed-edward-curtis-arikara-girl-c-1908-christopher-cordozo-7911"),
      IMG("65ef7e2a-440d-4b60-ae2d-704c82270a36", "framed-edward-curtis-arikara-girl-c-1908-christopher-cordozo-1467"),
    ],
  },
  {
    id: "tole-lamps", cat: "lighting", era: "Vintage", price: 495,
    title: "Vintage Black Tole Cupola Table Lamps, a Pair",
    dims: '4.75"W × 4.75"D × 32"H',
    desc: "A pair of black tole table lamps on clear acrylic bases, with dual sockets and pull chains. Recently professionally rewired, with a quiet neoclassical look that works in classic and modern rooms alike.",
    url: "https://www.chairish.com/product/17109376/vintage-black-tole-copula-table-lamps-a-pair",
    imgs: [
      IMG("676a5bdf-665a-4843-857a-757a9ec4e084", "vintage-black-tole-copula-table-lamps-a-pair-4893"),
      IMG("da52161b-8a1d-4e2d-82bd-f0ee32c482e2", "vintage-black-tole-copula-table-lamps-a-pair-6761"),
    ],
  },
  {
    id: "copper-kettle", cat: "tabletop", era: "Late 19th c.", price: 865, was: 2400,
    title: "Late 19th Century Copper Water Tea Kettle",
    dims: '18"W × 12.5"D × 18"H',
    desc: "A large copper and brass kettle with dovetailed joints and its original brass lid knob. The interior is clean and has darkened gently with age. A handsome hearth or kitchen piece.",
    url: "https://www.chairish.com/product/1412154/late-19th-century-vintage-copper-water-tea-kettle",
    imgs: [
      IMG("2145682b-5ff9-41f4-8340-d373d0f656be", "late-19th-century-vintage-copper-water-tea-kettle-5331"),
      IMG("86dab577-7758-456d-ac9a-7c18fe7f91ed", "late-19th-century-vintage-copper-water-tea-kettle-4037"),
    ],
  },
  {
    id: "kittinger-chest", cat: "furniture", era: "1970s", price: 825,
    title: "Vintage Kittinger Bachelor Chest Commode",
    dims: '30"W × 17.75"D × 30"H',
    desc: "A Kittinger bachelor chest in warm brown wood with antique brass hardware. It has a pull out top tray and five drawers in total, all in good original condition.",
    url: "https://www.chairish.com/product/5324542/vintage-kittenger-bachelor-chest-commode",
    imgs: [
      IMG("bc229f62-a9f1-4d38-b251-8c1dc3347ca3", "vintage-kittenger-bachelor-chest-commode-5126"),
      IMG("38f480df-47dc-429f-bf6e-af254961a6e2", "vintage-kittenger-bachelor-chest-commode-9973"),
    ],
  },
  {
    id: "vienna-engravings", cat: "art", era: "c. 1700", price: 1320, was: 2400,
    title: "Framed Copper Engravings, Views of Vienna, a Pair",
    dims: '24"W × 1"D × 20.5"H · sight 13.75" × 9.5"',
    desc: "A matched pair of framed 18th century copper engravings of Viennese architecture by Salomon Kleiner and Johann Georg Ringlin, purchased in New Orleans in the 1960s.",
    url: "https://www.chairish.com/product/6894343/framed-copper-engravings-views-of-vienna-c-1700",
    imgs: [
      IMG("3233a7cf-6e6b-4bb5-b264-292a42771e60", "framed-copper-engravings-views-of-vienna-c1700-a-pair-3977"),
      IMG("42bc7229-c7d3-4f50-a3d2-922e489bb8e3", "framed-copper-engravings-views-of-vienna-c1700-a-pair-5171"),
    ],
  },
  {
    id: "mercury-glass-lamp", cat: "lighting", era: "Early 20th c.", price: 225,
    title: "Vintage Melsom Mercury Glass Bottle Table Lamp",
    dims: '6.5"W × 6.5"D × 21.5"H',
    desc: "An English lamp made from a silvered, ribbed glass Melsom bottle with etched lettering, set on a dark turned wood base with a black tapered shade.",
    url: "https://www.chairish.com/product/37880869/vintage-melsom-mercury-glass-bottle-table-lamp",
    imgs: [
      IMG("67b28207-5b96-49ab-9038-cb7e3cf3f988", "vintage-melsom-mercury-glass-bottle-table-lamp-8718"),
      IMG("2ec3c1f1-0d1f-47ac-a4e3-10fa32e7a61f", "vintage-melsom-mercury-glass-bottle-table-lamp-5746"),
    ],
  },
  {
    id: "murano-roosters", cat: "decor", era: "1950s", price: 145,
    title: "Murano Glass Italy Rooster Figurines, a Pair",
    dims: '6.5"W × 4.5"D × 12"H',
    desc: "A 12 inch pair of Murano glass roosters, kept in one private home for over 75 years. Set them in a sunny window and the light glows right through the glass.",
    url: "https://www.chairish.com/product/26737701/c-1950s-12-murano-glass-italy-rooster-figurines-a-pair",
    imgs: [
      IMG("7aa59f8d-3c23-49ef-9803-97798762b52e", "c-1950s-12-murano-glass-italy-rooster-figurines-a-pair-7871"),
      IMG("f79d2d82-0e34-4056-aaba-e5ad5a9393cb", "c-1950s-12-murano-glass-italy-rooster-figurines-a-pair-9696"),
    ],
  },
  {
    id: "uttermost-mirror", cat: "decor", era: "Vintage", price: 275,
    title: "Vintage Uttermost Gold Leaf Wall Mirror",
    dims: '31"W × 1.5"D × 40.5"H',
    desc: "A wall mirror with beveled glass and an antiqued, hand painted gold leaf frame. Hangs horizontally or vertically, so it suits a mantel, entry or bedroom.",
    url: "https://www.chairish.com/product/26843688/vintage-uttermost-wall-mirror",
    imgs: [
      IMG("d3fe05dc-8181-476d-b41c-d719efb87cbf", "vintage-uttermost-wall-mirror-3970"),
      IMG("1330ab1d-6215-4b1b-bca6-d02bc8ed3bba", "vintage-uttermost-wall-mirror-1573"),
    ],
  },
  {
    id: "jensen-table", cat: "furniture", era: "Vintage", price: 303,
    title: "Maison Jansen Style Steel & Brass Tassel Occasional Table",
    dims: '24"W × 20"D × 24.5"H',
    desc: "An occasional table with a triangular glass top and thick beveled edge, resting on a steel and brass tassel base. A glamorous accent beside a sofa or reading chair.",
    url: "https://www.chairish.com/product/6058356/maison-jensen-style-steel-and-brass-tassel-glass-top-occasional-table",
    imgs: [
      IMG("b8e35110-1ce6-4d9f-ba82-8213b26b363d", "maison-jensen-style-steel-and-brass-tassel-glass-top-occasional-table-2013"),
      IMG("5e6f66d1-b071-4255-842b-c86ade7c1088", "maison-jensen-style-steel-and-brass-tassel-glass-top-occasional-table-4409"),
    ],
  },
  {
    id: "lion-window-stops", cat: "decor", era: "1800s", price: 275, was: 475,
    title: "Rockingham Staffordshire Yellow Ware Lion Window Stops, a Pair",
    dims: '3"W × 4.5"D × 4"H',
    desc: "A pair of early 19th century English lion window stops with crisp moulding and a Rockingham glaze, the yellow clay body showing through. Charming on a shelf or windowsill.",
    url: "https://www.chairish.com/product/21700879/1800s-rockingham-stafforshire-yellow-ware-lion-window-stop-a-pair",
    imgs: [
      IMG("cf6069e2-3920-45c9-b53a-f6dbcca1cb84", "1800s-rockingham-stafforshire-yellow-ware-lion-window-stop-a-pair-5640"),
      IMG("2ecc0275-f2e3-4bd8-a121-8b325dd80df8", "1800s-rockingham-stafforshire-yellow-ware-lion-window-stop-a-pair-3615"),
    ],
  },
  {
    id: "cloisonne-planter", cat: "decor", era: "1950s", price: 248,
    title: "Chinoiserie Cloisonné Brass Square Cache Pot",
    dims: '8.12"W × 8.12"D × 6.12"H',
    desc: "A brass cachepot decorated in cloisonné with an emperor's garden scene. Lovely for orchids and houseplants, with a soft patina that could be polished if you prefer a bright finish.",
    url: "https://www.chairish.com/product/5090626/chinoiserie-cloisonne-brass-sqaure-shaped-planter-cache-pot",
    imgs: [
      IMG("6fffe4c7-2533-4b4a-b557-3660087b6075", "chinoiserie-cloisonne-brass-sqaure-shaped-planter-cache-pot-4252"),
      IMG("ebaceed5-82e5-4a85-971d-f61cf1fbc512", "chinoiserie-cloisonne-brass-sqaure-shaped-planter-cache-pot-5108"),
    ],
  },
  {
    id: "capodimonte-box", cat: "tabletop", era: "1800s", price: 174, was: 2400,
    title: "Playing Cupids Capodimonte Keepsake Box",
    dims: '5.5"W × 3.75"D × 2.75"H',
    desc: "A hinged ceramic keepsake box decorated with musical cherubs and gilded accents. A sweet dressing table piece or a thoughtful gift.",
    url: "https://www.chairish.com/product/527590/playing-cupids-capodimonte-box",
    imgs: [
      IMG("fca7ad22-c260-4427-a76c-ed024ac2d031", "playing-cupids-capodimonte-box-9138"),
      IMG("7e09df35-7418-45e2-b231-5023d82b28ec", "playing-cupids-capodimonte-box-9190"),
    ],
  },
];

const FEATURED = ["regency-armchair", "louis-xv-mantel", "balloon-back-chairs", "edward-curtis-arikara", "tole-lamps", "copper-kettle", "murano-roosters", "kittinger-chest"];

/* REVIEWS
   Replace these SAMPLE entries with real customer reviews (copy them from the
   S. Porter Antiques reviews on Chairish). Set sample:false, or delete the key,
   on real ones and the "Sample" label disappears. */
const REVIEWS = [
  { sample: true, name: "Customer name", place: "City, State", stars: 5, item: "Queen Anne Walnut Side Chair", date: "2026",
    text: "Sample review. Paste a real customer review here, for example a comment about how carefully the piece was packed and how it matched the description." },
  { sample: true, name: "Customer name", place: "City, State", stars: 5, item: "Murano Glass Roosters", date: "2026",
    text: "Sample review. A real review about communication, shipping speed or the quality of the piece would go here." },
  { sample: true, name: "Customer name", place: "City, State", stars: 5, item: "Black Tole Table Lamps", date: "2026",
    text: "Sample review. Use a short, genuine quote from a buyer. Two or three sentences reads best." },
  { sample: true, name: "Customer name", place: "City, State", stars: 5, item: "Louis XV Balloon Back Chairs", date: "2026",
    text: "Sample review. Replace with a real review from a designer or collector who bought from the shop." },
  { sample: true, name: "Customer name", place: "City, State", stars: 5, item: "Copper Tea Kettle", date: "2026",
    text: "Sample review. Replace with a real review that mentions an in person visit to Williams Bay." },
  { sample: true, name: "Customer name", place: "City, State", stars: 5, item: "Uttermost Gold Leaf Mirror", date: "2026",
    text: "Sample review. Replace with a real review. You can add as many as you like and the slider adjusts automatically." },
];
