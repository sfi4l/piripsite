const About = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto">
      {/* Hero */}
      <section className="relative overflow-hidden border border-gray-300/80 bg-gradient-to-b from-gray-100 to-[#E5E5E5] min-h-[220px] sm:min-h-[280px] flex flex-col items-center justify-center px-6 py-10 sm:py-14">
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm2 2v36h36V2H2z' fill='%23333' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />
        <h1 className="relative text-2xl sm:text-4xl font-light tracking-[0.2em] sm:tracking-[0.3em] text-gray-800 uppercase mb-2">
          О нас
        </h1>
        <p className="relative text-sm sm:text-base text-gray-600 tracking-wide max-w-lg text-center">
          Делаем вещи, в которые хочется верить
        </p>
      </section>

      {/* Story */}
      <section className="mt-6 sm:mt-10 px-1">
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-6 sm:p-10">
          <h2 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-gray-500 mb-4">
            Наша история
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-2xl">
            Мы начали с простой идеи: вещи для дома должны быть честными — без лишнего шума, 
            с вниманием к материалу и форме. Со временем это превратилось в коллекции керамики, 
            текстиля и аксессуаров, которые живут в интерьере годами и не надоедают.
          </p>
        </div>
      </section>

      {/* Values / blocks */}
      <section className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="border border-gray-300 bg-[#E5E5E5]/90 p-5 sm:p-6 flex flex-col">
          <span className="text-3xl sm:text-4xl mb-3" aria-hidden>◇</span>
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">
            Качество
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Работаем с проверенными материалами и мастерами. Каждый предмет проверяется перед отправкой.
          </p>
        </div>
        <div className="border border-gray-300 bg-[#D4D4D4]/90 p-5 sm:p-6 flex flex-col">
          <span className="text-3xl sm:text-4xl mb-3" aria-hidden>○</span>
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">
            Простота
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Без лишнего декора — форма и материал говорят сами за себя. Лаконичный дизайн на каждый день.
          </p>
        </div>
        <div className="border border-gray-300 bg-[#B0B0B0]/80 p-5 sm:p-6 flex flex-col">
          <span className="text-3xl sm:text-4xl mb-3" aria-hidden>▸</span>
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">
            Доставка
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Отправляем по всей стране. Аккуратная упаковка и быстрая доставка — без сюрпризов.
          </p>
        </div>
      </section>

      {/* CTA line */}
      <section className="mt-8 sm:mt-12 text-center">
        <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-[0.2em]">
          Спасибо, что вы с нами
        </p>
        <p className="mt-1 text-lg sm:text-xl font-light tracking-wider text-gray-700">
          STORE
        </p>
      </section>
    </div>
  );
};

export default About;
