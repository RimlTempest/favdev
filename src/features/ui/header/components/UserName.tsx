type UserNameProps = {
  name?: string | null;
};

// ユーザ名を表示するコンポーネント
export const UserName = (props: UserNameProps) => {
  if (!props.name) {
    return <p className="font-medium text-gray-300 truncate mr-2">ゲスト</p>;
  }
  return (
    <p className="font-medium text-gray-300 truncate mr-2">{props.name}</p>
  );
};
