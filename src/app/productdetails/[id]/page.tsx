import { ProductItem } from '@/app/products/product-fetch-response.interface';
import ProductDetailsClient from '../_components/ProductDetailsClient';

type PageProps = {
  params: {
    id: string;
  };
};

export default async function page(myprops: PageProps) {
  const { id } = await myprops.params;

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    {
      method: 'GET',
      cache: 'no-store',
    },
  );

  const {data :singleproduct}: { data: ProductItem } = await response.json();
 

  if (!singleproduct) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white px-4 py-10">
        <div className="max-w-xl rounded-3xl border border-zinc-800 bg-zinc-900/90 p-8 text-center shadow-2xl shadow-black/30">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Product not found</p>
          <h1 className="mt-4 text-3xl font-semibold">Unable to load this product.</h1>
          <p className="mt-3 text-zinc-400">Please check the URL or try again later.</p>
        </div>
      </div>
    );
  }

  return <ProductDetailsClient product={singleproduct} />;
}
