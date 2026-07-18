'use client';
import React, { useEffect, useMemo, useState } from "react";

import {
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductItem } from "@/app/products/product-fetch-response.interface";
import Addbtn from "@/app/_components/Addbtn/Addbtn";

const ProductDetailsClient = ({ product }: { product: ProductItem }) => {
  const images = useMemo(
    () =>
      product.images && product.images.length > 0
        ? product.images
        : [product.imageCover],
    [product.images, product.imageCover],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  useEffect(() => {
    if (images.length <= 1) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 2000);

    return () => window.clearInterval(intervalId);
  }, [images]);

  const details = useMemo(
    () => product.description.split(/\r?\n|\t/).filter(Boolean),
    [product.description],
  );

  const hasDiscount =
    product.priceAfterDiscount !== undefined &&
    product.priceAfterDiscount < product.price;

  const displayedPrice = hasDiscount
    ? product.priceAfterDiscount
    : product.price;

  function handlePrev() {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  }

  function handleNext() {
    setActiveIndex((current) => (current + 1) % images.length);
  }
  return (
    <section className="min-h-screen bg-zinc-950 py-4 text-white sm:py-12">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-col gap-2 sm:mb-8 sm:gap-3">
          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 sm:text-sm">
            Product details
          </p>
          <h1 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
            {product.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-zinc-400 sm:gap-3 sm:text-sm">
            <span>{product.brand?.name || "Unknown Brand"}</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-white/5 px-2 py-1 sm:px-3">
              <Star className="h-3.5 w-3.5 text-amber-400 sm:h-4 sm:w-4" />
              <span>{product.ratingsAverage.toFixed(1)}</span>
              <span className="text-zinc-500">({product.ratingsQuantity})</span>
            </span>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="overflow-hidden rounded-[1.25rem] border border-zinc-800 bg-zinc-950 shadow-lg shadow-black/20 sm:rounded-[2rem] sm:shadow-2xl">
            <div className="relative overflow-hidden bg-zinc-900">
              <img
                src={activeImage}
                alt={product.title}
                className="h-60 w-full object-cover transition duration-500 sm:h-[26rem] lg:h-[34rem]"
                loading="lazy"
              />

              <div className="absolute left-3 top-3 flex flex-col gap-1.5 sm:left-4 sm:top-4 sm:gap-2">
                {hasDiscount && (
                  <Badge className="rounded-full border-none bg-red-500 px-2 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-white shadow-lg shadow-black/20 sm:px-3 sm:py-1 sm:text-sm">
                    Sale
                  </Badge>
                )}
                {product.sold > 1000 && (
                  <Badge className="rounded-full border border-zinc-800 bg-zinc-950/90 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-lime-400 shadow-sm backdrop-blur-sm sm:px-3 sm:py-1 sm:text-sm">
                    Trending
                  </Badge>
                )}
              </div>

              <div className="absolute inset-x-0 bottom-3 flex items-center justify-between px-3 sm:bottom-4 sm:px-4">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handlePrev}
                  className="h-9 w-9 rounded-full border border-white/10 bg-black/30 text-white shadow-xl shadow-black/30 backdrop-blur sm:h-11 sm:w-11"
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleNext}
                  className="h-9 w-9 rounded-full border border-white/10 bg-black/30 text-white shadow-xl shadow-black/30 backdrop-blur sm:h-11 sm:w-11"
                >
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </div>

            <div className="hidden px-3 py-3 sm:block sm:px-6 sm:py-6">
              <div className="grid gap-2 sm:grid-cols-4 sm:gap-3">
                {images.map((src, index) => (
                  <button
                    key={src + index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`overflow-hidden rounded-2xl border p-1 transition-all duration-300 sm:rounded-3xl ${
                      activeIndex === index
                        ? "border-lime-400/80 bg-lime-500/10"
                        : "border-zinc-800 bg-zinc-950/80 hover:border-zinc-600"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`${product.title} thumb ${index + 1}`}
                      className="h-14 w-full object-cover transition-transform duration-300 hover:scale-105 sm:h-24"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden rounded-[1.25rem] border border-zinc-800 bg-zinc-950 p-4 shadow-lg shadow-black/20 sm:rounded-[2rem] sm:p-8 sm:shadow-2xl">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className=" flex-wrap gap-2 sm:flex">
                  <Badge className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-zinc-200 sm:text-sm">
                    {product.category?.name || "Women's Fashion"}
                  </Badge>
                  <Badge className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-zinc-200 sm:text-sm">
                    {product.brand?.name || "Defacto"}
                  </Badge>
                </div>
                <div className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-2 text-center text-[10px] uppercase tracking-[0.24em] text-zinc-400 sm:px-4 sm:py-3 sm:text-sm">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-500">
                    Available
                  </p>
                  <p className="text-lg font-semibold text-lime-400 sm:text-2xl">
                    {product.quantity}
                  </p>
                </div>
              </div>

              <div className="hidden grid-cols-2 gap-3 sm:grid">
                <div className="rounded-[1rem] border border-zinc-800 bg-zinc-900/80 p-4 text-sm text-zinc-300">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-500 sm:text-sm">
                    Material
                  </p>
                  <p className="mt-2">Polyester Blend</p>
                </div>
                <div className="rounded-[1rem] border border-zinc-800 bg-zinc-900/80 p-4 text-sm text-zinc-300">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-500 sm:text-sm">
                    Colour Name
                  </p>
                  <p className="mt-2">Multicolour</p>
                </div>
                <div className="rounded-[1rem] border border-zinc-800 bg-zinc-900/80 p-4 text-sm text-zinc-300">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-500 sm:text-sm">
                    Department
                  </p>
                  <p className="mt-2">{product.category?.name || "Women"}</p>
                </div>
                <div className="rounded-[1rem] border border-zinc-800 bg-zinc-900/80 p-4 text-sm text-zinc-300">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-500 sm:text-sm">
                    Brand
                  </p>
                  <p className="mt-2">{product.brand?.name || "Defacto"}</p>
                </div>
              </div>

              <div className="rounded-[1rem] border border-zinc-800 bg-zinc-900/90 p-4 sm:rounded-[1.5rem] sm:p-5">
                <div className="flex flex-row justify-between gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-500 sm:text-sm">
                      Price
                    </p>
                    <p className=" text-4xl font-bold text-white sm:text-5xl">
                      EGP {displayedPrice}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-500 sm:text-sm">
                      Sold
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-lime-400 sm:text-4xl">
                      {product.sold.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1rem] border border-zinc-800 bg-zinc-950/90 p-4 text-sm text-zinc-300">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-500 sm:text-sm">
                      Rating
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {product.ratingsAverage.toFixed(1)} / 5
                    </p>
                  </div>
                  <div className="rounded-[1rem] border border-zinc-800 bg-zinc-950/90 p-4 text-sm text-zinc-300">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-500 sm:text-sm">
                      Reviews
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {product.ratingsQuantity}
                    </p>
                  </div>
                </div>
              </div>

              <div className="hidden grid-cols-2 gap-3 sm:grid">
                <div className="rounded-full border border-zinc-800 bg-zinc-950 px-4 py-3 text-center text-[10px] uppercase tracking-[0.24em] text-lime-400">
                  Fast Shipping
                </div>
                <div className="rounded-full border border-zinc-800 bg-zinc-950 px-4 py-3 text-center text-[10px] uppercase tracking-[0.24em] text-zinc-400">
                  Free Returns
                </div>
              </div>

              <Addbtn productId={product.id} />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsClient;
