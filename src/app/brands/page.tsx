import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrandItem, BrandResponse } from "./brand-fetch-response.interface";

function normalizeImage(src: string) {
  const match = src.match(/\((https?:\/\/[^)]+)\)$/);
  if (match) {
    return match[1];
  }
  return src.replace(/^\[|\]$/g, "");
}

export default async function BrandsPage() {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
    cache: "no-store",
  });
  const data: BrandResponse = await response.json();

  return (
    <section className="bg-zinc-950 min-h-screen py-10 text-white">
      <div className="mx-auto max-w-7xl px-4">
       

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {data.data.map((brand: BrandItem) => {
            const imageUrl = normalizeImage(brand.image);

            return (
              <Link key={brand._id} href={`/brands/${brand._id}`}>
                <Card className="group overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20">
                  <div className="overflow-hidden rounded-[1.75rem] bg-zinc-900">
                    <img
                      src={imageUrl}
                      alt={brand.name}
                      className="h-72 w-full object-contain p-6 transition duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="space-y-4 px-5 py-6">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-2xl font-semibold text-white">{brand.name}</h2>
                      <Badge className="bg-lime-400 text-zinc-950 font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full">
                        {brand.slug}
                      </Badge>
                    </div>

                    <p className="text-sm text-zinc-400">
                      Tap to see the brand detail 
                    </p>

                    <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.24em] text-zinc-500">
                      <span>{new Date(brand.createdAt).toLocaleDateString()}</span>
                      <span className="before:mx-2 before:inline-block before:h-1 before:w-1 before:rounded-full before:bg-zinc-600">Updated</span>
                      <span>{new Date(brand.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
