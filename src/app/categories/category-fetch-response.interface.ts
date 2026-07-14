export interface CategoryItem {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResponse {
  data: CategoryItem[];
}
