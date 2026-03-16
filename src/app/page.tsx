import { Metadata } from "next";

import Home from "@/features/public/home";

export const metadata: Metadata = {
  title: "Home | Movie Watch List",
  description: "Home page of Movie Watch List",
};

export default function HomePage() {
  return <Home />;
}
