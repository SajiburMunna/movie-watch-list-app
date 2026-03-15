import { Metadata } from "next";

import SignIn from "@/features/auth/sign-in";

export const metadata: Metadata = {
  title: "Sign In | Movie Watch List",
  description: "Sign In to your Movie Watch List account",
};

function Page() {
  return <SignIn />;
}

export default Page;
