export interface wishlistinterface {
  status: string;
  count: number;
  data: wishlistitem[];
}

export interface wishlistitem {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  quantity: number;
  sold: number;
  imageCover: string;
  images: string[];
  category: Category;
  brand: Brand;
  subcategory: Subcategory[];
  ratingsQuantity: number;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
