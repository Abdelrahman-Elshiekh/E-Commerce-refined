
const Loading = () => {
  return (
    <main className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center gap-6 bg-zinc-950 px-6 py-12 text-center text-white dark:bg-zinc-800">
      <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/10 bg-white/5 shadow-lg shadow-white/10">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-white border-t-transparent" />
      </div>
      <div className="max-w-md space-y-2">
        <p className="text-xl font-semibold">Loading the shop…</p>
        <p className="text-sm text-zinc-300">
          Please wait while we fetch the latest products and prepare your experience.
        </p>
      </div>
    </main>
  );
};

export default Loading;