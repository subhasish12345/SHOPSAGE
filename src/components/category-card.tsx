'use client';

import type { Category } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

type CategoryCardProps = {
  category: Category;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`} className="group">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardContent className="p-0 flex flex-col items-center text-center">
          <div className="p-4">
            <Image
              src={category.image.imageUrl}
              alt={category.name}
              width={80}
              height={80}
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={category.image.imageHint}
            />
          </div>
          <div className="p-2 w-full">
            <h3 className="text-sm font-medium text-foreground truncate">{category.name}</h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
