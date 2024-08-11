"use client";

import { useRouter } from "next/navigation";

import LoginHome from "../_component/LoginHome";

export default function Login() {
  const router = useRouter();
  router.replace("/i/flow/login");
  return <LoginHome />;
}
