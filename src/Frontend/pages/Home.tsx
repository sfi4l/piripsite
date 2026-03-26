import React, { useState } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { addToCart, ITEMS, type Item } from '../data/store';

interface AbstractItemProps {
  item?: Item;
  label?: string;
  price?: number;
  className?: string;
  variant?: 'light' | 'dark' | 'warm' | 'white';
  imageSrc?: string;
}

const AbstractItem = ({ item, label, price, className = "", variant, imageSrc }: AbstractItemProps) => {
  const [showInfoMobile, setShowInfoMobile] = useState(false);
  const itemVariant = variant || item?.variant || 'light';
  const itemPrice = price || item?.price;
  const itemLabel = label || item?.title;

  const variants: Record<string, string> = {
    light: "bg-[#E5E5E5] border-gray-300",
    dark: "bg-[#B0B0B0] border-gray-400",
    warm: "bg-[#D4D4D4] border-gray-300",
    white: "bg-white border-gray-200",
  };

  const bgStyle = variants[itemVariant] || variants.light;

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item) {
      addToCart(item.id, 1);
    }
  };

  const handleCardClick = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setShowInfoMobile((prev) => !prev);
    }
  };

  return (
    <div 
      className={`relative group border overflow-hidden ${bgStyle} transition-all duration-300 hover:shadow-lg ${className}`}
      onClick={handleCardClick}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={itemLabel || 'photo'}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}

      {/* Информация о товаре - показывается только при наведении */}
      {item && (
        <div
          className={`absolute inset-0 p-4 sm:p-6 flex flex-col justify-between transition-opacity duration-300 z-10 bg-white/95 ${
            showInfoMobile ? 'opacity-100' : 'opacity-0'
          } sm:opacity-0 sm:group-hover:opacity-100`}
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
            {itemPrice && (
              <span className="text-xl font-semibold tracking-wider text-gray-800">${itemPrice}</span>
            )}
          </div>
          
          {/* Иконка корзины в правом нижнем углу */}
          <button
            onClick={handleClick}
            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-10 h-10 min-w-[44px] min-h-[44px] sm:w-8 sm:h-8 sm:min-w-0 sm:min-h-0 bg-gray-800 text-white text-sm flex items-center justify-center hover:bg-gray-900 transition-colors shadow-lg"
          >
            <ShoppingCartOutlined />
          </button>
        </div>
      )}
    </div>
  );
};

const MarqueeStrip = () => {
  return (
    <div className="w-full h-12 bg-gray-800 overflow-hidden flex items-center relative my-6 border-y border-gray-400">
      <style>{`
        @keyframes slideRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: slideRight 20s linear infinite;
        }
      `}</style>
      
      <div className="flex w-[200%] animate-marquee">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center mx-12 text-gray-400 text-xs font-medium tracking-widest uppercase whitespace-nowrap">
            Новые поступления в наличии <span className="mx-6 text-gray-300">→</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const PHOTOS = [
  '/Photos for site/phhfirst.jpg',
  '/Photos for site/photo.jpg',
  '/Photos for site/photo1.jpg',
  '/Photos for site/photo2.jpg',
  '/Photos for site/ph8.jpg',
  '/Photos for site/ph4.png',
  '/Photos for site/ph5.jpg',
  '/Photos for site/ph6.jpg',
  '/Photos for site/ph7.jpg',
  '/Photos for site/ph8.jpg',
  '/Photos for site/ph9.jpg',
];

const Home = () => {
  const [items] = useState<Item[]>(ITEMS);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col items-center py-6 sm:py-10">
      <div className="w-full max-w-[1200px] px-3 sm:px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4 h-auto md:h-[400px]">
          <AbstractItem
            item={items[0]}
            imageSrc={PHOTOS[0]}
            className="md:col-span-2 h-[280px] sm:h-[360px] md:h-full"
          />
          <div className="flex flex-col gap-3 sm:gap-4 h-full">
            <AbstractItem item={items[1]} imageSrc={PHOTOS[1]} className="flex-1 min-h-[140px] sm:min-h-[190px]" />
            <AbstractItem item={items[2]} imageSrc={PHOTOS[2]} className="flex-1 min-h-[140px] sm:min-h-[190px]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 h-auto md:h-[250px] mb-3 sm:mb-4">
          <AbstractItem
            item={items[3]}
            imageSrc={PHOTOS[3]}
            className="md:col-span-2 min-h-[160px] sm:min-h-[200px]"
          />
          <AbstractItem
            item={items[4]}
            imageSrc={PHOTOS[4]}
            className="min-h-[160px] sm:min-h-[200px]"
          />
        </div>
      </div>

      <div className="w-full max-w-[1200px] px-3 sm:px-4">
        <MarqueeStrip />
      </div>

      <div className="w-full max-w-[1200px] px-3 sm:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 h-auto md:h-[320px]">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 h-full min-h-[240px] sm:min-h-0">
            <div className="flex flex-col gap-3 sm:gap-4 h-full">
              <AbstractItem item={items[5]} imageSrc={PHOTOS[5]} className="flex-1 min-h-[120px]" />
              <AbstractItem item={items[6]} imageSrc={PHOTOS[6]} className="flex-1 min-h-[120px]" />
            </div>
            <AbstractItem item={items[7]} imageSrc={PHOTOS[7]} className="h-full min-h-[120px]" />
          </div>

          <div className="flex flex-col gap-3 sm:gap-4 h-full min-h-[240px] sm:min-h-0">
            <AbstractItem item={items[8]} imageSrc={PHOTOS[8]} className="flex-1 min-h-[120px]" />
            <AbstractItem item={items[9]} imageSrc={PHOTOS[9]} className="flex-1 min-h-[120px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
