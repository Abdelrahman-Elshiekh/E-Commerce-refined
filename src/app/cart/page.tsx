"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Root, Product } from "./_components/cart-interface";
import { Deleteitem } from "../Services/Cert/delete-cart-items";
import { toast } from "sonner";
import { updatecart } from "../Services/Cert/updatecart";
import { clearcart } from "../Services/Cert/clearcart";

const Cart = () => {
  const [isCleared, setIsCleared] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: cartdata,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["GET-Cart"],
    queryFn: async () => {
      const resp = await fetch("/api/cart");
      const payload = resp.json();
      return payload;
    },
  });


  const { mutate: clearthecart, isPending: clearloading } = useMutation({
    mutationFn: clearcart,
    onSuccess: () => {
      toast.success("Cart cleared successfully");
      setIsCleared(true);
      queryClient.invalidateQueries({ queryKey: ["GET-Cart"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to clear cart. Try again.");
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
            <ShoppingBag className="h-6 w-6 text-red-500" />
          </div>
          <h2 className="text-lg font-semibold">Couldn't load your cart</h2>
          <p className="text-sm text-zinc-500">
            Refresh the page or try again in a moment.
          </p>
        </div>
      </section>
    );
  }

  const products: Product[] = cartdata?.data?.products ?? [];
  const isEmpty = products.length === 0 || isCleared;

  return (
    <section className="min-h-screen bg-zinc-950 py-6 text-white sm:py-12">
      <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between sm:mb-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 sm:text-sm">
              Your bag
            </p>
            <h1 className="text-2xl font-black sm:text-3xl lg:text-4xl">
              Cart
            </h1>
          </div>
          {!isEmpty && (
            <Badge className="rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-1.5 text-[10px] uppercase tracking-[0.18em] text-zinc-300 sm:text-sm">
              {isCleared ? 0 : cartdata.numOfCartItems} item
              {(isCleared ? 0 : cartdata.numOfCartItems) !== 1 && "s"}
            </Badge>
          )}
        </div>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-[1.5rem] border border-zinc-800 bg-zinc-900/60 py-20 text-center">
            <div className="rounded-full border border-zinc-800 bg-zinc-955 p-4">
              <ShoppingBag className="h-6 w-6 text-zinc-500" />
            </div>
            <div>
              <p className="text-lg font-semibold text-white">
                {isCleared ? "Cart cleared" : "Your cart is empty"}
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                {isCleared
                  ? "You removed all products from your basket."
                  : "Items you add will show up here."}
              </p>
            </div>
            <Link href="/">
              <Button className="mt-2 rounded-full bg-yellow-400 px-6 text-zinc-950 hover:bg-yellow-300">
                Browse products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.7fr_1fr] items-start">
            <div className="flex flex-col gap-4">
              <div className="flex justify-end">
                <Button
                  onClick={()=>{clearthecart();}}
                  disabled={clearloading} // Disable button while request runs
                  variant="destructive"
                  className="rounded-full bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all text-xs font-bold uppercase tracking-wider px-4 py-2 disabled:opacity-50"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  {clearloading ? "Clearing..." : "Clear Cart"}
                </Button>
              </div>

              {products.map((item) => (
                <CartRow key={item._id} item={item} />
              ))}
            </div>

            <OrderSummary cartdata={cartdata} products={products} />
          </div>
        )}
      </div>
    </section>
  );
};

const CartRow = ({ item }: { item: Product }) => {
  const queryClient = useQueryClient();

  const { mutate: updatecartitem, isPending: updateloading } = useMutation({
    mutationFn: updatecart,
    onSuccess: () => {
      toast.success("Item updated");
      queryClient.invalidateQueries({ queryKey: ["GET-Cart"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update item. Try again.");
    },
  });

  function handleupdate(productId: string, count: number) {
    if (count < 1) return;
    updatecartitem({ productId, count });
  }

  const { mutate: executeDelete, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => Deleteitem(id),
    onSuccess: () => {
      toast.success("Item removed from cart");
      queryClient.invalidateQueries({ queryKey: ["GET-Cart"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete item. Try again.");
    },
  });

  const isWorking = isDeleting || updateloading;

  return (
    <Card
      className={`grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center gap-6 overflow-hidden rounded-[2rem] border border-zinc-800/80 bg-zinc-900/60 p-6 transition-colors hover:border-zinc-700 ${
        isWorking ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <div className="mx-auto flex h-40 w-40 sm:h-40 sm:w-40 items-center justify-center overflow-hidden rounded-2xl bg-white p-3 border border-zinc-800/40">
        <img
          src={item.product.imageCover}
          alt={item.product.title}
          className="h-full w-full object-contain object-center"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col sm:justify-center items-center self-stretch h-full py-1">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            {item.product.brand?.name}
          </p>

          <h3 className="mt-1.5 text-lg font-black text-zinc-100 sm:text-xl lg:text-2xl leading-tight line-clamp-2">
            {item.product.title}
          </h3>

          <Badge
            variant="secondary"
            className="mt-3 rounded-xl border-zinc-800 bg-zinc-950/80 px-3 py-1 text-[10px] uppercase tracking-wider text-zinc-400 font-medium"
          >
            {item.product.category?.name}
          </Badge>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-zinc-800/60 self-stretch md:self-auto">
        <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-950 px-1.5 py-1.5 shadow-inner">
          <button
            onClick={() => handleupdate(item.product._id, item.count - 1)}
            disabled={isWorking || item.count <= 1}
            className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors disabled:opacity-40"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>

          <span className="w-6 text-center text-base font-black text-zinc-100">
            {item.count}
          </span>

          <button
            onClick={() => handleupdate(item.product._id, item.count + 1)}
            disabled={isWorking}
            className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors disabled:opacity-40"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="text-right min-w-[120px]">
          <span className="text-xl font-black tracking-tight text-white sm:text-2xl block">
            EGP {(item.price * item.count).toFixed(2)}
          </span>
        </div>

        <button
          onClick={() => executeDelete(item.product._id)}
          disabled={isWorking}
          className="rounded-full bg-red-500/10 p-3 text-red-500 transition-colors hover:bg-red-500/20 disabled:opacity-40"
          aria-label="Remove item"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </Card>
  );
};

const OrderSummary = ({
  cartdata,
  products,
}: {
  cartdata: Root;
  products: Product[];
}) => {
  const shipping = 0;
  const total = cartdata.data.totalCartPrice + shipping;

  return (
    <Card className="h-fit overflow-hidden rounded-[2rem] border border-zinc-800/80 bg-zinc-900/60 p-6 shadow-2xl shadow-black/50 sm:sticky top-26 sm:top-19">
      <h2 className="text-xl font-black text-white">Order Summary</h2>

      <div className="mt-5 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 border-b border-zinc-800/40 pb-2">
        <span>Items</span>
        <span>Total</span>
      </div>

      <div className="mt-3 flex max-h-56 flex-col gap-4 overflow-y-auto border-b border-zinc-800 pb-5 pr-1">
        {products.map((item) => (
          <div
            key={item._id}
            className="flex items-start justify-between gap-4 text-sm"
          >
            <span className="line-clamp-2 text-zinc-400 font-medium">
              {item.product.title}{" "}
              <span className="text-zinc-600 font-bold ml-1">
                × {item.count}
              </span>
            </span>
            <span className="flex-shrink-0 font-bold text-zinc-200">
              EGP {(item.price * item.count).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3.5 border-b border-zinc-800 pb-5 text-sm">
        <div className="flex items-center justify-between text-zinc-400">
          <span className="font-medium">Subtotal</span>
          <span className="font-bold text-zinc-200">
            EGP {cartdata.data.totalCartPrice}
          </span>
        </div>
        <div className="flex items-center justify-between text-zinc-400">
          <span className="font-medium">Shipping</span>
          <span className="text-lime-400 font-bold uppercase text-xs tracking-wider">
            {shipping === 0 ? "Free" : `EGP ${shipping}`}
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
          Total
        </span>
        <span className="text-2xl font-black tracking-tight text-white sm:text-3xl">
          EGP {total}
        </span>
      </div>

      <Button className="mt-6 w-full rounded-full bg-yellow-400 py-6 text-sm font-black uppercase tracking-widest text-zinc-950 hover:bg-yellow-300 transition-all shadow-xl shadow-yellow-400/5">
        Checkout
      </Button>
    </Card>
  );
};

export default Cart;
