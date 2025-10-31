export type ImagePlaceholder = {
  id: string;
  imageUrl: string;
  description: string;
  imageHint: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: ImagePlaceholder;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  image: ImagePlaceholder;
};

export type Banner = {
  id: string;
  title: string;
  image: ImagePlaceholder;
};
