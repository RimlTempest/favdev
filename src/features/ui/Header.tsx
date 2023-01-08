import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const navigation = [
  { name: '一覧', href: '#', current: true },
  { name: 'ランキング', href: '#', current: false },
  { name: 'お問い合わせ', href: '#', current: false },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

// アバター画像を表示するコンポーネント
const UserAvatar = () => {
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

// ユーザ名を表示するコンポーネント
const UserName = () => {
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

// ユーザ設定を表示するコンポーネント
const UserSetting = () => {
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

export default function Header() {
  return (
    <header>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <AiOutlineClose
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    ) : (
                      <AiOutlineMenu
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium',
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full ma-2 bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <div className="flex flex-row justify-center items-center">
                          <span className="sr-only">Open user menu</span>
                          <UserName />
                          <UserAvatar />
                        </div>
                      </Menu.Button>
                    </div>
                    <UserSetting />
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium',
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  );
}
