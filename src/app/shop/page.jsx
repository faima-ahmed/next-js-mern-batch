export const dynamic = "force-dynamic";
// dynamic
// server side rendering
// client side rendering

import ProductFilter from "@/app/components/ProductFilter";
import Pagination from "@/app/components/Pagination";
import ProductCard from "@/app/components/ProductCard";
// import { getBaseUrl } from "@/utils/api";

async function getProductsForShop(upd) {
  const searchQuery = new URLSearchParams({
    page: upd?.page || 1,
    minPrice: upd?.minPrice || "",
    maxPrice: upd?.maxPrice || "",
    category: upd?.category || "",
  }).toString();

  // const baseUrl = getBaseUrl();

  try {
    const response = await fetch(
      `http://localhost:3000/api/product/filters?${searchQuery}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
    return { products: [], currentPage: 1, totalPages: 1 };
  }
}
// 2 hours 2.5
// monday

export default async function Shop({ searchParams }) {
  const { page, minPrice, maxPrice, category } = await searchParams;
  const upd = { page, minPrice, maxPrice, category };
  // console.log(upd, "Ipd");

  const { products, currentPage, totalPages } = await getProductsForShop(upd);

  return (
    <div className="w-full px-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-1/4 overflow-auto max-h-[90vh]">
          <ProductFilter />
        </div>

        {/* Main content */}
        <div className="lg:w-3/4 max-h-[90vh]">
          <h4 className="text-center font-bold mt-3 text-lg">
            Shop Latest Products
          </h4>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <h4 className="text-center mt-6 text-gray-600">
              No products found
            </h4>
          )}

          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pathname="/shop"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
