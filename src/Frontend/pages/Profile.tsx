const Profile = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <h1 className="text-2xl sm:text-3xl font-light tracking-wider text-gray-800 mb-6 sm:mb-8">
        Профиль
      </h1>
      <div className="border border-gray-300 bg-white/80 backdrop-blur-sm max-w-md">
        <div className="border-b border-gray-200 px-4 sm:px-6 py-4">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Имя</p>
          <p className="text-gray-800">Пользователь</p>
        </div>
        <div className="border-b border-gray-200 px-4 sm:px-6 py-4">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Email</p>
          <p className="text-gray-800">guest@example.com</p>
        </div>
        <div className="border-b border-gray-200 px-4 sm:px-6 py-4">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Телефон</p>
          <p className="text-gray-800">—</p>
        </div>
        <div className="px-4 sm:px-6 py-4">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Адрес</p>
          <p className="text-gray-800">—</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
