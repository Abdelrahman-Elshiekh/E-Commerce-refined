export interface BrandItem {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface BrandResponse {
  data: BrandItem[];
}
