export interface ProductItem {
  sold: number
  images: string[]
  subcategory: ProductSubcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: ProductCategory
  brand: ProductBrand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
  priceAfterDiscount?: number
  availableColors?: string[]
}

export interface ProductSubcategory {
  _id: string
  name: string
  slug: string
  category: string
}

export interface ProductCategory {
  _id: string
  name: string
  slug: string
  image: string
}

export interface ProductBrand {
  _id: string
  name: string
  slug: string
  image: string
}
