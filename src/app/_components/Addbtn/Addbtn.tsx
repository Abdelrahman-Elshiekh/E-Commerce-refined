'use client';
import React from 'react'
import { Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ShoppingBag } from 'lucide-react';
import { addToCart } from '@/app/Services/Cert/Addtocart';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';


export default function Addbtn({ productId }: { productId: string }) {

  const quaryclient =  useQueryClient()
  
  const {data,isError,isPending,mutate:additemtocart} =
  useMutation({
    mutationFn: () => addToCart(productId),
    onSuccess: (data) => {
      toast.success(data.message)
      quaryclient.invalidateQueries({ queryKey: ["GET-Cart"] });
    },
    onError: (error) => {
      toast.error('login first to add item to cart')
      window.location.href='/login'
    },
    
})


  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Button
        onClick={() => additemtocart()}
        className="w-full bg-lime-400 text-zinc-950 hover:bg-lime-300 focus-visible:ring-lime-300/50"
      >
        <ShoppingBag className="h-4 w-4" />
        Add to Cart
      </Button>
      <Button
        variant="ghost"
        className="w-full border border-zinc-800 bg-white/5 text-white hover:bg-white hover:text-zinc-950"
      >
        <Heart className="h-4 w-4" />
        Add to Wishlist
      </Button>
    </div>
  );
}
