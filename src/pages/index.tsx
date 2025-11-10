import { useRouter } from 'next/router';
import { useState } from 'react';

import { Meta } from '../layout/Meta';

const Index = () => {
  const router = useRouter();
  const [boardId, setBoardId] = useState('');

  const createNewBoard = () => {
    const id = Math.random().toString(36).substring(2, 15);
    router.push(`/board/${id}`);
  };

  const joinBoard = () => {
    if (boardId.trim()) {
      router.push(`/board/${boardId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Meta
        title="Whiteboard App - Онлайн дошка для співпраці"
        description="Створіть онлайн дошку та працюйте разом з командою в реальному часі"
      />

      <main className="flex min-h-screen flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl">
          <div className="text-center">
            <h1 className="mb-2 text-4xl font-bold text-gray-900">
              🎨 Whiteboard
            </h1>
            <p className="text-gray-600">
              Онлайн дошка для малювання та співпраці
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={createNewBoard}
              className="w-full rounded-lg bg-blue-500 px-6 py-4 font-semibold text-white shadow-md transition-colors duration-200 hover:bg-blue-600 hover:shadow-lg"
            >
              ➕ Створити нову дошку
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">або</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Приєднатися до існуючої дошки
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Введіть ID дошки"
                  value={boardId}
                  onChange={(e) => setBoardId(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && joinBoard()}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={joinBoard}
                  disabled={!boardId.trim()}
                  className="rounded-lg bg-green-500 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-green-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  Увійти
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="mb-3 text-sm font-semibold text-gray-700">
              ✨ Функції:
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Малювання та фігури
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Текст та стрілки
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Доступ по посиланню
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500">⏳</span>
                Real-time співпраця (скоро)
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
