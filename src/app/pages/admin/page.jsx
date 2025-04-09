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
  const [settings, setSettings] = useState({
    companyName: typeof window !== "undefined" ? (JSON.parse(localStorage.getItem("settings"))?.companyName || config.companyName) : config.companyName,
    logo: typeof window !== "undefined" ? (JSON.parse(localStorage.getItem("settings"))?.logo || config.logoUrl) : config.logoUrl,
    phoneNumber: typeof window !== "undefined" ? (JSON.parse(localStorage.getItem("settings"))?.phoneNumber || config.phoneNumber) : config.phoneNumber,
    email: typeof window !== "undefined" ? (JSON.parse(localStorage.getItem("settings"))?.email || config.email) : config.email,
    heroImages: typeof window !== "undefined" ? (JSON.parse(localStorage.getItem("settings"))?.heroImages || config.heroImages || []) : config.heroImages || [],
    showroom: typeof window !== "undefined" ? (JSON.parse(localStorage.getItem("settings"))?.showroom || config.showroom || [{ title: "", description: "", image: "" }, { title: "", description: "", image: "" }]) : config.showroom || [{ title: "", description: "", image: "" }, { title: "", description: "", image: "" }],
    socialLinks: typeof window !== "undefined" ? (JSON.parse(localStorage.getItem("settings"))?.socialLinks || config.socialLinks.concat({ name: "Telegram", url: "" }) || [
      { name: "Facebook", url: "" },
      { name: "Instagram", url: "" },
      { name: "Twitter", url: "" },
      { name: "Telegram", url: "" },
    ]) : config.socialLinks.concat({ name: "Telegram", url: "" }) || [
      { name: "Facebook", url: "" },
      { name: "Instagram", url: "" },
      { name: "Twitter", url: "" },
      { name: "Telegram", url: "" },
    ],
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [sizeInput, setSizeInput] = useState("");
  const [activeTab, setActiveTab] = useState("products");

  const predefinedColors = ["Red", "Green", "Blue", "Gray", "Black", "White", "Beige", "Navy"];

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || flattenProducts(config.categories);
    const storedCategories = JSON.parse(localStorage.getItem("categories")) || config.categories;
    setProducts(storedProducts);
    setCategories(storedCategories);
  }, []);

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
      colors: prev.colors.includes(color) ? prev.colors.filter((c) => c !== color) : [...prev.colors, color],
    }));
  };

  const addSize = () => {
    if (sizeInput && !newProduct.sizes.includes(sizeInput)) {
      setNewProduct({ ...newProduct, sizes: [...newProduct.sizes, sizeInput] });
      setSizeInput("");
    }
  };

  const removeSize = (size) => setNewProduct({ ...newProduct, sizes: newProduct.sizes.filter((s) => s !== size) });

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
            subcategories: [...cat.subcategories, { name: newSubcategory.name, image: imageUrl, products: [] }],
          }
        : cat
    );
    setCategories(updatedCategories);
    setNewSubcategory({ name: "", image: null, category: "" });
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

  const updateSettings = () => {
    const updatedSettings = {
      ...settings,
      logo: settings.logo instanceof File ? URL.createObjectURL(settings.logo) : settings.logo,
      heroImages: settings.heroImages.map((img) => (img instanceof File ? URL.createObjectURL(img) : img)),
      showroom: settings.showroom.map((item, index) => ({
        ...item,
        image: item.image instanceof File ? URL.createObjectURL(item.image) : item.image || config.showroom[index].image,
      })),
    };
    setSettings(updatedSettings);
  };

  const handleShowroomChange = (index, field, value) => {
    const updatedShowroom = [...settings.showroom];
    updatedShowroom[index] = { ...updatedShowroom[index], [field]: value };
    setSettings({ ...settings, showroom: updatedShowroom });
  };

  const handleSocialLinkChange = (index, field, value) => {
    const updatedSocialLinks = [...settings.socialLinks];
    updatedSocialLinks[index] = { ...updatedSocialLinks[index], [field]: value };
    setSettings({ ...settings, socialLinks: updatedSocialLinks });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
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
                          <button onClick={() => deleteProduct(product.id)} className="text-red-600 hover:text-red-800">
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
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Categories & Subcategories</h3>
            {categories.map((cat) => (
              <div key={cat.name} className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <h4 className="text-xl font-semibold text-gray-800">{cat.name}</h4>
                  <button onClick={() => deleteCategory(cat.name)} className="text-red-600 hover:text-red-800">
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
              <input
                type="text"
                placeholder="Phone Number"
                value={settings.phoneNumber}
                onChange={(e) => setSettings({ ...settings, phoneNumber: e.target.value })}
                className="p-3 border rounded-lg w-full text-gray-800 focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
              />
              <input
                type="email"
                placeholder="Company Email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="p-3 border rounded-lg w-full text-gray-800 focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
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
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Hero Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.isArray(settings.heroImages) && settings.heroImages.length > 0 ? (
                settings.heroImages.map((img, index) => (
                  <div key={index}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const newImages = [...settings.heroImages];
                        newImages[index] = e.target.files[0];
                        setSettings({ ...settings, heroImages: newImages });
                      }}
                      className="p-3 border rounded-lg w-full text-gray-800"
                    />
                    <Image
                      src={img instanceof File ? URL.createObjectURL(img) : img}
                      alt={`Hero Image ${index + 1}`}
                      width={200}
                      height={100}
                      className="mt-2 rounded-md"
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-800">No hero images available.</p>
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Showroom Sections</h3>
            {settings.showroom.map((section, index) => (
              <div key={index} className="mb-6">
                <input
                  type="text"
                  placeholder="Title"
                  value={section.title}
                  onChange={(e) => handleShowroomChange(index, "title", e.target.value)}
                  className="p-3 border rounded-lg w-full text-gray-800 focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none mb-2"
                />
                <textarea
                  placeholder="Description"
                  value={section.description}
                  onChange={(e) => handleShowroomChange(index, "description", e.target.value)}
                  className="p-3 border rounded-lg w-full text-gray-800 focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none mb-2"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleShowroomChange(index, "image", e.target.files[0])}
                  className="p-3 border rounded-lg w-full text-gray-800 mb-2"
                />
                <Image
                  src={section.image instanceof File ? URL.createObjectURL(section.image) : section.image}
                  alt={section.title}
                  width={200}
                  height={100}
                  className="rounded-md"
                />
              </div>
            ))}
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Social Links</h3>
            {settings.socialLinks.map((link, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <input
                  type="text"
                  placeholder="Name (e.g., Facebook)"
                  value={link.name}
                  onChange={(e) => handleSocialLinkChange(index, "name", e.target.value)}
                  className="p-3 border rounded-lg w-full text-gray-800 focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                  disabled={index < 3} // Lock Facebook, Instagram, Twitter names
                />
                <input
                  type="url"
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) => handleSocialLinkChange(index, "url", e.target.value)}
                  className="p-3 border rounded-lg w-full text-gray-800 focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                />
              </div>
            ))}
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