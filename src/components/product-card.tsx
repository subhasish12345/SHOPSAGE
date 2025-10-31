'use client';

import type { Product } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { Button } from './ui/button';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col">
        <CardContent className="p-0 flex-1 flex flex-col">
          <div className="relative aspect-square">
            <Image
              src={product.image.imageUrl}
              alt={product.name}
              width={400}
              height={400}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={product.image.imageHint}
            />
            {discount > 0 && (
              <Badge variant="destructive" className="absolute top-2 left-2">
                {discount}% OFF
              </Badge>
            )}
          </div>
          <div className="p-4 flex flex-col flex-1">
            <p className="text-sm text-muted-foreground">{product.brand}</p>
            <h3 className="font-medium text-foreground leading-snug mt-1 flex-1">
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
                <Star className="w-3 h-3 fill-current" />
                <span className="font-bold">{product.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">({product.reviewsCount})</span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <p className="text-lg font-bold text-foreground">
                ${product.price.toFixed(2)}
              </p>
              {product.originalPrice && (
                <p className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
