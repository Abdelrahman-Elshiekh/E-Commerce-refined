"use client";

import React, { useMemo, useState } from "react";
import { Heart, ShoppingBag, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductItem } from "@/app/products/product-fetch-response.interface";

interface ProductDetailsClientProps {
  product: ProductItem;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const images = useMemo(
    () => (product.images && product.images.length > 0 ? product.images : [product.imageCover]),
    [product.images, product.imageCover],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  const details = useMemo(
    () => product.description.split(/\r?\n|\t/).filter(Boolean),
    [product.description],
  );

  const hasDiscount =
    product.priceAfterDiscount !== undefined && product.priceAfterDiscount < product.price;

  const displayedPrice = hasDiscount ? product.priceAfterDiscount : product.price;

  function handlePrev() {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  }

  function handleNext() {
    setActiveIndex((current) => (current + 1) % images.length);
  }

  return (
    <section className="bg-zinc-950 text-white min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex flex-col gap-3">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Product details</p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-white">{product.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
            <span>{product.brand?.name || "Unknown Brand"}</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-white/5 px-3 py-1">
              <Star className="h-4 w-4 text-amber-400" />
              <span>{product.ratingsAverage.toFixed(1)}</span>
              <span className="text-zinc-500">({product.ratingsQuantity} reviews)</span>
            </span>
            <span className="rounded-full border border-zinc-800 bg-white/5 px-3 py-1 text-zinc-500">
              Sold {product.sold.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/20">
            <div className="relative overflow-hidden bg-zinc-900">
              <img
                src={activeImage}
                alt={product.title}
                className="h-[560px] w-full object-cover transition duration-500"
                loading="lazy"
              />

              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {hasDiscount && (
                  <Badge className="bg-red-500 text-white font-black uppercase tracking-[0.22em] px-3 py-1 rounded-full border-none shadow-lg shadow-black/20">
                    Sale
                  </Badge>
                )}
                {product.sold > 1000 && (
                  <Badge className="bg-zinc-950/90 border border-zinc-800 text-lime-400 font-bold uppercase tracking-[0.22em] px-3 py-1 rounded-full backdrop-blur-sm shadow-sm">
                    Trending
                  </Badge>
                )}
              </div>

              <div className="absolute inset-x-0 bottom-4 flex items-center justify-between px-4">
                <Button size="icon" variant="ghost" onClick={handlePrev} className="h-11 w-11 rounded-full border border-white/10 bg-black/30 text-white shadow-xl shadow-black/30 backdrop-blur">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" onClick={handleNext} className="h-11 w-11 rounded-full border border-white/10 bg-black/30 text-white shadow-xl shadow-black/30 backdrop-blur">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="space-y-3 px-4 py-5 sm:px-6 sm:py-6">
              <div className="grid gap-3 sm:grid-cols-4">
                {images.map((src, index) => (
                  <button
                    key={src + index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`overflow-hidden rounded-3xl border p-1 transition-all duration-300 ${
                      activeIndex === index
                        ? "border-lime-400/80 bg-lime-500/10"
                        : "border-zinc-800 bg-zinc-950/80 hover:border-zinc-600"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`${product.title} thumb ${index + 1}`}
                      className="h-24 w-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 p-6 shadow-2xl shadow-black/20">
            <div className="flex flex-col gap-6">
              <div className="grid gap-4 sm:grid-cols-[1fr_auto] items-start">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-zinc-950 text-zinc-200 border border-zinc-800 uppercase tracking-[0.18em] px-3 py-1 rounded-full">
                      {product.category?.name || "Category"}
                    </Badge>
                    <Badge className="bg-zinc-950 text-zinc-200 border border-zinc-800 uppercase tracking-[0.18em] px-3 py-1 rounded-full">
                      {product.brand?.name || "Brand"}
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Overview</p>
                    <p className="text-sm leading-6 text-zinc-300">
                      {product.description.replace(/\s+/g, " ").trim()}
                    </p>
                  </div>
                </div>

                <div className="rounded-[1.75rem] bg-zinc-900/90 p-4 text-right shadow-inner shadow-black/10">
                  <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Available</p>
                  <p className="mt-2 text-3xl font-semibold text-lime-400">{product.quantity}</p>
                  <p className="text-sm text-zinc-500">in stock</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {details.map((detail, index) => (
                  <div
                    key={`${detail}-${index}`}
                    className="rounded-3xl border border-zinc-800 bg-zinc-950/90 p-4 text-sm text-zinc-300"
                  >
                    {detail}
                  </div>
                ))}
              </div>

              <div className="space-y-4 rounded-[1.5rem] border border-zinc-800 bg-zinc-900/90 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Price</p>
                    <div className="flex items-center gap-3">
                      <p className="text-4xl font-semibold text-white">EGP {displayedPrice}</p>
                      {hasDiscount && (
                        <span className="rounded-full border border-zinc-800 bg-zinc-950/90 px-3 py-1 text-sm text-zinc-500 line-through">
                          EGP {product.price}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Sold</p>
                    <p className="mt-2 text-3xl font-semibold text-lime-400">{product.sold.toLocaleString()}</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl border border-zinc-800 bg-zinc-950/90 p-4 text-sm text-zinc-300">
                    <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Rating</p>
                    <p className="mt-2 text-lg font-semibold text-white">{product.ratingsAverage.toFixed(1)} / 5</p>
                  </div>
                  <div className="rounded-3xl border border-zinc-800 bg-zinc-950/90 p-4 text-sm text-zinc-300">
                    <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Reviews</p>
                    <p className="mt-2 text-lg font-semibold text-white">{product.ratingsQuantity}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="grid gap-2">
                  <Badge className="bg-lime-400 text-zinc-950 font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full">
                    Fast shipping
                  </Badge>
                  <Badge className="bg-zinc-950 text-zinc-200 border border-zinc-800 uppercase tracking-[0.18em] px-3 py-1 rounded-full">
                    Free returns
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button className="min-w-[160px] bg-lime-400 text-zinc-950 hover:bg-lime-300 focus-visible:ring-lime-300/50">
                    <ShoppingBag className="h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button variant="ghost" className="min-w-[160px] border border-zinc-800 bg-white/5 text-white hover:bg-white hover:text-zinc-950">
                    <Heart className="h-4 w-4 " />
                    Add to Wishlist
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
