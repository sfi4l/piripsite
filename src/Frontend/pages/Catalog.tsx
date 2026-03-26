import { useState, useEffect } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { addToCart, getItems, type Item } from '../data/store';

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

const CatalogItemCard = ({ item, photo }: { item: Item; photo: string }) => {
  const [showInfoMobile, setShowInfoMobile] = useState(false);

  const variants: Record<string, string> = {
    light: "bg-[#E5E5E5] border-gray-300",
    dark: "bg-[#B0B0B0] border-gray-400",
    warm: "bg-[#D4D4D4] border-gray-300",
    white: "bg-white border-gray-200",
  };

  const bgStyle = variants[item.variant] || variants.light;

  const handleCardClick = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setShowInfoMobile((prev) => !prev);
    }
  };

  return (
    <div
      className={`relative group border ${bgStyle} transition-all duration-300 hover:shadow-lg cursor-pointer overflow-hidden h-56 sm:h-64`}
      onClick={handleCardClick}
    >
      {photo && (
        <img
          src={photo}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}
      <div
        className={`absolute inset-0 p-4 sm:p-6 flex flex-col justify-between transition-opacity duration-300 z-10 bg-white/95 ${
          showInfoMobile ? 'opacity-100' : 'opacity-0'
        } sm:opacity-0 sm:group-hover:opacity-100`}
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
          {item.description && (
            <p className="text-sm text-gray-600 mb-4">{item.description}</p>
          )}
          <span className="text-xl font-semibold tracking-wider text-gray-800">${item.price}</span>
        </div>
        
        {/* Иконка корзины в правом нижнем углу */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(item.id, 1);
          }}
          className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-10 h-10 min-w-[44px] min-h-[44px] sm:w-8 sm:h-8 sm:min-w-0 sm:min-h-0 bg-gray-800 text-white text-sm flex items-center justify-center hover:bg-gray-900 transition-colors shadow-lg"
        >
          <ShoppingCartOutlined />
        </button>
      </div>
    </div>
  );
};

const Catalog = () => {
  const [items, setItems] = useState<Item[]>(getItems());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    setItems(getItems(selectedCategory));
  }, [selectedCategory]);

  const categories = [
    { value: 'all', label: 'Все товары' },
    { value: 'featured', label: 'Рекомендуемые' },
    { value: 'regular', label: 'Обычные' },
    { value: 'premium', label: 'Премиум' },
  ];

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-light tracking-wider text-gray-800 mb-6 sm:mb-8">Каталог товаров</h1>

      <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
        {categories.map(cat => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`min-h-[44px] px-4 sm:px-6 py-2.5 border transition-colors ${
              selectedCategory === cat.value
                ? 'bg-gray-800 text-white border-gray-800'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Сетка товаров */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {items.map((item, index) => {
          const photo = PHOTOS[index % PHOTOS.length];
          return (
            <CatalogItemCard key={item.id} item={item} photo={photo} />
          );
        })}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Товары не найдены
        </div>
      )}
    </div>
  );
};

export default Catalog;
