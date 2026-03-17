import type { Metadata } from "next";

import MovieDetail from "@/features/public/movie-detail";

type PageParams = {
  id: string;
};

type PageProps = {
  params: Promise<PageParams>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Movie | ${id} | Movie Watch List`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <MovieDetail id={id} />;
}


