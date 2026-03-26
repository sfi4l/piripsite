import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCartCount, subscribeCartUpdates } from '../data/store';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const syncCount = () => setCartCount(getCartCount());
    syncCount();
    return subscribeCartUpdates(syncCount);
  }, []);

  const navLinksDesktop = (
    <>
      <Link to="/catalog" onClick={() => setMenuOpen(false)}>
        <button className="h-11 min-h-[44px] px-4 sm:px-5 bg-white/50 backdrop-blur-sm border border-white/60 hover:bg-white/70 hover:border-white/80 transition-all shadow-sm flex items-center justify-center min-w-[100px] w-full sm:w-auto text-gray-700">
          <span className="text-[10px] font-bold uppercase tracking-wider">Каталог</span>
        </button>
      </Link>
      <Link to="/about" onClick={() => setMenuOpen(false)}>
        <button className="h-11 min-h-[44px] px-4 sm:px-5 bg-white/50 backdrop-blur-sm border border-white/60 hover:bg-white/70 hover:border-white/80 transition-all shadow-sm flex items-center justify-center min-w-[100px] w-full sm:w-auto text-gray-700">
          <span className="text-[10px] font-bold uppercase tracking-wider">О нас</span>
        </button>
      </Link>
      <Link to="/profile" onClick={() => setMenuOpen(false)}>
        <button className="h-11 min-h-[44px] px-4 sm:px-5 bg-white/50 backdrop-blur-sm border border-white/60 hover:bg-white/70 hover:border-white/80 transition-all shadow-sm flex items-center justify-center min-w-[100px] w-full sm:w-auto text-gray-700">
          <span className="text-[10px] font-bold uppercase tracking-wider">Профиль</span>
        </button>
      </Link>
      <Link to="/cart" onClick={() => setMenuOpen(false)} className="flex-1 min-w-0 sm:flex-initial sm:min-w-0">
        <div className="h-11 min-h-[44px] w-full sm:w-32 min-w-[120px] bg-gray-800 text-white flex items-center justify-center cursor-pointer hover:bg-gray-900 transition-colors relative shadow-sm rounded-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider">Корзина</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white text-[10px] sm:text-xs font-bold text-gray-800 shadow-md">
              {cartCount}
            </span>
          )}
        </div>
      </Link>
    </>
  );

  const navLinksMobile = (
    <>
      <Link to="/catalog" onClick={() => setMenuOpen(false)} className="block border-b border-white/30">
        <div className="h-14 min-h-[56px] flex items-center justify-center text-gray-800 hover:bg-white/20 transition-colors">
          <span className="text-sm font-bold uppercase tracking-wider">Каталог</span>
        </div>
      </Link>
      <Link to="/about" onClick={() => setMenuOpen(false)} className="block border-b border-white/30">
        <div className="h-14 min-h-[56px] flex items-center justify-center text-gray-800 hover:bg-white/20 transition-colors">
          <span className="text-sm font-bold uppercase tracking-wider">О нас</span>
        </div>
      </Link>
      <Link to="/profile" onClick={() => setMenuOpen(false)} className="block border-b border-white/30">
        <div className="h-14 min-h-[56px] flex items-center justify-center text-gray-800 hover:bg-white/20 transition-colors">
          <span className="text-sm font-bold uppercase tracking-wider">Профиль</span>
        </div>
      </Link>
      <Link to="/cart" onClick={() => setMenuOpen(false)} className="block border-b border-white/30">
        <div className="h-14 min-h-[56px] flex items-center justify-center bg-gray-800 text-white hover:bg-gray-900 transition-colors relative">
          <span className="text-sm font-bold uppercase tracking-wider">Корзина</span>
          {cartCount > 0 && (
            <span className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full bg-white text-[11px] font-bold text-gray-800 shadow-md">
              {cartCount}
            </span>
          )}
        </div>
      </Link>
    </>
  );

  const MarqueeBack = () => (
    <div className="fixed inset-0 z-0 min-h-full min-w-full overflow-hidden pointer-events-none" style={{ height: '100vh', width: '100vw' }}>
      <style>{`
        @keyframes marquee-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        @keyframes marquee-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .bg-marquee-down { animation: marquee-down 20s linear infinite; }
        .bg-marquee-up { animation: marquee-up 25s linear infinite; }
      `}</style>
      {[0.15, 0.35, 0.5, 0.7, 0.85].map((left, i) => (
        <div
          key={left}
          className="absolute top-0 bottom-0 w-10 flex justify-center overflow-hidden opacity-[0.14]"
          style={{ left: `${left * 100}%` }}
        >
          <div className={`flex flex-col h-[200%] ${i % 2 === 1 ? 'bg-marquee-up' : 'bg-marquee-down'}`}>
            {[...Array(16)].map((_, j) => (
              <span
                key={j}
                className="text-gray-500 text-[10px] font-bold tracking-[0.4em] uppercase whitespace-nowrap py-4"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
              >
                WEARR WRLD
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <MarqueeBack />
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[100] flex flex-col bg-white/40 backdrop-blur-2xl"
          style={{ top: 0, left: 0, right: 0, bottom: 0 }}
          aria-modal="true"
          role="dialog"
          aria-label="Меню"
        >
          <div className="flex-none h-14 min-h-[56px] flex items-center justify-end px-4 border-b border-white/40 bg-white/20">
            <button
              type="button"
              aria-label="Закрыть меню"
              className="h-11 min-h-[44px] w-11 flex flex-col justify-center items-center gap-1.5 bg-white/60 border border-white/80 hover:bg-white/80 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <span className="w-5 h-0.5 bg-gray-800 rotate-45 translate-y-2" />
              <span className="w-5 h-0.5 bg-gray-800 -rotate-45 -translate-y-2" />
            </button>
          </div>
          <nav className="flex flex-col flex-1 overflow-auto">
            {navLinksMobile}
          </nav>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-[0_1px_0_0_rgba(255,255,255,0.5)_inset]">
        <div className="w-full max-w-[1200px] mx-auto px-3 sm:px-4">
          <div className="flex flex-row justify-between items-center py-3 sm:py-4 gap-3">
            <Link to="/" className="shrink-0 w-32 sm:w-40 h-11 min-h-[44px] bg-gray-800 text-white flex items-center justify-center cursor-pointer hover:bg-gray-900 transition-colors" onClick={() => setMenuOpen(false)}>
              <span className="text-xs sm:text-sm font-bold tracking-widest uppercase">STORE</span>
            </Link>

            <input
              type="search"
              placeholder="Поиск"
              className="flex-1 max-w-[200px] sm:max-w-none sm:flex-1 mx-2 sm:mx-4 lg:mx-6 h-11 min-h-[44px] bg-white/50 backdrop-blur-sm border border-white/60 px-3 sm:px-4 shadow-sm text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
            />

            <div className="hidden lg:flex gap-2 shrink-0 items-stretch">
              {navLinksDesktop}
            </div>

            <button
              type="button"
              aria-label="Меню"
              aria-expanded={menuOpen}
              className="lg:hidden h-11 min-h-[44px] w-11 flex flex-col justify-center items-center gap-1.5 bg-white/50 backdrop-blur-sm border border-white/60 hover:bg-white/70 shadow-sm transition-colors"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMenuOpen((o) => !o);
              }}
            >
              <span className={`w-5 h-0.5 bg-gray-700 transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-5 h-0.5 bg-gray-700 transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-0.5 bg-gray-700 transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      <main className="w-full max-w-[1200px] mx-auto px-3 sm:px-4 py-6 sm:py-10">
        {children}
      </main>

      <footer className="bg-gray-100/60 backdrop-blur-sm border-t border-gray-300/70 mt-12 sm:mt-20 relative z-10">
        <div className="w-full max-w-[1200px] mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs tracking-widest uppercase text-gray-600">STORE</span>
            <a
              href="https://github.com/sfi4l"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="GitHub sfi4l"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.99-.015 1.695 1.165 1.935 1.65.57 1.53 1.5 2.205 2.655 2.25-.825.66-1.02 1.275-.96 1.92.06.645.48 1.92.48 1.92-2.655-.09-5.355-1.335-5.355-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.715 5.82-5.355 5.91.42.36.78 1.05.78 2.145 0 1.545-.015 2.79-.015 3.165 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
