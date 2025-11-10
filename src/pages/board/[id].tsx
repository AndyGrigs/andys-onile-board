'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Meta } from '../../layout/Meta';

const Tldraw = dynamic(
  async () => {
    const { Tldraw: TldrawComponent } = await import('tldraw');
    return TldrawComponent;
  },
  {
    ssr: false,
  },
);

const BoardPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="fixed inset-0">
      <Meta
        title={`Board ${id} - Whiteboard`}
        description="Online whiteboard for drawing and collaboration"
      />

      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/')}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              &larr; Back
            </button>
            <h1 className="text-lg font-semibold">Board: {id}</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded bg-gray-100 px-3 py-1 text-sm text-gray-600">
              ID: {id}
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                // eslint-disable-next-line no-alert
                alert('Link copied!');
              }}
              className="rounded bg-blue-500 px-4 py-1 text-sm text-white hover:bg-blue-600"
            >
              Copy Link
            </button>
          </div>
        </header>

        <div className="flex-1">
          <Tldraw />
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
