import { trpc } from '../../utils/trpc';
import { signIn, useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';

export const AddMessageForm = ({
  onMessagePost,
}: {
  onMessagePost: () => void;
}) => {
  const addPost = trpc.post.add.useMutation();
  const { data: session } = useSession();
  const [message, setMessage] = useState('');
  const [enterToPostMessage, setEnterToPostMessage] = useState(true);
  async function postMessage() {
    const input = {
      text: message,
    };
    try {
      await addPost.mutateAsync(input);
      setMessage('');
      onMessagePost();
    } catch {}
  }

  const isTyping = trpc.post.isTyping.useMutation();

  const userName = session?.user?.name ?? 'guest';
  if (!userName || !session) {
    return (
      <div className="flex justify-between w-full px-3 py-2 text-lg text-gray-200 bg-gray-800 rounded">
        <p className="font-bold">
          You have to{' '}
          <button
            className="inline font-bold underline"
            onClick={() => signIn()}
          >
            sign in
          </button>{' '}
          to write.
        </p>
        <button
          onClick={() => signIn()}
          data-testid="signin"
          className="h-full px-4 bg-indigo-500 rounded"
        >
          Sign In
        </button>
      </div>
    );
  }
  return (
    <>
      <form
        onSubmit={async (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          /**
           * In a real app you probably don't want to use this manually
           * Checkout React Hook Form - it works great with tRPC
           * @link https://react-hook-form.com/
           */
          await postMessage();
        }}
      >
        <fieldset disabled={addPost.isLoading} className="min-w-0">
          <div className="flex items-end w-full px-3 py-2 text-lg text-gray-200 bg-gray-500 rounded">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-transparent outline-0 ma-2"
              rows={message.split(/\r|\n/).length}
              id="text"
              name="text"
              autoFocus
              onKeyDown={async (e) => {
                if (e.key === 'Shift') {
                  setEnterToPostMessage(false);
                }
                if (e.key === 'Enter' && enterToPostMessage) {
                  postMessage();
                }
                isTyping.mutate({ typing: true });
              }}
              onKeyUp={(e) => {
                if (e.key === 'Shift') {
                  setEnterToPostMessage(true);
                }
              }}
              onBlur={() => {
                setEnterToPostMessage(true);
                isTyping.mutate({ typing: false });
              }}
            />
            <div>
              <button
                type="submit"
                className="px-4 py-1 ma-1 bg-indigo-500 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </fieldset>
        {addPost.error && (
          <p style={{ color: 'red' }}>{addPost.error.message}</p>
        )}
      </form>
    </>
  );
};
