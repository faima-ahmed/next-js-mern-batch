"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const Pagination = ({ totalPages, pathname }) => {
  const params = useSearchParams();
  const router = useRouter();
  const createQueryString = (name, value) => {
    // name = page; value = 2
    let newParams = new URLSearchParams(params.toString());

    newParams.set(name, value);
    // console.log(newParams, "nw");

    // newParams.set("page", 2)
    return newParams.toString();
    //page=2
  };

  return (
    <div className="text-center">
      <div>
        <nav>
          <ul className="flex justify-center">
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;

              return (
                <li
                  className="mr-[10px] border-[1px] border-blue-300 p-[5px] bg-[aqua]"
                  key={page}
                >
                  <button
                    onClick={() => {
                      // `/?page=2`
                      router.push(
                        `${pathname}?${createQueryString("page", page)}`
                      );

                      // '/?page=2'
                    }}
                  >
                    {page}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
