"use client";

import { config } from "../../../../../config/config";
import Image from "next/image";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "../../../home/components/Header/Header";

function ProductCard({ product, onAddToCart, onBuyNow }) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "");
  const [quantity, setQuantity] = useState(1);
  const { category, subcategory } = useParams();
  const router = useRouter();

  const handleConfirm = (isBuyNow = false) => {
    const item = { ...product, size: selectedSize, color: selectedColor, quantity };
    onAddToCart(item);
    setShowOptions(false);
    if (isBuyNow) router.push("/pages/cart");
  };

  return (
    <motion.div
      className="relative w-[350px] bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onClick={() => router.push(`/pages/products/${category}/${subcategory}/${product.name.toLowerCase().replace(/\s+/g, "-")}`)}
    >
      <Image src={product.image} alt={product.name} width={350} height={350} className="object-cover w-full h-[350px]" quality={75} priority />
      <div className="relative p-6">
        <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold text-gray-800">${product.salePrice || product.price}</span>
          {product.salePrice && <span className="text-sm text-gray-500 line-through">${product.price}</span>}
        </div>
        <div className="flex items-center gap-1 mt-2">
          {Array.from({ length: 5 }, (_, i) => (
            <svg key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 15l-5.5 3 1-5.5L2 8l5.5-1L10 2l2.5 5L18 8l-3.5 4.5 1 5.5z" />
            </svg>
          ))}
          <span className="text-sm text-gray-600">({product.rating.toFixed(1)})</span>
        </div>
        <div className="flex gap-4 mt-4" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setShowOptions(true)} className="px-4 py-2 bg-[#ff6b6b] text-white rounded-full hover:bg-[#e55a5a] transition-colors duration-300">
            Add to Cart
          </button>
          <button onClick={() => setShowOptions(true)} className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors duration-300">
            Buy Now
          </button>
        </div>
      </div>

      {showOptions && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowOptions(false)}>
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[450px] transform transition-all duration-300 scale-100" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{product.name}</h3>
            {product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-2 rounded-full border ${selectedSize === size ? "bg-[#ff6b6b] text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"} transition-colors duration-200`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`w-10 h-10 rounded-full border-2 ${selectedColor === color ? "ring-2 ring-[#ff6b6b]" : "ring-0"} transition-all duration-200`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="p-2 border rounded-full w-20 text-gray-800 focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
              />
            </div>
            <div className="flex gap-4">
              <button onClick={() => handleConfirm(false)} className="px-6 py-3 bg-[#ff6b6b] text-white rounded-full hover:bg-[#e55a5a] transition-colors duration-300 flex-1">
                Confirm
              </button>
              <button onClick={() => handleConfirm(true)} className="px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors duration-300 flex-1">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function ProductsPage() {
  const { category, subcategory } = useParams();
  const [basket, setBasket] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem("basket") || "[]");
    setBasket(storedBasket);

    const storedCategories = JSON.parse(localStorage.getItem("categories")) || config.categories;
    const selectedCategory = storedCategories.find((cat) => cat.name.toLowerCase().replace(/\s+/g, "-") === category);
    const selectedSubcategory = selectedCategory?.subcategories.find((sub) => sub.name.toLowerCase().replace(/\s+/g, "-") === subcategory);
    const storedProducts = JSON.parse(localStorage.getItem("products")) || flattenProducts(storedCategories);
    const subProducts = storedProducts.filter(
      (p) => p.category === selectedCategory?.name && p.subcategory === selectedSubcategory?.name
    );
    setProducts(subProducts);
    console.log("Loaded categories:", storedCategories); // Debug
    console.log("Loaded products:", storedProducts); // Debug
    console.log("Filtered products for subcategory:", subProducts); // Debug
  }, [category, subcategory]);

  const flattenProducts = (categories) => {
    let idCounter = 1;
    return categories.flatMap((cat) =>
      cat.subcategories.flatMap((sub) =>
        sub.products.map((prod) => ({
          ...prod,
          category: cat.name,
          subcategory: sub.name,
          id: prod.id || idCounter++,
        }))
      )
    );
  };

  const addToBasket = (item) => {
    const currentBasket = JSON.parse(localStorage.getItem("basket") || "[]");
    const updatedBasket = [...currentBasket, item];
    setBasket(updatedBasket);
    localStorage.setItem("basket", JSON.stringify(updatedBasket));
    alert(`${item.name} (${item.size}, ${item.color}, Qty: ${item.quantity}) added to basket!`);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!products.length && filteredProducts.length === 0) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800">Subcategory Not Found</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <section className="py-20 px-16 flex flex-col items-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-12 tracking-tight">{subcategory.replace(/-/g, " ")}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToBasket} onBuyNow={addToBasket} />
          ))}
        </div>
      </section>
    </div>
  );
}