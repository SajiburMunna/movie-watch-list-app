import { Metadata } from "next";

import SignUp from "@/features/auth/sign-up";

export const metadata: Metadata = {
  title: "Sign Up | Movie Watch List",
  description: "Sign Up to your Movie Watch List account",
};

function Page() {
  return <SignUp />;
}

export default Page;
