import Image from "next/image";
import Productcard from "./products/_components/Productcard";
import { ProductItem } from "./products/product-fetch-response.interface";

export default async function Home() {
  const resp = await fetch("https://ecommerce.routemisr.com/api/v1/products");
  const { data } = await resp.json();
  return (
    <>
      <div className="container mx-auto py-4  grid grid-cols-1 px-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-4 bg-zinc-950  dark:bg-zinc-800 ">
        {data.map((prod: ProductItem) => {
          return <Productcard key={prod._id} prod={prod} />;
        })}
      </div>
    </>
  );
  
}
