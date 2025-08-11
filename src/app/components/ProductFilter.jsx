"use client";
import { useEffect, useState } from "react";
import { priceRanges } from "@/utils/filteredData";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

// 95% server state
// next-auth
// next
// node

// multi-vendor // 40-50% -> authentication, order management
// vendor
// alibaba/daraj

// multi-tenant -> shopify -> 40-50% -> authentication, order management

export default function ProductFilter() {
  const [categories, setCategories] = useState([]);
  const pathname = "/shop";
  const params = useSearchParams();
  const router = useRouter();

  const getCategories = async () => {
    const res = await fetch(`/api/category`, {
      method: "GET",
      next: { revalidate: 1 },
    });
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const activeButton =
    "bg-blue-600 text-white font-semibold px-3 py-1 rounded-full mx-1 shadow";
  const button =
    "bg-gray-100 text-gray-800 font-medium px-3 py-1 rounded-full mx-1 shadow hover:bg-gray-200 transition";

  const handleRemoveFilter = (filterName) => {
    // ?['']
    let newParams = new URLSearchParams(params.toString());

    if (typeof filterName === "string") {
      newParams.delete(filterName);
    }
    if (Array.isArray(filterName)) {
      //['minPrice', 'maxPrice']
      filterName.forEach((name) => {
        newParams.delete(name);
      });
    }

    newParams.set("page", 1);

    const queryString = newParams.toString();
    const newUrl = `${pathname}?${queryString}`;
    // /shop?page=1&category=041255454
    router.push(newUrl);
  };

  const createQueryString = (name, value) => {
    // name =["minPrice", "maxPrice"]
    // value = [0, 50]
    let newParams = new URLSearchParams(params.toString());

    if (Array.isArray(name) && Array.isArray(value)) {
      name.forEach((n, index) => {
        newParams.set(n, value[index]);
      });
      newParams.set("page", 1);
      return newParams.toString();
    }

    if (typeof name === "string") {
      newParams.set(name, value);
      newParams.set("page", 1);
      return newParams.toString();
    }
  };

  return (
    <div className="mb-5 overflow-y-auto pr-2">
      <p className="text-lg font-semibold mb-2">Filter Products</p>

      <Link href="/shop" className="text-red-600 hover:underline">
        Clear Filters
      </Link>

      <p className="mt-6 mb-2 text-blue-700 bg-blue-100 px-3 py-2 rounded">
        Price
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {priceRanges?.map((range) => {
          const isActive =
            params.get("minPrice") === String(range?.min) &&
            params.get("maxPrice") === String(range?.max);

          return (
            <div key={range?.label} className="flex items-center">
              <button
                className={isActive ? activeButton : button}
                onClick={() => {
                  router.push(
                    `${pathname}?${createQueryString(
                      ["minPrice", "maxPrice"],
                      [range?.min, range?.max]
                    )}`
                    // '/shop?minPrice=0&maxPrice=50&page=1
                  );
                }}
              >
                {range?.label}
              </button>
              {isActive && (
                <button
                  onClick={
                    () => handleRemoveFilter(["minPrice", "maxPrice"])
                    // string, array of strings
                  }
                  className="ml-1 text-red-500 font-bold hover:text-red-700"
                >
                  X
                </button>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-6 mb-2 text-blue-700 bg-blue-100 px-3 py-2 rounded">
        Categories
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {categories?.map((c) => {
          const isActive = params.get("category") === c._id;

          return (
            <div key={c._id} className="flex items-center">
              <button
                className={isActive ? activeButton : button}
                onClick={() => {
                  router.push(
                    `${pathname}?${createQueryString("category", c._id)}`
                    // /shop?category=688a96ca7c8a24da301e73c6
                  );
                }}
              >
                {c?.title}
              </button>
              {isActive && (
                <button
                  onClick={() => handleRemoveFilter("category")}
                  className="ml-1 text-red-500 font-bold hover:text-red-700"
                >
                  X
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
