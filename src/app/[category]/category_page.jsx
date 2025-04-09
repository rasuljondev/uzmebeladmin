import Subcategories from "../../components/Subcategories/Subcategories";

export default function CategoryPage({ params }) {
  const { category } = params;

  return (
    <div>
      <Subcategories categoryName={category} />
    </div>
  );
}

export async function generateStaticParams() {
  const { config } = await import("../../config/config");
  return config.categories.map((category) => ({
    category: category.name.toLowerCase().replace(/\s+/g, "-"),
  }));
}