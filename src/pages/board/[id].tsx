import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Meta } from '../../layout/Meta';

// Динамічний імпорт Tldraw для уникнення SSR проблем
const TldrawWithMultiplayer = dynamic(
  () => import('../../components/TldrawMultiplayer'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl">⏳</div>
          <div className="text-lg text-gray-600">Завантаження дошки...</div>
        </div>
      </div>
    ),
  },
);

const BoardPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [roomId, setRoomId] = useState<string | null>(null);

  useEffect(() => {
    if (id && typeof id === 'string') {
      setRoomId(id);
    }
  }, [id]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    // eslint-disable-next-line no-alert
    alert('Посилання скопійовано! 🎉');
  };

  if (!roomId) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl">⏳</div>
          <div className="text-lg text-gray-600">Завантаження...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0">
      <Meta
        title={`Board ${roomId} - Whiteboard`}
        description="Online whiteboard for drawing and collaboration"
      />

      <div className="flex h-full flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/')}
              className="text-sm text-gray-600 transition-colors hover:text-gray-900"
            >
              ← Назад
            </button>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">Дошка:</span>
              <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">
                {roomId}
              </code>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1">
              <div className="size-2 animate-pulse rounded-full bg-green-500"></div>
              <span className="text-sm font-medium text-green-700">Online</span>
            </div>
            <button
              onClick={copyLink}
              className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            >
              📋 Копіювати посилання
            </button>
          </div>
        </header>

        {/* Canvas */}
        <div className="flex-1">
          <TldrawWithMultiplayer roomId={roomId} />
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
