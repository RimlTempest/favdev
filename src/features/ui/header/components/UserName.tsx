import { useSession } from 'next-auth/react';

// ユーザ名を表示するコンポーネント
export const UserName = () => {
  const { data: session } = useSession();
  if (!session?.user?.name) {
    return <p className="font-medium text-gray-300 truncate mr-2">ゲスト</p>;
  }
  return (
    <p className="font-medium text-gray-300 truncate mr-2">
      {session?.user?.name}
    </p>
  );
};
