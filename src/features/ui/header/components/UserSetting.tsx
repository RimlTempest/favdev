import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { signIn, signOut, useSession } from 'next-auth/react';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

// ユーザ設定を表示するコンポーネント
export const UserSetting = () => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <a
                onClick={() => signIn()}
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700',
                )}
              >
                アカウント作成/ログイン
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    );
  }
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <a
              href="#"
              className={classNames(
                active ? 'bg-gray-100' : '',
                'block px-4 py-2 text-sm text-gray-700',
              )}
            >
              プロフィール
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              onClick={() => signOut()}
              className={classNames(
                active ? 'bg-gray-100' : '',
                'block px-4 py-2 text-sm text-gray-700',
              )}
            >
              ログアウト
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
    </Transition>
  );
};
