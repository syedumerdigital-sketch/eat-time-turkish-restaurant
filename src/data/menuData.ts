export interface MenuItemSize {
  nameEn: string;
  nameAr: string;
  price: number;
}

export interface MenuItem {
  id: string;
  nameEn: string;
  nameAr: string;
  category: 'shawarma' | 'grills' | 'pizza' | 'appetizers' | 'beverages';
  descriptionEn: string;
  descriptionAr: string;
  basePrice: number;
  sizes?: MenuItemSize[];
  image: string;
  isPopular?: boolean;
  isSpecialty?: boolean;
  preparationTime?: string;
}

export const MENU_ITEMS: MenuItem[] = [
  // --- TURKISH SHAWARMA ---
  {
    id: 'tombik-shawarma',
    nameEn: 'Tombik Shawarma',
    nameAr: 'شاورما تومبيك تركية',
    category: 'shawarma',
    descriptionEn: 'Crispy freshly baked Turkish round bread stuffed with tender shaved beef & chicken, pickles, sumac onions & house garlic sauce.',
    descriptionAr: 'خبز تومبيك تركي دائري طازج ومقرمش محشو بشرائح الشاورما الشهية مع المخلل وبصل السماق وصوص الثوم الخاص.',
    basePrice: 15,
    image: '/src/assets/images/turkish_shawarma_tombik_1792075505289.jpg',
    isPopular: true,
    isSpecialty: true,
    preparationTime: '10 mins'
  },
  {
    id: 'shawarma-zurna',
    nameEn: 'Turkish Shawarma Zurna',
    nameAr: 'شاورما زورنا تركية',
    category: 'shawarma',
    descriptionEn: 'The famous extra-long Turkish lavash shawarma wrap, toasted on the grill with spiced butter and savory secret sauce.',
    descriptionAr: 'رول الشاورما التركي الشهير الطويل بالخبز المحمص على الجريل مع الزبدة المتبلة وصوص الشاورما الأصلي.',
    basePrice: 15,
    sizes: [
      { nameEn: 'Regular (عادي)', nameAr: 'عادي', price: 15 },
      { nameEn: 'Large (كبير)', nameAr: 'كبير', price: 20 }
    ],
    image: '/src/assets/images/turkish_shawarma_tombik_1792075505289.jpg',
    isPopular: true,
    preparationTime: '10 mins'
  },
  {
    id: 'shawarma-arabic',
    nameEn: 'Shawarma Arabic Platter',
    nameAr: 'شاورما عربي',
    category: 'shawarma',
    descriptionEn: 'Sliced toasted shawarma wrap served with golden crispy french fries, creamy garlic dip, pickles, and fiery spicy sauce.',
    descriptionAr: 'رول شاورما مقطع يقدم مع بطاطس مقلية ذهبية ومقرمشة، متبل بالثوم الخاص، مخللات وشطة حارة.',
    basePrice: 25,
    sizes: [
      { nameEn: 'Single (فردي)', nameAr: 'فردي', price: 25 },
      { nameEn: 'Double (مزدوج)', nameAr: 'مزدوج', price: 35 },
      { nameEn: 'Triple Family (عائلي)', nameAr: 'عائلي ثلاثي', price: 45 }
    ],
    image: '/src/assets/images/turkish_shawarma_tombik_1792075505289.jpg',
    isPopular: true,
    preparationTime: '12 mins'
  },
  {
    id: 'chicken-shawarma-wrap',
    nameEn: 'Chicken Shawarma Wrap',
    nameAr: 'شاورما دجاج',
    category: 'shawarma',
    descriptionEn: 'Classic tender chicken shawarma wrapped in flatbread with crisp lettuce, pickles, and authentic garlic toum.',
    descriptionAr: 'شاورما دجاج كلاسيكية متبلة بتتبيلة تركية خاصة مع مخلل الخيار وصوص الثوم في خبز طازج.',
    basePrice: 9,
    sizes: [
      { nameEn: 'Small (صغير)', nameAr: 'صغير', price: 9 },
      { nameEn: 'Medium (وسط)', nameAr: 'وسط', price: 15 },
      { nameEn: 'Large (كبير)', nameAr: 'كبير', price: 20 }
    ],
    image: '/src/assets/images/turkish_shawarma_tombik_1792075505289.jpg',
    preparationTime: '8 mins'
  },
  {
    id: 'shawarma-lebanese-sammun',
    nameEn: 'Shawarma Lebanese / Sammun',
    nameAr: 'شاورما لبناني / صمون',
    category: 'shawarma',
    descriptionEn: 'Freshly carved shawarma served in traditional soft Lebanese wrap or freshly baked Iraqi sammun bread.',
    descriptionAr: 'شاورما لحم أو دجاج طازجة في خبز لبناني رقيق أو صمون عراقي مخبوز طازجاً.',
    basePrice: 8,
    sizes: [
      { nameEn: 'Lebanese (لبناني)', nameAr: 'لبناني', price: 8 },
      { nameEn: 'Sammun (صمون)', nameAr: 'صمون', price: 12 }
    ],
    image: '/src/assets/images/turkish_shawarma_tombik_1792075505289.jpg',
    preparationTime: '8 mins'
  },
  {
    id: 'shawarma-chicken-plate',
    nameEn: 'Shawarma Chicken Plate',
    nameAr: 'صحن شاورما دجاج',
    category: 'shawarma',
    descriptionEn: 'Generous platter of tender spiced chicken shawarma slices served with fresh Turkish bread, fries, and creamy toum.',
    descriptionAr: 'صحن سخي من شرائح شاورما الدجاج المتبلة يقدم مع الخبز التركي الطازج، البطاطس المقلية والثومية.',
    basePrice: 25,
    sizes: [
      { nameEn: 'Regular (عادي)', nameAr: 'عادي', price: 25 },
      { nameEn: 'Large (كبير)', nameAr: 'كبير', price: 35 },
      { nameEn: 'Family (عائلي)', nameAr: 'عائلي', price: 45 }
    ],
    image: '/src/assets/images/turkish_shawarma_tombik_1792075505289.jpg',
    preparationTime: '12 mins'
  },
  {
    id: 'kabab-tombik',
    nameEn: 'Kabab Tombik',
    nameAr: 'كباب تومبيك تركي',
    category: 'shawarma',
    descriptionEn: 'Grilled juicy minced Turkish kebab nestled inside warm round tombik bread with grilled tomato, onions & herbs.',
    descriptionAr: 'كباب تركي مشوي ومتبل داخل خبز تومبيك مقرمش مع طماطم مشوية وبصل وبقدونس.',
    basePrice: 20,
    image: '/src/assets/images/turkish_shawarma_tombik_1792075505289.jpg',
    preparationTime: '12 mins'
  },
  {
    id: 'turkish-kabab-sandwich',
    nameEn: 'Turkish Kabab Sandwich',
    nameAr: 'سندوتش كباب تركي',
    category: 'shawarma',
    descriptionEn: 'Charcoal-grilled spiced kebab skewer wrapped in toasted Turkish bread with sumac salad and tahini garlic sauce.',
    descriptionAr: 'سيخ كباب متبل مشوي على الفحم في خبز تركي محمص مع سلطة البصل بالسماق وصوص الطحينة.',
    basePrice: 22,
    sizes: [
      { nameEn: 'Regular (عادي)', nameAr: 'عادي', price: 22 },
      { nameEn: 'Large (كبير)', nameAr: 'كبير', price: 25 }
    ],
    image: '/src/assets/images/turkish_shawarma_tombik_1792075505289.jpg',
    preparationTime: '10 mins'
  },
  {
    id: 'shawarma-hommus',
    nameEn: 'Shawarma with Hommus',
    nameAr: 'شاورما مع حمص',
    category: 'shawarma',
    descriptionEn: 'Silky smooth chickpea hummus topped with warm spiced chicken or meat shawarma, extra virgin olive oil and pine nuts.',
    descriptionAr: 'حمص ناعم وغني مغطى بشرائح الشاورما الساخنة مع زيت الزيتون البكر ورشة سماق.',
    basePrice: 25,
    image: '/src/assets/images/turkish_shawarma_tombik_1792075505289.jpg',
    preparationTime: '10 mins'
  },
  {
    id: 'shawarma-rice',
    nameEn: 'Shawarma with Bukhari Rice',
    nameAr: 'شاورما مع أرز',
    category: 'shawarma',
    descriptionEn: 'Fragrant seasoned Bukhari rice topped with aromatic roasted shawarma cuts, toasted nuts, and garlic sauce.',
    descriptionAr: 'أرز بخاري معطر مغطى بشرائح الشاورما التركية الغنية بالنكهات والمكسرات المحمصة وصوص الثوم.',
    basePrice: 25,
    image: '/src/assets/images/turkish_bbq_grills_1792075506548.jpg',
    preparationTime: '12 mins'
  },

  // --- CHARCOAL GRILLS & BBQ ---
  {
    id: 'mix-grill',
    nameEn: 'Turkish Mix Grill',
    nameAr: 'مشاوي مشكل تركي',
    category: 'grills',
    descriptionEn: 'The ultimate charcoal barbecue feast: Kofta meat, Shish Tawook chicken, and tender lamb chops served with Turkish flatbread, grilled peppers & onions.',
    descriptionAr: 'تشكيلة مشاوي فاخرة على الفحم: كفتة لحم، شيش طاووق، وريش غنم مع الخبز التركي والخضار المشوية.',
    basePrice: 40,
    sizes: [
      { nameEn: '1 Skewer Platter (صحن مشكل)', nameAr: 'صحن مشكل', price: 40 },
      { nameEn: 'Half Kg (نصف كيلو)', nameAr: 'نصف كيلو', price: 80 },
      { nameEn: '1 Kg (كيلو كامل)', nameAr: 'كيلو كامل', price: 120 },
      { nameEn: 'Family Feast (صحن عائلي فاخر)', nameAr: 'صحن عائلي فاخر', price: 150 }
    ],
    image: '/src/assets/images/hero_turkish_grills_1792075504962.jpg',
    isPopular: true,
    isSpecialty: true,
    preparationTime: '18 mins'
  },
  {
    id: 'kofta-meat',
    nameEn: 'Kofta Meat (Adana Style)',
    nameAr: 'كفتة لحم (طراز أضنة)',
    category: 'grills',
    descriptionEn: 'Minced prime lamb and beef kneaded with Turkish spices and roasted over red-hot charcoal, served on warm lavash.',
    descriptionAr: 'لحم ضأن وبقري مفروم ومتبل بالبهارات التركية ومشوي على جمر الفحم، يقدم على خبز اللافاش الساخن.',
    basePrice: 40,
    sizes: [
      { nameEn: 'Half Kg (نصف كيلو)', nameAr: 'نصف كيلو', price: 40 },
      { nameEn: '1 Kg (كيلو كامل)', nameAr: 'كيلو كامل', price: 80 },
      { nameEn: 'Family Platter (عائلي)', nameAr: 'عائلي', price: 150 }
    ],
    image: '/src/assets/images/turkish_bbq_grills_1792075506548.jpg',
    isPopular: true,
    preparationTime: '15 mins'
  },
  {
    id: 'shish-tawook',
    nameEn: 'Shish Tawook Chicken',
    nameAr: 'شيش طاووق دجاج',
    category: 'grills',
    descriptionEn: 'Succulent marinated chicken breast skewers grilled over natural charcoal with garlic toum, french fries and grilled vegetables.',
    descriptionAr: 'قطع صدور دجاج متبلة بالزبادي والليمون والبهارات التركية مشوية على الفحم مع الثومية والبطاطس.',
    basePrice: 25,
    sizes: [
      { nameEn: 'Regular Platter (صحن عادي)', nameAr: 'صحن عادي', price: 25 },
      { nameEn: '1 Kg Platter (كيلو كامل)', nameAr: 'كيلو كامل', price: 120 }
    ],
    image: '/src/assets/images/turkish_bbq_grills_1792075506548.jpg',
    isPopular: true,
    preparationTime: '15 mins'
  },
  {
    id: 'shagaf-meat',
    nameEn: 'Shagaf Meat (Charcoal Lamb Cubes)',
    nameAr: 'شقف لحم مشوي',
    category: 'grills',
    descriptionEn: 'Tender cubes of premium marinated lamb skewered and charcoal grilled to juicy perfection with biwaz salad.',
    descriptionAr: 'قطع لحم ضأن طرية ومتبلة بعناية مشوية على الفحم وتقدم مع سلطة البقدونس والبصل بالسماق.',
    basePrice: 40,
    sizes: [
      { nameEn: 'Half Kg (نصف كيلو)', nameAr: 'نصف كيلو', price: 40 },
      { nameEn: '1 Kg (كيلو كامل)', nameAr: 'كيلو كامل', price: 80 },
      { nameEn: 'Family Platter (عائلي)', nameAr: 'عائلي', price: 150 }
    ],
    image: '/src/assets/images/hero_turkish_grills_1792075504962.jpg',
    preparationTime: '18 mins'
  },
  {
    id: 'kofta-chicken',
    nameEn: 'Kofta Chicken',
    nameAr: 'كفتة دجاج مشوية',
    category: 'grills',
    descriptionEn: 'Finely minced chicken spiced with coriander, garlic and red pepper paste, grilled over glowing embers.',
    descriptionAr: 'دجاج مفروم ناعم متبل بالكزبرة والثوم ومعجون الفلفل التركي ومشوي على الجمر.',
    basePrice: 30,
    sizes: [
      { nameEn: 'Half Kg (نصف كيلو)', nameAr: 'نصف كيلو', price: 30 },
      { nameEn: '1 Kg (كيلو كامل)', nameAr: 'كيلو كامل', price: 60 },
      { nameEn: 'Family Platter (عائلي)', nameAr: 'عائلي', price: 120 }
    ],
    image: '/src/assets/images/turkish_bbq_grills_1792075506548.jpg',
    preparationTime: '15 mins'
  },
  {
    id: 'lamb-chops',
    nameEn: 'Lamb Chops (Pirzola)',
    nameAr: 'ريش لحم الضأن',
    category: 'grills',
    descriptionEn: 'Prime tender lamb cutlets flame-seared on the grill with Turkish sea salt, oregano, and charred tomatoes.',
    descriptionAr: 'ريش لحم ضأن طرية مشوية على اللهب مع ملح البحر والزعتر البري والطماطم المشوية.',
    basePrice: 40,
    sizes: [
      { nameEn: 'Platter (صحن)', nameAr: 'صحن', price: 40 },
      { nameEn: 'Half Kg (نصف كيلو)', nameAr: 'نصف كيلو', price: 80 },
      { nameEn: '1 Kg (كيلو كامل)', nameAr: 'كيلو كامل', price: 150 }
    ],
    image: '/src/assets/images/hero_turkish_grills_1792075504962.jpg',
    isSpecialty: true,
    preparationTime: '20 mins'
  },
  {
    id: 'chicken-wings-bbq',
    nameEn: 'Charcoal Chicken Wings',
    nameAr: 'أجنحة دجاج مشوية',
    category: 'grills',
    descriptionEn: 'Crispy skin and juicy chicken wings marinated in Turkish red pepper rub, grilled over open coals.',
    descriptionAr: 'أجنحة دجاج طرية ومقرمشة متبلة بتتبيلة الفلفل الأحمر التركي ومشوية على الفحم.',
    basePrice: 25,
    sizes: [
      { nameEn: 'Half Platter (نصف صحن)', nameAr: 'نصف صحن', price: 25 },
      { nameEn: 'Full Platter (صحن كامل)', nameAr: 'صحن كامل', price: 50 },
      { nameEn: 'Jumbo Platter (جامبو عائلي)', nameAr: 'جامبو عائلي', price: 100 }
    ],
    image: '/src/assets/images/turkish_bbq_grills_1792075506548.jpg',
    preparationTime: '15 mins'
  },
  {
    id: 'bbq-chicken-rice',
    nameEn: 'BBQ Charcoal Chicken with Rice',
    nameAr: 'دجاج مشوي مع أرز بخاري',
    category: 'grills',
    descriptionEn: 'Whole or half chicken charcoal-roasted with crispy skin, served atop spiced golden Bukhari rice with spicy daqoos.',
    descriptionAr: 'دجاج مشوي على الفحم متبل يقدم مع أرز بخاري شهي وصلصة الدقوس الحارة وصوص الثوم.',
    basePrice: 15,
    sizes: [
      { nameEn: 'Half Chicken (نصف دجاجة)', nameAr: 'نصف دجاجة', price: 15 },
      { nameEn: 'Full Chicken (دجاجة كاملة)', nameAr: 'دجاجة كاملة', price: 25 },
      { nameEn: 'Large Platter with Rice (صحن كبير)', nameAr: 'صحن كبير مع الأرز', price: 35 }
    ],
    image: '/src/assets/images/turkish_bbq_grills_1792075506548.jpg',
    isPopular: true,
    preparationTime: '15 mins'
  },
  {
    id: 'fillet-fish-bbq',
    nameEn: 'Fillet-Fish BBQ',
    nameAr: 'سمك فيليه مشوي على الفحم',
    category: 'grills',
    descriptionEn: 'Fresh seasoned fish fillet grilled with Turkish lemon-herb butter, served with french fries and tartar sauce.',
    descriptionAr: 'فيليه سمك طازج متبل بخلطة الليمون والأعشاب التركية ومشوي على الفحم مع البطاطس المقرمشة.',
    basePrice: 25,
    image: '/src/assets/images/turkish_bbq_grills_1792075506548.jpg',
    preparationTime: '18 mins'
  },
  {
    id: 'bbq-sandwich-tawook',
    nameEn: 'BBQ Sandwich (Shish Tawook / Kofta)',
    nameAr: 'سندوتشات مشاوي على الفحم',
    category: 'grills',
    descriptionEn: 'Freshly grilled skewer inside warm bread with pickles, fries and garlic sauce.',
    descriptionAr: 'سيخ مشوي على الفحم طازج داخل خبز ساخن مع المخلل والبطاطس والثومية.',
    basePrice: 10,
    sizes: [
      { nameEn: 'Shish Tawook Regular', nameAr: 'شيش طاووق عادي', price: 10 },
      { nameEn: 'Shish Tawook Large', nameAr: 'شيش طاووق كبير', price: 20 },
      { nameEn: 'Meat Kofta Regular', nameAr: 'كفتة لحم عادي', price: 12 },
      { nameEn: 'Meat Kofta Large', nameAr: 'كفتة لحم كبير', price: 20 },
      { nameEn: 'Shagaf Lamb Large', nameAr: 'شقف لحم كبير', price: 20 }
    ],
    image: '/src/assets/images/turkish_bbq_grills_1792075506548.jpg',
    preparationTime: '10 mins'
  },

  // --- PIZZAS & FATAYER ---
  {
    id: 'pizza-wahsh',
    nameEn: 'Pizza Wahsh (Monster Pizza)',
    nameAr: 'بيتزا وحش (بيتزا وقت الأكل العملاقة)',
    category: 'pizza',
    descriptionEn: 'The signature Eat Time Monster Pizza loaded with spiced Turkish minced meat, pepperoni, chicken, mozzarella, bell peppers and secret sauce.',
    descriptionAr: 'بيتزا وحش الشهيرة من مطعم وقت الأكل، محشوة باللحم المفروم المتبل، الدجاج، الموزاريلا الغنية وصلصة وقت الأكل السرية.',
    basePrice: 30,
    sizes: [
      { nameEn: 'Small (صغير)', nameAr: 'صغير', price: 30 },
      { nameEn: 'Medium (وسط)', nameAr: 'وسط', price: 40 },
      { nameEn: 'Large (كبير)', nameAr: 'كبير', price: 50 },
      { nameEn: 'Super Party (سوبر عائلي 90 QAR)', nameAr: 'سوبر عائلي', price: 90 }
    ],
    image: '/src/assets/images/turkish_pizza_wahsh_1792075505009.jpg',
    isPopular: true,
    isSpecialty: true,
    preparationTime: '18 mins'
  },
  {
    id: 'turkish-eat-time-vip',
    nameEn: 'Turkish Eat Time VIP Fatayer',
    nameAr: 'فطاير تركي VIP وقت الأكل',
    category: 'pizza',
    descriptionEn: 'Oven-baked Turkish boat pide layered with premium minced lamb, cheese blend, egg wash and sesame crust.',
    descriptionAr: 'فطيرة بيدا تركية فاخرة مخبوزة بالفرن الحجري باللحم المفروم الطازج ومزيج الأجبان التركية والسمسم.',
    basePrice: 25,
    sizes: [
      { nameEn: 'Regular VIP (عادي)', nameAr: 'عادي', price: 25 },
      { nameEn: 'Special VIP (خاص كبير)', nameAr: 'خاص كبير', price: 50 }
    ],
    image: '/src/assets/images/turkish_pizza_wahsh_1792075505009.jpg',
    isPopular: true,
    isSpecialty: true,
    preparationTime: '15 mins'
  },
  {
    id: 'pizza-margarita',
    nameEn: 'Pizza Margarita',
    nameAr: 'بيتزا مارغريتا',
    category: 'pizza',
    descriptionEn: 'Classic stone-baked pizza with rich San Marzano tomato sauce, double mozzarella, and fragrant basil oregano.',
    descriptionAr: 'بيتزا كلاسيكية مخبوزة على الحجر مع صلصة الطماطم الغنية وجبنة الموزاريلا الذائبة والأوريغانو.',
    basePrice: 25,
    sizes: [
      { nameEn: 'Small (صغير)', nameAr: 'صغير', price: 25 },
      { nameEn: 'Medium (وسط)', nameAr: 'وسط', price: 35 },
      { nameEn: 'Large (كبير)', nameAr: 'كبير', price: 45 }
    ],
    image: '/src/assets/images/turkish_pizza_wahsh_1792075505009.jpg',
    preparationTime: '15 mins'
  },
  {
    id: 'pizza-chicken',
    nameEn: 'Pizza Chicken BBQ',
    nameAr: 'بيتزا دجاج بالجبن',
    category: 'pizza',
    descriptionEn: 'Tender seasoned chicken slices, golden melted mozzarella, sweet peppers, mushrooms and savory pizza sauce.',
    descriptionAr: 'قطع دجاج متبلة لذيذة مع جبنة الموزاريلا الذائبة، الفلفل الحلو، الفطر وصلصة البيتزا الغنية.',
    basePrice: 25,
    sizes: [
      { nameEn: 'Small (صغير)', nameAr: 'صغير', price: 25 },
      { nameEn: 'Medium (وسط)', nameAr: 'وسط', price: 35 },
      { nameEn: 'Large (كبير)', nameAr: 'كبير', price: 45 }
    ],
    image: '/src/assets/images/turkish_pizza_wahsh_1792075505009.jpg',
    preparationTime: '15 mins'
  },
  {
    id: 'tepsi-kebab',
    nameEn: 'Tepsi Kebab (Oven Tray Kebab)',
    nameAr: 'تبيسة لحم بالفرن (تيبسي كباب)',
    category: 'pizza',
    descriptionEn: 'Hatay-style minced beef and lamb baked in a round copper tray with tomatoes, chili, garlic, and rich meat juices.',
    descriptionAr: 'لحم ضأن وبقري مفروم بالصينية على طريقة أنطاكيا التركية مخبوز بالفرن مع الطماطم والفلفل الحار والثوم.',
    basePrice: 90,
    sizes: [
      { nameEn: 'Medium Tray (صينية وسط)', nameAr: 'صينية وسط', price: 90 },
      { nameEn: 'Large Tray (صينية عائلية كبرى)', nameAr: 'صينية عائلية كبرى', price: 180 }
    ],
    image: '/src/assets/images/hero_turkish_grills_1792075504962.jpg',
    isSpecialty: true,
    preparationTime: '25 mins'
  },
  {
    id: 'kagit-kebab',
    nameEn: 'Kağıt Kebab (Paper-Baked Turkish Kebab)',
    nameAr: 'كبيّة كباب (كباب ورقي تركي)',
    category: 'pizza',
    descriptionEn: 'Traditional parchment paper-baked kebab locking in tender aromas, garlic, fresh tomatoes, and pepper essence.',
    descriptionAr: 'كباب تركي أصيل مخبوز داخل ورق مخصص ليحتفظ بكامل العصارة والنكهات الطبيعية اللذيذة.',
    basePrice: 50,
    image: '/src/assets/images/hero_turkish_grills_1792075504962.jpg',
    preparationTime: '20 mins'
  },
  {
    id: 'fukkar-meat',
    nameEn: 'Fukkar Meat (Clay Pot Casserole)',
    nameAr: 'فخارة لحم تركية',
    category: 'pizza',
    descriptionEn: 'Slow-cooked succulent beef and lamb in a sealed clay pot with garlic, baby onions and tomatoes, finished in fire.',
    descriptionAr: 'طاجن فخار تركي أصيل من اللحم الطري المطهو ببطء مع البصل والثوم وصلصة الطماطم الغنية.',
    basePrice: 90,
    sizes: [
      { nameEn: 'Single Pot (فردي)', nameAr: 'فردي', price: 90 },
      { nameEn: 'Family Pot (عائلي)', nameAr: 'عائلي', price: 180 }
    ],
    image: '/src/assets/images/hero_turkish_grills_1792075504962.jpg',
    isSpecialty: true,
    preparationTime: '25 mins'
  },
  {
    id: 'fukkar-chicken',
    nameEn: 'Fukkar Chicken (Clay Pot Casserole)',
    nameAr: 'فخارة دجاج تركية',
    category: 'pizza',
    descriptionEn: 'Clay pot bubbling chicken casserole cooked with Mediterranean spices, sweet peppers, garlic and rich tomato stew.',
    descriptionAr: 'طاجن فخار دجاج تركي يغلي بالفرن مع الفلفل الرومي، الثوم، والبهارات العطرية الشهية.',
    basePrice: 70,
    sizes: [
      { nameEn: 'Single Pot (فردي)', nameAr: 'فردي', price: 70 },
      { nameEn: 'Family Pot (عائلي)', nameAr: 'عائلي', price: 140 }
    ],
    image: '/src/assets/images/hero_turkish_grills_1792075504962.jpg',
    preparationTime: '25 mins'
  },

  // --- APPETIZERS & SALADS ---
  {
    id: 'mix-appetizer',
    nameEn: 'Mix Turkish Appetizer Platter',
    nameAr: 'مقبلات مشكلة فاخرة',
    category: 'appetizers',
    descriptionEn: 'Grand sampling platter of Hummus, Mutabbal, Babagannuch, Muhammara, and fresh vine pickles with warm pita.',
    descriptionAr: 'تشكيلة مقبلات مشكلة تضم الحمص، المتبل، بابا غنوج، المحمرة والمخللات مع الخبز الطازج.',
    basePrice: 15,
    sizes: [
      { nameEn: 'Small (صغير)', nameAr: 'صغير', price: 15 },
      { nameEn: 'Medium (وسط)', nameAr: 'وسط', price: 25 },
      { nameEn: 'Large (كبير)', nameAr: 'كبير', price: 35 },
      { nameEn: 'Party Platter (صحن عزيمة)', nameAr: 'صحن عزيمة', price: 50 }
    ],
    image: '/src/assets/images/hero_turkish_grills_1792075504962.jpg',
    isPopular: true,
    preparationTime: '5 mins'
  },
  {
    id: 'fattoush',
    nameEn: 'Turkish / Levantine Fattoush',
    nameAr: 'فتوش بالرمان والسماق',
    category: 'appetizers',
    descriptionEn: 'Crisp garden greens, cucumbers, radishes, heirloom tomatoes tossed in pomegranate molasses dressing and topped with fried pita chips.',
    descriptionAr: 'سلطة خضار طازجة مع الخيار، الطماطم، الفجل، دبس الرمان الفاخر والسماق مع قطع الخبز المقرمش.',
    basePrice: 15,
    sizes: [
      { nameEn: 'Regular (عادي)', nameAr: 'عادي', price: 15 },
      { nameEn: 'Large (كبير)', nameAr: 'كبير', price: 25 }
    ],
    image: '/src/assets/images/hero_turkish_grills_1792075504962.jpg',
    isPopular: true,
    preparationTime: '5 mins'
  },
  {
    id: 'hommos',
    nameEn: 'Silky Turkish Hommos',
    nameAr: 'حمص ناعم بالزيت',
    category: 'appetizers',
    descriptionEn: 'Creamy blended chickpeas, tahini, garlic, and lemon juice drizzled with cold-pressed virgin olive oil.',
    descriptionAr: 'حمص مهروس ناعم مع الطحينة وعصير الليمون والثوم مغطى بزيت الزيتون البكر.',
    basePrice: 10,
    sizes: [
      { nameEn: 'Small (صغير)', nameAr: 'صغير', price: 10 },
      { nameEn: 'Medium (وسط)', nameAr: 'وسط', price: 15 },
      { nameEn: 'Large (كبير)', nameAr: 'كبير', price: 25 }
    ],
    image: '/src/assets/images/hero_turkish_grills_1792075504962.jpg',
    preparationTime: '5 mins'
  },
  {
    id: 'motabbal',
    nameEn: 'Motabbal Eggplant Dip',
    nameAr: 'متبل باذنجان مشوي',
    category: 'appetizers',
    descriptionEn: 'Smoky fire-roasted eggplant mashed with tahini, yogurt, garlic, lemon and garnished with pomegranate arils.',
    descriptionAr: 'باذنجان مشوي على النار ومهروس مع الطحينة، الزبادي، عصير الليمون وزيت الزيتون.',
    basePrice: 10,
    sizes: [
      { nameEn: 'Small (صغير)', nameAr: 'صغير', price: 10 },
      { nameEn: 'Medium (وسط)', nameAr: 'وسط', price: 15 },
      { nameEn: 'Large (كبير)', nameAr: 'كبير', price: 25 }
    ],
    image: '/src/assets/images/hero_turkish_grills_1792075504962.jpg',
    preparationTime: '5 mins'
  },
  {
    id: 'babagannuch',
    nameEn: 'Babagannuch',
    nameAr: 'بابا غنوج',
    category: 'appetizers',
    descriptionEn: 'Charred eggplant tossed with chopped bell peppers, parsley, garlic, walnuts, and tangy pomegranate syrup.',
    descriptionAr: 'باذنجان مشوي على الفحم ممزوج مع الفلفل الملون والبقدونس ودبس الرمان والجوز.',
    basePrice: 10,
    sizes: [
      { nameEn: 'Small (صغير)', nameAr: 'صغير', price: 10 },
      { nameEn: 'Medium (وسط)', nameAr: 'وسط', price: 15 },
      { nameEn: 'Large (كبير)', nameAr: 'كبير', price: 25 }
    ],
    image: '/src/assets/images/hero_turkish_grills_1792075504962.jpg',
    preparationTime: '5 mins'
  },
  {
    id: 'muhammara',
    nameEn: 'Muhammara Dip',
    nameAr: 'محمرة بالجوز والرمان',
    category: 'appetizers',
    descriptionEn: 'Roasted Aleppo red pepper and toasted walnut spread sweetened with pomegranate molasses and aromatic spices.',
    descriptionAr: 'معجون الفلفل الأحمر المشوي مع الجوز المحمص، دبس الرمان، وزيت الزيتون الأصلي.',
    basePrice: 10,
    sizes: [
      { nameEn: 'Small (صغير)', nameAr: 'صغير', price: 10 },
      { nameEn: 'Medium (وسط)', nameAr: 'وسط', price: 15 },
      { nameEn: 'Large (كبير)', nameAr: 'كبير', price: 25 }
    ],
    image: '/src/assets/images/hero_turkish_grills_1792075504962.jpg',
    preparationTime: '5 mins'
  },
  {
    id: 'tabbouleh',
    nameEn: 'Tabbouleh Salad',
    nameAr: 'تبولة لبنانية خضراء',
    category: 'appetizers',
    descriptionEn: 'Freshly minced Italian parsley, mint, diced vine tomatoes, and fine bulgur tossed in extra virgin olive oil and lemon.',
    descriptionAr: 'بقدونس طازج مفروم مع النعناع، الطماطم والبرغل الناعم بزيت الزيتون وعصير الليمون.',
    basePrice: 10,
    sizes: [
      { nameEn: 'Small (صغير)', nameAr: 'صغير', price: 10 },
      { nameEn: 'Medium (وسط)', nameAr: 'وسط', price: 15 },
      { nameEn: 'Large (كبير)', nameAr: 'كبير', price: 25 }
    ],
    image: '/src/assets/images/hero_turkish_grills_1792075504962.jpg',
    preparationTime: '5 mins'
  },
  {
    id: 'olive-salad',
    nameEn: 'Marinated Olive Salad',
    nameAr: 'سلطة زيتون متبلة',
    category: 'appetizers',
    descriptionEn: 'Spiced green and black olives tossed with diced tomatoes, herbs, thyme and spicy pepper paste.',
    descriptionAr: 'زيتون أخضر وأسود متبل مع قطع الطماطم والزعتر ومعجون الفلفل الشهي وزيت الزيتون.',
    basePrice: 10,
    sizes: [
      { nameEn: 'Small (صغير)', nameAr: 'صغير', price: 10 },
      { nameEn: 'Medium (وسط)', nameAr: 'وسط', price: 15 },
      { nameEn: 'Large (كبير)', nameAr: 'كبير', price: 25 }
    ],
    image: '/src/assets/images/hero_turkish_grills_1792075504962.jpg',
    preparationTime: '5 mins'
  },
  {
    id: 'green-salad',
    nameEn: 'Fresh Green Salad',
    nameAr: 'سلطة خضراء طازجة',
    category: 'appetizers',
    descriptionEn: 'Crisp lettuce, cucumber, tomato, mint and lemon-olive oil dressing.',
    descriptionAr: 'خس مقرمش وخيار وطماطم مع النعناع وزيت الزيتون والليمون.',
    basePrice: 15,
    image: '/src/assets/images/hero_turkish_grills_1792075504962.jpg',
    preparationTime: '5 mins'
  },

  // --- BEVERAGES & EXTRAS ---
  {
    id: 'ayran-yogurt',
    nameEn: 'Traditional Turkish Ayran',
    nameAr: 'لبن عيران تركي طازج',
    category: 'beverages',
    descriptionEn: 'Frothy, chilled yogurt beverage with a hint of sea salt and dried mint, the classic accompaniment to Turkish grills.',
    descriptionAr: 'مشروب اللبن الزبادي التركي المنعش والمثلج برغوة غنية وقليل من الملح والنعناع.',
    basePrice: 5,
    image: '/src/assets/images/hero_turkish_grills_1792075504962.jpg',
    isPopular: true,
    preparationTime: '2 mins'
  },
  {
    id: 'turkish-tea',
    nameEn: 'Authentic Turkish Tea (Çay)',
    nameAr: 'شاي تركي مخدر أصيل',
    category: 'beverages',
    descriptionEn: 'Brewed from Black Sea tea leaves in a double teapot, served piping hot in traditional tulip glasses.',
    descriptionAr: 'شاي تركي أسود مخدر ومقطف من مزارع البحر الأسود يقدم ساخناً بالنكهة الأصيلة.',
    basePrice: 3,
    image: '/src/assets/images/hero_turkish_grills_1792075504962.jpg',
    preparationTime: '2 mins'
  },
  {
    id: 'soft-drinks',
    nameEn: 'Chilled Soft Drinks',
    nameAr: 'مشروبات غازية باردة',
    category: 'beverages',
    descriptionEn: 'Choice of Pepsi, Diet Pepsi, 7Up, Mirinda, or Mountain Dew.',
    descriptionAr: 'تشكيلة مشروبات غازية منعشة (بيبسي، دايت بيبسي، سفن آب، ميرندا).',
    basePrice: 4,
    image: '/src/assets/images/hero_turkish_grills_1792075504962.jpg',
    preparationTime: '1 min'
  },
  {
    id: 'garlic-sauce-extra',
    nameEn: 'Extra Turkish Garlic Sauce (Toum)',
    nameAr: 'صلصة ثوم إضافية خاصة',
    category: 'beverages',
    descriptionEn: 'Signature creamy garlic dip whipped fresh daily.',
    descriptionAr: 'ثومية كريمية طازجة محضرة يومياً بتتبيلة خاصة.',
    basePrice: 3,
    image: '/src/assets/images/hero_turkish_grills_1792075504962.jpg',
    preparationTime: '1 min'
  },
  {
    id: 'fresh-turkish-bread',
    nameEn: 'Extra Fresh Turkish Bread (3 pcs)',
    nameAr: 'خبز تركي طازج إضافي (٣ قطع)',
    category: 'beverages',
    descriptionEn: 'Stone-baked warm Turkish bread straight from our ovens.',
    descriptionAr: 'خبز تركي ساخن مخبوز بالفرن الحجري.',
    basePrice: 3,
    image: '/src/assets/images/turkish_pizza_wahsh_1792075505009.jpg',
    preparationTime: '3 mins'
  }
];

export const RESTAURANT_INFO = {
  nameEn: 'Eat Time Turkish Restaurant',
  nameAr: 'مطعم وقت الأكل التركي',
  locationEn: 'Dukhan, Qatar (Near Commercial Center / Housing Area)',
  locationAr: 'دخان، دولة قطر (قرب المركز التجاري والمناطق السكنية)',
  deliveryNoticeEn: 'FREE HOME DELIVERY INSIDE DUKHAN',
  deliveryNoticeAr: 'توصيل منزلي مجاني داخل مدينة دخان',
  whatsappCheckout: '97450776800',
  whatsappSecondary: '97455900806',
  hotline1: '+974 5077 6800',
  hotline2: '+974 55900806',
  openingHoursEn: 'Daily: 11:00 AM – 1:30 AM',
  openingHoursAr: 'يومياً: ١١:٠٠ صباحاً – ١:٣٠ بعد منتصف الليل'
};
