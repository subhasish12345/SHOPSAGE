import type { Product, Category, ImagePlaceholder, Banner } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string): ImagePlaceholder => {
  const img = PlaceHolderImages.find((p) => p.id === id);
  if (!img) {
    // Return a default/fallback image
    return {
        id: 'fallback',
        imageUrl: 'https://placehold.co/600x400',
        description: 'Fallback image',
        imageHint: 'placeholder',
    };
  }
  return img;
};

export const banners: Banner[] = [
  { id: 'b1', title: 'Festive Sale', image: getImage('banner-1') },
  { id: 'b2', title: 'New Arrivals', image: getImage('banner-2') },
  { id: 'b3', title: 'Electronics Deals', image: getImage('banner-3') },
];

export const categories: Category[] = [
  { id: 'cat1', name: 'Mobiles', slug: 'mobiles', image: getImage('cat-mobiles') },
  { id: 'cat2', name: 'Fashion', slug: 'fashion', image: getImage('cat-fashion') },
  { id: 'cat3', name: 'Electronics', slug: 'electronics', image: getImage('cat-electronics') },
  { id: 'cat4', name: 'Home', slug: 'home', image: getImage('cat-home') },
  { id: 'cat5', name: 'Appliances', slug: 'appliances', image: getImage('cat-appliances') },
  { id: 'cat6', name: 'Travel', slug: 'travel', image: getImage('cat-travel') },
  { id: 'cat7', name: 'Toys', slug: 'toys', image: getImage('cat-toys') },
  { id: 'cat8', name: 'Grocery', slug: 'grocery', image: getImage('cat-grocery') },
];

const allProducts: Product[] = [
  { id: 'p1', name: 'Modern Smartphone Pro X', slug: 'modern-smartphone-pro-x', brand: 'Galaxy', price: 799.99, originalPrice: 999.99, rating: 4.8, reviewsCount: 1250, image: getImage('product-1') },
  { id: 'p2', name: 'Vintage Leather Jacket', slug: 'vintage-leather-jacket', brand: 'Roadster', price: 149.50, originalPrice: 299.00, rating: 4.6, reviewsCount: 840, image: getImage('product-2') },
  { id: 'p3', name: '4K Ultra HD Smart TV', slug: '4k-ultra-hd-smart-tv', brand: 'Vue', price: 499.00, originalPrice: 650.00, rating: 4.9, reviewsCount: 2100, image: getImage('product-3') },
  { id: 'p4', name: 'Ergonomic Office Chair', slug: 'ergonomic-office-chair', brand: 'ComfortZone', price: 220.00, rating: 4.7, reviewsCount: 980, image: getImage('product-4') },
  { id: 'p5', name: 'Smart Coffee Maker', slug: 'smart-coffee-maker', brand: 'BrewMaster', price: 89.99, originalPrice: 120.00, rating: 4.5, reviewsCount: 560, image: getImage('product-5') },
  { id: 'p6', name: 'Lightweight Travel Backpack', slug: 'lightweight-travel-backpack', brand: 'Wanderer', price: 65.00, rating: 4.8, reviewsCount: 1500, image: getImage('product-6') },
  { id: 'p7', name: 'Wooden Building Blocks Set', slug: 'wooden-building-blocks-set', brand: 'PlayfulMinds', price: 35.00, rating: 4.9, reviewsCount: 750, image: getImage('product-7') },
  { id: 'p8', name: 'Organic Quinoa Grains', slug: 'organic-quinoa-grains', brand: 'Nature\'s Best', price: 12.99, rating: 4.9, reviewsCount: 2300, image: getImage('product-8') },
  { id: 'p9', name: 'Wireless Noise-Cancelling Headphones', slug: 'wireless-noise-cancelling-headphones', brand: 'SoundWave', price: 199.99, originalPrice: 249.99, rating: 4.7, reviewsCount: 3120, image: getImage('product-9') },
  { id: 'p10', name: 'Men\'s Running Shoes', slug: 'mens-running-shoes', brand: 'QuickStride', price: 85.00, rating: 4.6, reviewsCount: 1890, image: getImage('product-10') },
  { id: 'p11', name: 'Robotic Vacuum Cleaner', slug: 'robotic-vacuum-cleaner', brand: 'CleanBot', price: 299.00, originalPrice: 399.00, rating: 4.8, reviewsCount: 1400, image: getImage('product-11') },
  { id: 'p12', name: 'Digital Art Tablet', slug: 'digital-art-tablet', brand: 'CanvasPro', price: 350.00, rating: 4.7, reviewsCount: 680, image: getImage('product-12') },
];

export const featuredProducts: Product[] = allProducts.slice(0, 6);
export const stillLookingFor: Product[] = allProducts.slice(6, 12);
