import ProductCard from "./components/ProductCard";
import Pagination from "@/app/components/Pagination";

const getProducts = async (searchParams) => {
  const searchQuery = new URLSearchParams({
    page: searchParams?.page || 1,
  }).toString();
  console.log(searchQuery, "sQuery");

  const res = await fetch(`http://localhost:3000/api/product?${searchQuery}`);

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await res.json();
  return {
    products: data?.products,
    currentPage: data?.currentPage,
    totalPages: data?.totalPages,
  };
};
export default async function Home({ searchParams }) {
  const params = await searchParams;
  console.log(params, "srh");

  const data = await getProducts(params);

  return (
    <main>
      <div>
        <div className="page-banner">
          <div className="page-banner__details">
            <div className="page-banner__details__title">
              <h1>Our E-commerce Website</h1>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="container">
            <div className="section__head">
              <div className="product__details__title">
                <h2>Filtered Products</h2>
              </div>
            </div>
            <div className="section__content">
              <div className="grid three">
                {data?.products?.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        // currentPage={data?.currentPage}
        totalPages={data?.totalPages}
        pathname={"/"}
      />
    </main>
  );
}
