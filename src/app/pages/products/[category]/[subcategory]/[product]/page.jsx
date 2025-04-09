"use client";

import { config } from "../../../../../../config/config";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "../../../../../../components/Header/Header";

export default function ProductDetailsPage() {
  const { category, subcategory, product } = useParams();
  const router = useRouter();
  const [basket, setBasket] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem("basket") || "[]");
    setBasket(storedBasket);

    const storedCategories = JSON.parse(localStorage.getItem("categories")) || config.categories;
    const storedProducts = JSON.parse(localStorage.getItem("products")) || flattenProducts(storedCategories);
    const foundProduct = storedProducts.find(
      (p) =>
        p.category.toLowerCase().replace(/\s+/g, "-") === category &&
        p.subcategory.toLowerCase().replace(/\s+/g, "-") === subcategory &&
        p.name.toLowerCase().replace(/\s+/g, "-") === product
    );
    setSelectedProduct(foundProduct);
    setSelectedSize(foundProduct?.sizes[0] || "");
    setSelectedColor(foundProduct?.colors[0] || "");
  }, [category, subcategory, product]);

  const flattenProducts = (categories) => {
    return categories.flatMap((cat) =>
      cat.subcategories.flatMap((sub) =>
        sub.products.map((prod) => ({
          ...prod,
          category: cat.name,
          subcategory: sub.name,
        }))
      )
    );
  };

  const addToBasket = (item) => {
    const currentBasket = JSON.parse(localStorage.getItem("basket") || "[]");
    const updatedBasket = [...currentBasket, item];
    setBasket(updatedBasket);
    localStorage.setItem("basket", JSON.stringify(updatedBasket));
    console.log("Product Details - Updated basket:", updatedBasket);
    alert(`${item.name} (${item.size}, ${item.color}, Qty: ${item.quantity}) added to basket!`);
  };

  const handleConfirm = (isBuyNow = false) => {
    const item = { ...selectedProduct, size: selectedSize, color: selectedColor, quantity };
    console.log("Adding item:", item);
    addToBasket(item);
    setShowOptions(false);
    if (isBuyNow) {
      console.log("Navigating to cart with basket:", localStorage.getItem("basket"));
      router.push("/pages/cart");
    }
  };

  if (!selectedProduct) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800">Product Not Found</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <section className="py-20 px-16 max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/2 bg-white p-6 rounded-2xl shadow-md">
          <Image
            src={selectedProduct.image}
            alt={selectedProduct.name}
            width={600}
            height={600}
            className="object-cover w-full h-auto rounded-lg"
            quality={75}
            priority
          />
        </div>
        <div className="lg:w-1/2 flex flex-col gap-8">
          <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">{selectedProduct.name}</h1>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-gray-800">${selectedProduct.salePrice || selectedProduct.price}</span>
            {selectedProduct.salePrice && <span className="text-lg text-gray-500 line-through">${selectedProduct.price}</span>}
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }, (_, i) => (
              <svg
                key={i}
                className={`w-6 h-6 ${i < Math.round(selectedProduct.rating) ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.5 3 1-5.5L2 8l5.5-1L10 2l2.5 5L18 8l-3.5 4.5 1 5.5z" />
              </svg>
            ))}
            <span className="text-sm text-gray-600">({selectedProduct.rating.toFixed(1)})</span>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

          {selectedProduct.sizes.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Size</label>
              <div className="flex gap-3">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-5 py-2 rounded-full border ${selectedSize === size ? "bg-[#ff6b6b] text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"} transition-colors duration-200`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedProduct.colors.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Color</label>
              <div className="flex gap-3">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-12 h-12 rounded-full border-2 ${selectedColor === color ? "ring-2 ring-[#ff6b6b]" : "ring-0"} transition-all duration-200`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="p-3 border rounded-full w-24 text-gray-800 focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowOptions(true)}
              className="px-8 py-4 bg-[#ff6b6b] text-white rounded-full hover:bg-[#e55a5a] transition-colors duration-300 shadow-md flex-1"
            >
              Add to Cart
            </button>
            <button
              onClick={() => setShowOptions(true)}
              className="px-8 py-4 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors duration-300 shadow-md flex-1"
            >
              Buy Now
            </button>
          </div>
        </div>
      </section>

      {showOptions && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowOptions(false)}>
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[450px] transform transition-all duration-300 scale-100" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{selectedProduct.name}</h3>
            {selectedProduct.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                <div className="flex gap-3">
                  {selectedProduct.sizes.map((size) => (
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
            {selectedProduct.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <div className="flex gap-3">
                  {selectedProduct.colors.map((color) => (
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
              <button
                onClick={() => handleConfirm(false)}
                className="px-6 py-3 bg-[#ff6b6b] text-white rounded-full hover:bg-[#e55a5a] transition-colors duration-300 flex-1"
              >
                Confirm
              </button>
              <button
                onClick={() => handleConfirm(true)}
                className="px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors duration-300 flex-1"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}