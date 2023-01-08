import { useSession } from 'next-auth/react';
import Image from 'next/image';

// アバター画像を表示するコンポーネント
export const UserAvatar = () => {
  const { data: session } = useSession();
  if (!session?.user?.image) {
    return (
      <Image
        className="h-8 w-8 rounded-full"
        width={256}
        height={256}
        src="/guest.png"
        alt=""
      />
    );
  }
  return (
    <Image
      className="h-8 w-8 rounded-full"
      width={256}
      height={256}
      src={session?.user?.image}
      alt=""
    />
  );
};
