import Image from 'next/image';

type UserAvatarProps = {
  image?: string | null;
};

// アバター画像を表示するコンポーネント
export const UserAvatar = (props: UserAvatarProps) => {
  if (!props.image) {
    return (
      <Image
        className="h-8 w-8 rounded-full"
        width={256}
        height={256}
        src="/guest.png"
        alt="guest icon"
      />
    );
  }
  return (
    <Image
      className="h-8 w-8 rounded-full"
      width={256}
      height={256}
      src={props.image}
      alt="user icon"
    />
  );
};
