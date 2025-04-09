export const config = {
  companyName: "UZ Furniture",
  logoUrl: "/assets/logo.jpg",
  phoneNumber: "+1 (555) 123-4567",
  email: "contact@uzfurniture.com",

  // Hero Section
  heroImages: ["/assets/sofa_home.jpg", "/assets/home_2.png"],

  // Categories Section with Subcategories and Products
  categories: [
    {
      name: "Sofas",
      image: "/assets/categories/sofas.jpg",
      subcategories: [
        {
          name: "Sectional Sofas",
          image: "/assets/sofa_home.jpg",
          products: [
            {
              name: "Moderna Sectional",
              image: "/assets/sofa_home.jpg",
              price: 1299.99,
              salePrice: 1099.99,
              rating: 4.7,
              sizes: ["Small", "Medium", "Large"],
              colors: ["Gray", "Beige", "Navy"],
            },
            {
              name: "Luxe Sectional",
              image: "/assets/sofa_home.jpg",
              price: 1499.99,
              salePrice: null,
              rating: 4.5,
              sizes: ["Medium", "Large"],
              colors: ["Black", "White"],
            },
          ],
        },
        {
          name: "Loveseats",
          image: "/assets/sofa_home.jpg",
          products: [
            {
              name: "Cozy Loveseat",
              image: "/assets/sofa_home.jpg",
              price: 799.99,
              salePrice: 699.99,
              rating: 4.8,
              sizes: ["Standard"],
              colors: ["Red", "Gray"],
            },
          ],
        },
        {
          name: "Recliners",
          image: "/assets/sofa_home.jpg",
          products: [
            {
              name: "Relax Recliner",
              image: "/assets/sofa_home.jpg",
              price: 599.99,
              salePrice: 499.99,
              rating: 4.6,
              sizes: ["Standard", "Large"],
              colors: ["Brown", "Black"],
            },
          ],
        },
      ],
    },
    {
      name: "Tables",
      image: "/assets/categories/tables.jpg",
      subcategories: [
        {
          name: "Coffee Tables",
          image: "/assets/sofa_home.jpg",
          products: [
            {
              name: "Minimal Coffee Table",
              image: "/assets/sofa_home.jpg",
              price: 299.99,
              salePrice: null,
              rating: 4.4,
              sizes: ["Small", "Medium"],
              colors: ["Oak", "Espresso"],
            },
          ],
        },
        {
          name: "Dining Tables",
          image: "/assets/sofa_home.jpg",
          products: [
            {
              name: "Rustic Dining Table",
              image: "/assets/sofa_home.jpg",
              price: 899.99,
              salePrice: 799.99,
              rating: 4.7,
              sizes: ["Medium", "Large"],
              colors: ["Walnut", "Pine"],
            },
          ],
        },
        {
          name: "Side Tables",
          image: "/assets/sofa_home.jpg",
          products: [
            {
              name: "Sleek Side Table",
              image: "/assets/sofa_home.jpg",
              price: 149.99,
              salePrice: null,
              rating: 4.5,
              sizes: ["Standard"],
              colors: ["White", "Black"],
            },
          ],
        },
      ],
    },
    {
      name: "Chairs",
      image: "/assets/categories/chairs.jpg",
      subcategories: [
        {
          name: "Dining Chairs",
          image: "/assets/sofa_home.jpg",
          products: [
            {
              name: "Elegant Dining Chair",
              image: "/assets/sofa_home.jpg",
              price: 199.99,
              salePrice: null,
              rating: 4.6,
              sizes: ["Standard"],
              colors: ["Oak", "Walnut"],
            },
            {
              name: "Modern Dining Chair",
              image: "/assets/sofa_home.jpg",
              price: 179.99,
              salePrice: 149.99,
              rating: 4.8,
              sizes: ["Standard"],
              colors: ["Gray", "Blue"],
            },
          ],
        },
        {
          name: "Accent Chairs",
          image: "/assets/sofa_home.jpg",
          products: [
            {
              name: "Velvet Accent Chair",
              image: "/assets/sofa_home.jpg",
              price: 349.99,
              salePrice: 299.99,
              rating: 4.9,
              sizes: ["Standard"],
              colors: ["Emerald", "Pink"],
            },
          ],
        },
        {
          name: "Office Chairs",
          image: "/assets/sofa_home.jpg",
          products: [
            {
              name: "Ergo Office Chair",
              image: "/assets/sofa_home.jpg",
              price: 249.99,
              salePrice: null,
              rating: 4.7,
              sizes: ["Standard"],
              colors: ["Black", "Gray"],
            },
          ],
        },
      ],
    },
    {
      name: "Beds",
      image: "/assets/categories/beds.jpg",
      subcategories: [
        {
          name: "King Beds",
          image: "/assets/sofa_home.jpg",
          products: [
            {
              name: "Royal King Bed",
              image: "/assets/sofa_home.jpg",
              price: 1599.99,
              salePrice: 1399.99,
              rating: 4.8,
              sizes: ["King"],
              colors: ["Cherry", "White"],
            },
          ],
        },
        {
          name: "Queen Beds",
          image: "/assets/sofa_home.jpg",
          products: [
            {
              name: "Serenity Queen Bed",
              image: "/assets/sofa_home.jpg",
              price: 1299.99,
              salePrice: null,
              rating: 4.6,
              sizes: ["Queen"],
              colors: ["Gray", "Beige"],
            },
          ],
        },
        {
          name: "Twin Beds",
          image: "/assets/sofa_home.jpg",
          products: [
            {
              name: "Simple Twin Bed",
              image: "/assets/sofa_home.jpg",
              price: 499.99,
              salePrice: 399.99,
              rating: 4.5,
              sizes: ["Twin"],
              colors: ["White", "Blue"],
            },
          ],
        },
      ],
    },
    {
      name: "Storage",
      image: "/assets/categories/storage.jpg",
      subcategories: [
        {
          name: "Dressers",
          image: "/assets/sofa_home.jpg",
          products: [
            {
              name: "Classic Dresser",
              image: "/assets/sofa_home.jpg",
              price: 699.99,
              salePrice: 599.99,
              rating: 4.7,
              sizes: ["Medium", "Large"],
              colors: ["Mahogany", "White"],
            },
          ],
        },
        {
          name: "Wardrobes",
          image: "/assets/sofa_home.jpg",
          products: [
            {
              name: "Spacious Wardrobe",
              image: "/assets/sofa_home.jpg",
              price: 999.99,
              salePrice: null,
              rating: 4.6,
              sizes: ["Large"],
              colors: ["Oak", "Gray"],
            },
          ],
        },
        {
          name: "Shelves",
          image: "/assets/sofa_home.jpg",
          products: [
            {
              name: "Floating Shelf",
              image: "/assets/sofa_home.jpg",
              price: 99.99,
              salePrice: 79.99,
              rating: 4.4,
              sizes: ["Small", "Medium"],
              colors: ["Black", "White"],
            },
          ],
        },
      ],
    },
    {
      name: "Lighting",
      image: "/assets/categories/lighting.jpg",
      subcategories: [
        {
          name: "Floor Lamps",
          image: "/assets/sofa_home.jpg",
          products: [
            {
              name: "Arched Floor Lamp",
              image: "/assets/sofa_home.jpg",
              price: 199.99,
              salePrice: 169.99,
              rating: 4.8,
              sizes: ["Standard"],
              colors: ["Gold", "Silver"],
            },
          ],
        },
        {
          name: "Table Lamps",
          image: "/assets/sofa_home.jpg",
          products: [
            {
              name: "Crystal Table Lamp",
              image: "/assets/sofa_home.jpg",
              price: 129.99,
              salePrice: null,
              rating: 4.7,
              sizes: ["Standard"],
              colors: ["Clear", "Amber"],
            },
          ],
        },
        {
          name: "Chandeliers",
          image: "/assets/sofa_home.jpg",
          products: [
            {
              name: "Modern Chandelier",
              image: "/assets/sofa_home.jpg",
              price: 499.99,
              salePrice: 449.99,
              rating: 4.9,
              sizes: ["Medium"],
              colors: ["Black", "Chrome"],
            },
          ],
        },
      ],
    },
  ],

  // Special Section
  special: {
    name: "Special Sofa",
    price: "$499",
    originalPrice: "$799",
    image: "/assets/sofa_home.jpg",
  },

  // Most Viewed Section
  viewed: [
    { name: "Viewed Sofa", price: "$399", originalPrice: "$599", image: "/assets/sofa_home.jpg" },
    { name: "Viewed Chair", price: "$199", originalPrice: "$299", image: "/assets/sofa_home.jpg" },
    { name: "Viewed Table", price: "$299", originalPrice: "$499", image: "/assets/sofa_home.jpg" },
  ],

  // Featured Section
  featured: [
    {
      name: "Featured Sofa",
      description: "Comfy and stylish",
      price: "$499",
      originalPrice: "$699",
      image: "/assets/sofa_home.jpg",
    },
    {
      name: "Featured Lamp",
      description: "Bright and modern",
      price: "$99",
      originalPrice: "$149",
      image: "/assets/sofa_home.jpg",
    },
  ],

  // Showroom Section
  showroom: [
    {
      title: "Explore Our Showroom",
      description: "Discover the elegance and comfort...",
      image: "/assets/showroom.jpg",
    },
    {
      title: "Visit Us Today",
      description: "See our latest collections in person...",
      image: "/assets/showroom.jpg",
    },
  ],

  // Map Section (Geolocation handled in Map.jsx, this is fallback)
  mapLocation: {
    lat: 40.7128, // New York City as fallback
    lng: -74.0060,
  },

  // Footer Section
  socialLinks: [
    { name: "Facebook", url: "https://facebook.com/uzfurniture" },
    { name: "Instagram", url: "https://instagram.com/uzfurniture" },
    { name: "Twitter", url: "https://twitter.com/uzfurniture" },
  ],
};