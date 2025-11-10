import 'tldraw/tldraw.css';

// eslint-disable-next-line import/no-extraneous-dependencies
import { useSyncDemo } from '@tldraw/sync';
import { Tldraw } from 'tldraw';

interface TldrawMultiplayerProps {
  roomId: string;
}

const TldrawMultiplayer = ({ roomId }: TldrawMultiplayerProps) => {
  // Використовуємо публічний сервер Tldraw для синхронізації
  const store = useSyncDemo({ roomId });

  return (
    <div className="size-full">
      <Tldraw store={store} />
    </div>
  );
};

export default TldrawMultiplayer;
