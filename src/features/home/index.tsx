import { trpc } from '@utils/trpc';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AddMessageForm } from './AddMessageForm';
import { Header } from '@features/ui/header';
import { Footer } from '@features/ui/footer';

export default function Home() {
  const postsQuery = trpc.post.infinite.useInfiniteQuery(
    {},
    {
      getPreviousPageParam: (d) => d.prevCursor,
    },
  );
  const utils = trpc.useContext();
  const { hasPreviousPage, isFetchingPreviousPage, fetchPreviousPage } =
    postsQuery;

  // list of messages that are rendered
  const [messages, setMessages] = useState(() => {
    const msgs = postsQuery.data?.pages.map((page) => page.items).flat();
    return msgs;
  });
  type Post = NonNullable<typeof messages>[number];
  const { data: session } = useSession();
  const userName = session?.user?.name;
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  // fn to add and dedupe new messages onto state
  const addMessages = useCallback((incoming?: Post[]) => {
    setMessages((current) => {
      const map: Record<Post['id'], Post> = {};
      for (const msg of current ?? []) {
        map[msg.id] = msg;
      }
      for (const msg of incoming ?? []) {
        map[msg.id] = msg;
      }
      return Object.values(map).sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
      );
    });
  }, []);

  // when new data from `useInfiniteQuery`, merge with current state
  useEffect(() => {
    const msgs = postsQuery.data?.pages.map((page) => page.items).flat();
    addMessages(msgs);
  }, [postsQuery.data?.pages, addMessages]);

  const scrollToBottomOfList = useCallback(() => {
    if (scrollTargetRef.current == null) {
      return;
    }

    scrollTargetRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [scrollTargetRef]);
  useEffect(() => {
    scrollToBottomOfList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // subscribe to new posts and add
  trpc.post.onAdd.useSubscription(undefined, {
    onData(post) {
      addMessages([post]);
    },
    onError(err) {
      console.error('Subscription error:', err);
      // we might have missed a message - invalidate cache
      utils.post.infinite.invalidate();
    },
  });

  const [currentlyTyping, setCurrentlyTyping] = useState<string[]>([]);
  trpc.post.whoIsTyping.useSubscription(undefined, {
    onData(data) {
      setCurrentlyTyping(data);
    },
  });

  return (
    <>
      <Head>
        <title>Prisma Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen">
        <Header />
        <div className="flex flex-col md:flex-row">
          <section className="flex flex-col w-full bg-gray-800 md:w-72">
            <div className="flex-1 overflow-y-hidden">
              <div className="flex flex-col h-full divide-y divide-gray-700">
                <div className="flex-1 hidden p-4 space-y-6 overflow-y-auto text-gray-400 md:block">
                  <article className="space-y-2">
                    <h2 className="text-lg text-gray-200">Introduction</h2>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Open inspector and head to Network tab</li>
                      <li>
                        All client requests are handled through WebSockets
                      </li>
                      <li>
                        We have a simple backend subscription on new messages
                        that adds the newly added message to the current state
                      </li>
                    </ul>
                  </article>
                  {userName && (
                    <article>
                      <h2 className="text-lg text-gray-200">
                        User information
                      </h2>
                      <ul className="space-y-2">
                        <li className="text-lg">
                          You&apos;re{' '}
                          <input
                            id="name"
                            name="name"
                            type="text"
                            disabled
                            className="bg-transparent"
                            value={userName}
                          />
                        </li>
                        <li>
                          <button onClick={() => signOut()}>Sign Out</button>
                        </li>
                      </ul>
                    </article>
                  )}
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 hidden h-16 md:block"></div>
          </section>
          <div className="flex-1 overflow-y-hidden md:h-screen">
            <section className="flex flex-col justify-end h-full p-4 space-y-4 bg-gray-700">
              <div className="space-y-4 overflow-y-auto">
                <button
                  data-testid="loadMore"
                  onClick={() => fetchPreviousPage()}
                  disabled={!hasPreviousPage || isFetchingPreviousPage}
                  className="px-4 py-2 text-white bg-indigo-500 rounded disabled:opacity-40"
                >
                  {isFetchingPreviousPage
                    ? 'Loading more...'
                    : hasPreviousPage
                    ? 'Load More'
                    : 'Nothing more to load'}
                </button>
                <div className="space-y-4">
                  {messages?.map((item) => (
                    <article key={item.id} className=" text-gray-50">
                      <header className="flex space-x-2 text-sm">
                        <h3 className="text-md">
                          {item.source === 'RAW' ? (
                            item.name
                          ) : (
                            <a
                              href={`https://github.com/${item.name}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {item.name}
                            </a>
                          )}
                        </h3>
                        <span className="text-gray-500">
                          {new Intl.DateTimeFormat('en-GB', {
                            dateStyle: 'short',
                            timeStyle: 'short',
                          }).format(item.createdAt)}
                        </span>
                      </header>
                      <p className="text-xl leading-tight whitespace-pre-line">
                        {item.text}
                      </p>
                    </article>
                  ))}
                  <div ref={scrollTargetRef}></div>
                </div>
              </div>
              <div className="w-full">
                <AddMessageForm onMessagePost={() => scrollToBottomOfList()} />
                <p className="h-2 italic text-gray-400">
                  {currentlyTyping.length
                    ? `${currentlyTyping.join(', ')} typing...`
                    : ''}
                </p>
              </div>

              {process.env.NODE_ENV !== 'production' && (
                <div className="hidden md:block">
                  <ReactQueryDevtools initialIsOpen={false} />
                </div>
              )}
            </section>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createSSGHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.fetchQuery('post.all');
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
