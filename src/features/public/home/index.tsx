import React from "react";

function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <section className="rounded-xl border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome to MovieWatch
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Use the search bar above to find movies and start building your
          personal watch list.
        </p>
      </section>
    </main>
  );
}

export default Home;
