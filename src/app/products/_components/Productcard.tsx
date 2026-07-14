import React from "react";
import { Heart, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductItem } from "../product-fetch-response.interface";
import Link from "next/link";

interface ProductCardProps {
  prod: ProductItem;
}

const Productcard = ({ prod }: ProductCardProps) => {
  const hasDiscount =
    prod.priceAfterDiscount !== undefined &&
    prod.priceAfterDiscount < prod.price;

  return (
    <Card className="group relative mx-auto w-full max-w-sm overflow-hidden bg-zinc-900 border-zinc-800 text-white rounded-2xl transition-all duration-300 hover:border-zinc-700 hover:shadow-xl hover:shadow-black/50">
      <Link href={`/productdetails/${prod._id}`}>
        <div className="aspect-[4/5] w-full overflow-hidden bg-zinc-950 relative border-b border-zinc-800/40">
          <img
            src={prod.imageCover}
            alt={prod.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {hasDiscount && (
              <Badge className="bg-red-500 hover:bg-red-600 text-white font-black text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-md border-none shadow-md">
                Sale
              </Badge>
            )}
            {prod.sold > 1000 && (
              <Badge
                variant="secondary"
                className="bg-zinc-950/80 hover:bg-zinc-950/80 border-zinc-800 text-lime-400 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md backdrop-blur-sm"
              >
                Trending
              </Badge>
            )}
          </div>
        </div>

        <div className="p-4 flex flex-col flex-1 justify-between gap-3">
          <div>
            <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-semibold text-zinc-500">
              <span>{prod.brand.name}</span>
              <div className="flex items-center gap-1 bg-zinc-950/60 px-1.5 py-0.5 rounded border border-zinc-800/50">
                <span className="text-amber-400">★</span>
                <span className="text-zinc-300">{prod.ratingsAverage}</span>
                <span className="text-zinc-600">({prod.ratingsQuantity})</span>
              </div>
            </div>

            <h2 className="text-lg font-semibold mt-1.5 line-clamp-1 text-zinc-100 group-hover:text-white transition-colors">
              {prod.title}
            </h2>

            <p className="text-lg text-zinc-500 line-clamp-2 mt-1 font-light leading-relaxed">
              {prod.description.replace(/\t|\n/g, " ")}
            </p>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between mt-2 pt-2.5 border-t border-zinc-800/60 gap-3 px-2">
        <div>
          {hasDiscount ? (
            <div className="flex flex-col">
              <span className="text-lg font-black text-white tracking-tight">
                EGP {prod.priceAfterDiscount}
              </span>
              <span className="text-xs text-zinc-500 line-through font-medium">
                EGP {prod.price}
              </span>
            </div>
          ) : (
            <div className="flex flex-col">
              <span className="text-lg font-black text-white tracking-tight">
                EGP {prod.price}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            size="icon"
            variant="ghost"
            type="button"
            className="bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 h-9 w-9 rounded-xl border border-zinc-800/50 transition-all duration-200 active:scale-90"
          >
            <Heart
              className="w-4 h-4 fill-none transition-colors"
              strokeWidth={2.2}
            />
          </Button>

          <Button className="bg-lime-400 text-zinc-950 hover:bg-lime-300 font-bold px-4 py-2 rounded-xl h-9 text-xs transition-all tracking-wide shadow-md shadow-lime-400/5 active:scale-95 flex items-center gap-1">
            <Plus className="w-3.5 h-3.5" strokeWidth={3} />
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Productcard;
