import cookie from "cookie"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { cookies } from "next/headers"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: "/i/flow/login",
    newUser: "/i/flow/signup",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        console.log("credentials", credentials)
        const authResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: credentials.username,
              password: credentials.password,
            }),
          },
        )

        let setCookie = authResponse.headers.get("Set-Cookie")
        console.log("Set-Cookie", setCookie)
        if (setCookie) {
          const parsed = cookie.parse(setCookie)
          cookies().set("connect.sid", parsed["connect.sid"], parsed) // 브라우저 쿠키 심기
        }

        if (!authResponse.ok) {
          return null
        }

        const user = await authResponse.json()
        console.log("user", user)
        return {
          email: user.id,
          name: user.nickname,
          image: user.image,
          ...user,
        }
      },
    }),
  ],
})
