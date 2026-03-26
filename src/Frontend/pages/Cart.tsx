import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Result } from 'antd';
import {
  clearCart,
  getCartItems,
  removeCartItem,
  subscribeCartUpdates,
  updateCartQuantity,
  type CartItem,
} from '../data/store';

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    fetchCart();
    return subscribeCartUpdates(fetchCart);
  }, []);

  const fetchCart = () => {
    setCart(getCartItems());
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    updateCartQuantity(itemId, quantity);
    fetchCart();
  };

  const removeItem = (itemId: number) => {
    removeCartItem(itemId);
    fetchCart();
  };

  const clearAllCart = () => {
    clearCart();
    fetchCart();
  };

  const handleSubmitOrder = () => {
    if (!phone.trim()) {
      setPhoneError('Введите номер телефона');
      return;
    }

    setPhoneError('');
    setSubmitting(true);

    clearAllCart();
    setOrderSuccess(true);
    setSubmitting(false);
  };

  const total = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-light tracking-wider text-gray-800 mb-6 sm:mb-8">Корзина</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12 bg-white/60 backdrop-blur-sm border border-gray-300/70 px-6 relative z-10">
          <p className="text-gray-600 mb-4">Ваша корзина пуста</p>
          <Link
            to="/catalog"
            className="inline-block min-h-[48px] px-6 py-3 flex items-center justify-center bg-gray-800 text-white uppercase tracking-wider hover:bg-gray-900 transition-colors"
          >
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Список товаров */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(cartItem => {
              const variants: Record<string, string> = {
                light: "bg-[#E5E5E5]/75 backdrop-blur-sm border-gray-300/80",
                dark: "bg-[#B0B0B0]/75 backdrop-blur-sm border-gray-400/80",
                warm: "bg-[#D4D4D4]/75 backdrop-blur-sm border-gray-300/80",
                white: "bg-white/75 backdrop-blur-sm border-gray-200/80",
              };
              const bgStyle = variants[cartItem.item.variant] || variants.light;

              return (
                <div
                  key={cartItem.itemId}
                  className={`border ${bgStyle} p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10`}
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{cartItem.item.title}</h3>
                    <p className="text-gray-600">${cartItem.item.price} за шт.</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(cartItem.itemId, cartItem.quantity - 1)}
                        className="w-10 h-10 min-w-[44px] min-h-[44px] sm:w-8 sm:h-8 sm:min-w-0 sm:min-h-0 bg-gray-300 hover:bg-gray-400 text-gray-800 flex items-center justify-center font-semibold"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-semibold text-gray-800 flex items-center justify-center h-10 sm:h-8">{cartItem.quantity}</span>
                      <button
                        onClick={() => updateQuantity(cartItem.itemId, cartItem.quantity + 1)}
                        className="w-10 h-10 min-w-[44px] min-h-[44px] sm:w-8 sm:h-8 sm:min-w-0 sm:min-h-0 bg-gray-300 hover:bg-gray-400 text-gray-800 flex items-center justify-center font-semibold"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center justify-center min-w-[90px] h-8">
                      <span className="text-lg font-semibold text-gray-800 font-mono leading-tight">
                        ${cartItem.item.price * cartItem.quantity}
                      </span>
                    </div>

                    <button
                      onClick={() => removeItem(cartItem.itemId)}
                      className="min-h-[44px] px-4 py-2.5 bg-gray-800 text-white text-xs uppercase hover:bg-gray-900 transition-colors flex items-center justify-center"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              );
            })}

            <button
              onClick={clearAllCart}
              className="mt-4 min-h-[44px] px-6 py-2.5 bg-gray-300/80 backdrop-blur-sm border border-gray-400/60 text-gray-800 uppercase tracking-wider hover:bg-gray-400/80 transition-colors relative z-10"
            >
              Очистить корзину
            </button>
          </div>

          {/* Итого */}
          <div className="lg:col-span-1">
            <div className="bg-gray-100/70 backdrop-blur-sm border border-gray-300/80 p-4 sm:p-6 sticky top-20 sm:top-24 relative z-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Итого</h2>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Товаров:</span>
                  <span>{cart.reduce((sum, item) => sum + item.quantity, 0)} шт.</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-gray-800 pt-2 border-t border-gray-300">
                  <span>Сумма:</span>
                  <span>${total}</span>
                </div>
              </div>
              <button
                onClick={() => setOrderModalOpen(true)}
                className="w-full min-h-[48px] px-6 py-3 bg-gray-800 text-white uppercase tracking-wider hover:bg-gray-900 transition-colors"
              >
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      )}

      {orderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-md shadow-xl w-full max-w-sm mx-4 p-5 relative">
            <button
              type="button"
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => {
                setOrderModalOpen(false);
                setOrderSuccess(false);
                setPhone('');
                setPhoneError('');
              }}
            >
              ✕
            </button>
            {orderSuccess ? (
              <Result
                status="success"
                title="Заказ оформлен!"
                subTitle={`Мы свяжемся с вами по номеру ${phone || 'по указанному номеру'}.`}
                extra={
                  <button
                    onClick={() => {
                      setOrderModalOpen(false);
                      setOrderSuccess(false);
                      setPhone('');
                      setPhoneError('');
                    }}
                    className="min-h-[44px] px-6 py-2.5 bg-gray-800 text-white text-sm uppercase tracking-wider hover:bg-gray-900 transition-colors"
                  >
                    Закрыть
                  </button>
                }
              />
            ) : (
              <>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Оформление заказа</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Укажите ваш номер телефона, и мы свяжемся с вами для подтверждения заказа.
                </p>
                <label className="block mb-2 text-sm text-gray-700">
                  Номер телефона
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                />
                {phoneError && (
                  <p className="mt-1 text-xs text-red-500">
                    {phoneError}
                  </p>
                )}
                <button
                  onClick={handleSubmitOrder}
                  disabled={submitting}
                  className="mt-4 w-full min-h-[44px] px-4 py-2.5 bg-gray-800 text-white text-sm uppercase tracking-wider hover:bg-gray-900 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? 'Отправка...' : 'Подтвердить заказ'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
