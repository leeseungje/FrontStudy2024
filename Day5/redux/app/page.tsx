import type { Metadata } from "next";
import { User } from "./components/user/User";

export default function IndexPage() {
  return <User />;
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
