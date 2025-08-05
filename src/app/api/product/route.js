import product from "@/app/modules/product";
import connectDb from "@/app/utils/db";
import { NextResponse } from "next/server";

let products = [
  {
    id: "1",
    title: "Product 1",
    price: 500,
    description: "Product 1 Details",
    image:
      "https://images.pexels.com/photos/2337789/pexels-photo-2337789.jpeg?_gl=1*1iv70x7*_ga*MTQwNDgwNjY3Ni4xNzUzNjI1OTU0*_ga_8JE65Q40S6*czE3NTM2MjU5NTMkbzEkZzEkdDE3NTM2MjYwNjAkajUwJGwwJGgw",
  },
  {
    id: "2",
    title: "Doll",
    price: 225,
    description: "Doll Details",
    image:
      "https://images.pexels.com/photos/1194025/pexels-photo-1194025.jpeg?_gl=1*3dwwny*_ga*MjAxMjM1NTM1LjE3NDE1Mzk0MDY.*_ga_8JE65Q40S6*czE3NTI3NjE4NDYkbzEyJGcxJHQxNzUyNzYxOTAwJGo2JGwwJGgw",
  },
  {
    id: "3e2c",
    title: "hhhh",
    price: 15,
    description: "awsome",
    image:
      "https://www.garnerstationery.com/wp-content/uploads/2025/05/Aihao-Gel-Pen-Noblesse-1.0mm-Black-8977.jpg",
  },
  {
    id: "12e9",
    title: "pizza",
    price: 200,
    description: "cheesy pizza",
    image:
      "https://media.istockphoto.com/id/1442417585/photo/person-getting-a-piece-of-cheesy-pepperoni-pizza.jpg?s=1024x1024&w=is&k=20&c=faq73viCFGvfpKxcBuHcOI8kyT99B-p-jScipke-VuQ=",
  },
  {
    id: "0d95",
    title: "hoodie",
    price: 550,
    description: "nice hoodie",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnTh4eEgX2iDZSJmctfVI5RONy6ALbk46bEhPSnYUQomarVtr0Vj_Uwe4&s",
  },
];

export async function GET(request) {
  console.log("i am being hit");
  await connectDb();
  const products = await product.find();
  return NextResponse.json({ data: products });
}

export async function POST(request) {
  const body = await request.json();

  try {
    const newProduct = await product.create(body);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: `Failed to Create Product` });
  }
}
