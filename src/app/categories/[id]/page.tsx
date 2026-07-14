import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CategoryItem } from "@/app/categories/category-fetch-response.interface";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CategoryDetailPage({ params }: PageProps) {
  const { id } = await params;
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`, {
    cache: "no-store",
  });
  const json = await response.json();
  const category: CategoryItem | undefined = json?.data;

  if (!category) {
    return notFound();
  }

  return (
    <section className="bg-zinc-950 min-h-screen py-10 text-white">
      <div className="mx-auto max-w-5xl px-4">
        <Card className="overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/40">
          <img
            src={category.image}
            alt={category.name}
            className="h-[520px] w-full object-cover"
            loading="lazy"
          />

          <div className="space-y-4 p-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-lime-400 text-zinc-950 font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full">
                {category.slug}
              </Badge>
              <Badge className="bg-zinc-900 text-zinc-400 border border-zinc-800 uppercase tracking-[0.18em] px-3 py-1 rounded-full">
                {category._id}
              </Badge>
            </div>

            <div className="grid gap-4 text-sm text-zinc-300">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-950/90 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">name</p>
                <p className="mt-2 text-base font-semibold text-white">{category.name}</p>
              </div>
              <div className="rounded-3xl border border-zinc-800 bg-zinc-950/90 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">slug</p>
                <p className="mt-2 text-base font-semibold text-white">{category.slug}</p>
              </div>
              <div className="rounded-3xl border border-zinc-800 bg-zinc-950/90 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">createdAt</p>
                <p className="mt-2 text-base font-semibold text-white">{category.createdAt}</p>
              </div>
              <div className="rounded-3xl border border-zinc-800 bg-zinc-950/90 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">updatedAt</p>
                <p className="mt-2 text-base font-semibold text-white">{category.updatedAt}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
