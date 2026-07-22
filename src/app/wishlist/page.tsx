"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";
import {
  wishlistinterface,
  wishlistitem,
} from "./_components/wishlist-interface";
import { Deleteitemwishlist } from "../Services/wishlist/deletewishlist";
import { addToCart } from "../Services/Cert/Addtocart";

const Wishlist = () => {
  const queryClient = useQueryClient();

  const {
    data: wishlistdata,
    isLoading,
    isError,
  } = useQuery<wishlistinterface>({
    queryKey: ["get-wishlist"],
    queryFn: async () => {
      const resp = await fetch("/api/wishlist");
      const payload = await resp.json();
      return payload;
    },
  });

  if (isLoading) {
    return (
      <section className="min-h-screen bg-zinc-950 py-12 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 h-8 w-40 animate-pulse rounded bg-zinc-900" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-44 w-full animate-pulse rounded-[2rem] border border-zinc-800 bg-zinc-900"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-full border border-zinc-800 bg-zinc-900 p-4">
            <Heart className="h-6 w-6 text-red-500" />
          </div>
          <h2 className="text-lg font-semibold">Couldn't load your wishlist</h2>
          <p className="text-sm text-zinc-500">
            Please refresh the page or try again shortly.
          </p>
        </div>
      </section>
    );
  }

  const isEmpty = !wishlistdata?.data || wishlistdata?.data.length === 0;

  return (
    <section className="min-h-screen bg-zinc-950 py-6 text-white sm:py-12">
      <div className="mx-auto max-w-5xl px-3 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between sm:mb-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 sm:text-sm">
              Saved Items
            </p>
            <h1 className="text-2xl font-black sm:text-3xl lg:text-4xl">
              Wishlist
            </h1>
          </div>
          {!isEmpty && (
            <Badge className="rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-1.5 text-[10px] uppercase tracking-[0.18em] text-zinc-300 sm:text-sm">
              {wishlistdata?.count} item{wishlistdata?.count !== 1 && "s"}
            </Badge>
          )}
        </div>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-[1.5rem] border border-zinc-800 bg-zinc-900/60 py-20 text-center">
            <div className="rounded-full border border-zinc-800 bg-zinc-955 p-4">
              <Heart className="h-6 w-6 text-zinc-500" />
            </div>
            <div>
              <p className="text-lg font-semibold text-white">
                Your wishlist is empty
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                Items you bookmark while shopping will show up here.
              </p>
            </div>
            <Link href="/">
              <Button className="mt-2 rounded-full bg-yellow-400 px-6 text-zinc-950 hover:bg-yellow-300">
                Explore Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {wishlistdata.data.map((item) => (
              <WishlistRow key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const WishlistRow = ({ item }: { item: wishlistitem }) => {
  const queryClient = useQueryClient();

  const { mutate: executeDelete, isPending: isDeleting } = useMutation({
    mutationFn: (targetId: string) => Deleteitemwishlist(targetId),
    onSuccess: (data) => {
      toast.success(data?.message ?? "Item removed from wishlist");
      queryClient.invalidateQueries({ queryKey: ["get-wishlist"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete item. Try again.");
    },
  });

  const { mutate: executeAddToCart, isPending: isAddingToCart } = useMutation({
    mutationFn: (productId: string) => addToCart(productId),
    onSuccess: (data) => {
      toast.success(data?.message ?? "Item added to cart");
      queryClient.invalidateQueries({ queryKey: ["GET-Cart"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to add item to cart. Try again.");
    },
  });

  const isWorking = isDeleting || isAddingToCart;

  return (
    <Card
      className={`grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center gap-6 overflow-hidden rounded-[2rem] border border-zinc-800/80 bg-zinc-900/60 p-6 transition-colors hover:border-zinc-700 ${
        isWorking ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <div className="mx-auto flex h-36 w-36 items-center justify-center overflow-hidden rounded-2xl bg-white p-3 border border-zinc-800/40">
        <img
          src={item.imageCover}
          alt={item.title}
          className="h-full w-full object-contain object-center"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col sm:justify-center items-center md:items-start text-center md:text-left self-stretch h-full py-1">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            {item.brand?.name || "Premium Brand"}
          </p>
          <h3 className="mt-1.5 text-lg font-black text-zinc-100 sm:text-xl leading-tight line-clamp-2">
            {item.title}
          </h3>
          <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
            <Badge
              variant="secondary"
              className="rounded-xl border border-zinc-800 bg-zinc-955 px-3 py-1 text-[10px] uppercase tracking-wider text-zinc-400 font-medium"
            >
              {item.category?.name}
            </Badge>
            {item.quantity < 1 && (
              <Badge className="rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] uppercase tracking-wider">
                Out of Stock
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between md:justify-end gap-4 md:gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-zinc-800/60 self-stretch md:self-auto w-full md:w-auto">
        <div className="text-center md:text-right min-w-[120px]">
          <span className="text-xl font-black tracking-tight text-white sm:text-2xl block">
            EGP {item.price.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
          <button
            onClick={() => executeAddToCart(item._id || item.id)}
            disabled={isWorking || item.quantity < 1}
            className="rounded-full bg-lime-400/10 p-3 text-lime-400 transition-colors hover:bg-lime-400/20 disabled:opacity-40"
            aria-label="Add item to cart"
            title={item.quantity < 1 ? "Out of stock" : "Add to cart"}
          >
            <ShoppingBag className="h-4 w-4" />
          </button>

          <button
            onClick={() => executeDelete(item._id || item.id)}
            disabled={isWorking}
            className="rounded-full bg-red-500/10 p-3 text-red-500 transition-colors hover:bg-red-500/20 disabled:opacity-40"
            aria-label="Remove item from wishlist"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default Wishlist;
