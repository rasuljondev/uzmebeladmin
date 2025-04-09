"use client";

import { config } from "../../../config/config";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    salePrice: "",
    image: null,
    colors: [],
    sizes: [],
    rating: 5,
    category: "",
    subcategory: "",
  });
  const [newCategory, setNewCategory] = useState({ name: "", image: null });
  const [newSubcategory, setNewSubcategory] = useState({ name: "", image: null, category: "" });
  const [settings, setSettings] = useState({ companyName: "UZ Furniture", logo: null });
  const [editingProduct, setEditingProduct] = useState(null);
  const [sizeInput, setSizeInput] = useState("");
  const [activeTab, setActiveTab] = useState("products");

  // Predefined colors for checkboxes
  const predefinedColors = ["Red", "Green", "Blue", "Gray", "Black", "White", "Beige", "Navy"];

  // Load initial data
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || flattenProducts(config.categories);
    const storedCategories = JSON.parse(localStorage.getItem("categories")) || config.categories;
    const storedSettings = JSON.parse(localStorage.getItem("settings")) || {
      companyName: config.companyName,
      logo: config.logoUrl,
    };
    setProducts(storedProducts);
    setCategories(storedCategories);
    setSettings(storedSettings);
  }, []);

  // Save changes
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [products, categories, settings]);

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

  // Product Management
  const addProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.subcategory) {
      alert("Name, price, category, and subcategory are required!");
      return;
    }
    const imageUrl = newProduct.image ? URL.createObjectURL(newProduct.image) : "/assets/default.jpg";
    const updatedProducts = [
      ...products,
      { ...newProduct, id: Date.now() + Math.random(), image: imageUrl },
    ];
    setProducts(updatedProducts);
    resetProductForm();
  };

  const updateProduct = () => {
    const imageUrl = newProduct.image instanceof File ? URL.createObjectURL(newProduct.image) : newProduct.image;
    const updatedProducts = products.map((p) =>
      p.id === editingProduct.id ? { ...newProduct, id: p.id, image: imageUrl } : p
    );
    setProducts(updatedProducts);
    resetProductForm();
    setEditingProduct(null);
  };

  const deleteProduct = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const resetProductForm = () => {
    setNewProduct({ name: "", price: "", salePrice: "", image: null, colors: [], sizes: [], rating: 5, category: "", subcategory: "" });
    setSizeInput("");
  };

  const toggleColor = (color) => {
    setNewProduct((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };

  const addSize = () => {
    if (sizeInput && !newProduct.sizes.includes(sizeInput)) {
      setNewProduct({ ...newProduct, sizes: [...newProduct.sizes, sizeInput] });
      setSizeInput("");
    }
  };

  const removeSize = (size) => setNewProduct({ ...newProduct, sizes: newProduct.sizes.filter((s) => s !== size) });

  // Category Management
  const addCategory = () => {
    if (!newCategory.name) {
      alert("Category name is required!");
      return;
    }
    const imageUrl = newCategory.image ? URL.createObjectURL(newCategory.image) : "/assets/default.jpg";
    setCategories([...categories, { name: newCategory.name, image: imageUrl, subcategories: [] }]);
    setNewCategory({ name: "", image: null });
  };

  const addSubcategory = () => {
    if (!newSubcategory.name || !newSubcategory.category) {
      alert("Subcategory name and parent category are required!");
      return;
    }
    const imageUrl = newSubcategory.image ? URL.createObjectURL(newSubcategory.image) : "/assets/default.jpg";
    const updatedCategories = categories.map((cat) =>
      cat.name === newSubcategory.category
        ? {
            ...cat,
            subcategories: [
              ...cat.subcategories,
              { name: newSubcategory.name, image: imageUrl, products: [] },
            ],
          }
        : cat
    );
    setCategories(updatedCategories);
    setNewSubcategory({ name: "", image: null, category: "" });
    console.log("Updated categories:", updatedCategories);
  };

  const deleteCategory = (categoryName) => {
    if (confirm(`Are you sure you want to delete ${categoryName} and all its subcategories?`)) {
      setCategories(categories.filter((cat) => cat.name !== categoryName));
      setProducts(products.filter((prod) => prod.category !== categoryName));
    }
  };

  const deleteSubcategory = (categoryName, subcategoryName) => {
    if (confirm(`Are you sure you want to delete ${subcategoryName}?`)) {
      const updatedCategories = categories.map((cat) =>
        cat.name === categoryName
          ? { ...cat, subcategories: cat.subcategories.filter((sub) => sub.name !== subcategoryName) }
          : cat
      );
      setCategories(updatedCategories);
      setProducts(products.filter((prod) => !(prod.category === categoryName && prod.subcategory === subcategoryName)));
    }
  };

  // Settings Management
  const updateSettings = () => {
    const logoUrl = settings.logo instanceof File ? URL.createObjectURL(settings.logo) : settings.logo;
    setSettings({ ...settings, logo: logoUrl });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
        <button
          onClick={() => setActiveTab("products")}
          className={`p-3 rounded-lg text-left ${activeTab === "products" ? "bg-[#ff6b6b] text-white" : "text-gray-800 hover:bg-gray-200"}`}
        >
          Manage Products
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`p-3 rounded-lg text-left ${activeTab === "categories" ? "bg-[#ff6b6b] text-white" : "text-gray-800 hover:bg-gray-200"}`}
        >
          Manage Categories
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`p-3 rounded-lg text-left ${activeTab === "settings" ? "bg-[#ff6b6b] text-white" : "text-gray-800 hover:bg-gray-200"}`}
        >
          Settings
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === "products" && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{editingProduct ? "Edit Product" : "Add Product"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="p-3 border rounded-lg w-full text-gray-800 focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="p-3 border rounded-lg w-full text-gray-800 focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
              />
              <input
                type="number"
                placeholder="Sale Price (optional)"
                value={newProduct.salePrice}
                onChange={(e) => setNewProduct({ ...newProduct, salePrice: e.target.value })}
                className="p-3 border rounded-lg w-full text-gray-800 focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
                className="p-3 border rounded-lg w-full text-gray-800"
              />
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value, subcategory: "" })}
                className="p-3 border rounded-lg w-full text-gray-800 focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              <select
                value={newProduct.subcategory}
                onChange={(e) => setNewProduct({ ...newProduct, subcategory: e.target.value })}
                className="p-3 border rounded-lg w-full text-gray-800 focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                disabled={!newProduct.category}
              >
                <option value="">Select Subcategory</option>
                {newProduct.category &&
                  categories
                    .find((cat) => cat.name === newProduct.category)
                    ?.subcategories.map((sub) => (
                      <option key={sub.name} value={sub.name}>{sub.name}</option>
                    ))}
              </select>
              <div className="col-span-2">
                <label className="block text-gray-800 font-medium mb-2">Colors</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {predefinedColors.map((color) => (
                    <label key={color} className="flex items-center gap-2 text-gray-800">
                      <input
                        type="checkbox"
                        checked={newProduct.colors.includes(color)}
                        onChange={() => toggleColor(color)}
                        className="h-4 w-4 text-[#ff6b6b] focus:ring-[#ff6b6b]"
                      />
                      {color}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add Size"
                  value={sizeInput}
                  onChange={(e) => setSizeInput(e.target.value)}
                  className="p-3 border rounded-lg w-full text-gray-800 focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                />
                <button
                  onClick={addSize}
                  className="px-4 py-2 bg-[#ff6b6b] text-white rounded-lg hover:bg-[#e55a5a] transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newProduct.sizes.map((size) => (
                  <span key={size} className="px-3 py-1 bg-gray-200 rounded-full flex items-center gap-2 text-gray-800">
                    {size}
                    <button onClick={() => removeSize(size)} className="text-red-600 hover:text-red-800">x</button>
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={editingProduct ? updateProduct : addProduct}
              className="mt-6 px-6 py-3 bg-[#ff6b6b] text-white rounded-lg hover:bg-[#e55a5a] transition-colors w-full"
            >
              {editingProduct ? "Update Product" : "Add Product"}
            </button>
            {editingProduct && (
              <button
                onClick={() => {
                  resetProductForm();
                  setEditingProduct(null);
                }}
                className="mt-4 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors w-full"
              >
                Cancel
              </button>
            )}

            {/* Product List */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Products</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-4 text-gray-800">Image</th>
                      <th className="p-4 text-gray-800">Name</th>
                      <th className="p-4 text-gray-800">Price</th>
                      <th className="p-4 text-gray-800">Sale Price</th>
                      <th className="p-4 text-gray-800">Category</th>
                      <th className="p-4 text-gray-800">Subcategory</th>
                      <th className="p-4 text-gray-800">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id || `${product.name}-${Date.now()}`} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <Image src={product.image} alt={product.name} width={50} height={50} className="object-cover rounded-md" />
                        </td>
                        <td className="p-4 text-gray-800">{product.name}</td>
                        <td className="p-4 text-gray-800">${product.price}</td>
                        <td className="p-4 text-gray-800">{product.salePrice ? `$${product.salePrice}` : "-"}</td>
                        <td className="p-4 text-gray-800">{product.category}</td>
                        <td className="p-4 text-gray-800">{product.subcategory}</td>
                        <td className="p-4 flex gap-2">
                          <button
                            onClick={() => {
                              setEditingProduct(product);
                              setNewProduct(product);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "categories" && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Categories</h2>
            {/* Add Category */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Category</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Category Name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="p-3 border rounded-lg w-full text-gray-800 focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewCategory({ ...newCategory, image: e.target.files[0] })}
                  className="p-3 border rounded-lg w-full text-gray-800"
                />
              </div>
              <button
                onClick={addCategory}
                className="mt-4 px-6 py-3 bg-[#ff6b6b] text-white rounded-lg hover:bg-[#e55a5a] transition-colors w-full"
              >
                Add Category
              </button>
            </div>

            {/* Add Subcategory */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Subcategory</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Subcategory Name"
                  value={newSubcategory.name}
                  onChange={(e) => setNewSubcategory({ ...newSubcategory, name: e.target.value })}
                  className="p-3 border rounded-lg w-full text-gray-800 focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                />
                <select
                  value={newSubcategory.category}
                  onChange={(e) => setNewSubcategory({ ...newSubcategory, category: e.target.value })}
                  className="p-3 border rounded-lg w-full text-gray-800 focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewSubcategory({ ...newSubcategory, image: e.target.files[0] })}
                  className="p-3 border rounded-lg w-full text-gray-800"
                />
              </div>
              <button
                onClick={addSubcategory}
                className="mt-4 px-6 py-3 bg-[#ff6b6b] text-white rounded-lg hover:bg-[#e55a5a] transition-colors w-full"
              >
                Add Subcategory
              </button>
            </div>

            {/* Category List */}
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Categories & Subcategories</h3>
            {categories.map((cat) => (
              <div key={cat.name} className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <h4 className="text-xl font-semibold text-gray-800">{cat.name}</h4>
                  <button
                    onClick={() => deleteCategory(cat.name)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
                <ul className="mt-2">
                  {cat.subcategories.map((sub) => (
                    <li key={sub.name} className="flex justify-between items-center p-2 text-gray-800">
                      <span>{sub.name}</span>
                      <button
                        onClick={() => deleteSubcategory(cat.name, sub.name)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Company Name"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="p-3 border rounded-lg w-full text-gray-800 focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSettings({ ...settings, logo: e.target.files[0] })}
                className="p-3 border rounded-lg w-full text-gray-800"
              />
            </div>
            {settings.logo && (
              <div className="mt-4">
                <Image
                  src={settings.logo instanceof File ? URL.createObjectURL(settings.logo) : settings.logo}
                  alt="Company Logo"
                  width={100}
                  height={100}
                  className="rounded-md"
                />
              </div>
            )}
            <button
              onClick={updateSettings}
              className="mt-6 px-6 py-3 bg-[#ff6b6b] text-white rounded-lg hover:bg-[#e55a5a] transition-colors w-full"
            >
              Save Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
}