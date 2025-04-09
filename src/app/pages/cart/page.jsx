"use client";

import { config } from "../../../config/config";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";

export default function CartPage() {
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem("basket") || "[]");
    console.log("Cart Page - Loaded basket from localStorage:", storedBasket);
    setBasket(storedBasket);
  }, []);

  const removeItem = (index) => {
    const updatedBasket = basket.filter((_, i) => i !== index);
    setBasket(updatedBasket);
    localStorage.setItem("basket", JSON.stringify(updatedBasket));
    console.log("Cart Page - Removed item, new basket:", updatedBasket);
  };

  const updateQuantity = (index, newQuantity) => {
    const updatedBasket = basket.map((item, i) =>
      i === index ? { ...item, quantity: Math.max(1, newQuantity) } : item
    );
    setBasket(updatedBasket);
    localStorage.setItem("basket", JSON.stringify(updatedBasket));
    console.log("Cart Page - Updated quantity, new basket:", updatedBasket);
  };

  const total = basket.reduce((sum, item) => sum + (item.salePrice || item.price) * item.quantity, 0);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <section className="py-20 px-16 max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-12 text-center tracking-tight">Your Cart</h1>
        {basket.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-2xl shadow-md">
            <p className="text-gray-600 text-lg mb-6">Your cart is empty.</p>
            <Link href="/pages/categories" className="inline-block px-8 py-4 bg-[#ff6b6b] text-white rounded-full hover:bg-[#e55a5a] transition-colors duration-300 shadow-md">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 rounded-t-2xl">
                    <th className="p-6 font-semibold text-gray-800">Product</th>
                    <th className="p-6 font-semibold text-gray-800">Size</th>
                    <th className="p-6 font-semibold text-gray-800">Color</th>
                    <th className="p-6 font-semibold text-gray-800">Quantity</th>
                    <th className="p-6 font-semibold text-gray-800">Price</th>
                    <th className="p-6 font-semibold text-gray-800"></th>
                  </tr>
                </thead>
                <tbody>
                  {basket.map((item, index) => (
                    <tr key={index} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-200">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <Image src={item.image} alt={item.name} width={80} height={80} className="object-cover rounded-md" quality={75} />
                          <span className="text-gray-800 font-medium">{item.name}</span>
                        </div>
                      </td>
                      <td className="p-6 text-gray-800">{item.size}</td>
                      <td className="p-6">
                        <span className="inline-block w-8 h-8 rounded-full border" style={{ backgroundColor: item.color.toLowerCase() }} title={item.color}></span>
                      </td>
                      <td className="p-6">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 1)}
                          className="p-2 border rounded-full w-20 text-gray-800 focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                        />
                      </td>
                      <td className="p-6 text-gray-800 font-medium">${((item.salePrice || item.price) * item.quantity).toFixed(2)}</td>
                      <td className="p-6">
                        <button
                          onClick={() => removeItem(index)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-10 flex justify-between items-center">
              <Link href="/pages/categories" className="text-gray-800 hover:text-[#ff6b6b] transition-colors duration-300 text-lg font-medium">
                ← Continue Shopping
              </Link>
              <div className="text-right">
                <p className="text-2xl font-semibold text-gray-800 mb-4">Total: ${total.toFixed(2)}</p>
                <Link
                  href="/checkout"
                  className="inline-block px-8 py-4 bg-[#ff6b6b] text-white rounded-full hover:bg-[#e55a5a] transition-colors duration-300 shadow-md"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}