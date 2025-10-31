'use client';

import { Package, ShoppingCart, Tag, Shirt, Smartphone, Headphones, Gift, ToyBrick } from 'lucide-react';

const icons = [
  { Icon: Package, size: 'w-16 h-16', style: { top: '10%', left: '10%', animationDelay: '0s' } },
  { Icon: ShoppingCart, size: 'w-20 h-20', style: { top: '20%', left: '80%', animationDelay: '2s' } },
  { Icon: Tag, size: 'w-12 h-12', style: { top: '70%', left: '20%', animationDelay: '4s' } },
  { Icon: Shirt, size: 'w-24 h-24', style: { top: '80%', left: '60%', animationDelay: '1s' } },
  { Icon: Smartphone, size: 'w-14 h-14', style: { top: '40%', left: '50%', animationDelay: '6s' } },
  { Icon: Headphones, size: 'w-16 h-16', style: { top: '50%', left: '90%', animationDelay: '3s' } },
  { Icon: Gift, size: 'w-20 h-20', style: { top: '90%', left: '10%', animationDelay: '5s' } },
  { Icon: ToyBrick, size: 'w-12 h-12', style: { top: '5%', left: '40%', animationDelay: '7s' } },
   // Add a few more for density
  { Icon: Package, size: 'w-12 h-12', style: { top: '60%', left: '5%', animationDelay: '8s' } },
  { Icon: ShoppingCart, size: 'w-14 h-14', style: { top: '30%', left: '30%', animationDelay: '9s' } },
  { Icon: Tag, size: 'w-16 h-16', style: { top: '5%', left: '70%', animationDelay: '10s' } },
  { Icon: Shirt, size: 'w-12 h-12', style: { top: '95%', left: '90%', animationDelay: '11s' } },
];

const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      <ul className="floating-shapes">
        {icons.map((item, index) => (
          <li key={index}>
            <item.Icon className={`${item.size} text-primary/10`} style={item.style} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FloatingShapes;
