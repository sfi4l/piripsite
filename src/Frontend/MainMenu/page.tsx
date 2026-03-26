import { useState, useEffect } from 'react';
import { ITEMS, type Item } from '../data/store';

interface AbstractItemProps {
  item?: Item;
  label?: string;
  price?: number;
  className?: string;
  variant?: 'light' | 'dark' | 'warm' | 'white';
}

// Компонент блока товара
const AbstractItem = ({ item, label, price, className = "", variant }: AbstractItemProps) => {
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

  return (
    <div className={`relative group border ${bgStyle} transition-all duration-300 hover:shadow-lg cursor-pointer overflow-hidden ${className}`}>
      {itemLabel && (
        <div className="absolute top-4 left-4 text-[10px] font-semibold uppercase tracking-wider text-gray-600 opacity-80 group-hover:opacity-100 transition-opacity">
          {itemLabel}
        </div>
      )}
      
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />

      {itemPrice && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <span className="text-xl font-light tracking-wider text-gray-700">${itemPrice}</span>
        </div>
      )}
    </div>
  );
};

// Кнопки навигации
const NavButton = ({ title, sub }: { title: string, sub: string }) => (
  <button className="h-10 px-5 bg-gray-100 border border-gray-300 hover:bg-gray-200 hover:border-gray-400 transition-colors flex flex-col items-center justify-center min-w-[100px]">
    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">{title}</span>
    <span className="text-[8px] text-gray-500 uppercase">{sub}</span>
  </button>
);

// Бегущая строка
const MarqueeStrip = () => {
  return (
    <div className="w-full h-12 bg-gray-800 overflow-hidden flex items-center relative my-6 border-y border-gray-700">
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

const App = () => {
  const [items] = useState<Item[]>(ITEMS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col items-center py-10">
      
      <div className="w-full max-w-[1200px] px-4">
        
        {/* HEADER */}
        <header className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-6">
          <div className="w-40 h-12 bg-gray-800 text-white flex items-center justify-center cursor-pointer hover:bg-gray-900 transition-colors">
            <span className="text-sm font-bold tracking-widest uppercase">STORE</span>
          </div>

          <div className="flex-1 w-full lg:mx-6 h-12 bg-white border border-gray-300 flex items-center px-4">
            <span className="text-xs text-gray-500 uppercase tracking-wide">Поиск товаров...</span>
          </div>

          <div className="flex gap-2">
            <NavButton title="Каталог" sub="Все товары" />
            <NavButton title="О нас" sub="Инфо" />
            <NavButton title="Профиль" sub="Вход" />
            <div className="h-10 w-24 bg-gray-800 text-white flex items-center justify-center cursor-pointer hover:bg-gray-900 transition-colors">
              <span className="text-[10px] font-bold uppercase tracking-wider">Корзина</span>
            </div>
          </div>
        </header>

        {/* ВЕРХНЯЯ СЕКЦИЯ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 h-auto md:h-[400px]">
          <AbstractItem 
            item={items[0]}
            className="md:col-span-2 h-[400px] md:h-full" 
          />
          <div className="flex flex-col gap-4 h-full">
            <AbstractItem item={items[1]} className="flex-1 min-h-[190px]" />
            <AbstractItem item={items[2]} className="flex-1 min-h-[190px]" />
          </div>
        </div>

        {/* СРЕДНЯЯ СЕКЦИЯ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[250px] mb-4">
          <AbstractItem 
            item={items[3]}
            className="md:col-span-2 min-h-[200px]" 
          />
          <AbstractItem 
            item={items[4]}
            className="min-h-[200px]" 
          />
        </div>
      </div>

      {/* АНИМИРОВАННАЯ ЛЕНТА */}
      <div className="w-full max-w-[1200px]">
        <MarqueeStrip />
      </div>

      {/* НИЖНЯЯ СЕКЦИЯ */}
      <div className="w-full max-w-[1200px] px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[320px]">
          
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="flex flex-col gap-4 h-full">
              <AbstractItem item={items[5]} className="flex-1" />
              <AbstractItem item={items[6]} className="flex-1" />
            </div>
            <AbstractItem item={items[7]} className="h-full" />
          </div>

          <div className="flex flex-col gap-4 h-full">
            <AbstractItem item={items[8]} className="flex-1" />
            <AbstractItem item={items[9]} className="flex-1" />
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <div className="h-20 flex items-center justify-center opacity-50 mt-10">
        <span className="text-[10px] tracking-widest uppercase text-gray-600">© 2024 STORE</span>
      </div>

    </div>
  );
};

export default App;
